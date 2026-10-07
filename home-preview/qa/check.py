import asyncio
import json
from pathlib import Path
from playwright.async_api import async_playwright

URL = 'http://127.0.0.1:8000/home-preview/'
OUT = Path('/workspace/artifacts/home-editorial-v3')
AXE = Path('/tmp/home-preview-tools/node_modules/axe-core/axe.min.js')
WIDTHS = [320, 375, 390, 430, 768, 1024, 1440]
PROJECTS = ['Tenderness', 'O Grão', 'Histórias da Bíblia com Bento', 'Before You Read', 'PARALLAX', 'Até Que o Caos Nos Separe', 'E se você estiver fazendo a pergunta errada?']

async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
        page = await browser.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=1)
        errors = []
        failed_requests = []
        accessibility = []
        page.on('response', lambda r: failed_requests.append({'url': r.url, 'status': r.status}) if r.status >= 400 else None)
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
        await page.goto(URL, wait_until='networkidle')
        assert await page.get_by_role('heading', level=1, name='Construindo ideias em coisas reais.', exact=True).count() == 1, 'A capa deve apresentar a tese editorial V3'
        index = page.get_by_role('region', name='Índice de projetos', exact=True)
        assert await index.get_by_role('heading', level=3).count() == 5, 'O índice deve conter exatamente cinco entradas'
        assert await page.locator('img[src*="/e-se-voce-estiver-fazendo-a-pergunta-errada/assets/"]').count() == 1, 'O livro deve ter uma única imagem'
        assert await page.locator('.hero img[src*="hero-"]').count() == 0, 'Fotografia lifestyle não deve ser protagonista da capa'
        assert await page.locator('#escritas').count() == 0, 'Não criar seção separada de Escritas & identidade'
        for name in PROJECTS:
            heading = page.get_by_role('heading', name=name, exact=True)
            assert await heading.count() == 1, f'Projeto ausente ou duplicado: {name}'
            assert await heading.is_visible(), f'Projeto oculto: {name}'
        assert await page.get_by_role('heading', level=1).count() == 1, 'A página deve ter um único h1'
        assert await page.get_by_role('button', name='Abrir menu').count() == 1
        menu = page.locator('button[aria-controls="primary-navigation"]')
        await menu.click()
        assert await menu.get_attribute('aria-expanded') == 'true'
        await page.keyboard.press('Escape')
        assert await menu.get_attribute('aria-expanded') == 'false'
        assert await menu.evaluate('(el) => el === document.activeElement'), 'ESC deve devolver foco ao botão'
        await menu.click()
        await page.get_by_role('navigation', name='Navegação principal').get_by_role('link', name='Sobre', exact=True).click()
        assert await menu.get_attribute('aria-expanded') == 'false', 'Selecionar âncora deve fechar menu'
        assert await page.locator('#sobre').evaluate('(el) => el === document.activeElement'), 'Âncora deve mover foco para a seção'
        await menu.click()
        await page.keyboard.press('Tab')
        focused = await page.evaluate('document.activeElement.textContent.trim()')
        assert focused == 'Projetos', f'Ordem de foco do menu: {focused}'
        await page.keyboard.press('Escape')
        await menu.click()
        await page.get_by_role('link', name='Projetos', exact=True).focus()
        await page.keyboard.press('Shift+Tab')
        assert await menu.evaluate('(el) => el === document.activeElement')
        await page.keyboard.press('Escape')
        results = []
        for width in WIDTHS:
            await page.set_viewport_size({'width': width, 'height': 900 if width > 768 else 844})
            await page.goto(URL, wait_until='networkidle')
            await page.evaluate('async () => { for (const img of document.images) { img.loading = "eager"; } await Promise.all([...document.images].map(img => img.decode().catch(() => {}))); }')
            data = await page.evaluate('''() => ({
                width: innerWidth, scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth,
                brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')),
                brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash),
                headings: [...document.querySelectorAll('h1,h2,h3,h4')].map(h => ({level: Number(h.tagName[1]), text: h.textContent.trim()})),
                clipped: [...document.querySelectorAll('h1,h2,h3,p,a,button')].filter(e => e.getBoundingClientRect().width && (e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 2)).map(e => e.textContent.trim()),
                outside: [...document.querySelectorAll('h1,h2,h3,p,a,button')].filter(e => {const r=e.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth + 1);}).map(e => e.textContent.trim())
            })''')
            assert data['scroll'] == data['client'], f'Overflow horizontal a {width}px: {data}'
            assert not data['brokenImages'], f'Imagens quebradas a {width}px: {data}'
            assert not data['brokenAnchors'], f'Âncoras inexistentes: {data}'
            assert not data['clipped'], f'Textos cortados a {width}px: {data}'
            assert not data['outside'], f'Conteúdo fora da tela a {width}px: {data}'
            levels = [h['level'] for h in data['headings']]
            assert all(b <= a + 1 for a,b in zip(levels, levels[1:])), 'Hierarquia dos headings'
            for name in PROJECTS:
                assert await page.get_by_role('heading', name=name, exact=True).is_visible()
            if AXE.is_file():
                await page.add_script_tag(path=str(AXE))
                audit = await page.evaluate('async () => await axe.run(document, {runOnly: {type:"tag", values:["wcag2a","wcag2aa","wcag21a","wcag21aa"]}})')
                assert not audit['violations'], f"Acessibilidade a {width}px: {audit['violations']}"
                accessibility.append({'width':width,'violations':0,'incomplete_checks':[item['id'] for item in audit['incomplete']]})
            results.append(data)
            if width in [390,1440]:
                await page.screenshot(path=str(OUT / f'home-preview-{width}.png'), full_page=True)
        assert not failed_requests, f'Requisições HTTP com falha: {failed_requests}'
        assert not errors, f'Erros de navegador: {errors}'
        for route in ['/tenderness/pt/', '/o-grao/', '/before-you-read/pt-br/', '/e-se-voce-estiver-fazendo-a-pergunta-errada/']:
            response = await page.request.get('http://127.0.0.1:8000' + route)
            assert response.status == 200, f'Link local: {route} retornou {response.status}'
        no_js = await browser.new_page(java_script_enabled=False, viewport={'width':390,'height':844})
        await no_js.goto(URL, wait_until='networkidle')
        for name in ['Projetos', 'Ideias', 'Sobre']:
            assert await no_js.get_by_role('navigation').get_by_role('link',name=name,exact=True).is_visible(), f'Navegação sem JS: {name}'
        await no_js.close()
        await page.set_viewport_size({'width':390,'height':844})
        await page.emulate_media(reduced_motion='reduce')
        await page.goto(URL, wait_until='networkidle')
        assert await page.evaluate('getComputedStyle(document.documentElement).scrollBehavior') == 'auto'
        await browser.close()
        (OUT / 'results.json').write_text(json.dumps({'status':'passed', 'widths':WIDTHS, 'projects':PROJECTS, 'browser_errors':errors, 'failed_requests':failed_requests, 'accessibility':accessibility, 'no_javascript_navigation':'passed', 'reduced_motion':'passed', 'results':results}, ensure_ascii=False, indent=2))
        print('PASS: 7 projetos; 7 larguras; imagens, âncoras, headings, overflow, menu/ESC/foco, console e 4 destinos locais.')

asyncio.run(main())

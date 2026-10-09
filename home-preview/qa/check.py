import asyncio
import json
import re
from pathlib import Path
from playwright.async_api import async_playwright
from cdn_bridge import prepare_browser_cdn

URL = 'http://127.0.0.1:8000/home-preview/'
OUT = Path('/workspace/artifacts/home-v8')
AXE = Path('/tmp/home-preview-tools/node_modules/axe-core/axe.min.js')
WIDTHS = [320, 375, 390, 430, 768, 1024, 1440]
PROJECTS = ['Tenderness', 'O Grão', 'Histórias da Bíblia com Bento', 'Before You Read', 'PARALLAX', 'Até Que o Caos Nos Separe', 'E se você estiver fazendo a pergunta errada?']

async def main():
    assert AXE.is_file(), 'Instale axe-core conforme QA.md antes de executar a auditoria obrigatória'
    OUT.mkdir(parents=True, exist_ok=True)
    html = (Path(__file__).resolve().parents[1] / 'index.html').read_text()
    old_terms = r'marca|branding|cliente|metodologia|imersão|Atelier Flora|Lume|Aura Wellness|Cass Amarela|Ana Luiza|design estratégico|brand designer|serviços|services|\bprocess\b|iniciar projeto|vamos criar algo|unsplash|placehold'
    assert not re.search(old_terms, html, re.IGNORECASE), 'Conteúdo fictício ou imagem genérica restante'

    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
        page = await browser.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=1)
        await prepare_browser_cdn(page)
        errors = []
        failed_requests = []
        accessibility = []
        page.on('response', lambda r: failed_requests.append({'url': r.url, 'status': r.status}) if r.status >= 400 else None)
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
        await page.goto(URL, wait_until='networkidle')
        await page.evaluate('document.fonts.ready')
        assert await page.locator('style').evaluate_all('(styles) => styles.some(s => s.textContent.includes("tailwindcss v4.1.18"))'), 'Tailwind CDN não inicializou'
        assert await page.evaluate('document.fonts.check("300 54px Cormorant Garamond") && document.fonts.check("400 14px Plus Jakarta Sans")'), 'Fonte editorial não carregou'
        assert await page.get_by_role('heading', level=1, name='Emelyn Campos', exact=True).count() == 1, 'A capa deve usar a mensagem pessoal do HTML-base'
        index = page.get_by_role('region', name='Projetos selecionados', exact=True)
        assert await index.get_by_role('heading', level=3).count() == 7, 'Curadoria compacta deve conter os sete projetos'
        assert await page.locator('img[src*="/e-se-voce-estiver-fazendo-a-pergunta-errada/assets/"]').count() == 1, 'O livro deve ter uma única imagem'
        assert await page.locator('.hero img').count() == 1, 'A capa deve ter uma imagem forte, sem mosaico'
        assert await page.locator('.social-links > a,.social-links > span').count() == 4
        assert await page.locator('[data-pending-profile][href]').count() == 0, 'Não inventar URLs pendentes'
        assert await page.locator('#escritas').count() == 0, 'Não criar seção separada de Escritas & identidade'
        for name in PROJECTS:
            heading = page.get_by_role('heading', name=name, exact=True)
            assert await heading.count() == 1, f'Projeto ausente ou duplicado: {name}'
            assert await heading.is_visible(), f'Projeto oculto: {name}'
        assert await page.get_by_role('heading', level=1).count() == 1, 'A página deve ter um único h1'
        menu = page.get_by_role('button', name='Abrir menu', exact=True)
        await menu.click()
        overlay = page.get_by_role('dialog', name='Menu principal')
        assert await overlay.is_visible(), 'Menu fullscreen ausente'
        assert await menu.get_attribute('aria-expanded') == 'true'
        assert await page.locator('body').evaluate('(el) => getComputedStyle(el).overflowY') == 'hidden'
        await page.keyboard.press('Escape')
        assert not await overlay.is_visible()
        assert await menu.evaluate('(el) => el === document.activeElement'), 'ESC deve devolver foco'
        await menu.click()
        await overlay.get_by_role('link', name='Sobre', exact=True).click()
        assert not await overlay.is_visible()
        assert await page.locator('#sobre').evaluate('(el) => el === document.activeElement')
        await menu.click()
        await page.keyboard.press('Tab')
        assert await page.evaluate('document.activeElement.textContent.trim()') == 'Projetos'
        await overlay.get_by_role('link', name='Acompanhe', exact=True).focus()
        await page.keyboard.press('Tab')
        assert await page.get_by_role('button', name='Fechar menu').evaluate('(el) => el === document.activeElement'), 'Foco deve ficar no overlay'
        await page.keyboard.press('Shift+Tab')
        assert await overlay.get_by_role('link', name='Acompanhe', exact=True).evaluate('(el) => el === document.activeElement')
        await page.keyboard.press('Escape')
        await menu.click()
        await page.set_viewport_size({'width': 768, 'height': 900})
        assert not await overlay.is_visible(), 'Resize para desktop deve fechar o menu'
        assert await page.locator('body').evaluate('(el) => getComputedStyle(el).overflowY') != 'hidden'
        results = []
        for width in WIDTHS:
            await page.set_viewport_size({'width': width, 'height': 900 if width > 768 else 844})
            await page.goto(URL, wait_until='networkidle')
            await page.evaluate('document.fonts.ready')
            await page.evaluate('async () => { for (const img of document.images) { img.loading = "eager"; } await Promise.all([...document.images].map(img => img.decode().catch(() => {}))); }')
            hero_link = page.locator('.hero .editorial-link')
            await hero_link.scroll_into_view_if_needed()
            assert await hero_link.evaluate("el => { const r=el.getBoundingClientRect(); const hit=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2); return hit===el || el.contains(hit); }"), f'Link do hero encoberto a {width}px'
            await page.evaluate('window.scrollTo(0, 0)')
            data = await page.evaluate('''() => ({
                width: innerWidth, scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth,
                brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.getAttribute('src')),
                brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash),
                headings: [...document.querySelectorAll('h1,h2,h3,h4')].map(h => ({level: Number(h.tagName[1]), text: h.textContent.trim()})),
                clipped: [...document.querySelectorAll('h1,h2,h3,p,a,button')].filter(e => e.getBoundingClientRect().width && (e.scrollWidth > e.clientWidth + 2 || (['hidden','clip'].includes(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 2))).map(e => e.textContent.trim()),
                outside: [...document.querySelectorAll('h1,h2,h3,p,a,button')].filter(e => {const r=e.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth + 1);}).map(e => e.textContent.trim())
            })''')
            face = await page.evaluate('''() => {
                const photo = document.querySelector('.hero-photo img');
                const r = photo.getBoundingClientRect();
                const scale = Math.max(r.width / photo.naturalWidth, r.height / photo.naturalHeight);
                const positions = getComputedStyle(photo).objectPosition.split(' ').map(parseFloat);
                const dx = (r.width - photo.naturalWidth * scale) * positions[0] / 100;
                const dy = (r.height - photo.naturalHeight * scale) * positions[1] / 100;
                // Safe area mapped from the chosen portrait: head and face, not a generic center point.
                const safe = {left:r.left + dx + 150*scale, top:r.top + dy + 130*scale,
                    right:r.left + dx + 570*scale, bottom:r.top + dy + 770*scale};
                const intrusions = [...document.querySelectorAll('.hero h1,.hero p,.hero a,#navbar a,#navbar button,.hero svg')]
                    .filter(e => { const b=e.getBoundingClientRect(); return b.width && b.height && b.left<safe.right && b.right>safe.left && b.top<safe.bottom && b.bottom>safe.top; })
                    .map(e => e.textContent.trim() || e.getAttribute('aria-label'));
                return {safe, intrusions, fullyWithinPhoto:safe.left>=r.left && safe.right<=r.right && safe.top>=r.top && safe.bottom<=r.bottom};
            }''')
            assert face['fullyWithinPhoto'], f'Rosto cortado a {width}px: {face}'
            assert not face['intrusions'], f'Elemento sobre o rosto a {width}px: {face}'
            assert await page.locator('.hero svg').count() == 0, 'Capa limpa, sem botânicos'
            data['face_safe_area'] = face
            if width >= 768:
                composition = await page.evaluate('''() => {
                    const tiles = [...document.querySelectorAll('.selected-grid > article')].map(e => {
                        const r=e.getBoundingClientRect(); return {top:r.top,left:r.left,height:r.height};
                    });
                    return {tiles,pageHeight:document.querySelector('.editorial-page').getBoundingClientRect().height,
                        projectsHeight:document.querySelector('#projetos').getBoundingClientRect().height};
                }''')
                assert max(t['top'] for t in composition['tiles'][:4]) - min(t['top'] for t in composition['tiles'][:4]) <= 1, 'Primeira linha deve ter quatro projetos'
                assert max(t['top'] for t in composition['tiles'][4:]) - min(t['top'] for t in composition['tiles'][4:]) <= 1, 'Segunda linha deve ter três projetos'
                if width == 1440:
                    assert composition['pageHeight'] < 2800, f'Densidade editorial regressiva: {composition}'
                    assert composition['projectsHeight'] < 800, 'Projetos devem formar uma faixa compacta'
                data['composition'] = composition
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
            assert await no_js.get_by_role('navigation', name='Navegação principal', exact=True).get_by_role('link',name=name,exact=True).is_visible(), f'Navegação sem JS: {name}'
        await no_js.close()
        await page.set_viewport_size({'width':390,'height':844})
        await page.emulate_media(reduced_motion='reduce')
        await page.goto(URL, wait_until='networkidle')
        assert await page.evaluate('getComputedStyle(document.documentElement).scrollBehavior') == 'auto'
        await browser.close()
        (OUT / 'results.json').write_text(json.dumps({'status':'passed', 'widths':WIDTHS, 'projects':PROJECTS, 'browser_errors':errors, 'failed_requests':failed_requests, 'accessibility':accessibility, 'no_javascript_navigation':'passed', 'reduced_motion':'passed', 'results':results}, ensure_ascii=False, indent=2))
        print('PASS: 7 projetos; 7 larguras; imagens, âncoras, headings, overflow, menu/ESC/foco, console e 4 destinos locais.')

asyncio.run(main())

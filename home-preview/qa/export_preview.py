"""Export V5 HTML, authentic compiled Tailwind, fonts and images in one file."""
import asyncio
import base64
import mimetypes
import re
from pathlib import Path
from playwright.async_api import async_playwright
from cdn_bridge import prepare_browser_cdn

ROOT = Path(__file__).resolve().parents[2]
OUT = Path('/workspace/artifacts/home-v5-2/preview.html')
URL = 'http://127.0.0.1:8000/home-preview/'


def data_uri(url):
    path = ROOT / url.lstrip('/')
    mime = mimetypes.guess_type(path)[0] or 'application/octet-stream'
    return f'data:{mime};base64,{base64.b64encode(path.read_bytes()).decode("ascii")}'


def embed(match):
    attribute, url = match.groups()
    if attribute == 'href' and url == '/home-preview/':
        return 'href="#conteudo"'
    if attribute == 'href' and not (ROOT / url.lstrip('/')).is_file():
        return f'href="https://www.emelyncampos.com.br{url}"'
    return f'{attribute}="{data_uri(url)}"'


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
        page = await browser.new_page()
        await prepare_browser_cdn(page)
        await page.goto(URL, wait_until='networkidle')
        generated = await page.locator('style:not([type="text/tailwindcss"])').evaluate_all('(styles) => styles.map(s => s.textContent).join("\\n")')
        assert 'tailwindcss v4.1.18' in generated, 'Tailwind did not compile'
        await browser.close()
    html = (ROOT / 'home-preview/index.html').read_text()
    html = re.sub(r'<style\b[^>]*type="text/tailwindcss"[^>]*>.*?</style>', '', html, flags=re.DOTALL)
    css = (ROOT / 'home-preview/assets/home.css').read_text()
    css = re.sub(r'url\(["\']?(/[^"\')]+)["\']?\)', lambda m: f'url("{data_uri(m[1])}")', css)
    fa = (ROOT / 'home-preview/assets/fontawesome.css').read_text()
    fa = re.sub(r'url\(["\']?(\./fonts/[^"\')]+)["\']?\)', lambda m: f'url("{data_uri("/home-preview/assets/" + m[1][2:])}")', fa)
    html = re.sub(r'<link\b[^>]*href="/home-preview/assets/fontawesome.css"[^>]*>', lambda m: f'<style>{fa}</style>', html)
    js = (ROOT / 'home-preview/assets/home.js').read_text()
    html = re.sub(r'<script\b[^>]*src="https://cdn.jsdelivr.net/[^>]+></script>', '', html)
    html = re.sub(r'<link\b[^>]*href="/home-preview/assets/home.css"[^>]*>', lambda m: f'<style>\n{generated}\n</style>\n<style>\n{css}\n</style>', html)
    html = re.sub(r'<script\b[^>]*src="/home-preview/assets/home.js"[^>]*></script>', '', html)
    html = re.sub(r'\b(src|href)="(/[^\"]+)"', embed, html)
    html = html.replace('</body>', f'<script>\n(() => {{\n{js}\n}})();\n</script>\n</body>')
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html)
    print(f'Exported self-contained V5 preview: {OUT} ({OUT.stat().st_size:,} bytes)')


if __name__ == '__main__':
    asyncio.run(main())

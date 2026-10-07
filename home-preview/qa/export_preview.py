"""Export the site preview as one HTML file for file-based viewers."""
import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = Path('/workspace/artifacts/home-editorial-v2/preview.html')


def embed(match):
    attribute, url = match.groups()
    if attribute == 'href' and url == '/home-preview/':
        return 'href="#conteudo"'
    if attribute == 'href' and not url.startswith('/assets/'):
        return f'href="https://www.emelyncampos.com.br{url}"'
    path = ROOT / url.lstrip('/')
    mime = mimetypes.guess_type(path)[0] or 'application/octet-stream'
    encoded = base64.b64encode(path.read_bytes()).decode('ascii')
    return f'{attribute}="data:{mime};base64,{encoded}"'


html = (ROOT / 'home-preview/index.html').read_text()
css = (ROOT / 'home-preview/assets/home.css').read_text()
js = (ROOT / 'home-preview/assets/home.js').read_text()
html = html.replace('<link rel="stylesheet" href="/home-preview/assets/home.css">', f'<style>\n{css}\n</style>')
html = html.replace('<script src="/home-preview/assets/home.js" defer></script>', '')
html = re.sub(r'\b(src|srcset|href)="(/[^\"]+)"', embed, html)
html = html.replace('</body>', f'<script>\n(() => {{\n{js}\n}})();\n</script>\n</body>')
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(html)
print(f'Exported self-contained preview: {OUT} ({OUT.stat().st_size:,} bytes)')

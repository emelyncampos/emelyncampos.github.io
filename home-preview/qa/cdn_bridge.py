"""Serve authentic CDN bytes through Python's configured, verified TLS transport.

Chromium's separate CA store does not trust the managed environment proxy. This
bridge keeps certificate verification enabled and does not replace application
code. The deployed page still uses the original CDN URL.
"""
import asyncio
import urllib.request

TAILWIND_URL = 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.1.18/dist/index.global.js'

async def prepare_browser_cdn(page):
    def download():
        with urllib.request.urlopen(TAILWIND_URL, timeout=30) as response:
            assert response.status == 200
            return response.read()
    payload = await asyncio.to_thread(download)
    assert len(payload) > 200_000, 'Incomplete Tailwind CDN response'
    await page.route(TAILWIND_URL, lambda route: route.fulfill(status=200, content_type='application/javascript', body=payload))

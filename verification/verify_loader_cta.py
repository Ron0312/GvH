from playwright.sync_api import sync_playwright
import time

def verify_loader_cta():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Capture Loader
        # Navigate but don't wait for network idle to catch the loader
        page.goto("http://localhost:4321", wait_until="domcontentloaded")

        # Take immediate screenshot for loader
        # We might need to wait a tiny bit for the logo animation to start if it has one,
        # but the loader itself should be visible.
        # The user CSS has .loader-logo opacity: 0 -> animation loader-brand-reveal 1.2s ...
        # So we might want to wait like 500ms to see it partially?
        time.sleep(0.5)
        page.screenshot(path="verification/loader.png")
        print("Loader screenshot taken.")

        # 2. Capture CTA
        # Wait for fade out to complete so we can scroll
        time.sleep(2)

        # Scroll to the bottom or find the CTA.
        # The CTA is likely near the bottom or in the middle.
        # Search for text "Concierge Dialog" or "Das Gespräch eröffnen"
        cta = page.locator(".resonance-panel").first
        cta.scroll_into_view_if_needed()

        # Wait a bit for images to load (LazyImage?) or animations
        time.sleep(1)

        cta.screenshot(path="verification/cta.png")
        print("CTA screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_loader_cta()

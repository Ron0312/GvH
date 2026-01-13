from playwright.sync_api import sync_playwright

def verify_changes(page):
    # Verify Homepage Awards
    page.goto("http://localhost:4321/")
    # Wait for the awards section to be visible
    page.wait_for_selector("img[alt='Gärten des Jahres 2025']")
    page.screenshot(path="verification_homepage.png")
    print("Homepage verification screenshot taken.")

    # Verify Werkschau
    page.goto("http://localhost:4321/werkschau")
    # Wait for the new project to be visible
    page.wait_for_selector("text=Nordische Klarheit")
    page.screenshot(path="verification_werkschau.png")
    print("Werkschau verification screenshot taken.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        verify_changes(page)
        browser.close()

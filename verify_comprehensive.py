from playwright.sync_api import sync_playwright

def verify_changes(page):
    # Verify Process Gallery on Homepage
    page.goto("http://localhost:4321/")
    page.wait_for_selector("text=Atelier & Handwerk")
    page.screenshot(path="verification_process_gallery.png")
    print("Process Gallery verification screenshot taken.")

    # Verify Detail Gallery on Werkschau
    page.goto("http://localhost:4321/werkschau")
    # Wait for the detail gallery to be visible (Impressionen & Details)
    page.wait_for_selector("text=Impressionen & Details")
    page.screenshot(path="verification_detail_gallery.png")
    print("Detail Gallery verification screenshot taken.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        verify_changes(page)
        browser.close()

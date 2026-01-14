from playwright.sync_api import sync_playwright
import time
import os

def run():
    print("Starting verification...")
    if not os.path.exists("verification"):
        os.makedirs("verification")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Use port 4322 as seen in logs
        url = "http://localhost:4322"
        print(f"Navigating to {url}")
        page.goto(url)

        # 1. Verify Exit Intent Removal
        print("Verifying Exit Intent Removal...")
        # Move mouse out
        page.mouse.move(100, 100)
        page.mouse.move(100, -10) # Exit top

        # Wait a bit
        try:
            # "Exklusiver Download" was the unique text in the modal
            # Use a short timeout because we expect it NOT to be there.
            # If it waits full 2s and fails, that's good.
            page.wait_for_selector("text=Exklusiver Download", timeout=3000, state="visible")
            print("FAILURE: Lead Magnet Modal appeared!")
        except Exception as e:
            # Timeout means it didn't find it, which is success
            print("SUCCESS: Lead Magnet Modal did not appear.")

        # 2. Verify Process Gallery Images Grayscale -> Color
        print("Verifying Process Gallery Images...")
        # Scroll to "Atelier & Handwerk" to trigger lazy load
        try:
            element = page.get_by_text("Atelier & Handwerk")
            element.scroll_into_view_if_needed()
            print("Scrolled to gallery section.")
        except:
            print("Could not find section 'Atelier & Handwerk'")

        # Wait for images to start loading (IntersectionObserver)
        time.sleep(1) # Give it a moment to render the initial state

        page.screenshot(path="verification/gallery_initial.png")
        print("Taken initial screenshot (should be grayscale).")

        # Wait for animation (6s total, let's wait 3s to see progress or 7s for full)
        time.sleep(3)
        page.screenshot(path="verification/gallery_mid.png")

        time.sleep(4)
        page.screenshot(path="verification/gallery_final.png")
        print("Taken final screenshot (should be colored).")

        browser.close()
        print("Verification script finished.")

if __name__ == "__main__":
    run()

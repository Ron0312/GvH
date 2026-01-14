from playwright.sync_api import sync_playwright, expect
import os
import re

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        # 1. Home Page - Initial State
        print("Navigating to Home...")
        page.goto("http://localhost:4321/")

        # Wait for loader to finish (animation is ~1s total + timeout 500ms)
        print("Waiting for loader...")
        page.wait_for_timeout(2000)

        # Verify Header is transparent/white text
        header = page.locator("#main-header")
        header_text = page.locator(".header-text")

        # Check classes (approximate check via class list)
        expect(header).to_have_class(re.compile(r"bg-transparent"))
        expect(header_text).to_have_class(re.compile(r"text-white"))

        print("Taking screenshot of Home Top...")
        page.screenshot(path="verification/1_home_top.png")

        # 2. Home Page - Scrolled State
        print("Scrolling...")
        page.mouse.wheel(0, 500)
        page.wait_for_timeout(1000) # Wait for transition

        # Verify Header is white/dark text
        expect(header).to_have_class(re.compile(r"bg-white/95"))
        expect(header_text).to_have_class(re.compile(r"text-\[#1A1A1A\]"))

        print("Taking screenshot of Home Scrolled...")
        page.screenshot(path="verification/2_home_scrolled.png")

        # 3. Philosophy Page - Initial State (Subpage)
        print("Navigating to Philosophy...")
        page.goto("http://localhost:4321/philosophie")
        page.wait_for_timeout(1000) # Wait for render

        # Verify Header is white/dark text IMMEDIATELY
        expect(header).to_have_class(re.compile(r"bg-white/95"))
        expect(header_text).to_have_class(re.compile(r"text-\[#1A1A1A\]"))

        # Verify Sören's Image is visible
        soren_img = page.locator("img[alt='Sören von Hoerschelmann']")
        expect(soren_img).to_be_visible()

        # Verify natural size > 0 (checking if loaded)
        box = soren_img.bounding_box()
        if box['width'] > 0 and box['height'] > 0:
            print(f"Sören image loaded: {box}")
        else:
            print("Sören image failed to load properly.")

        print("Taking screenshot of Philosophy...")
        page.screenshot(path="verification/3_philosophy.png")

        browser.close()

if __name__ == "__main__":
    if not os.path.exists("verification"):
        os.makedirs("verification")
    run()

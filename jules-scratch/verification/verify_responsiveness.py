from playwright.sync_api import sync_playwright, Page, expect

def verify_responsive_layout(page: Page):
    """
    This script verifies the responsive design of the calculator application.
    It checks the home page and a calculator page at both desktop and mobile
    resolutions to ensure the layouts adapt correctly.
    """
    # 1. Navigate to the home page and take a screenshot.
    page.goto("http://localhost:5173")
    page.screenshot(path="jules-scratch/verification/homepage-desktop.png")

    # 2. Navigate to the Length Calculator page.
    page.get_by_role("link", name="Length").click()
    expect(page).to_have_url("http://localhost:5173/calculator/length")
    page.screenshot(path="jules-scratch/verification/calculator-desktop.png")

    # 3. Change viewport to a mobile size.
    page.set_viewport_size({"width": 375, "height": 667})

    # 4. Take a screenshot of the mobile layout.
    page.screenshot(path="jules-scratch/verification/calculator-mobile.png")

    # 5. Verify that the input fields are now in a column.
    # We can check the flex-direction of the container.
    input_container = page.locator('.flex-col.sm\\:flex-row.gap-3').first
    expect(input_container).to_have_css("flex-direction", "column")

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_responsive_layout(page)
        browser.close()

if __name__ == "__main__":
    run_verification()
from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    Navigates to the app and takes a screenshot to verify UI changes.
    """
    # 1. Navigate to the application.
    # The dev server runs on port 5173 by default for vite.
    page.goto("http://localhost:5173")

    # 2. Wait for the main heading to be visible to ensure the page has loaded.
    # The heading text is "Calculator Suite".
    heading = page.get_by_role("heading", name="Calculator Suite")
    expect(heading).to_be_visible()

    # 3. Assert that the heading has the correct font size.
    # The class `text-lg` corresponds to a font size of 1.125rem which is 18px.
    # We will check the class name.
    expect(heading).to_have_class("text-lg font-bold text-gray-900")

    # 4. Assert that a primary button has the new background color.
    # The "Refresh" button in the CurrencyCalculator is a good candidate.
    refresh_button = page.get_by_role("button", name="Refresh")
    expect(refresh_button).to_be_visible()

    # We will check the class name for the new primary color.
    expect(refresh_button).to_have_class("flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed")

    # 5. Take a screenshot for visual verification.
    page.screenshot(path="jules-scratch/verification/verification.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_verification(page)
        browser.close()

if __name__ == "__main__":
    main()
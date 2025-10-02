from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    """
    Navigates to the app, verifies the new home page, and tests navigation.
    """
    # 1. Navigate to the application's home page.
    page.goto("http://localhost:5173")

    # 2. Verify that the main heading is visible.
    heading = page.get_by_role("heading", name="Calculator Suite")
    expect(heading).to_be_visible()

    # 3. Verify that the calculator cards are present.
    # We'll check for the "Currency" calculator card.
    currency_card = page.get_by_role("link", name="Currency Real-time exchange rates")
    expect(currency_card).to_be_visible()

    # 4. Take a screenshot of the home page for visual verification.
    page.screenshot(path="jules-scratch/verification/home_page.png")

    # 5. Click on the "Length" calculator card to test navigation.
    length_card = page.get_by_role("link", name="Length Distance conversions")
    length_card.click()

    # 6. Verify that the navigation was successful by checking the new page's heading.
    calculator_heading = page.get_by_role("heading", name="Length Calculator")
    expect(calculator_heading).to_be_visible()

    # 7. Take a screenshot of the calculator page.
    page.screenshot(path="jules-scratch/verification/calculator_page.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_verification(page)
        browser.close()

if __name__ == "__main__":
    main()
from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Navigate to the homepage and take a screenshot.
    page.goto("http://localhost:5173/")
    page.screenshot(path="jules-scratch/verification/homepage.png")
    print("Homepage screenshot captured.")

    # 2. Find and click the "Length" calculator card.
    length_card = page.get_by_role("link", name="Length Distance conversions")
    expect(length_card).to_be_visible()
    length_card.click()
    print("Clicked on the Length calculator card.")

    # 3. Wait for the new page and take a screenshot of the calculator page.
    expect(page).to_have_url("http://localhost:5173/calculator/length")
    expect(page.get_by_role("heading", name="Length Calculator")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/calculator_page.png")
    print("Calculator page screenshot captured.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
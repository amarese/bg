from playwright.sync_api import Playwright, sync_playwright, expect
def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    # Open new page
    page = context.new_page()
    # Go to https://dhlottery.co.kr/
    page.goto("https://dhlottery.co.kr/common.do?method=main")
    # Click #article
    # Click [placeholder="아이디"]
    
    page.locator("text=로그인").click()

    page.locator("[placeholder=\"아이디\"]").click()
    # Fill [placeholder="아이디"]
    page.locator("[placeholder=\"아이디\"]").fill("etrlove8")
    # Click [placeholder="비밀번호"]
    page.locator("[placeholder=\"비밀번호\"]").click()
    # Fill [placeholder="비밀번호"]
    page.locator("[placeholder=\"비밀번호\"]").fill("15751!ace")
    # Click form[name="jform"] >> text=로그인
    # with page.expect_navigation(url="https://dhlottery.co.kr/common.do?method=popupOne&txtNo=14287"):
    with page.expect_navigation():
        page.locator("form[name=\"jform\"] >> text=로그인").click()
    # expect(page).to_have_url("https://www.dhlottery.co.kr/common.do?method=loginResult")
    # Click text=퀵메뉴열기 미수령당첨금 나의복권건전지수 건전구매캠페인 건전구매서약 자기관리프로그램 동행클린센터 동행히어로 위로가기
    page.locator("text=퀵메뉴열기 미수령당첨금 나의복권건전지수 건전구매캠페인 건전구매서약 자기관리프로그램 동행클린센터 동행히어로 위로가기").click()
    # Click text=복권구매
    page.locator("text=복권구매").click()
    # Click text=로또 6/45매주 토요일 추첨6개 숫자 직접 선택
    with page.expect_popup() as popup_info:
        page.locator("text=로또 6/45매주 토요일 추첨6개 숫자 직접 선택").click()
    page6 = popup_info.value
    # Click text=나의로또번호
    page6.frame_locator("iframe[name=\"ifrm_tab\"]").locator("text=나의로또번호").click()
    # Check input[name="checkNumberMy"] >> nth=0
    page6.framepol_locator("iframe[name=\"ifrm_tab\"]").locator("input[name=\"checkNumberMy\"]").first.check()
    # Check input[name="checkNumberMy"] >> nth=1
    page6.frame_locator("iframe[name=\"ifrm_tab\"]").locator("input[name=\"checkNumberMy\"]").nth(1).check()
    # Click input[name="btnMyNumber"]
    page6.frame_locator("iframe[name=\"ifrm_tab\"]").locator("input[name=\"btnMyNumber\"]").click()
    
    # ---------------------

    page6.frame_locator("iframe[name=\"ifrm_tab\"]").locator("input:has-text(\"구매하기\")").click()

    page6.frame_locator("iframe[name=\"ifrm_tab\"]").locator("#popupLayerConfirm >> text=확인").click()
    context.close()
    browser.close()
with sync_playwright() as playwright:
    run(playwright)

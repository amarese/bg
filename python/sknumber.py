from time import sleep
from playwright.sync_api import Playwright, sync_playwright, expect
from random import randrange
import jhconstants

def run(#playwright: Playwright, 
        numOfRet : int) -> list[str]:
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=False)
            context = browser.new_context()
            # Open new page
            page = context.new_page()
            # Go to http://www.tworld.co.kr/poc/common/loginout/view/login_page.jsp?returnURL=https%3A%2F%2Fwww.tworld.co.kr%3A443%2Fnormal.do%3FserviceId%3DS_PHON0014%26viewId%3DV_CENT0131
            page.goto("http://www.tworld.co.kr/poc/common/loginout/view/login_page.jsp?returnURL=https%3A%2F%2Fwww.tworld.co.kr%3A443%2Fnormal.do%3FserviceId%3DS_PHON0014%26viewId%3DV_CENT0131")
            # Go to https://auth.skt-id.co.kr/auth/authorize.do?client_id=2590d318-0816-4a4c-bc2f-a2e24a319459&client_secret=eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIn0.DLf4Y-xyE7iPoMp9j0-0EtqM8EVNuI9_HoX-aicIc3UubW7MN19REA.HreXWawA-otCJuwT.tSzm_O_Ef1PrahHzfbVsMpty2ScSAXTak9tiPgJc_Q_aQrJ96zB-PM6od15m44-NhoLFqwhX9mdeZ3_fmdLfiA.V4wFlH60WlDCqCPmhlOr9Q&client_type=WEB&redirect_uri=http://www.tworld.co.kr/poc/tid/tid_request.jsp&scope=openid&response_type=id_token%20token&popup_request_yn=N&internal_proc_yn=Y&service_type=14&state=e87eff179d0d&nonce=379d12a614683&chnl_q=cmV0dXJuVVJMPWh0dHBzJTNBJTJGJTJGd3d3LnR3b3JsZC5jby5rciUzQTQ0MyUyRm5vcm1hbC5kbyUzRnNlcnZpY2VJZCUzRFNfUEhPTjAwMTQlMjZ2aWV3SWQlM0RWX0NFTlQwMTMxJnBvcHVwPU4
            #page.goto("https://auth.skt-id.co.kr/auth/authorize.do?client_id=2590d318-0816-4a4c-bc2f-a2e24a319459&client_secret=eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIn0.DLf4Y-xyE7iPoMp9j0-0EtqM8EVNuI9_HoX-aicIc3UubW7MN19REA.HreXWawA-otCJuwT.tSzm_O_Ef1PrahHzfbVsMpty2ScSAXTak9tiPgJc_Q_aQrJ96zB-PM6od15m44-NhoLFqwhX9mdeZ3_fmdLfiA.V4wFlH60WlDCqCPmhlOr9Q&client_type=WEB&redirect_uri=http://www.tworld.co.kr/poc/tid/tid_request.jsp&scope=openid&response_type=id_token%20token&popup_request_yn=N&internal_proc_yn=Y&service_type=14&state=e87eff179d0d&nonce=379d12a614683&chnl_q=cmV0dXJuVVJMPWh0dHBzJTNBJTJGJTJGd3d3LnR3b3JsZC5jby5rciUzQTQ0MyUyRm5vcm1hbC5kbyUzRnNlcnZpY2VJZCUzRFNfUEhPTjAwMTQlMjZ2aWV3SWQlM0RWX0NFTlQwMTMxJnBvcHVwPU4")
            # Click [placeholder="T아이디\(휴대폰\, 이메일\) 또는 T world 아이디"]
            page.locator("[placeholder=\"T아이디\\(휴대폰\\, 이메일\\) 또는 T world 아이디\"]").click()
            # Fill [placeholder="T아이디\(휴대폰\, 이메일\) 또는 T world 아이디"]
            page.locator("[placeholder=\"T아이디\\(휴대폰\\, 이메일\\) 또는 T world 아이디\"]").fill("eternitier")
            # Press Tab
            page.locator("[placeholder=\"비밀번호\"]").click()
            # Fill [placeholder="비밀번호"]
            page.locator("[placeholder=\"비밀번호\"]").fill(jhconstants.SKPW)
            # Click #authLogin
            # with page.expect_navigation(url="https://www.tworld.co.kr/normal.do?serviceId=S_PHON0014&viewId=V_CENT0131"):
            with page.expect_navigation():
                page.locator("#authLogin").click()
            sleep(3)
            # Go to https://www.tworld.co.kr/normal.do?serviceId=SDUMMY0001&viewId=V_MEMB7002&requestType=gnb&siteCd=TWD
            page.goto("https://www.tworld.co.kr/normal.do?serviceId=SDUMMY0001&viewId=V_MEMB7002&requestType=gnb&siteCd=TWD")
            # Click a:has-text("변경")
            page.locator("a:has-text(\"변경\")").click()
            # expect(page).to_have_url("https://www.tworld.co.kr/normal.do?serviceId=SDUMMY0001&viewId=V_CMN_0061")
            # Go to https://www.tworld.co.kr/normal.do?serviceId=S_PHON0014&viewId=V_CENT0131
            retVal = []

            for i in range(numOfRet):
                page.goto("https://www.tworld.co.kr/normal.do?serviceId=S_PHON0014&viewId=V_CENT0131")
                # Click input[name="line_num_from"]
                page.locator("input[name=\"line_num_from\"]").click()
                # Fill input[name="line_num_from"]
                startNum = int(randrange(8899))+1000
                endNum = startNum + 100
                page.locator("input[name=\"line_num_from\"]").fill(str(startNum))
                # Click input[name="line_num_to"]
                page.locator("input[name=\"line_num_to\"]").click()
                # Fill input[name="line_num_to"]
                page.locator("input[name=\"line_num_to\"]").fill(str(endNum))
                # Click #submitBtn1
                page.locator("#submitBtn1").click()
                # expect(page).to_have_url("https://www.tworld.co.kr/normal.do?serviceId=S_PHON0014&viewId=V_CENT0131")
                # ---------------------
                retVal.append("010-"+page.locator("[for='pnum"+str(10*i)+"']").inner_html())

            context.close()
            browser.close()
            return retVal
    except:
        print('error')
        return []

if __name__ == "__main__":
    #with sync_playwright() as playwright:
        newNumber = run(5)
        print(newNumber)
        input()

from time import sleep
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.common.alert import Alert
import chromedriver_autoinstaller
import telegram
import chromedriver_autoinstaller
path = chromedriver_autoinstaller.install(cwd=True)

chromeOptions = webdriver.ChromeOptions()
#chromeOptions.add_argument("headless")
browser = webdriver.Chrome(#executable_path=path,
                                    options=chromeOptions)
wait = WebDriverWait(browser, 10)

#browser = webdriver.Chrome(ChromeDriverManager().install())
browser.get("https://etk.srail.kr/cmc/01/selectLoginForm.do?pageId=TK0701000000")
radioBoxPhone = browser.find_element_by_id('srchDvCd3')
radioBoxPhone.click()
browser.execute_script("document.getElementById('srchDvNm03').value='010-8998-9272'")
browser.execute_script("document.getElementById('hmpgPwdCphd03').value='15751!abc'")
browser.execute_script("document.getElementsByClassName('submit')[2].click()")

browser.get("https://etk.srail.kr/hpg/hra/01/selectScheduleList.do?pageId=TK0101010000")

# move page to https://etk.srail.kr/hpg/hra/01/selectScheduleList.do?pageId=TK0101010000

while True:
    sleep(1)
    try:
        targetTime = 13
        if targetTime>9:
            cmd = "document.getElementById('dptDt').selectedIndex=2;document.getElementById('dptTm').children[0].value='"+str(targetTime)+"0000'"
        else:
            cmd = "document.getElementById('dptDt').selectedIndex=2;document.getElementById('dptTm').children[0].value='0"+str(targetTime)+"0000'"
        browser.execute_script(cmd)
        cmd = "document.getElementById('dptTm').children[0].setAttribute('selected','selected')"
        browser.execute_script(cmd)

        cmd="document.getElementsByClassName('wx200')[0].click()"
        browser.execute_script(cmd)

        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'btn_burgundy_dark')))

        btnBurgandyDark = browser.find_elements_by_class_name('btn_burgundy_dark')
        done = False
        for btnTemp in btnBurgandyDark:
            if btnTemp.get_attribute('onclick')==None:
                continue
            if btnTemp.get_attribute('onclick').find("requestReservationInfo(this, 0,")>=0:
                btnTemp.click()
                done = True
                break
        if done == True:
            break
    except:
        browser.get("https://etk.srail.kr/hpg/hra/01/selectScheduleList.do?pageId=TK0101010000")


wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'btn_blue_dark')))
    
cmd = "settleAmount()"
browser.execute_script(cmd)


chat_token = "942328115:AAFDAj7ghqSH2izU12fkYHtV7PMDhxrGnhc"
chat = telegram.Bot(token = chat_token)
chat_id = 763073279
chat.sendMessage(chat_id = chat_id, text="결제")


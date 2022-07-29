import datetime
from time import sleep
from pytest import ExitCode
from selenium import webdriver
#from webdriver_manager.chrome import ChromeDriverManager
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
import sys
#import chromedriver_autoinstaller
path = chromedriver_autoinstaller.install(cwd=True)
from tkinter.simpledialog import *

debugMode = False
cities = ['수서','동탄','평택지제','천안아산','오송','대전','김천','동대구','서대구','신경주','울산(통도사)','부산','익산','정읍','광주송정','나주','목포']
weekdayArr = ['월','화','수','목','금','토','일']
browser = None
targetDate = None
srcLoc = None
descLoc = None
searchTime = None
while True:
    if debugMode == True:
        phoneNumber = '010-8998-9272'
        password = ""
        srcLoc = '대전'
        descLoc = '동탄'
        targetDate = '2022-06-13'
        searchTime = 8
    else:
        phoneNumber = None
        while True:
            phoneNumber = askstring('ID','전화번호를 입력하세요. (010-1345-6789)')
            if phoneNumber == None:
                sys.exit()
            if len(phoneNumber)!=13:
                continue
            if phoneNumber[0:3] != '010':
                continue
            if phoneNumber[3]!='-' or phoneNumber[8] != '-':
                continue
            if phoneNumber[4:8].isdecimal() == False:
                continue
            if phoneNumber[9:].isdecimal() == False:
                continue
            break

        password = askstring('Password','비밀번호를 입력하세요.')    
        if password == None:
            sys.exit()

        if targetDate == None:
            while True:
                targetDate = askstring('날짜','예약할 날짜를 입력하세요. (2022-05-07)')
                if targetDate == None:
                    sys.exit()
                if len(targetDate)!=10:
                    continue
                if targetDate[0:4].isdecimal == False:
                    continue
                if int(targetDate[0:4]) < 2022:
                    continue
                if targetDate[4]!='-' or targetDate[7] != '-':
                    continue
                if targetDate[5:7].isdecimal() == False:
                    continue
                if int(targetDate[5:7])>12 or int(targetDate[5:7]) < 1:
                    continue
                if targetDate[8:].isdecimal() == False:
                    continue
                if int(targetDate[8:])>31 or int(targetDate[8:]) < 1:
                    continue
                break
        if searchTime == None:
            while True:
                searchTime = askinteger('시간','검색할 시간을 입력하세요.')
                if searchTime == None:
                    sys.exit()
                if searchTime > 24 or searchTime <0:
                    continue
                break
        if srcLoc == None:
            while True:
                srcLoc= askstring('출발지','출발 장소를 입력하세요.')
                if srcLoc == None:
                    sys.exit()
                if srcLoc not in cities:
                    continue
                break
        if descLoc == None:
            while True:
                descLoc= askstring('도착지','도착 장소를 입력하세요.')
                if descLoc == None:
                    sys.exit()
                if descLoc not in cities:
                    continue
                if srcLoc == descLoc :
                    continue
                break    

    

    dateXpath = "//option[. = '" + targetDate.replace('-','/') + "(" + \
        weekdayArr[datetime.datetime.fromisoformat(targetDate).weekday()] +\
        ")']"

    
    #chromeOptions.add_argument("headless")
    if browser == None:
        chromeOptions = webdriver.ChromeOptions()
        browser = webdriver.Chrome( executable_path=path,
                                        options=chromeOptions)
        wait = WebDriverWait(browser, 10)
    

    #browser = webdriver.Chrome(ChromeDriverManager().install())
    ### log in routine start
    browser.get("https://etk.srail.kr/cmc/01/selectLoginForm.do?pageId=TK0701000000")
    wait.until(EC.element_to_be_clickable((By.ID, 'srchDvCd3')))
    radioBoxPhone = browser.find_element_by_id('srchDvCd3')
    radioBoxPhone.click()
    strCmd = "document.getElementById('srchDvNm03').value='"+phoneNumber+"'"
    browser.execute_script(strCmd)
    strCmd = "document.getElementById('hmpgPwdCphd03').value='"+password+"'"
    browser.execute_script(strCmd)
    ### log in routine end

    try : 
        browser.execute_script("document.getElementsByClassName('submit')[2].click()")
        # log in failed
        result = browser.switch_to.alert
        result.accept()
    except:
        # log in success
        break

debugCount = 0
targetTd = None
while True:
    try:
        while True:
            try:
                debugCount+=1
                browser.get("https://etk.srail.kr/hpg/hra/01/selectScheduleList.do?pageId=TK0101010000")
                wait.until(EC.presence_of_element_located((By.ID,"dptRsStnCdNm")))

                browser.find_element(By.ID, "dptRsStnCdNm").clear()
                browser.find_element(By.ID, "dptRsStnCdNm").send_keys(srcLoc)
                browser.find_element(By.ID, "arvRsStnCdNm").clear()
                browser.find_element(By.ID, "arvRsStnCdNm").send_keys(descLoc)
                dropdown = browser.find_element(By.ID, "dptDt")
                dropdown.find_element(By.XPATH, dateXpath).click()
                
                # if debugCount == 3:
                #     searchTime = 13
                
                cmd = "document.getElementById('dptTm').selectedIndex=0;document.getElementById('dptTm').children[0].value='"+str(searchTime)+"0000'"
                if searchTime < 10:
                    cmd = "document.getElementById('dptTm').selectedIndex=0;document.getElementById('dptTm').children[0].value='0"+str(searchTime)+"0000'"
                browser.execute_script(cmd)
                
                browser.find_element(By.CSS_SELECTOR, ".btn_large").click()

                wait.until(EC.presence_of_element_located((By.XPATH, "//tr[1]/td[7]")))
                targetTd = browser.find_element(By.XPATH, "//tr[1]/td[7]")
                if targetTd.text != '매진':
                    break
                
            except:    
                print('redo')
                

        wait.until(EC.element_to_be_clickable((By.XPATH, "//tr[1]/td[7]/a")))
        browser.find_element(By.XPATH, "//tr[1]/td[7]/a").click()


        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '.btn_blue_dark > span')))
        browser.find_element(By.CSS_SELECTOR, '.btn_blue_dark > span').click()
        break
    
    except:
        print("redo out")            

chat_token = "942328115:AAFDAj7ghqSH2izU12fkYHtV7PMDhxrGnhc"
chat = telegram.Bot(token = chat_token)
chat_id = 763073279
chat.sendMessage(chat_id = chat_id, text="결제")

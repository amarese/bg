ATCOMPANY = True
DEBUG = True

from datetime import date, timedelta
from time import sleep
from tkinter.messagebox import askquestion, askyesno
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.common.keys import Keys
import telegram
import sys
from tkinter.simpledialog import *
from random import randrange
from selenium.webdriver.common.action_chains import ActionChains
import gspread
import datetime


def getReverse(val:str):
    MASK = []
    seed = 13
    for _ in range(10):
        seed = seed * 521
        MASK.append(seed %256)
    ret = ""
    idx = 0
    for c in val:
        ret += chr(ord(c)^MASK[idx])
        idx += 1
        if idx == len(MASK):
            idx = 0
    return ret


def LoginPayco(browser:webdriver.Chrome, wait:WebDriverWait, id:str, passwd:str) -> None:
    browser.get("https://www.payco.com/")
    wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "로그인")))
    browser.find_element(By.LINK_TEXT, "로그인").click()
    for handle in browser.window_handles:
        browser.switch_to.window(handle)
        if browser.title=='로그인':
            break
    
    wait.until(EC.element_to_be_clickable((By.ID, "loginBtn")))
    browser.find_element(By.ID, "id").clear()
    browser.find_element(By.ID, "id").send_keys(id)
    browser.find_element(By.ID, "pw").clear()
    browser.find_element(By.ID, "pw").send_keys(getReverse(passwd))
    browser.find_element(By.ID, "persistLoginYnIco").click()
    browser.find_element(By.ID, "loginBtn").send_keys(Keys.ENTER)
    
    for handle in browser.window_handles:
        browser.switch_to.window(handle)
        break

    
def getDis(time1, time2):
    if time1<time2:
        return time2-time1
    return time1-time2
    
def reserveXpho(browser:webdriver.Chrome, wait:WebDriverWait,
                themaName:str, storeName:str, reserveDate:str, reserveTime:str, 
                reserveName:str, reservePb:str, reservePw:str,  reserveEmail:str = None) -> None:
    
    if reserveEmail == None:
        emCom = "@naver.com"
        if randrange(2)==0:
            emCom = "@google.com"
        reserveEmail = reservePb + emCom
    
    browser.maximize_window()
    browser.get("https://www.xphobia.net/reservation/reservation_check.php")
    
    wait.until(EC.element_to_be_clickable((By.ID, "cate_3")))
    browser.find_element(By.ID, "cate_3").click()
    wait.until(EC.element_to_be_clickable((By.ID, storeName))) # 강남던전
    browser.find_element(By.ID, storeName).click()


    jsCommand = "document.getElementsByClassName('input_date')[0].value='"+reserveDate+"'"
    browser.execute_script(jsCommand)
    wait.until(EC.element_to_be_clickable((By.ID, themaName)))
    browser.find_element(By.ID, themaName).click()

    
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "#cl3 > li")))
    timeLists = browser.find_element(By.ID, "cl3").find_elements(By.CSS_SELECTOR,"li")
    targetTime = datetime.datetime.strptime(reserveTime,"%H:%M")
    bestGap = None
    bestBtn = None
    for timeBtn in timeLists:
        tempTime = datetime.datetime.strptime(timeBtn.get_attribute('id'),"%H:%M")
        if timeBtn.get_attribute('class') == "":
            curGap = getDis(tempTime, targetTime)
            if bestBtn == None or curGap < bestGap:
                bestBtn = timeBtn
                bestGap = curGap
                
                
            
    if bestBtn == None:
        askyesno("실패","가능한 시간 없음")
        return
    
    reserveTime = bestBtn.get_attribute('id')
    bestBtn.click()

    
    jsCommand = "submitNext()"
    browser.execute_script(jsCommand)

    # 2nd page
    wait.until(EC.element_to_be_clickable((By.ID, "agree")))
    jsCommand="document.getElementById('agree').checked=true;javascript:guest_submit(document.flogin);"
    browser.execute_script(jsCommand)
    
    
    #third page
    
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME,"btn_submit")))
    ppoid = browser.find_element(By.NAME,"pp_oid").get_attribute('value')

    nameText = browser.find_element(By.ID,"event_disc")
    browser.execute_script("arguments[0].scrollIntoView();", nameText)

    jsCommand="document.getElementById('rena').value='"+reserveName+"';\
        document.getElementById('reph').value='"+reservePb+"';\
        document.getElementById('remd').value='"+reserveEmail+"';\
        document.getElementsByName('te_pass')[0].type='text';\
        document.getElementsByName('te_pass')[0].value='"+str(reservePw)+"';\
        document.getElementById('od_settle_card').checked=true;\
        document.getElementById('terms1').checked=true;\
        document.getElementById('terms2').checked=true;"

    browser.execute_script(jsCommand)
    
    tempReserveTime = reserveTime.replace(":","")
    with open('page_'+f"{reserveDate}_{themaName}_{tempReserveTime}_"+'.txt', 'a+', -1, 'utf-8') as f:
        f.write(f"{reserveDate}\t{reserveTime}\t{themaName}\t{reserveName}\t{reservePb}\t{reserveEmail}\t{reservePw}\t{ppoid}")

    if ATCOMPANY  == False:
        chat_token = "942328115:AAFDAj7ghqSH2izU12fkYHtV7PMDhxrGnhc"
        chat = telegram.Bot(token = chat_token)
        chat_id = 763073279
        chat.sendMessage(chat_id = chat_id, text=f"{reserveDate}\t{reserveTime}\t{themaName}\t{reserveName}\t{reservePb}\t{reserveEmail}\t{reservePw}\t{ppoid}")
    
        gc = gspread.service_account(filename="C:/Users/abcde/vscode/bg/bg/python/key.json")
        sh = gc.open("비트포비아양도").worksheet("비트")
        rowIdx = 1
        while len(sh.get('F'+str(rowIdx))) != 0:
            rowIdx += 1
        sh.update('F'+str(rowIdx),reserveDate)
        sh.update('G'+str(rowIdx),reserveTime)
        sh.update('J'+str(rowIdx),reserveName)
        sh.update('K'+str(rowIdx),reservePb)
        sh.update('L'+str(rowIdx),reservePw)
        sh.update('O'+str(rowIdx),ppoid)
        
    
    respond = askyesno('확인', f"{reserveDate}\t{reserveTime}\t{themaName}\t{reserveName}\t{reservePb}\t{reservePw}\t{ppoid}")
    while respond == False:
        respond = askyesno('종료', '종료?')
        if respond == True:
            return
        respond = askyesno('확인', f"{reserveDate}\t{reserveTime}\t{themaName}\t{reserveName}\t{reservePb}\t{reservePw}\t{ppoid}")
    
    
    
    browser.find_element(By.CLASS_NAME,"btn_submit").click()
    
    wait(EC.presence_of_element_located((By.CSS_SELECTOR,'iframe')))
    browser.switch_to.frame(browser.find_element(By.CSS_SELECTOR,'iframe').get_attribute('name'))

    
    
    wait.until(EC.element_to_be_clickable((By.ID,"inputAll")))
    browser.find_element(By.ID,"inputAll").click()
    
'''
    id=inputAll
    xpath=//a[@id='payCode20']/img
    
    xpath=//a/span[2]

css=#pgCardList_nextBtn > .sp

id=btnPayment
'''
    


if __name__ == "__main__":
    
    chromeOptions = webdriver.ChromeOptions()
    browser = webdriver.Chrome( #executable_path=path,
                                    options=chromeOptions)
    wait = WebDriverWait(browser, 10)
    
    LoginPayco(browser, wait, "cutehanjh@gmail.com", "F)2\x15´\\F(ß4\x1b")
    reserveXpho(browser=browser, wait=wait, themaName='강남목욕탕',storeName='강남 던전',reserveName='이성훈',
                reservePb='01051233215', reservePw='123456', reserveDate='20220625',reserveTime='12:30')
    
    
    
    

    
    themaNames = ['화생설화 : Blooming','강남목욕탕','대호시장 살인사건','전래동 : 자살사건']
    storeNames = ['던전101','강남 던전','강남 던전','던전101']

    if DEBUG == False:

        idx = 0
        for i in range(len(themaNames)):
            answer = askyesno('테마',themaNames[i])    
            if answer== True:
                idx = i
                break

        themaName = themaNames[idx]
        storeName = storeNames[idx]
        reserveName = None
        reservePb = None
        reserveDate = None
        reserveTime = None
        weekend = askyesno("주말","이번주 주말")
        if weekend == True:
            saturday = askyesno("토요일","토요일")
            targetWeekDay = 5
            if saturday == False:
                targetWeekDay = 6
            todayWeekDay = date.today().weekday()
            timeDelta = (targetWeekDay - todayWeekDay+ 7) % 7
            reserveDate = date.today() + timedelta(days=timeDelta)
        else:
            while True:
                reserveDate = askstring("날짜","날짜 (ex. 20220601)")        
                breakLoop = askyesno("확인",f"날짜:{reserveDate}")
                if breakLoop == True:
                    break
            
        autoMode = askyesno("자동모드","자동모드로 실행")
        if autoMode == False:
            while True:
                reserveName = askstring('이름','이름 (ex. 홍길동)')
                reservePb = askstring('폰번호',"폰번호 (ex. 01012345678)")
                reserveTime = askstring('시간','시간 (ex. 11:20)')
                breakLoop = askyesno('확인',f'이름:{reserveName} 폰:{reservePb} 시간:{reserveTime}')
                if breakLoop == True:
                    break
                
            

    if company == False:
        import chromedriver_autoinstaller
        path = chromedriver_autoinstaller.install(cwd=True)


    bkNumbers = ["010-4504-8751", "010-4735-5642", "010-5421-5617", "010-4791-8761",
    "010-8621-1297", "010-8578-1283", "010-6296-8743", "010-9235-3491", "010-4756-3491",
    "010-8519-1292", "010-4712-8742", "010-8946-5627", "010-9374-3491", "010-8723-1286",
    "010-8617-8764", "010-6379-3496", "010-4746-3491", "010-7189-1286", "010-9147-5614",
    "010-4841-8749", "010-6429-5614", "010-9187-5639", "010-5463-1295", "010-9287-3497",
    "010-4680-8751", "010-6471-8746", "010-5491-1284", "010-5381-1297", "010-8936-3463",
    "010-6429-8743", "010-4876-1297", "010-9436-8742", "010-7192-1274", "010-6491-1291",
    "010-8615-1275", "010-5374-8758", "010-5419-8746", "010-8906-5617", "010-4581-1294",
    "010-8954-3493", "010-9279-8743", "010-4912-8752", "010-8653-3471", "010-4926-5642",
    "010-9180-1286", "010-4819-1281", "010-9416-5609", "010-6460-1291", "010-4592-8743",
    "010-9167-3473", "010-4714-1281", "010-4852-8743", "010-6359-1273", "010-6489-3498",
    "010-4790-5618", "010-4631-8762", "010-9374-3463", "010-8594-8743", "010-4796-3491",
    "010-4946-5619", "010-8903-8749", "010-5437-5603"]

    familyNames = ['김', '이', '박', '최', '한', '정', '송', '정', '현']

    frequentNames = ["가윤", "강민", "규리", "규민", "나윤", "나은", "다온", "다윤", "다은",
    "도연", "도윤", "도현", "동현", "민아", "서연", "서우", "서은", "서준", "서진", "서하",
    "서현", "선우", "성민", "성준", "성현", "소민", "소율", "수민", "수빈", "수아", "수연",
    "수현", "수호", "승민", "승아", "승우", "승준", "승현", "시아", "시온", "시우", "시현",
    "아영", "아윤", "아인", "연서", "예나", "예림", "예빈", "예서", "예성", "예지", "예진",
    "우진", "유주", "유찬", "윤아", "윤우", "윤재", "윤호", "은서", "은성", "은채", "은호",
    "재민", "재원", "재윤", "재현", "주아", "주원", "주하", "준서", "준수", "준영", "준혁",
    "준호", "준희", "지민", "지수", "지아", "지안", "지연", "지완", "지우", "지원", "지율",
    "지은", "지한", "지현", "지환", "지후", "지훈", "진우", "채린", "채원", "채은", "태민",
    "태현", "하연", "하율", "현서", "현우", "혜원"]

    if reservePb == None:
        reservePb = bkNumbers[randrange(len(bkNumbers))].replace("-","")
    if reserveName == None:
        reserveName = familyNames[randrange(len(familyNames))] + frequentNames[randrange(len(frequentNames))]

   
    print("Done")
    input()

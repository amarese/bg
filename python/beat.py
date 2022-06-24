import jhconstants
from datetime import date, timedelta
from multiprocessing.dummy import active_children
from time import sleep
from tkinter.messagebox import askquestion, askyesno
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
import gspread
import datetime

import jhmodule
from jhmodule import JHSelenium

import pyautogui
from python_imagesearch.imagesearch import imagesearch


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


def LoginPayco(JHM: JHSelenium, id:str, passwd:str) -> None:
    browser.get("https://www.payco.com/")
    JHM.waitAndClick(By.LINK_TEXT,"로그인",)
#    wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "로그인")))
#    browser.find_element(By.LINK_TEXT, "로그인").click()
    for handle in JHM.browser.window_handles:
        JHM.browser.switch_to.window(handle)
        if JHM.browser.title=='로그인':
            break
    
    JHM.wait.until(EC.element_to_be_clickable((By.ID, "loginBtn")))
    JHM.browser.find_element(By.ID, "id").clear()
    JHM.browser.find_element(By.ID, "id").send_keys(id)
    JHM.browser.find_element(By.ID, "pw").clear()
    JHM.browser.find_element(By.ID, "pw").send_keys(getReverse(passwd))
    JHM.browser.find_element(By.ID, "persistLoginYnIco").click()
    JHM.browser.find_element(By.ID, "loginBtn").send_keys(Keys.ENTER)
    
    for handle in JHM.browser.window_handles:
        JHM.browser.switch_to.window(handle)
        break

    
def getDis(time1, time2):
    if time1<time2:
        return time2-time1
    return time1-time2
    
def reserveXpho(JHM:JHSelenium, themaName:str, storeName:str, reserveDate:str, reserveTime:str, 
                reserveName:str, reservePb:str, reservePw:str,  recurTry:bool, reserveEmail:str = None) -> None:
    while True:
        try:
    
            if reserveEmail == None:
                emCom = "@naver.com"
                if randrange(2)==0:
                    emCom = "@google.com"
                reserveEmail = reservePb + emCom
            
            #browser.maximize_window()
            JHM.browser.get("https://www.xphobia.net/reservation/reservation_check.php")
            
            JHM.waitAndClick(By.ID, "cate_3")
            JHM.waitAndClick(By.ID, storeName)

            jsCommand = "document.getElementsByClassName('input_date')[0].value='"+reserveDate+"'"
            JHM.browser.execute_script(jsCommand)
            
            bLoop = True
            while bLoop:
                JHM.waitAndClick(By.ID, themaName)
                    
                JHM.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "#cl3 > li")))
                timeLists = JHM.browser.find_element(By.ID, "cl3").find_elements(By.CSS_SELECTOR,"li")
                targetTime = datetime.datetime.strptime(reserveTime,"%H:%M")
                bestGap = None
                bestBtn = None
                for timeBtn in timeLists:
                    tempTime = datetime.datetime.strptime(timeBtn.get_attribute('id'),"%H:%M")
                    curGap = getDis(tempTime, targetTime)
                    if bestBtn == None or curGap < bestGap:
                        bestBtn = timeBtn
                        bestGap = curGap
                        
                
                if bestBtn.get_attribute('class') != "":
                    if recurTry == True:
                        reserveTime = bestBtn.get_attribute('id')
                        while True:
                            JHM.waitAndClick(By.ID, themaName)
                            JHM.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "#cl3 > li")))
                            bestBtn=JHM.browser.find_element(By.ID,reserveTime)
                            if bestBtn.get_attribute('class') == "":
                                break
                            sleep(0.5)
                            
                    else:
                        JHM.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "#cl3 > li")))
                        timeLists = JHM.browser.find_element(By.ID, "cl3").find_elements(By.CSS_SELECTOR,"li")
                        targetTime = datetime.datetime.strptime(reserveTime,"%H:%M")
                        bestGap = None
                        bestBtn = None
                        for timeBtn in timeLists:
                            tempTime = datetime.datetime.strptime(timeBtn.get_attribute('id'),"%H:%M")
                            curGap = getDis(tempTime, targetTime)
                            if timeBtn.get_attribute('class') == "" and (bestBtn == None or curGap < bestGap):
                                bestBtn = timeBtn
                                bestGap = curGap

                
                    
                if bestBtn.get_attribute('class') != "":
                    askyesno("실패","가능한 시간 없음")
                    return
                
                reserveTime = bestBtn.get_attribute('id')
                bestBtn.click()


                JHM.waitAndClick(By.CLASS_NAME,"next_btn")
                try:
                    al = JHM.browser.switch_to.alert
                    al.accept()
                except:
                    bLoop = False
            
                
                
            #jsCommand = "submitNext()"
            #JHM.browser.execute_script(jsCommand)

            # 2nd page
            JHM.wait.until(EC.element_to_be_clickable((By.ID, "agree")))
            jsCommand="document.getElementById('agree').checked=true;javascript:guest_submit(document.flogin);"
            browser.execute_script(jsCommand)
            
            
            #third page
            
            JHM.wait.until(EC.element_to_be_clickable((By.CLASS_NAME,"btn_submit")))
            ppoid = browser.find_element(By.NAME,"pp_oid").get_attribute('value')

            nameText = JHM.browser.find_element(By.ID,"event_disc")
            JHM.browser.execute_script("arguments[0].scrollIntoView();", nameText)

            jsCommand="document.getElementById('rena').value='"+reserveName+"';\
                document.getElementById('reph').value='"+reservePb+"';\
                document.getElementById('remd').value='"+reserveEmail+"';\
                document.getElementsByName('te_pass')[0].type='text';\
                document.getElementsByName('te_pass')[0].value='"+str(reservePw)+"';\
                document.getElementById('od_settle_card').checked=true;\
                document.getElementById('terms1').checked=true;\
                document.getElementById('terms2').checked=true;"

            JHM.browser.execute_script(jsCommand)
            
            tempReserveTime = reserveTime.replace(":","")
            with open('page_'+f"{reserveDate}_{themaName}_{tempReserveTime}_"+'.txt', 'a+', -1, 'utf-8') as f:
                f.write(f"{reserveDate}\t{reserveTime}\t{themaName}\t{reserveName}\t{reservePb}\t{reserveEmail}\t{reservePw}\t{ppoid}")

            if jhconstants.ATCOMPANY  == False:
                chat_token = "942328115:AAFDAj7ghqSH2izU12fkYHtV7PMDhxrGnhc"
                chat = telegram.Bot(token = chat_token)
                chat_id = 763073279
                chat.sendMessage(chat_id = chat_id, text=f"{reserveDate}\t{reserveTime}\t{themaName}\t{reserveName}\t{reservePb}\t{reserveEmail}\t{reservePw}\t{ppoid}")
            
            if recurTry == False:
                respond = askyesno('확인', f"{reserveDate}\t{reserveTime}\t{themaName}\t{reserveName}\t{reservePb}\t{reservePw}\t{ppoid}")
                while respond == False:
                    respond = askyesno('종료', '종료?')
                    if respond == True:
                        return
                    respond = askyesno('확인', f"{reserveDate}\t{reserveTime}\t{themaName}\t{reserveName}\t{reservePb}\t{reservePw}\t{ppoid}")
            
            
            
            JHM.waitAndClick(By.CLASS_NAME,"btn_submit")
            
            JHM.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR,'iframe')))
            JHM.browser.switch_to.frame(JHM.browser.find_element(By.CSS_SELECTOR,'iframe').get_attribute('name'))

            
            
            JHM.waitAndClick(By.ID,"inputAll")
            
            JHM.waitAndClick(By.XPATH,"//a[@id='payCode20']")
            
            JHM.waitAndClick(By.XPATH,"//a/span[2]")
            
            curLoop = True
            while curLoop:
                for handle in JHM.browser.window_handles:
                    JHM.browser.switch_to.window(handle)
                    if JHM.browser.title=='PAYCO':
                        curLoop = False
                        break

            JHM.waitAndClick(By.CSS_SELECTOR,"#pgCardList_nextBtn > .sp")
            
            JHM.waitAndClick(By.ID,"btnPayment")


            JHM.wait.until(EC.element_to_be_clickable((By.ID,"lazyModalDialogIframe")))
            newFrame = JHM.browser.find_element(By.ID,'lazyModalDialogIframe')
            JHM.browser.switch_to.frame(newFrame)

            
            JHM.wait.until(EC.element_to_be_clickable((By.ID,"vkeyboard")))
            
            
            # # 비번 입력
            for i in range(6):
                pos = imagesearch("./python/num/"+str(i+1)+"num.png")
                sleep(0.25)
                pyautogui.moveTo(pos[0],pos[1])
                pyautogui.click()
            
            JHM.browser.switch_to.window(JHM.browser.window_handles[0])
            JHM.browser.switch_to.frame(JHM.browser.find_elements(By.CSS_SELECTOR,'iframe')[0].get_attribute('name'))

            JHM.waitAndClick(By.ID,"payDoneBtn")
            
            JHM.wait.until(EC.alert_is_present())
            JHM.browser.switch_to.alert.accept()
            
            if jhconstants.ATCOMPANY  == False:
            
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
            break
        except Exception:
            while len(JHM.browser.window_handles)>1:
                JHM.browser.switch_to.window(JHM.browser.window_handles[1])
                JHM.browser.close()
            JHM.browser.switch_to.window(JHM.browser.window_handles[0])

    return

if __name__ == "__main__":
  
    
    themaNames = ['강남목욕탕','화생설화 : Blooming','대호시장 살인사건','전래동 : 자살사건']
    storeNames = ['강남 던전','던전101','강남 던전','던전101']

    if jhconstants.DEBUG == False:

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
        reservePw = str(randrange(9000) + 1000)
        reserveTime = "13:00"
        if askyesno("시간","시간 설정하겠습니까?") == True:
            for tt in range(11,20,1):
                if askyesno("시간",f"{tt}:00") == True:
                    reserveTime = ""+str(tt)+":00"
                    break
        recur = askyesno("시간","반복?")
        dateTry = 0
        targetDayTemp = date.today() + timedelta(days = 1)
        dateSetting = False
        while dateTry < 6:
            while targetDayTemp.weekday() != 5 and targetDayTemp.weekday() != 6:
                targetDayTemp = targetDayTemp + timedelta(days=1)
            dateTry += 1
            weekTemp = '토'
            if targetDayTemp.weekday() == 6:
                weekTemp='일'
            getRet = askyesno("날짜",f"{str(targetDayTemp)} ({weekTemp})")
            if getRet == True:
                reserveDate = (str(targetDayTemp)).replace("-","")
                dateSetting = True
                break
            else:
                targetDayTemp = targetDayTemp + timedelta(days=1)
        if dateSetting == False:
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
                reservePw = askstring('비번','비번 (ex. 123456)')
                breakLoop = askyesno('확인',f'이름:{reserveName} 폰:{reservePb} 시간:{reserveTime}')
                if breakLoop == True:
                    break
                
        doPayco = askyesno("payco","payco")
    else:
        themaName = themaNames[0]
        storeName = storeNames[0]
        reserveName = '김상호'
        reservePb = '01051233215'
        reserveDate = '20220702'
        reserveTime = '13:00'
        reservePw = '123456'
        doPayco= False
        
                
            

    

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

    
   
    browser = None    
    chromeOptions = webdriver.ChromeOptions()
    if jhconstants.ATCOMPANY == False:
        import chromedriver_autoinstaller
        path = chromedriver_autoinstaller.install(cwd=True)
        browser = webdriver.Chrome(executable_path=path, options=chromeOptions)        
    else:
        browser = webdriver.Chrome(options=chromeOptions)

    wait = WebDriverWait(browser, 10)

    jhm = JHSelenium(browser,wait)

    
    if doPayco == True:
        LoginPayco(jhm, "cutehanjh@gmail.com", jhconstants.PAYCOPW)
    reserveXpho(jhm, themaName=themaName,storeName=storeName,reserveName=reserveName,
                reservePb=reservePb, reservePw=reservePw, reserveDate=reserveDate,reserveTime=reserveTime, recurTry=recur)
    
    
    print("Done")
    input() 

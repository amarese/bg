from xmlrpc.client import boolean
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from time import sleep
import datetime
import gspread
from datetime import timedelta

import chromedriver_autoinstaller

timeTable = ['null','10:00','11:40','13:20','15:00','16:40','18:20','20:00','21:40']

def reserveOasis(reserveName : str, reserveTime : int, reservePhone : str) -> None:
    logStr = ""
    path = chromedriver_autoinstaller.install(cwd=True)
    chromeOptions = webdriver.ChromeOptions()
    chromeOptions.add_argument("headless")
    #chromeOptions.add_experimental_option("excludeSwitches", ["enable-logging"])
    webDriver = webdriver.Chrome(executable_path=path, options=chromeOptions)
    wait = WebDriverWait(webDriver, 10)
    webDriver.get('https://oasismuseum.com/ticket?id=1')
    wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'form-control')))


    reserveDate = (datetime.datetime.now()+timedelta(days=7)).date().__str__()
    thresTime = datetime.datetime.fromisoformat((datetime.datetime.now()+timedelta(days=1)).date().__str__())
    for _ in range(reserveTime):
        logStr+=' '

    while True:
        if datetime.datetime.today().second%10 == 0:
            print(f"{logStr}{datetime.datetime.today().__str__()}: {reserveTime} tried")
        if datetime.datetime.today() >= thresTime:
            break
        sleep(0.5)

    while True:
        
        try:
            
            print(f"{logStr} try with the {reserveTime}-th time")
            
            targetTime = 'sd_btn1_'+str(reserveTime)

            jsCmd = "document.getElementById('"+targetTime+"').removeAttribute('disabled');document.getElementById('"+targetTime+"').click()"
            webDriver.execute_script(jsCmd)

            wait.until(EC.element_to_be_clickable((By.ID,'f_agree')))

            jsCmd = "\
                document.getElementById('f_name').value='"+reserveName+"';\
                document.getElementById('f_tel').value='"+reservePhone+"';\
                document.getElementById('f_date').value='"+reserveDate+"';\
                document.getElementById('f_agree').click();\
                "
            webDriver.execute_script(jsCmd)

            wait.until(EC.element_to_be_clickable((By.ID,'f_submit')))
            jsCmd = "document.getElementById('f_submit').click()"
            webDriver.execute_script(jsCmd)

            try:
                result = webDriver.switch_to.alert
                result.accept()
                
            except:
                break
        except:
            print(f"{logStr} error with the {reserveTime}-th time")

    wait.until(EC.element_to_be_clickable((By.ID,'f_submit')))
    jsCmd = "document.getElementById('f_payment').selectedIndex=1;document.getElementById('f_submit').click();"
    webDriver.execute_script(jsCmd)
    wait.until(EC.visibility_of_element_located((By.CLASS_NAME,'col-8')))
    confirmNum = webDriver.find_elements(By.CLASS_NAME,'col-8')[10].text

    print(f"{logStr} success with the {reserveTime}-th time")

    with open('page_'+reserveName+'_'+reservePhone+'-'+ reserveDate+'.txt', 'a+', -1, 'utf-8') as f:
        f.write(f'{reserveDate}\ttimeTable[reserveTime]\treserveName\treservePhone\tconfirmNum\n'+webDriver.page_source)
        
    sleep(reserveTime*5)

    gc = gspread.service_account(filename="C:/Users/abcde/vscode/bg/bg/python/key.json")
    sh = gc.open("비트포비아양도").worksheet("오아시스_자동")
    rowIdx = 1
    while len(sh.get('A'+str(rowIdx))) != 0:
        rowIdx += 1
    rowIdx = rowIdx + 10*(reserveTime-2)
    sh.update('A'+str(rowIdx),reserveDate)
    sh.update('B'+str(rowIdx),timeTable[reserveTime])
    sh.update('C'+str(rowIdx),reserveName)
    sh.update('D'+str(rowIdx),reservePhone)
    sh.update('E'+str(rowIdx),confirmNum)
    
        
    print(f"{logStr} done from the {reserveTime}-th time")

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.common.alert import Alert
#import chromedriver_autoinstaller
#path = chromedriver_autoinstaller.install(cwd=True)

chromeOptions = webdriver.ChromeOptions()
#chromeOptions.add_argument("headless")
webDriver = webdriver.Chrome(#executable_path=path,
                                    options=chromeOptions)
wait = WebDriverWait(webDriver, 10)
reserveTime = 5
reserveName = '이상호'
reservePhone = '010-5555-1111'
reserveDate = '2022-05-03'

while True:
    print("\n시간: 1-10:00 2-11:40 3-13:20 4-15:00 5-16:40 6-18:20 7-20:00 8-21:40")
    reserveTime = input()
    try:
        if int(reserveTime)>0 and int(reserveTime) < 9:
            break
        print("wrong input")
    except:
        print("wrong input")

while True:
    print("\n이름")
    reserveName = input()
    try:
        if reserveName.__len__()==3:
            break
        print("wrong input")
    except:
        print("wrong input")

while True:
    print("\n폰번호")
    reservePhone = input()
    try:
        if reservePhone.__len__()==13:
            break
        print("wrong input")
    except:
        print("wrong input")
        
while True:
    print("\n날짜")
    reserveDate = input()
    try:
        if reserveDate.__len__()==10:
            break
        print("wrong input")
    except:
        print("wrong input")        
        
    

while True:
    webDriver.get('https://oasismuseum.com/ticket?id=1')
    wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'form-control')))


    targetTime = 'sd_btn1_'+str(reserveTime)

    jsCmd = "document.getElementById('"+targetTime+"').removeAttribute('disabled');document.getElementById('"+targetTime+"').click()"
    webDriver.execute_script(jsCmd)

    jsCmd = "\
        document.getElementById('f_name').value='"+reserveName+"';\
        document.getElementById('f_tel').value='"+reservePhone+"';\
        document.getElementById('f_date').value='"+reserveDate+"';\
        document.getElementById('f_agree').click();\
        "
    webDriver.execute_script(jsCmd)

    jsCmd = "document.getElementById('f_submit').click()"
    webDriver.execute_script(jsCmd)

    try:
        result = webDriver.switch_to.alert
        result.accept()
        
    except:
        print("no alert")
        break

jsCmd = "document.getElementById('f_payment').selectedIndex=1;document.getElementById('f_submit').click();"
webDriver.execute_script(jsCmd)

with open('page_'+reserveName+'_'+reserveDate+'_'+reserveTime+'.html', 'a+', -1, 'utf-8') as f:
    f.write(webDriver.page_source)
    
print("done")

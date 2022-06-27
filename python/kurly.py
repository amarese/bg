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
    
def buyKurly(JHM:JHSelenium) -> None:
    JHM.browser.get("https://www.kurly.com/shop/member/login.php")
    JHM.wait.until(EC.presence_of_element_located((By.NAME,'m_id')))
    JHM.browser.find_element(By.NAME,'m_id').clear()
    JHM.browser.find_element(By.NAME,'m_id').send_keys('eternitier')

    JHM.wait.until(EC.presence_of_element_located((By.NAME,'password')))
    JHM.browser.find_element(By.NAME,'password').clear()
    JHM.browser.find_element(By.NAME,'password').send_keys('15751abcjin')
    
    JHM.waitAndClick(By.CLASS_NAME,'btn_type1')
    sleep(5)

    while True:
        #JHM.browser.get("https://www.kurly.com/shop/goods/goods_view.php?&goodsno=133024")
        JHM.browser.get("https://www.kurly.com/shop/goods/goods_view.php?&goodsno=45208")
        orderBtn = JHM.browser.find_element(By.CLASS_NAME,'base_button')
        if orderBtn.get_attribute('disabled')!='true':
            break
        sleep(1)
    
    JHM.waitAndClick(By.CLASS_NAME,'base_button')
    JHM.browser.get("https://www.kurly.com/shop/goods/goods_cart.php")

    JHM.waitAndClick(By.CLASS_NAME,'active')
    
    JHM.wait.until(EC.presence_of_element_located((By.NAME,'ordAgree')))
    
    JHM.browser.execute_script("document.getElementsByName('ordAgree')[0].click()")

    
    JHM.waitAndClick(By.CLASS_NAME,'btn_payment')

    JHM.waitAndClick(By.CSS_SELECTOR,"#pgCardList_nextBtn > .sp")
    
    JHM.waitAndClick(By.ID,"btnPayment")


    JHM.wait.until(EC.element_to_be_clickable((By.ID,"lazyModalDialogIframe")))
    newFrame = JHM.browser.find_element(By.ID,'lazyModalDialogIframe')
    JHM.browser.switch_to.frame(newFrame)

    
    JHM.wait.until(EC.element_to_be_clickable((By.ID,"vkeyboard")))

    
    askyesno('완료','완료')
    
    return

if __name__ == "__main__":
  
    
   
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

    
    LoginPayco(jhm, "cutehanjh@gmail.com", jhconstants.PAYCOPW)
    buyKurly(jhm)
    
    
    print("Done")
    input() 

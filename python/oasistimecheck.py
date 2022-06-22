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
from selenium.webdriver.common.action_chains import ActionChains
import gspread
import datetime

import jhmodule
from jhmodule import JHSelenium
import jhconstants



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

    targetDate = 27
    if jhconstants.DEBUG == True:
        debugCount = 0
    while True:
        try:
            if jhconstants.DEBUG == True:
                debugCount+=1
                if debugCount==5:
                    targetDate = 26
            sleep(0.5)
            print(datetime.datetime.today())
            browser.get("https://oasismuseum.com/ticket?date=2022-06-"+str(targetDate)+"&id=1")
            result = browser.switch_to.alert
            result.accept()
        except:
            break    
        
    
    
    print("Done")
    input()

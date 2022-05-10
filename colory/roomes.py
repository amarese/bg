from datetime import datetime, timedelta
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.common.alert import Alert
import threading
from playwright.sync_api import *
from bs4 import BeautifulSoup as bs

#import chromedriver_autoinstaller
#path = chromedriver_autoinstaller.install(cwd=True)


def extractFuncFormat(htmlSrc : str, browser : webdriver, date: datetime) -> dict:
    ret = {}
    return ret


def extractFunctionNextEdition(htmlAddress : str, page : Page, date: datetime) -> dict:
    page.goto(htmlAddress)
    
    page.locator("[placeholder='YYYY-MM-DD']").click()
    if date.month > datetime.now().month:
        page.locator("a:has-text('Next')").click()
    
    page.locator("a:has-text('"+date.day+"')").click
    
    temp = page.locator('.col-md-8')
    src = temp.nth(0).inner_html()
    soup = bs(src,"html.parser")
    

class Shop(threading.Thread):
    def __init__(self, shopName, hpAddress, toOpenDate, browser, extractFunc):
        threading.Thread.__init__(self)
        self.shopName = shopName
        self.hpAddress = hpAddress
        self.toOpenDate = toOpenDate
        self.themaDict = {}
        self.extractFunc = extractFunc
        self.browser = browser
        self.doLoop = True
    
    def getFreeTime(self, startTime : datetime, endTime : datetime) -> dict:
        ret = {}
        for t in self.themaDict:
            for freeTime in self.themaDict[t]:
                if freeTime[0] >= startTime and freeTime[1] <= endTime:
                    if t not in ret:
                        ret[t] = []
                    ret[t].append(freeTime)
        return ret
    
    def updateFreeTimes(self) -> None:
        iterDate = datetime.now()
        self.themaDict.clear()
        for i in range(self.toOpenDate):
            ret = self.extractFunc(self.hpAddress,self.browser,iterDate)
            for r in ret:
                self.themaDict[r] = []
                for j in ret[r]:
                    self.themaDict[r].append(j)
            iterDate = iterDate + timedelta(days=1)

    def run(self):
        while self.doLoop == True:
            self.updateFreeTimes()
            sleep(1)

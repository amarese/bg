from turtle import up
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.common.alert import Alert
import chromedriver_autoinstaller
from time import sleep
from github import Github
import datetime



path = chromedriver_autoinstaller.install(cwd=True)

chromeOptions = webdriver.ChromeOptions()
chromeOptions.add_argument("headless")
webDriver = webdriver.Chrome(#executable_path=path,
                                    options=chromeOptions)
wait = WebDriverWait(webDriver, 10)

webDriver.get('http://colory.mooo.com/catalogue')

locations = webDriver.find_elements(By.CSS_SELECTOR,'h5') # 강남, 건대
tables = webDriver.find_elements(By.CSS_SELECTOR,'table') # 강남 테이블, 건대 테이블

commitMsg = datetime.datetime.now().date().__str__()

updatedContents = commitMsg
locIdx = 0


for t in tables:
    rows = t.find_elements(By.CSS_SELECTOR,'tr') 
    print(locations[locIdx].text)
    updatedContents += '\nL:' + locations[locIdx].text
    locIdx += 1
    for r in rows:
        cells = r.find_elements(By.CSS_SELECTOR, 'td')
        if len(cells) == 0: # table header
            continue

        idx = 0

        if len(cells) == 5: # 새로운 매장
            idx = 1
            newShopName = cells[0].text
            updatedContents += ('\n' + newShopName + '|')

        themaName = cells[idx].text
        updatedContents += (cells[idx].text + '|')
        idx += 1
        themaScore = cells[idx].text
        updatedContents += (cells[idx].text + '|')
        idx += 1
        themaDifficulty = cells[idx].text
        updatedContents += (cells[idx].text + '|')
        idx += 1
        themaNumOfReviews = cells[idx].text
        updatedContents += (cells[idx].text + '|')
        #print(newShopName, themaName, themaScore, themaDifficulty, themaNumOfReviews)


g = Github("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")
repo = g.get_user().get_repo('bg')
contents = repo.get_contents("colory/curScore.txt")

repo.update_file(contents.path, commitMsg, updatedContents, contents.sha, branch="master")

print("done from", commitMsg)

input()



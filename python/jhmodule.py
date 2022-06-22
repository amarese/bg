from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import jhconstants
class JHSelenium:
    def __init__(self,browser:webdriver.Chrome, wait:WebDriverWait) -> None:
        self.browser = browser
        self.wait = wait
    def waitAndClick(self, BY, id):
        self.wait.until(EC.element_to_be_clickable((BY,id)))
        self.browser.find_element(BY,id).click()
        
def askyesno(title, contents, defaultValue = True):
    if jhconstants.DEBUG == True:
        return defaultValue
    return askyesno(title,contents)

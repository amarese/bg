from bs4 import BeautifulSoup as bs
import datetime
import jhconstants
from github import Github

f= open("col/col.html", 'r', encoding='utf-8')
source = ""
while True:
    line = f.readline()
    if not line: break
    source += line
    source += "\n"
    
f.close()

soup = bs(source, "html.parser")

locations = soup.find_all('h5') # 강남, 건대
tables = soup.find_all('table') # 강남 테이블, 건대 테이블

commitMsg = datetime.datetime.now().date().__str__()

updatedContents = commitMsg
locIdx = 0


for t in tables:
    print(locations[locIdx].text)
    updatedContents += '\nL:' + locations[locIdx].text
    locIdx += 1
    
    tds = t.find_all('td')
    for t in tds:
        if (t.attrs['class'][0]=='info-1'):
            newShopName = t.text
            updatedContents += ('\n' + newShopName + '|')
        else:
            updatedContents += (t.text+'|')

f= open("col/curScore.txt", 'w', encoding='utf-8')
f.write(updatedContents)
f.close()

g = Github(jhconstants.GITHUB_TOKEN)
repo = g.get_user().get_repo('bg')
contents = repo.get_contents("colory/curScore.txt")

repo.update_file(contents.path, commitMsg, updatedContents, contents.sha, branch="master")

print("done from", commitMsg)

input()

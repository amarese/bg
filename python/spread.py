import gspread



def read():
    gc = gspread.service_account(filename="./python/key.json")
    sh = gc.open("비트포비아양도").worksheet("오아시스_자동")
    rowIdx = 1
    while len(sh.get('A'+str(rowIdx))) != 0:
        rowIdx += 1

    sh.update('A'+str(rowIdx),'이름')
    sh.update('B'+str(rowIdx),'폰번호')
    sh.update('C'+str(rowIdx),'예약번호')
    sh.update('D'+str(rowIdx),'시간')


if __name__ == '__main__':
    read()
INPUT_SIZE = 8

seed = 10


def pseudo_rand():
    global seed
    seed = seed * 214013 + 2531011
    return (seed >> 16) & 0x7FFF

MAP2 = None
show = False
def subModule(MAP, mNumOfRows, nNumOfCols, idxs, emptyRows, emptyCols):
    global MAP2
    MAP2 = [[0 for c in range(nNumOfCols)] for r in range(mNumOfRows)]
    for r in range(mNumOfRows):
        for c in range(nNumOfCols):
            MAP2[r][c] = MAP[r][c]
    if show == True:
        print(f"({emptyRows[idxs[0]]},{emptyCols[idxs[0]]})\n({emptyRows[idxs[1]]},{emptyCols[idxs[1]]})\n({emptyRows[idxs[2]]},{emptyCols[idxs[2]]})\n")
    for i in range(3):
        # i = 0 : 모든 방향
        # i = 1 : row로만
        # i = 2 : col로만
        rowValue = emptyRows[idxs[i]]
        colValue = emptyCols[idxs[i]]

        if i != 1:
            for r in range(0, INPUT_SIZE):
                modRowValue = rowValue - r
                modColValue = colValue
                if modRowValue < 0 or MAP2[modRowValue][modColValue] == 1:
                    break
                MAP2[modRowValue][modColValue] = 2

            for r in range(0, INPUT_SIZE):
                modRowValue = rowValue + r
                modColValue = colValue
                if modRowValue >= mNumOfRows or MAP2[modRowValue][modColValue] == 1:
                    break
                MAP2[modRowValue][modColValue] = 2

        if i != 2:
            for c in range(0, INPUT_SIZE):
                modRowValue = rowValue
                modColValue = colValue - c
                if modColValue < 0 or MAP2[modRowValue][modColValue] == 1:
                    break
                MAP2[modRowValue][modColValue] = 2

            for c in range(0, INPUT_SIZE):
                modRowValue = rowValue
                modColValue = colValue + c
                if modColValue >= nNumOfCols or MAP2[modRowValue][modColValue] == 1:
                    break
                MAP2[modRowValue][modColValue] = 2
    ret = 0
    for r in range(mNumOfRows):
        for c in range(nNumOfCols):
            if MAP2[r][c] == 0:
                ret += 1
    return ret


def getSolution(MAP, mNumOfRows, nNumOfCols):
    emptyRows = []
    emptyCols = []

    for r in range(mNumOfRows):
        for c in range(nNumOfCols):
            if (MAP[r][c] == 0):
                emptyRows.append(r)
                emptyCols.append(c)
    ret = INPUT_SIZE * INPUT_SIZE
    for i in range(len(emptyRows)):
        for j in range(len(emptyRows)):
            if i == j:
                continue
            for k in range(len(emptyRows)):
                if i == k or j == k:
                    continue
                value = subModule(MAP, mNumOfRows, nNumOfCols, [i,j,k], emptyRows, emptyCols)
                if ret > value:
                    ret = value

    return ret


T = 100  # test case 수

for i in range(1, T+1):
    mNumOfRows = int(pseudo_rand() % (INPUT_SIZE/2) + INPUT_SIZE/2)  # rows 값
    nNumOfCols = int(pseudo_rand() %
                     (INPUT_SIZE/2) + INPUT_SIZE/2)  # columns 값
    MAP = [[0 for c in range(nNumOfCols)]
           for r in range(mNumOfRows)]  # 지형을 표현하는 2차원 배열
    while True:
        numOfEmpties = 0
        for r in range(mNumOfRows):
            for c in range(nNumOfCols):
                if pseudo_rand() % 3 == 0:
                    MAP[r][c] = 0  # 빈공간
                    numOfEmpties += 1
                else:
                    MAP[r][c] = 1  # 벽
        if numOfEmpties>=3:
            break

    print(f"#{i}:{getSolution(MAP, mNumOfRows, nNumOfCols)}")

let themaInfor = []

function showString(str) {
    console.log("===" + str + "===")
}

let sortPriority = [3, 4, 5, 0, 1, 2]
let sortPriDesc = [true, true, true, true, true, true]

function sortTuple(a, b) {
    for (let idx = 0; idx < sortPriority.length; idx++) {
        let first = a[sortPriority[idx]]
        let second = b[sortPriority[idx]]
        if (sortPriority[idx] >= 3) {
            if (isNaN(first) == true) {
                first = 0
            }
            if (isNaN(second) == true) {
                second = 0
            }
        }
        if (first > second) {
            return sortPriDesc[idx] == true ? -1 : 1
        } else if (first < second) {
            return sortPriDesc[idx] == true ? 1 : -1
        }
    }
    return 0
}




let vecLocName = []

const LOCATION = 0
const SHOP = 1
const TITLE = 2
const RATE = 3
const DIFF = 4
const COUNT = 5

function loadFromFile() {

    let allText
    let contPerLocation
    let contPerShop
    let contPerThema
    let lines


    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", "./colory/curScore.txt", false);
    rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8')
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);

    lines = allText.split(/[\n\r]/)

    document.getElementById('date').innerHTML = 'data for ' + lines[0]

    let locName = null
    for (let idx = 1; idx < lines.length; idx++) {
        if (lines[idx].length == 0) {
            continue
        }

        if (lines[idx].substr(0, 2) == 'L:') {
            locName = lines[idx].substr(2)
            vecLocName.push(locName)
            continue
        }
        let perShop = lines[idx].split('|')
        let shopName = perShop[0]
        let idx2 = 1
        while (true) {
            let title = perShop[idx2++]
            let rate = perShop[idx2++]
            let diff = perShop[idx2++]
            let count = perShop[idx2++]

            let tuple = []
            tuple[LOCATION] = locName
            tuple[SHOP] = shopName
            tuple[TITLE] = title
            tuple[RATE] = Number(rate)
            tuple[DIFF] = Number(diff)

            tuple[COUNT] = Number(count)
            themaInfor.push(tuple)
            if (idx2 >= perShop.length) {
                break
            }
        }
    }


}

loadFromFile()


let mapLoc = {}

let queryLoc = {}

function funcDrawInit() {
    let maxRate = 0
    let minRate = 10
    let maxCount = 0
    let minCount = 100000
    let maxDiff = 0
    let minDiff = 10
    for (let idx = 0; idx < themaInfor.length; idx++) {
        if (maxRate < themaInfor[idx][RATE]) {
            maxRate = themaInfor[idx][RATE]
        }
        if (minRate > themaInfor[idx][RATE]) {
            minRate = themaInfor[idx][RATE]
        }
        if (maxCount < themaInfor[idx][COUNT]) {
            maxCount = themaInfor[idx][COUNT]
        }
        if (minCount > themaInfor[idx][COUNT]) {
            minCount = themaInfor[idx][COUNT]
        }
        if (maxDiff < themaInfor[idx][DIFF]) {
            maxDiff = themaInfor[idx][DIFF]
        }

        if (minDiff > themaInfor[idx][DIFF]) {
            minDiff = themaInfor[idx][DIFF]
        }
        //console.log(maxRate, minRate, maxCount, minCount, maxDiff, minDiff)

    }

    let tdLoc = document.getElementById('tdLocationContents')
    for (let idx = 0; idx < vecLocName.length; idx++) {
        //console.log(vecLocName[idx])
        let newElem = document.createElement('input')
        newElem.type = 'checkbox'
        newElem.onclick = function(event) {
            if (event.target.checked == true) {
                queryLoc[vecLocName[idx]] = true
            } else {
                queryLoc[vecLocName[idx]] = false
            }

        }
        if (idx == 0) {
            queryLoc[vecLocName[idx]] = true
            newElem.checked = true
        }
        tdLoc.appendChild(newElem)
        let newElem2 = document.createElement('span')
        newElem2.innerHTML = vecLocName[idx] + " "
        tdLoc.appendChild(newElem2)
        if (idx % 6 == 5) {
            tdLoc.appendChild(document.createElement('br'))
            tdLoc.appendChild(document.createElement('br'))
        }

    }

    document.getElementById('spanRateMin').innerHTML = minRate
    document.getElementById('spanRateMax').innerHTML = maxRate
    document.getElementById('spanDiffMin').innerHTML = minDiff
    document.getElementById('spanDiffMax').innerHTML = maxDiff
    document.getElementById('spanCountMin').innerHTML = minCount
    document.getElementById('spanCountMax').innerHTML = maxCount

    {
        let minRange = document.getElementById('rangeRateMin')
        minRange.min = minRate * 10
        minRange.max = maxRate * 10
        minRange.value = minRate * 10

        let maxRange = document.getElementById('rangeRateMax')
        maxRange.min = minRate * 10
        maxRange.max = maxRate * 10
        maxRange.value = maxRate * 10
    }


    {
        let minRange = document.getElementById('rangeDiffMin')
        minRange.min = minDiff * 1
        minRange.max = maxDiff * 1
        minRange.value = minDiff * 1

        let maxRange = document.getElementById('rangeDiffMax')
        maxRange.min = minDiff * 1
        maxRange.max = maxDiff * 1
        maxRange.value = maxDiff * 1
    }

    {
        let minRange = document.getElementById('rangeCountMin')
        minRange.min = minCount * 1
        minRange.max = maxCount * 1
        minRange.value = minCount * 1

        let maxRange = document.getElementById('rangeCountMax')
        maxRange.min = minCount * 1
        maxRange.max = maxCount * 1
        maxRange.value = maxCount * 1
    }

}

funcDrawInit()

function funcInputVal(e, scale) {
    let inputVal = prompt('value')
    let elem = document.getElementById(e.id.replace('span', 'range'))
    if (isNaN(inputVal) == true || inputVal * scale < elem.min || inputVal * scale > elem.max) {
        return
    }
    e.innerHTML = inputVal
    elem.value = inputVal * scale
}

function funcChangeVal(e, scale) {
    document.getElementById(e.id.replace('range', 'span')).innerHTML = e.value / scale
}

let satisfiedEntries

function funcSetSortPri(idx) {
    let tempval = sortPriority[0]
    sortPriority = [0]
    sortPriority[0] = tempval

    if (sortPriority[0] == idx) {
        sortPriDesc[0] = !sortPriDesc[0]
    } else {
        sortPriority[0] = idx
        sortPriDesc[0] = true
    }
    //console.log("clicked")
    funcDrawResult()
}

let headContents = ['위치', '매장', '테마', '평점', '난이도', '후기수']

function funcDrawResult() {
    let targetTable = document.getElementById('tabResult')
    while (targetTable.childElementCount > 0) {
        targetTable.removeChild(targetTable.children[0])
    }

    if (satisfiedEntries.length == 0) {
        alert("해당 테마가 없습니다!")
        return
    }
    satisfiedEntries.sort(sortTuple)

    let trHead = document.createElement('tr')
    trHead.className = "result"

    for (let idx = 0; idx < headContents.length; idx++) {
        let th = document.createElement('th')
        th.className = 'result'
        if (sortPriority[0] == idx) {
            if (sortPriDesc[0] == true) {
                th.innerHTML = headContents[idx] + "↓"
            } else {
                th.innerHTML = headContents[idx] + "↑"
            }
        } else {
            th.innerHTML = headContents[idx]
        }
        th.onclick = function() { funcSetSortPri(idx) }
        trHead.appendChild(th)
    }

    //th.innerHTML = '<th class="result">위1치</th><th class="result">매장명</th><th class="result">테마명</th><th class="result">평점</th><th class="result">난이도</th><th class="result">후기수</th>'
    targetTable.appendChild(trHead)
    for (let idx = 0; idx < satisfiedEntries.length; idx++) {
        if (idx == 100) {
            break
        }
        let tr = document.createElement('tr')
        tr.className = "result"
        targetTable.appendChild(tr)
        for (let idx2 = 0; idx2 <= COUNT; idx2++) {
            let td = document.createElement('td')
            td.className = "result"
            td.innerHTML = satisfiedEntries[idx][idx2]
            tr.appendChild(td)
        }
    }
}

function funcEval() {

    let minRate = Number(document.getElementById('spanRateMin').innerHTML)
    let maxRate = Number(document.getElementById('spanRateMax').innerHTML)
    let minDiff = Number(document.getElementById('spanDiffMin').innerHTML)
    let maxDiff = Number(document.getElementById('spanDiffMax').innerHTML)
    let minCount = Number(document.getElementById('spanCountMin').innerHTML)
    let maxCount = Number(document.getElementById('spanCountMax').innerHTML)

    //console.log(maxRate, minRate, maxCount, minCount, maxDiff, minDiff)
    if (maxRate < minRate || maxCount < minCount || maxDiff < minDiff) {
        alert("입력을 확인해주세요!")
        return
    }

    satisfiedEntries = []

    for (let idx = 0; idx < themaInfor.length; idx++) {
        if (
            themaInfor[idx][RATE] < minRate ||
            themaInfor[idx][RATE] > maxRate ||
            themaInfor[idx][COUNT] < minCount ||
            themaInfor[idx][COUNT] > maxCount ||
            themaInfor[idx][DIFF] < minDiff ||
            themaInfor[idx][DIFF] > maxDiff
        ) {
            continue
        }
        if (minRate != 0 || maxRate != 10) {
            if (isNaN(themaInfor[idx][RATE]) == true) {
                continue
            }
        }
        if (minDiff != 0 || maxDiff != 10) {
            if (isNaN(themaInfor[idx][DIFF]) == true) {
                continue
            }
        }
        if (queryLoc[themaInfor[idx][LOCATION]] != true) {
            continue
        }

        satisfiedEntries.push(themaInfor[idx])

    }

    funcDrawResult()



}

let schedules
let firstContact

let summaryNumber = 5

let rawFile = new XMLHttpRequest();
rawFile.open("GET", 'duruduru.txt', false);
rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8')
rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            let allText = rawFile.responseText;
            schedules = allText.split("|||")[0]
            firstContact = allText.split("|||")[1]
        }
    }
}

rawFile.send(null);

let DATE = 0
let PUBLIC = 1
let PARTICIPANTS = 2
let FIRSTCONTACT = 3

let dataSchedules = []
let dataCoOccuranceList = {}
let dataFirstContact = {}
let dataBonus = {}
let dataScores = []

schedules.split('|').forEach(elemOri => {
    let splitElemOri = elemOri.split(',')
    let elem = splitElemOri[0]
    let tmpToken = elem.split('\t')
    if (tmpToken.length < 4) {
        return
    }
    let tmpArr = []
    tmpArr[DATE] = tmpToken[0].trim()
    if (tmpToken[1] == 'Y') {
        tmpArr[PUBLIC] = true
    } else {
        tmpArr[PUBLIC] = false
    }
    tmpArr[PARTICIPANTS] = []
    for (let idx = 2; idx < tmpToken.length; idx++) {
        if (tmpToken[idx].length > 0) {
            tmpArr[PARTICIPANTS].push(tmpToken[idx])
        }

    }
    if (splitElemOri.length > 1) {
        tmpArr[FIRSTCONTACT] = []
        splitElemOri[1].split(/ |\t/).forEach(elem2 => {
            tmpArr[FIRSTCONTACT].push(elem2)
        })
    }
    dataSchedules.push(tmpArr)
})


// 가장 많은 일정글 작성자
let summaryHost = {} //
    // 연속으로 몇일 참석
let summaryDate = {}
    // 가장 많은 사람하고 한거

// 이 기간동안 첨하는 사람이 젤 많은 사람
// 둘이 젤 많이 했다
let summaryCouple = {}
    // 가장 많은 모집글
let summaryCrowdHost = {} //
    // 남의 모집글에 제일 많이 참가
let summaryCrowdParticipate = {} //
    // 각자 한 횟수 카운트
let summaryNumOfCouple = {}
    // 일정글 안쓰고 참가
let summaryParticipate = {} //

dataSchedules.forEach(elem => {
    for (let idx = 0; idx < elem[PARTICIPANTS].length - 1; idx++) {
        let user1 = elem[PARTICIPANTS][idx].trim()



        if (dataCoOccuranceList[user1] == undefined) {
            dataCoOccuranceList[user1] = new Set()
            dataFirstContact[user1] = new Set()
            dataBonus[user1] = 0

            summaryHost[user1] = 0
            summaryDate[user1] = new Set()
            summaryCrowdHost[user1] = 0
            summaryParticipate[user1] = 0
            summaryCrowdParticipate[user1] = 0
            summaryNumOfCouple[user1] = {}

        }

        ++summaryHost[user1]
        summaryDate[user1].add(elem[DATE])

        for (let idx2 = idx + 1; idx2 < elem[PARTICIPANTS].length; idx2++) {
            let user2 = elem[PARTICIPANTS][idx2].trim()
            if (dataCoOccuranceList[user2] == undefined) {
                dataCoOccuranceList[user2] = new Set()
                dataFirstContact[user2] = new Set()
                dataBonus[user2] = 0

                summaryHost[user2] = 0
                summaryDate[user2] = new Set()
                summaryCrowdHost[user2] = 0
                summaryParticipate[user2] = 0
                summaryCrowdParticipate[user2] = 0
                summaryNumOfCouple[user2] = {}

            }

            if (elem[PUBLIC] == false) {
                ++summaryParticipate[user2]
            }

            summaryDate[user2].add(elem[DATE])

            dataCoOccuranceList[user1].add(user2)
            dataCoOccuranceList[user2].add(user1)

            if (summaryNumOfCouple[user1][user2] == undefined) {
                summaryNumOfCouple[user1][user2] = 1
            } else {
                ++summaryNumOfCouple[user1][user2]
            }

            if (summaryNumOfCouple[user2][user1] == undefined) {
                summaryNumOfCouple[user2][user1] = 1
            } else {
                ++summaryNumOfCouple[user2][user1]
            }

            let userTempArr = user1 + ", " + user2
            if (user1 > user2) {
                userTempArr = user2 + ", " + user1
            }
            if (summaryCouple[userTempArr] == undefined) {
                summaryCouple[userTempArr] = 1
            } else {
                ++summaryCouple[userTempArr]
            }
        }

    }

    if (elem[FIRSTCONTACT] != undefined) {
        elem[FIRSTCONTACT].forEach(elem2 => {
            let firstUserIdx = Math.floor(elem2 / 10)
            let secondUserIdx = elem2 % 10
            let user1 = elem[PARTICIPANTS][firstUserIdx - 1].trim()
            let user2 = elem[PARTICIPANTS][secondUserIdx - 1].trim()
            dataFirstContact[user1].add(user2)
            dataFirstContact[user2].add(user1)
        })
    }
    if (elem[PUBLIC] == true) {
        dataBonus[elem[PARTICIPANTS][0].trim()] += 2

        ++summaryCrowdHost[elem[PARTICIPANTS][0].trim()]

        for (let idx = 1; idx < elem[PARTICIPANTS].length; idx++) {
            dataBonus[elem[PARTICIPANTS][idx].trim()] += 1

            ++summaryCrowdParticipate[elem[PARTICIPANTS][idx].trim()]
        }
    }

});

/*
firstContact.split('|').forEach(elem => {
    if (elem.length == 0) {
        return
    }
    let tmpToken = elem.split('\t')
    if (tmpToken.length < 2) {
        return
    }
    let user1 = tmpToken[0].trim()
    let user2 = tmpToken[1].trim()
    if (dataFirstContact[user1] == undefined || dataFirstContact[user2] == undefined) {
        return
    }
    dataFirstContact[user1].add(user2)
    dataFirstContact[user2].add(user1)
})
*/

function getSequenceDate(dateSet) {
    let dates = dateSet.keys()
    let thisDateIt = dates.next()
    let thisDate = Number(thisDateIt.value.split('/')[1])
    let seqDate = 1
    let mostSeq = 1
    let startDate = thisDateIt.value
    let mostStart
    let mostEnd
    let endDate
    let prevDate
    while (thisDateIt.done == false) {
        prevDate = thisDateIt.value
        thisDateIt = dates.next()
        if (thisDateIt.done == true) {

            if (seqDate > mostSeq) {
                mostSeq = seqDate

                mostStart = startDate
                mostEnd = prevDate
            }
            startDate = thisDateIt.value
            break
        }
        let tempDate = Number(thisDateIt.value.split('/')[1])
        if (tempDate == thisDate + 1) {

            ++seqDate
        } else {
            if (seqDate > mostSeq) {
                mostSeq = seqDate

                mostStart = startDate
                mostEnd = prevDate
            }
            startDate = thisDateIt.value
            seqDate = 1
        }
        thisDate = tempDate
    }
    return { val: mostSeq, date: mostStart + "-" + mostEnd }
}

function getCoupleAverage(coupleMap) {

    let num = 0
    let keys = Object.keys(coupleMap)
    for (let idx = 0; idx < keys.length; idx++) {
        num += coupleMap[keys[idx]]
    }
    return num / keys.length
}

for (const key in dataBonus) {
    dataScores.push({
        score: dataBonus[key] + dataCoOccuranceList[key].size + dataFirstContact[key].size,
        name: key,
        host: summaryHost[key],
        crowdHost: summaryCrowdHost[key],
        crowdParticipate: summaryCrowdParticipate[key],
        date: summaryDate[key],
        dateSeq: getSequenceDate(summaryDate[key]).val,
        dateSeqVal: getSequenceDate(summaryDate[key]).date,
        participate: summaryParticipate[key],
        couple: summaryNumOfCouple[key],
        aveCouple: getCoupleAverage(summaryNumOfCouple[key]),
        simpleCount: summaryHost[key] + summaryParticipate[key],
        bonus: dataBonus[key] + dataFirstContact[key].size,
        bonusPure: dataBonus[key],
        firstContact: dataFirstContact[key]


    })
}

// console.log(dataScores)


dataScores.sort(function(a, b) {
    return a.score > b.score ? -1 : a.score < b.score ? 1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
})

// console.log("dataSchedules", dataSchedules)
// console.log("dataCoOccuranceList", dataCoOccuranceList)
// console.log("dataBonus", dataBonus)

let tlbTopBoard = document.getElementById("tlbTopBoard")
let rankingIdx = 1
let prevRankingIdx = 0
let prevScore = 0
dataScores.forEach(elem => {
    let tr = document.createElement('tr')
    tlbTopBoard.appendChild(tr)
    if (rankingIdx == 1 || rankingIdx == 11 || rankingIdx == 21 || rankingIdx == 31) {

        tr.style.backgroundColor = "yellow"

    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        if (prevScore != elem.score) {
            td.innerHTML = rankingIdx

        } else {
            td.innerHTML = prevRankingIdx
        }
        prevRankingIdx = td.innerHTML
        rankingIdx += 1
        prevScore = elem.score


    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.name
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        let tmpVal = elem.score + " = " + (dataCoOccuranceList[elem.name].size) + " (함께한 사람수)"
        if (elem.score - dataCoOccuranceList[elem.name].size > 0) {
            tmpVal = tmpVal + " + " + (elem.score - dataCoOccuranceList[elem.name].size) + " (가산점)"
        }
        td.innerHTML = tmpVal
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        let tmpVal = ""
        dataCoOccuranceList[elem.name].forEach(elem2 => {
            tmpVal += "<span"
            if (dataFirstContact[elem.name].has(elem2) == true) {
                tmpVal += " class='colorRed'"
            }
            tmpVal += ">"
            tmpVal += elem2
            tmpVal += "</span> "

        })
        td.innerHTML = tmpVal
    }
})

let tblSchdules = document.getElementById("tblSchdules")
dataSchedules.forEach(elem => {
    let tr = document.createElement('tr')
    tblSchdules.appendChild(tr)

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem[DATE]
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        if (elem[PUBLIC] == true) {
            td.innerHTML = "Y"
        } else {
            td.innerHTML = "N"
        }
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem[PARTICIPANTS][0]
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        let tmpVal = ""
        for (let idx = 1; idx < elem[PARTICIPANTS].length; idx++) {
            tmpVal += (elem[PARTICIPANTS][idx] + " ")
        }
        td.innerHTML = tmpVal
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.setAttribute("class", "colorRed")
        let tmpVal = ""
        if (elem[FIRSTCONTACT] != undefined) {
            //console.log(elem[FIRSTCONTACT])
            elem[FIRSTCONTACT].forEach(elem2 => {

                let firstUserIdx = Math.floor(elem2 / 10)
                let secondUserIdx = elem2 % 10
                let user1 = elem[PARTICIPANTS][firstUserIdx - 1].trim()
                let user2 = elem[PARTICIPANTS][secondUserIdx - 1].trim()
                tmpVal += " (" + user1 + ", " + user2 + ") "
            })
        }
        td.innerHTML = tmpVal
    }


})

console.log("score", dataScores)


let tlbTarget = document.getElementById("tlbFinalScore")
let idx = 0
let shownIdx = 0

prevScore = 0
while (true) {
    let elem = dataScores[idx]

    if (idx >= summaryNumber) {
        if (prevScore != elem.score) {
            break
        }
    }
    if (prevScore != elem.score) {
        ++shownIdx
    }
    prevScore = elem.score

    ++idx


    let tr = document.createElement('tr')
    tlbTarget.appendChild(tr)

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = idx

    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.name
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        let tmpVal = elem.score + " = " + (dataCoOccuranceList[elem.name].size) + " (함께한 사람수)"
        if (elem.score - dataCoOccuranceList[elem.name].size > 0) {
            tmpVal = tmpVal + " + " + (elem.score - dataCoOccuranceList[elem.name].size) + " (가산점)"
        }
        td.innerHTML = tmpVal
    }

}


dataScores.sort(function(a, b) {
    return a.simpleCount > b.simpleCount ? -1 : a.simpleCount < b.simpleCount ? 1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
})

console.log("simpleCount", dataScores)

tlbTarget = document.getElementById("tlbFinalSimpleCount")
idx = 0
prevScore = 0
shownIdx = 0
while (true) {
    let elem = dataScores[idx]

    if (idx >= summaryNumber) {
        if (prevScore != elem.simpleCount) {
            break
        }
    }
    if (prevScore != elem.simpleCount) {
        ++shownIdx
    }

    prevScore = elem.simpleCount


    ++idx


    let tr = document.createElement('tr')
    tlbTarget.appendChild(tr)

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = shownIdx

    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.name
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.simpleCount
    }

}


dataScores.sort(function(a, b) {
    return a.dateSeq > b.dateSeq ? -1 : a.dateSeq < b.dateSeq ? 1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
})

console.log("dateSeq", dataScores)

tlbTarget = document.getElementById("tlbFinalSeq")
idx = 0
prevScore = 0
shownIdx = 0

while (true) {
    let elem = dataScores[idx]

    if (idx >= summaryNumber) {
        if (prevScore != elem.dateSeq) {
            break
        }
    }
    if (prevScore != elem.dateSeq) {
        ++shownIdx
    }
    prevScore = elem.dateSeq

    ++idx


    let tr = document.createElement('tr')
    tlbTarget.appendChild(tr)

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = shownIdx

    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.name
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.dateSeq + "일 (" + elem.dateSeqVal + ")"
    }

}


dataScores.sort(function(a, b) {
    return a.bonus > b.bonus ? -1 : a.bonus < b.bonus ? 1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
})

console.log("bonus", dataScores)

tlbTarget = document.getElementById("tlbFinalBonus")
idx = 0
prevScore = 0
shownIdx = 0

while (true) {
    let elem = dataScores[idx]

    if (idx >= summaryNumber) {
        if (prevScore != elem.bonus) {
            break
        }
    }
    if (prevScore != elem.bonus) {
        ++shownIdx
    }
    prevScore = elem.bonus

    ++idx


    let tr = document.createElement('tr')
    tlbTarget.appendChild(tr)

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = shownIdx

    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.name
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.bonus + " = " + (elem.bonus - elem.bonusPure) + " (처음한 사람 추가점) + " + elem.bonusPure + " (모집글 관련 추가점)"
    }

}



dataScores.sort(function(a, b) {
    return a.host > b.host ? -1 : a.host < b.host ? 1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
})

console.log("host", dataScores)

tlbTarget = document.getElementById("tlbFinalhost")
idx = 0
prevScore = 0
shownIdx = 0

while (true) {
    let elem = dataScores[idx]

    if (idx >= summaryNumber) {
        if (prevScore != elem.host) {
            break
        }
    }
    if (prevScore != elem.host) {
        ++shownIdx
    }
    prevScore = elem.host

    ++idx


    let tr = document.createElement('tr')
    tlbTarget.appendChild(tr)

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = shownIdx

    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.name
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.host + "회"
    }

}


dataScores.sort(function(a, b) {
    return a.participate - a.host > b.participate - b.host ? -1 : a.participate - a.host < b.participate - b.host ? 1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
})

console.log("핑프", dataScores)

tlbTarget = document.getElementById("tlbFinalPinkP")
idx = 0
prevScore = 0
shownIdx = 0

while (true) {
    let elem = dataScores[idx]

    if (idx >= summaryNumber) {
        if (prevScore != elem.participate - elem.host) {
            break
        }
    }
    if (prevScore != elem.participate - elem.host) {
        ++shownIdx
    }
    prevScore = elem.participate - elem.host

    ++idx


    let tr = document.createElement('tr')
    tlbTarget.appendChild(tr)

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = shownIdx

    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.name
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.participate - elem.host + "회"
    }

}


dataScores.sort(function(a, b) {
    return a.aveCouple < b.aveCouple ? -1 : a.aveCouple > b.aveCouple ? 1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
})


console.log("tlbFinalNewFace", dataScores)

tlbTarget = document.getElementById("tlbFinalNewFace")
idx = 0
prevScore = 0
shownIdx = 0
let entryIdx = 0

while (true) {
    let elem = dataScores[idx]
    if (elem.simpleCount < 5) {
        ++idx
        continue
    }

    if (entryIdx >= summaryNumber) {
        if (prevScore != elem.aveCouple) {
            break
        }
    }
    if (prevScore != elem.aveCouple) {
        ++shownIdx
    }
    prevScore = elem.aveCouple

    ++idx
    ++entryIdx


    let tr = document.createElement('tr')
    tlbTarget.appendChild(tr)

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = shownIdx

    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.name
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        let idxTempVal = 0
        let tempVal = Math.round(elem.aveCouple * 100) / 100 + "회 <br>( "
        for (let p in elem.couple) {
            if (idxTempVal % 4 == 3) {
                //tempVal += "<br>"
            }
            tempVal += (p + ":" + elem.couple[p] + "회 ")

            ++idxTempVal

        }

        td.innerHTML = tempVal + " )"
    }

}


dataScores.sort(function(a, b) {
    return a.aveCouple > b.aveCouple ? -1 : a.aveCouple < b.aveCouple ? 1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
})


console.log("tlbFinalOldFace", dataScores)

tlbTarget = document.getElementById("tlbFinalOldFace")
idx = 0
prevScore = 0
shownIdx = 0
entryIdx = 0

while (true) {
    let elem = dataScores[idx]
    if (elem.simpleCount < 5) {
        ++idx
        continue
    }

    if (entryIdx >= summaryNumber) {
        if (prevScore != elem.aveCouple) {
            break
        }
    }
    if (prevScore != elem.aveCouple) {
        ++shownIdx
    }
    prevScore = elem.aveCouple

    ++idx
    ++entryIdx


    let tr = document.createElement('tr')
    tlbTarget.appendChild(tr)

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = shownIdx

    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.name
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        let idxTempVal = 0
        let tempVal = Math.round(elem.aveCouple * 100) / 100 + "회 <br>( "
        for (let p in elem.couple) {
            if (idxTempVal % 4 == 3) {
                //tempVal += "<br>"
            }
            tempVal += (p + ":" + elem.couple[p] + "회 ")

            ++idxTempVal

        }

        td.innerHTML = tempVal + " )"
    }

}



dataScores.sort(function(a, b) {
    return a.firstContact.size > b.firstContact.size ? -1 : a.firstContact.size < b.firstContact.size ? 1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0
})


console.log("tlbFinalNewHunter", dataScores)

tlbTarget = document.getElementById("tlbFinalNewHunter")
idx = 0
prevScore = 0
shownIdx = 0
entryIdx = 0

while (true) {
    let elem = dataScores[idx]
    if (elem.simpleCount < 5) {
        ++idx
        continue
    }

    if (entryIdx >= summaryNumber) {
        if (prevScore != elem.firstContact.size) {
            break
        }
    }
    if (prevScore != elem.firstContact.size) {
        ++shownIdx
    }
    prevScore = elem.firstContact.size

    ++idx
    ++entryIdx


    let tr = document.createElement('tr')
    tlbTarget.appendChild(tr)

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = shownIdx

    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        td.innerHTML = elem.name
    }

    {
        let td = document.createElement('td')
        tr.appendChild(td)
        let idxTempVal = 0
        let tempVal = elem.firstContact.size + "명 <br>( "
        for (let p of elem.firstContact) {
            if (idxTempVal % 5 == 4) {
                //tempVal += "<br>"
            }
            tempVal += (p + " ")

            ++idxTempVal

        }

        td.innerHTML = tempVal + " )"
    }

}

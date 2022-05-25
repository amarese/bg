funcWidthPerHeight(0)

funcUpdatePageSize(true)


let cluesArr = []
for (let idx = 0; idx < 201; idx++) {
    cluesArr[idx] = (idx + 1)
}

let meansArr = []
for (let idx = 0; idx < 90; idx++) {
    meansArr[idx] = (idx + 1)
}

let seedNumber = 1008
seedNumber = prompt("방번호 입력")
let numOfPlayers = seedNumber % 100
if (!(numOfPlayers >= 4 && numOfPlayers <= 12)) {
    numOfPlayers = 8
}
MMath.seedrandom(seedNumber)

funcSortArr(cluesArr)
funcSortArr(meansArr)

checkArr = [
    [],
    []
]

function funcBorder(idx1, idx2) {
    if (checkArr[idx1][idx2].style.border == "0px" || checkArr[idx1][idx2].style.border == "") {
        checkArr[idx1][idx2].style.border = "10px red dotted"
    } else {
        checkArr[idx1][idx2].style.border = "0px"

    }
    for (let idx = 0; idx < 4; idx++) {
        if (idx == idx2) {
            continue
        }
        checkArr[idx1][idx].style.border = "0px"
    }

}
let btnChangeP = []

function funcChangePlayer(curPlayer) {
    let curFontSize
    for (let idx = 0; idx < numOfPlayers; idx++) {
        if (idx != curPlayer) {
            curFontSize = Number(btnChangeP[idx].style.fontSize.replace("px", ""))
        }
        btnChangeP[idx].style.color = "black"
        btnChangeP[idx].innerHTML = idx + 1
    }
    for (let idx = 0; idx < numOfPlayers; idx++) {
        btnChangeP[idx].style.fontSize = curFontSize + "px"
        if (idx == curPlayer) {
            btnChangeP[idx].style.fontSize = curFontSize / 2 + "px"
        }
    }
    btnChangeP[curPlayer].style.color = "red"
    btnChangeP[curPlayer].innerHTML = seedNumber
    for (let idx = 0; idx < 4; idx++) {
        let clueNumber = cluesArr[4 * curPlayer + idx]
        checkArr[0][idx].style.backgroundImage = "url('img/deception/clues" + " (" + clueNumber + ").png')"
        checkArr[0][idx].style.border = "0px"
            //checkArr[0][idx].innerHTML = clueNumber
            //checkArr[0][idx].style.fontSize = "20px"

        let meanNumber = meansArr[4 * curPlayer + idx]
        checkArr[1][idx].style.backgroundImage = "url('img/deception/means" + " (" + meanNumber + ").png')"
        checkArr[1][idx].style.border = "0px"
            //checkArr[1][idx].innerHTML = meanNumber
            //checkArr[1][idx].style.fontSize = "20px"
    }

}

function funcDrawDeception() {
    funcInsertFullScreenButton(0.01, 0.01, 0.09, 0.10)

    for (let idx = 0; idx < numOfPlayers; idx++) {
        btnChangeP[idx] = funcInsertElement("changePlayerBtn_" + idx, "button", "btnTrans",
            0.01, 0.1 + idx / numOfPlayers * 0.9,
            0.09, 0.1 + (1 + idx) / numOfPlayers * 0.9
        )
        btnChangeP[idx].onclick = function() { funcChangePlayer(idx) }
        btnChangeP[idx].innerHTML = (idx + 1)
    }

    for (let idx = 0; idx < 4; idx++) {
        checkArr[0][idx] = funcInsertElement(
            "checkBtn" + 0 + "_" + idx,
            "button",
            "btnTrans",
            0.1 + idx * 0.225,
            0.00,
            0.1 + idx * 0.225 + 0.22,
            0.50
        )
        checkArr[0][idx].onclick = function() {
            funcBorder(0, idx)
        }


        checkArr[1][idx] = funcInsertElement(
            "checkBtn" + 1 + "_" + idx,
            "button",
            "btnTrans",
            0.1 + idx * 0.225,
            0.50,
            0.1 + idx * 0.225 + 0.22,
            1.0
        )
        checkArr[1][idx].onclick = function() {
            funcBorder(1, idx)
        }
    }
    funcChangePlayer(0)
}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawDeception()
});

funcDrawDeception()

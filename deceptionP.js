funcWidthPerHeight(0)

funcUpdatePageSize(true)

let flagFigure = true;

if (flagFigure == false) {
    document.getElementsByClassName('bgdiv')[0].style.backgroundImage = "url('')"
}


let cluesArr = []
for (let idx = 0; idx < 201; idx++) {
    cluesArr[idx] = (idx + 1)
}

let meansArr = []
for (let idx = 0; idx < 90; idx++) {
    meansArr[idx] = (idx + 1)
}

let seedNumber = 1008
if (flagFigure == true) {
    seedNumber = prompt("방번호 입력")
}
let numOfPlayers = seedNumber % 100
if (!(numOfPlayers >= 4 && numOfPlayers <= 12)) {
    numOfPlayers = 8
}
MMath.seedrandom(seedNumber)

funcSortArr(cluesArr)
funcSortArr(meansArr)

let checkArr = [
    [],
    []
]

let allCheckArr = null
let allCheckID = []

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
    let maxBottom = 0
    let maxRight = 0


    if (curPlayer == numOfPlayers) {
        for (let idx = 0; idx < 2; idx++) {
            for (let idx2 = 0; idx2 < 4; idx2++) {
                checkArr[idx][idx2].style.display = "none"
            }
        }
        for (let idx = 0; idx < numOfPlayers; idx++) {
            for (let idx2 = 0; idx2 < 8; idx2++) {
                allCheckArr[idx][idx2].style.display = 'inline'
                let clueNumber = cluesArr[4 * idx + idx2]
                let meanNumber = meansArr[4 * idx + idx2 - 4]

                if (flagFigure) {
                    if (idx2 < 4)
                        allCheckArr[idx][idx2].style.backgroundImage = "url('img/deception/clues" + " (" + clueNumber + ").png')"
                    else
                        allCheckArr[idx][idx2].style.backgroundImage = "url('img/deception/means" + " (" + meanNumber + ").png')"
                } else {
                    if (idx2 < 4)
                        allCheckArr[idx][idx2].innerHTML = "clues" + " (" + clueNumber + ").png"
                    else
                        allCheckArr[idx][idx2].innerHTML = "means" + " (" + meanNumber + ").png"

                    allCheckArr[idx][idx2].style.fontSize = "15px"

                }

                if (maxBottom < allCheckArr[idx][idx2].getBoundingClientRect()['bottom']) {
                    maxBottom = allCheckArr[idx][idx2].getBoundingClientRect()['bottom']
                }
                if (maxRight < allCheckArr[idx][idx2].getBoundingClientRect()['right']) {
                    maxRight = allCheckArr[idx][idx2].getBoundingClientRect()['right']
                }

            }
            allCheckID[idx].style.display = 'inline'


        }
    } else {
        for (let idx = 0; idx < 2; idx++) {
            for (let idx2 = 0; idx2 < 4; idx2++) {
                checkArr[idx][idx2].style.display = "inline"

                if (maxRight < checkArr[idx][idx2].getBoundingClientRect()['right']) {
                    maxRight = checkArr[idx][idx2].getBoundingClientRect()['right']
                }

            }
        }
        for (let idx = 0; idx < numOfPlayers; idx++) {
            for (let idx2 = 0; idx2 < 8; idx2++) {
                allCheckArr[idx][idx2].style.display = 'none'
            }
            allCheckID[idx].style.display = 'none'
        }

    }
    let curFontSize = 0
    for (let idx = 0; idx <= numOfPlayers; idx++) {
        if (idx != curPlayer) {
            if (curFontSize < Number(btnChangeP[idx].style.fontSize.replace("px", ""))) {
                curFontSize = Number(btnChangeP[idx].style.fontSize.replace("px", ""))
            }
        }
        btnChangeP[idx].style.color = "black"
        btnChangeP[idx].innerHTML = idx + 1
        if (idx == numOfPlayers) {
            btnChangeP[idx].innerHTML = "A"

            maxBottom = btnChangeP[idx].getBoundingClientRect()['bottom']
        }


    }
    for (let idx = 0; idx <= numOfPlayers; idx++) {
        btnChangeP[idx].style.fontSize = curFontSize + "px"
        if (idx == curPlayer) {
            btnChangeP[idx].style.fontSize = curFontSize / 2 + "px"
        }
    }
    btnChangeP[curPlayer].style.color = "red"
    btnChangeP[curPlayer].innerHTML = seedNumber
    for (let idx = 0; idx < 4; idx++) {
        let clueNumber = cluesArr[4 * curPlayer + idx]
        if (flagFigure == true) {
            checkArr[0][idx].style.backgroundImage = "url('img/deception/clues" + " (" + clueNumber + ").png')"
        } else {
            checkArr[0][idx].innerHTML = "clues" + " (" + clueNumber + ").png"
            checkArr[0][idx].style.fontSize = "15px"
        }
        checkArr[0][idx].style.border = "0px"
            //checkArr[0][idx].innerHTML = clueNumber
            //checkArr[0][idx].style.fontSize = "20px"

        let meanNumber = meansArr[4 * curPlayer + idx]
        if (flagFigure == true) {
            checkArr[1][idx].style.backgroundImage = "url('img/deception/means" + " (" + meanNumber + ").png')"
        } else {
            checkArr[1][idx].innerHTML = "means" + " (" + meanNumber + ").png"
            checkArr[1][idx].style.fontSize = "15px"
        }
        checkArr[1][idx].style.border = "0px"
            //checkArr[1][idx].innerHTML = meanNumber
            //checkArr[1][idx].style.fontSize = "20px"
    }

    console.log(maxRight, maxBottom)
    mainDiv.style.height = maxBottom + "px"
    mainDiv.style.width = maxRight + "px"
    mainDiv.style.backgroundSize = maxRight + "px " + maxBottom + "px"


}



function funcDrawDeception() {
    funcInsertFullScreenButton(0.01, 0.01, 0.09, 0.10)
    if (allCheckArr == null) {
        allCheckArr = []
        for (let idx = 0; idx < numOfPlayers; idx++) {
            allCheckArr[idx] = []
            allCheckID[idx] = funcInsertElement(
                    "allCheckIDBtn" + idx,
                    "button",
                    "btnTrans",
                    0.1 + idx * 0.24,
                    0.005,
                    0.1 + idx * 0.24 + 0.22,
                    0.1
                )
                //allCheckID[idx].style.display = "none"
            allCheckID[idx].innerHTML = (idx + 1)
            for (let idx2 = 0; idx2 < 4; idx2++) {
                allCheckArr[idx][idx2] = funcInsertElement(
                    "allCheckBtn" + idx + "_" + idx2,
                    "button",
                    "btnTrans",
                    0.1 + idx * 0.24,
                    0.1 + 0.9 * (1 / 4 * idx2 + 0.005),
                    0.1 + idx * 0.24 + 0.11 - 0.0025,
                    0.1 + 0.9 * (1 / 4 * (idx2 + 1) - 0.005)
                )

                allCheckArr[idx][4 + idx2] = funcInsertElement(
                        "allCheckBtn" + idx + "_" + (4 + idx2),
                        "button",
                        "btnTrans",
                        0.1 + idx * 0.24 + 0.11 + 0.0025,
                        0.1 + 0.9 * (1 / 4 * idx2 + 0.005),
                        0.1 + idx * 0.24 + 0.22,
                        0.1 + 0.9 * (1 / 4 * (idx2 + 1) - 0.005)
                    )
                    //allCheckArr[idx][idx2].style.display = "none"
            }

        }
    }

    for (let idx = 0; idx <= numOfPlayers; idx++) {
        btnChangeP[idx] = funcInsertElement("changePlayerBtn_" + idx, "button", "btnTrans",
            0.01, 0.1 + idx / numOfPlayers * 0.9,
            0.09, 0.1 + (1 + idx) / numOfPlayers * 0.9
        )
        btnChangeP[idx].onclick = function() { funcChangePlayer(idx) }
        btnChangeP[idx].innerHTML = (idx + 1)
        if (idx == numOfPlayers) {
            btnChangeP[idx].innerHTML = "A"
        }
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
}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawDeception()
});

funcDrawDeception()
funcChangePlayer(numOfPlayers)

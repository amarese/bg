funcWidthPerHeight(0)

funcUpdatePageSize(true)

let usedTile = []
for (let idx = 0; idx < 21; idx++) {
    usedTile[idx] = idx + 1
}

let seedValue = prompt("방번호 입력")

MMath.seedrandom(seedValue);
let startLoc = MMath.getRandom(1, 4)

funcSortArr(usedTile)
let curLoc = 0
let checkArr = [
    [],
    [],
    [],
    [],
    [],
    []
]

function drawHintTiles(thisTile) {
    val = usedTile[curLoc++]
    console.log(val)

    thisTile.style.backgroundImage = "url('img/deception/hinttiles (" + val + ").png')"

    // thisTile.innerHTML = val
    // thisTile.style.fontSize = "20px"
}

function funcDrawDeception() {
    for (let idx = 0; idx < 6; idx++) {
        let thisTile = funcInsertElement(
            "tiles" + idx,
            "button",
            "btnTrans",
            0.01 + idx * 1 / 6, 0.05, 0.01 + (idx + 1) * 1 / 6 - 0.02, 0.95
        )
        if (idx == 0) {
            thisTile.style.backgroundImage = "url('img/deception/reasontiles.jpg')"
        } else if (idx == 1) {
            let val = startLoc

            thisTile.style.backgroundImage = "url('img/deception/loctiles (" + val + ").jpg')"
                // thisTile.innerHTML = val
                // thisTile.style.fontSize = "20px"
            thisTile.onclick = function() {
                let res = confirm("바꾸겠습니까?")
                if (res != true) {
                    return
                }
                drawHintTiles(thisTile)
                fittedval = 0.122
                for (let idx2 = 0; idx2 < 6; idx2++) {

                    //checkArr[idx][idx2].style.border="0px"
                    checkArr[idx][idx2] = funcInsertElement(
                        "checkBtn" + idx + "_" + idx2,
                        "button",
                        "btnTrans",
                        0.015 + idx * 1 / 6,
                        0.23 + idx2 * fittedval, 0.005 + (idx + 1) * 1 / 6 - 0.02,
                        0.23 + idx2 * fittedval + 0.1
                    )

                }
            }
        } else {
            drawHintTiles(thisTile)
            thisTile.onclick = function() {
                let res = confirm("바꾸겠습니까?")
                if (res != true) {
                    return
                }
                drawHintTiles(thisTile)
                for (let idx2 = 0; idx2 < 6; idx2++) {
                    checkArr[idx][idx2].style.border = "0px"
                }
            }
        }

        for (let idx2 = 0; idx2 < 6; idx2++) {
            let fittedval = 0.125
            if (idx > 1) {
                fittedval = 0.122
            }
            checkArr[idx][idx2] = funcInsertElement(
                "checkBtn" + idx + "_" + idx2,
                "button",
                "btnTrans",
                0.015 + idx * 1 / 6,
                0.23 + idx2 * fittedval, 0.005 + (idx + 1) * 1 / 6 - 0.02,
                0.23 + idx2 * fittedval + 0.1
            )
            checkArr[idx][idx2].onclick = function() {
                for (let idx2 = 0; idx2 < 6; idx2++) {
                    checkArr[idx][idx2].style.border = "0px"
                }
                checkArr[idx][idx2].style.border = "3px red dotted"
            }
        }

    }
}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawDeception()
});

funcDrawDeception()

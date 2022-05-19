funcWidthPerHeight(1400/870)

funcUpdatePageSize(true)

let playerChips = [0,0,0,0,0,0]
let gameStart = false
let numOfPlayers=0
let playerBtns = []
let betArea = [[],[],[],[],[],[]]

function funcPlayerBtnClick(e, idx) {
    
    if (gameStart == false && playerChips[idx]==0){
        ++numOfPlayers
        e.innerHTML = "44"
        playerChips[idx] = 44
    }
}

function funcBetBtnClick(e,idx,idx2){
    gameStart = true

    if (playerChips[idx] >= 2) {
        playerChips[idx] -= 2
        playerBtns[idx].innerHTML = playerChips[idx]
        betArea[idx][idx2]+=2
        e.innerHTML = betArea[idx][idx2]
    }

}

function funcDraw(){
    let arrBox = [0.18, 0.144, 0.254, 0.26]
    

    let leftTic = arrBox[2] - arrBox[0] +0.00124 
    let topTic = arrBox[3] - arrBox[1] +0.0025
    let playerLocMod= -0.11
    let foldMod = 0.7525
    for (let idx = 0; idx < 6; idx++) {
        let btnTemp = funcInsertElement("PlayerBtn" + idx, "button", "btnTrans",
            arrBox[0] + playerLocMod,
            arrBox[1] + idx * topTic,
            arrBox[2] + playerLocMod,
            arrBox[3] + idx * topTic
        )
        playerBtns[idx] = btnTemp
        btnTemp.style.fontSize = Number(btnTemp.style.fontSize.replace('px',''))*0.7+"px"
        btnTemp.onclick = function () {
            funcPlayerBtnClick(btnTemp,idx)
        }

        let foldBtn = funcInsertElement("FoldBtn" + idx, "button", "btnTrans",
        arrBox[0] + foldMod,
        arrBox[1] + idx * topTic+0.03,
        arrBox[2] + foldMod - 0.02,
        arrBox[3] + idx * topTic-0.04
    )
    foldBtn.innerHTML="FOLD"
    //foldBtn.style.backgroundImage = 'url("img/pandante/fold.png")'

        for (let idx2 = 0; idx2 < 10; idx2++) {

            let btnTemp = funcInsertElement("betBtn" + idx + "_" + idx2, "button", "btnTrans",
                arrBox[0] + idx2 * leftTic,
                arrBox[1] + idx * topTic,
                arrBox[2] + idx2 * leftTic,
                arrBox[3] + idx * topTic
                )
            betArea[idx][idx2]=0
            btnTemp.onclick=function(){
                    funcBetBtnClick(btnTemp,idx,idx2)
                }
        }
        
        
    }
    
}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDraw()
});

funcDraw()

funcPrepareGetLocation()
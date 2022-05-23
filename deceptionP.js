funcWidthPerHeight(0)

funcUpdatePageSize(true)

let usedClues = []
for (let idx = 0; idx < 201; idx++) {
    usedClues[idx]=false
}

let usedMeans = []
for (let idx = 0; idx < 90; idx++) {
    usedMeans[idx]=false
}

let checkArr = [[],[]]

function change(btn,max,which) {
    let min = 1
    let val = Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
    while (usedClues[val] == true) {
        val = Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
    }

    btn.style.backgroundImage = "url('img/deception/"+which+" ("+val+").png')"
}

function funcDrawDeception(){
    for (let idx = 0; idx < 4; idx++) {
        checkArr[0][idx] = funcInsertElement(
            "checkBtn" + 0+"_"+idx,
            "button",
            "btnTrans",
            0.01+idx*1/4,
            0.05,
            0.01+idx*1/4 + 0.235,
            0.45
        )
        checkArr[0][idx].onclick = function(){
            let res = confirm("바꾸겠습니까?")
            if (res!=true){
                return
            }
            change(checkArr[0][idx],90,"means")
        }
        change(checkArr[0][idx],90,"means")

        checkArr[1][idx] = funcInsertElement(
            "checkBtn" + 1+"_"+idx,
            "button",
            "btnTrans",
            0.01+idx*1/4,
            0.55,
            0.01+idx*1/4 + 0.235,
            0.95
        )
        checkArr[1][idx].onclick = function(){
            let res = confirm("바꾸겠습니까?")
            if (res!=true){
                return
            }
            change(checkArr[1][idx],201,"clues")
        }
        change(checkArr[1][idx],201,"clues")
        
    }
}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawDeception()
});

funcDrawDeception()
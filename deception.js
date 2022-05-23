funcWidthPerHeight(0)

funcUpdatePageSize(true)

let usedTile = []
for (let idx = 0; idx < 21; idx++) {
    usedTile[idx]=false
}

let checkArr = [[],[],[],[],[],[]]

function drawHintTiles(thisTile){
    let min = 1
    let max = 21
    let val = Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
    let count = 0
    while (usedTile[val]==true){
        val++
        if (val==22){
            val=1
        }
        count++
        if (count==10000){
            break
        }
    }
    usedTile[val]=true
    thisTile.style.backgroundImage = "url('img/deception/hinttiles ("+val+").png')"
}
function funcDrawDeception(){
    for (let idx = 0; idx < 6; idx++) {
        let thisTile = funcInsertElement(
            "tiles" + idx,
            "button",
            "btnTrans",
            0.01+idx*1/6, 0.05, 0.01+(idx+1)*1/6-0.02, 0.95
        )
        if (idx == 0){
            thisTile.style.backgroundImage = "url('img/deception/reasontiles.jpg')"
        }
        else if (idx == 1){
            let val =  Math.floor(Math.random() * (4 - 1 + 1)) + 1;
            console.log("url(img/deception/loctiles ("+val+").jpg)")
            
            thisTile.style.backgroundImage = "url('img/deception/loctiles ("+val+").jpg')"
            thisTile.onclick = function() {
                let res = confirm("바꾸겠습니까?")
                if (res!=true){
                    return
                }
                drawHintTiles(thisTile)
                fittedval = 0.122
                for (let idx2 = 0; idx2 < 6; idx2++) {
                    
                    //checkArr[idx][idx2].style.border="0px"
                    checkArr[idx][idx2]= funcInsertElement(
                        "checkBtn" + idx+"_"+idx2,
                        "button",
                        "btnTrans",
                        0.015+idx*1/6, 
                        0.23 + idx2*fittedval, 0.005+(idx+1)*1/6-0.02, 
                        0.23 + idx2*fittedval+0.1
                    )
                    
                }
            }
        }
        else{
            drawHintTiles(thisTile)
            thisTile.onclick = function() {
                let res = confirm("바꾸겠습니까?")
                if (res!=true){
                    return
                }
                drawHintTiles(thisTile)
                for (let idx2 = 0; idx2 < 6; idx2++) {
                    checkArr[idx][idx2].style.border="0px"
                }
            }
        }

        for (let idx2 = 0; idx2 < 6; idx2++) {
            let fittedval = 0.125
            if (idx>1){
                fittedval = 0.122
            }
            checkArr[idx][idx2]= funcInsertElement(
                "checkBtn" + idx+"_"+idx2,
                "button",
                "btnTrans",
                0.015+idx*1/6, 
                0.23 + idx2*fittedval, 0.005+(idx+1)*1/6-0.02, 
                0.23 + idx2*fittedval+0.1
            )
            checkArr[idx][idx2].onclick = function(){
                for (let idx2 = 0; idx2 < 6; idx2++) {
                    checkArr[idx][idx2].style.border="0px"
                }
                checkArr[idx][idx2].style.border="3px red dotted"
            }
        }
        
    }
}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawDeception()
});

funcDrawDeception()
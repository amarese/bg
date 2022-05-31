funcWidthPerHeight(0)

MMath.seedrandom(0)
let newSeed = prompt("방번호를 입력하세요.")
if (seed!=null){
    MMath.seedrandom(newSeed)
}

var cardSetNumbers = []
cardSetNumbers[0] = [1,2,4,5,5,6,7,7,8,8,9,9,10,11,11,12,14,15]
cardSetNumbers[1] = [1,2,3,5,5,6,6,7,8,8,9,10,10,11,11,13,14,15]
cardSetNumbers[2] = [3,4,6,7,8,9,10,12,13]
var cardTypes = []
cardTypes[0] = ['L','E']
cardTypes[1] = ['F']
cardTypes[2] = ['P','B','A']
var cardArr = new Array()

let remainingCards={} // 남아있는 카드 표시

for (let idx = 0; idx < 3; idx++) {
    for (let idx2 = 0; idx2 < cardTypes[idx].length; idx2++) {
        for (let idx3 = 0; idx3 < cardSetNumbers[idx].length; idx3++) {
            cardArr.push(cardTypes[idx][idx2]+cardSetNumbers[idx][idx3])            
            if (remainingCards[cardTypes[idx][idx2]]==null){
                remainingCards[cardTypes[idx][idx2]]=0
            }
            if (remainingCards[cardSetNumbers[idx][idx3]]==null){
                remainingCards[cardSetNumbers[idx][idx3]]=0
            }
            
            remainingCards[cardTypes[idx][idx2]]++
            remainingCards[cardSetNumbers[idx][idx3]]++
        }        
    }
}



let curIdx = 0
funcSortArr(cardArr)

funcUpdatePageSize(true)

let curCards = []
let nextCards = []

let goal=[MMath.getRandom(1,11),MMath.getRandom(1,11),MMath.getRandom(1,6)]

let leftMargin = 0.01
let topMargin = 0.01
let cardHeight = 0.55
let cardWidth = 0.20
let gapVertical = 0.23
let gapHeight = 0.43
let modVertical = 0.015

let gleftMargin = 0.84
let gtopMargin = 0.01
let gcardHeight = 0.315
let gcardWidth = 0.15
let ggapHeight = 0.333
let goalCards = []
let accomplish =[false,false,false]

let rleftMargin = 0.70
let rtopMargin = 0.01
let rcardHeight = 0.1
let rcardWidth = 0.13
let rgapHeight = 1/21*0.98
let remainBtns = []

function insertElement(){

    let rollbackBtn = funcInsertElement(
        "rollback",
        "button",
        "btnTrans",
        rleftMargin,
        rtopMargin,
        rleftMargin+rcardWidth,
        rtopMargin+rcardHeight
    )
    rollbackBtn.innerHTML = "취소"
    rollbackBtn.onclick=function(){
        let res = confirm("취소하시겠습니까?")
        if (res==true){
            if (curIdx>6){
                curIdx -= 6
                funcCardDraw()
            }
        }
    }
    for (let idx = 0; idx < 3; idx++) {
        nextCards[idx]=funcInsertElement(
            "btnNextCards"+idx,
            "button",
            "btnTrans",
            modVertical+leftMargin + gapVertical*idx,
            topMargin + gapHeight,
            modVertical+leftMargin + gapVertical*idx+cardWidth,
            topMargin+ gapHeight+cardHeight
        )

        nextCards[idx].onclick = funcCardDraw
        
        curCards[idx]=funcInsertElement(
            "btnCurCards"+idx,
            "button",
            "btnTrans",
            leftMargin + gapVertical*idx,
            topMargin,
            leftMargin + gapVertical*idx+cardWidth,
            topMargin+cardHeight
        )    
        curCards[idx].onclick = funcCardDraw

        goalCards[idx]=funcInsertElement(
            "btnGoalCards"+idx,
            "button",
            "btnTrans",
            gleftMargin, 
            gtopMargin + ggapHeight*idx,
            gleftMargin+gcardWidth,
            gtopMargin + ggapHeight*idx+gcardHeight
        )
        goalCards[idx].onclick = function(){
            if (accomplish[idx]==false){
                accomplish[idx]=true
                goalCards[idx].style.backgroundImage="url('img/welcometo/goal"+(idx+1)+" ("+goal[idx]+").png')"
            }
            else{
                accomplish[idx]=false
                goalCards[idx].style.backgroundImage="url('img/welcometo/goal"+(idx+1)+"b ("+goal[idx]+").png')"
            }
        }
        goalCards[idx].click()
    }

}

insertElement()
curIdx=3
function funcCardDraw(){
    if (curIdx+2 >= cardArr.length){
        let res = confirm("덱을 소진했습니다. (이 행동은 취소할 수 없습니다)")
        if (res==true){
            curIdx = 3
            funcSortArr(cardArr)
        }else{
            return
        }
    }
    for (let idx = 0; idx < 3; idx++) {
        
        curCards[idx].style.backgroundImage = "url('img/welcometo/"+cardArr[idx+curIdx]+".png')"
//        curCards[idx].innerHTML = idx+curIdx
        let bgpath = cardArr[idx+curIdx-3][0]+"B";
//        nextCards[idx].innerHTML = idx+curIdx-3
        nextCards[idx].style.backgroundImage = "url('img/welcometo/"+bgpath+".png')"

        
//        nextCards[idx].style.backgroundImage = "url('img/welcometo/"+cardArr[idx+curIdx-3]+".png')"
    }   
    curIdx+=3
}

funcCardDraw()

$(window).resize(function() {
    funcUpdatePageSize(true)
    insertElement()
});

//funcPrepareGetLocation()

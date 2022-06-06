
let words
let rawFile = new XMLHttpRequest();
rawFile.open("GET", '../rsc/antonym.txt', false);
rawFile.setRequestHeader('Content-Type', 'text/html;charset=utf-8')
rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
            words = rawFile.responseText.split('|');
        }
    }
}



rawFile.send(null);

for (let idx = 0; idx < words.length; idx++) {
    words[idx] = words[idx].trim();
}

let cardIdx=[]
for (let idx = 0; idx < 541; idx++) {
    cardIdx[idx]=idx+1
}
funcSortArr(cardIdx)
funcSortArr(words)

funcWidthPerHeight(0)

funcUpdatePageSize(true)

let curMode = 0

let selectedCardIdx = 0
let people=[]
let problemMod=true
let answerLoc = 51
let answerLen = 5
let locs=[]

function min(a,b){
    if (a<b) return a;
    return b;
}

function max(a,b){
    if (a>b) return a;
    return b;
}
let range = []
let nameBtn = []
let btnWords = []
answerLoc=MMath.getRandom(0,1000)
let numOfPlayers = 2
function funcSetLoc(){
    curMode = 0
    answerLoc=MMath.getRandom(0,1000)
    let center = 0.1+ 0.8*answerLoc/1000

    locs[2]=funcInsertElement("locs2", "button", "btnTrans", max(0.1,center-10*answerLen/1000*0.8/2*5), 0.2, min(0.9,center+10*answerLen/1000*0.8/2*5), 0.99)
    locs[1]=funcInsertElement("locs1", "button", "btnTrans", max(0.1,center-10*answerLen/1000*0.8/2*3), 0.2, min(0.9,center+10*answerLen/1000*0.8/2*3), 0.99)
    locs[0]=funcInsertElement("locs0", "button", "btnTrans", max(0.1,center-10*answerLen/1000*0.8/2), 0.2, min(0.9,center+10*answerLen/1000*0.8/2), 0.99)

    for (let idx = 0; idx < 4; idx++) {
        locs[idx].style.display="inline"
    }

    for (let idx = 0; idx < people.length; idx++) {
        nameBtn[idx].style.display = 'none'
        range[idx].style.display = 'none'
    }
}

function startSolve(){
    if (curMode!=0){
        return
    }
    funcDrawWavelength()
    curMode = 1
    for (let idx = 0; idx < 4; idx++) {
        locs[idx].style.display="none"
    }
    for (let idx = 0; idx < people.length; idx++) {
        nameBtn[idx].style.display = 'inline'
        range[idx].style.display = 'inline'
        range[idx].style.background="white"
    }
}

function showSolve(){
    if (curMode !=1){
        return
    }
    curMode =2
    for (let idx = 0; idx < 3; idx++) {
        locs[idx].style.display="inline"
        locs[idx].style.zIndex = 1
    }
    for (let idx = 0; idx < people.length; idx++) {
        range[idx].style.display = 'inline'
        range[idx].style.zIndex = 2
        range[idx].style.background="transparent"
    }
}

function funcDrawWavelength(){

    funcInsertFullScreenButton(0.01, 0.01,0.05,0.1)

    let center = 0.1+ 0.8*answerLoc/1000
    

    locs[3]=funcInsertElement("locs3", "button", "btnTrans", 0.1, 0.2, 0.9, 0.99)
    locs[3].style.backgroundColor = "white"
    locs[2]=funcInsertElement("locs2", "button", "btnTrans", max(0.1,center-10*answerLen/1000*0.8/2*5), 0.2, min(0.9,center+10*answerLen/1000*0.8/2*5), 0.99)
    locs[2].style.backgroundColor = "yellow"
    locs[1]=funcInsertElement("locs1", "button", "btnTrans", max(0.1,center-10*answerLen/1000*0.8/2*3), 0.2, min(0.9,center+10*answerLen/1000*0.8/2*3), 0.99)
    locs[1].style.backgroundColor = "orange"
    locs[0]=funcInsertElement("locs0", "button", "btnTrans", max(0.1,center-10*answerLen/1000*0.8/2), 0.2, min(0.9,center+10*answerLen/1000*0.8/2), 0.99)
    locs[0].style.backgroundColor = "red"

    let btnCard = funcInsertElement("btnCard", "button", "btnTrans", 0.4, 0.01, 0.6, 0.19)
    let startBtn = funcInsertElement("startBtn", "button", "btnTrans", 0.05, 0.01, 0.15, 0.19, 0.5)
    startBtn.onclick = function(){startSolve()}
    startBtn.innerHTML="start"
    let inpPlayers = funcInsertElement("inpPlayers", "button", "btnTrans", 0.15, 0.01, 0.20, 0.19, 0.5)
    inpPlayers.innerHTML = numOfPlayers
    inpPlayers.onclick = function(){
        numOfPlayers = prompt("몇 명이 플레이 하시겠습니까?")
        if (!(numOfPlayers >= 2 && numOfPlayers <=10)){
            numOfPlayers = 2
        }
        inpPlayers.innerHTML=numOfPlayers
    }
   
    let checkBtn = funcInsertElement("checkBtn", "button", "btnTrans", 0.85, 0.01, 0.95, 0.19, 0.5)
    checkBtn.onclick = function(){showSolve()}
    checkBtn.innerHTML="check"

    btnWords[0] = funcInsertElement("LeftWord", "button", "btnTrans", 0.2, 0.01, 0.4, 0.19, 0.5)
    btnWords[0].style.textAlign = 'right'
    btnWords[0].innerHTML=words[selectedCardIdx].split(',')[0]
    btnWords[1] = funcInsertElement("rightWord", "button", "btnTrans", 0.6, 0.01, 0.8, 0.19, 0.5)
    btnWords[1].innerHTML=words[selectedCardIdx].split(',')[1]
    
    btnCard.style.border = "0px"
    btnCard.style.backgroundImage="url('../img/wavelength/cards ("+cardIdx[selectedCardIdx]+").png')"
    btnCard.style.borderRadius="10%"
    btnCard.style.backgroundSize = "102% 102%"
    btnCard.style.backgroundPositionX="50%"

    people=[]
    for (let idx = 0; idx < numOfPlayers; idx++) {
        people[idx]=idx+1
        
    }
    let thumbHeight = min(pageHeight*0.9/people.length*0.8,pageHeight/5)
    let style = document.querySelector('[data="test"]');
    style.innerHTML=".rangeClass::-webkit-slider-thumb {width: 1%; height: "+thumbHeight+"px;}"
    
    for (let idx = 0; idx < people.length; idx++) {
        nameBtn[idx] = funcInsertElement("name"+idx, "button", "btnTrans", 0.0, 0.2+(idx+0.5)*0.8/people.length-0.03, 0.1, 0.2+(idx+0.5)*0.8/people.length+0.03,2.0)
        nameBtn[idx].innerHTML=people[idx]
        range[idx] = funcInsertElement("range"+idx, "input", "rangeClass", 0.1, 0.2+(idx+0.5)*0.8/people.length-0.03, 0.9, 0.2+(idx+0.5)*0.8/people.length+0.03)
        range[idx].type = "range"
        range[idx].min = 0
        range[idx].max = 1000
        range[idx].value = 500
        range[idx].style.background = "white"
    }
    
    btnCard.onclick = function(){
        selectedCardIdx++
        btnCard.style.backgroundImage="url('../img/wavelength/cards ("+cardIdx[selectedCardIdx]+").png')"
        btnWords[0].innerHTML=words[selectedCardIdx].split(',')[0]
        btnWords[1].innerHTML=words[selectedCardIdx].split(',')[1]
        funcSetLoc()
    }
    


}



$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawWavelength()
});

funcDrawWavelength()
funcSetLoc()




funcDrawWavelength()
//funcPrepareGetLocation()
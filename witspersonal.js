funcWidthPerHeight(0)

funcUpdatePageSize(true)

let colors=['aqua','purple','red','orange','pink','greenyellow','midnightblue','lightseagreen']
function funcDrawWi(){
    for (let idx = 0; idx < colors.length; idx++) {
        let thisBtn = funcInsertElement(
            "btnColor"+idx, "button", "btnTrans",
            idx/colors.length, 0.0, (idx+1)/colors.length, 0.1
        )    
        thisBtn.style.backgroundColor = colors[idx]    
        thisBtn.onclick = function(){
            let maindiv = document.getElementById('main')
            maindiv.style.backgroundColor = colors[idx]
            if (idx == 6){
                document.getElementById('inputSol').style.color = 'white'
            }
            else{
                document.getElementById('inputSol').style.color = 'black'
            }
        }
    }
    let inputSol = funcInsertElement(
        "inputSol", "input", "btnTrans",
        0,0.1,1,1
    )
    inputSol.style.fontSize = Number(inputSol.style.fontSize.replace('px',''))/2.5 + "px"
    console.log(inputSol.style.fontSize)
    inputSol.onclick = function() {
        let ans = prompt("정답입력")
        if (ans=null){
            return
        }
        inputSol.value = ans
    }
}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawWi()
});

funcDrawWi()

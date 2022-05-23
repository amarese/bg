funcWidthPerHeight(0)

funcUpdatePageSize(true)
let card
let min = 1
let max = 50
let curNumber= Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
let curProblem = "answersol" // answersol or problem
let curSol = "answer" // problemsol
let firstCheck = true
function funcDrawWits(){
    let problemBtn = funcInsertElement(
        "btnProblem", "button", "btnTrans",
        0.0, 0.0, 0.5, 0.2
    )
    problemBtn.innerText="PROBLEM"
    problemBtn.onclick = function(){
        card.style.backgroundImage = "url('./img/wits/"+curProblem+" ("+curNumber+").png')"
    }


    let solutionBtn = funcInsertElement(
        "btnSolution", "button", "btnTrans",
        0.5, 0.0, 1.0, 0.2
    )
    solutionBtn.innerText="SOLUTION"
    solutionBtn.onclick = function () {
        if (firstCheck) {
            let respon = confirm("정답을 확인합니다.")
            if (respon != true) {
                return
            }
        }
        firstCheck=false
        card.style.backgroundImage = "url('./img/wits/"+curSol+" ("+curNumber+").png')"
    }

    card = funcInsertElement(
        "btnCard", "button", "btnTrans",
        0.0, 0.2, 1.0, 1.0
    )
    card.onclick = function(){
        let respon = confirm("다음 문제로 넘어갑니다.")
        if (respon!=true){
            return;
        }
        firstCheck=true
        if (Math.random()>0.5){
            curProblem = "answersol" // answersol or problem
            curSol = "answer" // problemsol
            min = Math.ceil(1);
            max = Math.floor(55);
        }
        else{
            curProblem = "problem" // answersol or problem
            curSol = "problemsol" // problemsol
            min = Math.ceil(1);
            max = Math.floor(70);
        }
        curNumber= Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
        card.style.backgroundImage = "url('./img/wits/"+curProblem+" ("+curNumber+").png')"
    }

}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawWits()
});

funcDrawWits()

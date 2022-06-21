let inputData = null
let inputSize = 1000
let pageWidth = document.documentElement.clientWidth


function funcInput(e) {
    if (e == undefined) {
        inputSize = 100
    } else {
        inputSize = e.value
    }
    inputData = []
    for (let idx = 0; idx < inputSize; idx++) {
        inputData[idx] = Math.random() * 300
    }
    funcDraw("insertion")
    funcDraw("bubble")
    funcDraw("quick")
    funcDraw("merge")
}

function swap(sort, idx1, idx2, counter) {
    if (counter == 0) {
        let btn1 = document.getElementById(sort + idx1)
        let btn2 = document.getElementById(sort + idx2)
        for (let idx = 0; idx < inputSize; idx++) {
            document.getElementById(sort + idx).style.backgroundColor = "black"
        }
        btn1.style.backgroundColor = "red"
        btn2.style.backgroundColor = "red"
        let temp = btn1.style.height
        btn1.style.height = btn2.style.height
        btn2.style.height = temp
        return
    }
    setTimeout(function() {
        let btn1 = document.getElementById(sort + idx1)
        let btn2 = document.getElementById(sort + idx2)
        for (let idx = 0; idx < inputSize; idx++) {
            document.getElementById(sort + idx).style.backgroundColor = "black"
        }
        btn1.style.backgroundColor = "red"
        btn2.style.backgroundColor = "red"
        let temp = btn1.style.height
        btn1.style.height = btn2.style.height
        btn2.style.height = temp
    }, counter)
}

function funcDraw(sort) {
    let getDiv = document.getElementById(sort + 'Div')
    while (getDiv.childElementCount > 0) {
        getDiv.removeChild(getDiv.firstChild)
    }
    for (let idx = 0; idx < inputSize; idx++) {
        let btn = document.createElement('button')
        btn.id = sort + idx
        btn.style.width = 0.95 * pageWidth / inputSize + "px"
        btn.style.border = "0px"
        btn.style.margin = "0px"
        btn.style.padding = "0px"
        btn.style.height = inputData[idx] + "px"
        btn.style.backgroundColor = "black"
        getDiv.appendChild(btn)
    }
}

funcInput()


function getHeight(sort, idx) {
    return Number(document.getElementById(sort + idx).style.height.replace("px", ""))
}

function swapData(input, idx1, idx2) {
    let temp = input[idx1]
    input[idx1] = input[idx2]
    input[idx2] = temp
}

function funcBubbleSort() {
    funcDraw("bubble")

    document.getElementById("bubbleTime").innerHTML = ""
    let thisInput = []
    for (let idx = 0; idx < inputSize; idx++) {
        thisInput[idx] = inputData[idx]
    }
    let bubbleCounter = 0
    for (let idx = 0; idx < inputSize - 1; idx++) {
        for (let idx2 = 1; idx2 < inputSize - idx; idx2++) {
            if (thisInput[idx2 - 1] > thisInput[idx2]) {
                swap("bubble", idx2 - 1, idx2, bubbleCounter++)
                swapData(thisInput, idx2 - 1, idx2)
            }
        }
    }

    setTimeout(function() {
        document.getElementById("bubbleTime").innerHTML = "= " + bubbleCounter + " operations"
    }, bubbleCounter)
}

function updateHeight(sort, idx, height, counter) {
    setTimeout(function() {
        for (let idx = 0; idx < inputSize; idx++) {
            document.getElementById(sort + idx).style.backgroundColor = "black"
        }
        document.getElementById(sort + idx).style.backgroundColor = "red"
        document.getElementById(sort + idx).style.height = height + "px"
    }, counter)

}

function funcInsertionSort() {
    funcDraw("insertion")

    document.getElementById("insertionTime").innerHTML = ""
    let thisInput = []
    for (let idx = 0; idx < inputSize; idx++) {
        thisInput[idx] = inputData[idx]
    }
    let insertionCounter = 0
    for (let idx = 1; idx < inputSize; idx++) {
        let key = thisInput[idx]
        let j = idx - 1
        while (j >= 0 && thisInput[j] > key) {
            thisInput[j + 1] = thisInput[j]
            updateHeight("insertion", j + 1, thisInput[j], insertionCounter++)
            j--;
        }
        thisInput[j + 1] = key
        updateHeight("insertion", j + 1, key, insertionCounter++)
    }

    setTimeout(function() {
        document.getElementById("insertionTime").innerHTML = "= " + insertionCounter + " operations"
    }, insertionCounter)
}

function merge(thisInput, left, mid, right, counter) {
    let leftSorted = []
    for (let idx = left; idx <= mid; idx++) {
        leftSorted.push(thisInput[idx])
    }
    leftSorted.push(0xffffffff)
    let rightSorted = []

    for (let idx = mid + 1; idx <= right; idx++) {
        rightSorted.push(thisInput[idx])
    }
    rightSorted.push(0xffffffff)
    let leftIdx = 0
    let rightIdx = 0
    for (let idx = left; idx <= right; idx++) {
        if (leftSorted[leftIdx] > rightSorted[rightIdx]) {
            thisInput[idx] = rightSorted[rightIdx]
            updateHeight("merge", idx, rightSorted[rightIdx], counter++)

            ++rightIdx
        } else {
            thisInput[idx] = leftSorted[leftIdx]
            updateHeight("merge", idx, leftSorted[leftIdx], counter++)

            ++leftIdx
        }

    }
    return counter

}

function mergeSort(thisInput, left, right, counter) {
    if (left < right) {
        let mid = Math.floor((left + right) / 2)
        counter = mergeSort(thisInput, left, mid, counter)
        counter = mergeSort(thisInput, mid + 1, right, counter)
        counter = merge(thisInput, left, mid, right, counter)
    }
    return counter
}

function funcMergeSort() {
    document.getElementById("mergeTime").innerHTML = ""
    funcDraw("merge")

    let thisInput = []
    for (let idx = 0; idx < inputSize; idx++) {
        thisInput[idx] = inputData[idx]
    }
    let counter = mergeSort(thisInput, 0, inputSize - 1, 0)

    setTimeout(function() {
        document.getElementById("mergeTime").innerHTML = "= " + counter + " operations"
    }, counter)
}



function partition(thisInput, left, right, q, counter) {
    let pivot = thisInput[right]
    let i = left - 1
    for (let j = left; j <= right - 1; j++) {
        if (thisInput[j] < pivot) {
            i++
            swap("quick", i, j, counter++)
            swapData(thisInput, i, j)
        }
    }
    swap("quick", i + 1, right, counter++)
    swapData(thisInput, i + 1, right)
    q[0] = i + 1
    return counter
}

function quickSort(thisInput, left, right, counter) {
    if (left < right) {
        let q = []
        counter = partition(thisInput, left, right, q, counter)
        counter = quickSort(thisInput, left, q[0] - 1, counter)
        counter = quickSort(thisInput, q[0] + 1, right, counter)
    }
    return counter
}

function funcQuickSort() {
    document.getElementById("quickTime").innerHTML = ""
    funcDraw("quick")

    let thisInput = []
    for (let idx = 0; idx < inputSize; idx++) {
        thisInput[idx] = inputData[idx]
    }
    let counter = quickSort(thisInput, 0, inputSize - 1, 0)
    setTimeout(function() {
        document.getElementById("quickTime").innerHTML = "= " + counter + " operations"
    }, counter)
}



function funcAllSort() {
    funcQuickSort()
    funcMergeSort()
    funcBubbleSort()
    funcInsertionSort()
}



class MathModBase {
    random() {}
    pow(d, e) {
        return Math.pow(d, e)
    }

    getRandom(min, max) { // inclusive both range
        if (max == null) {
            return Math.floor(MMath.random() * (min + 1))
        }
        let length = max - min + 1
        return min + Math.floor(MMath.random() * length)
    }
}

var MMath = new MathModBase()

! function(a, b, c, d, e, f, g, h, i) {
    function j(a) {
        var b, c = a.length,
            e = this,
            f = 0,
            g = e.i = e.j = 0,
            h = e.S = [];
        for (c || (a = [c++]); d > f;) h[f] = f++;
        for (f = 0; d > f; f++) h[f] = h[g = s & g + a[f % c] + (b = h[f])], h[g] = b;
        (e.g = function(a) {
            for (var b, c = 0, f = e.i, g = e.j, h = e.S; a--;) b = h[f = s & f + 1], c = c * d + h[s & (h[f] = h[g = s & g + b]) + (h[g] = b)];
            return e.i = f, e.j = g, c
        })(d)
    }

    function k(a, b) {
        var c, d = [],
            e = typeof a;
        if (b && "object" == e)
            for (c in a) try {
                d.push(k(a[c], b - 1))
            } catch (f) {}
        return d.length ? d : "string" == e ? a : a + "\0"
    }

    function l(a, b) {
        for (var c, d = a + "", e = 0; e < d.length;) b[s & e] = s & (c ^= 19 * b[s & e]) + d.charCodeAt(e++);
        return n(b)
    }

    function m(c) {
        try {
            return o ? n(o.randomBytes(d)) : (a.crypto.getRandomValues(c = new Uint8Array(d)), n(c))
        } catch (e) {
            return [+new Date, a, (c = a.navigator) && c.plugins, a.screen, n(b)]
        }
    }

    function n(a) {
        return String.fromCharCode.apply(0, a)
    }
    var o, p = c.pow(d, e),
        q = c.pow(2, f),
        r = 2 * q,
        s = d - 1,
        t = c["seed" + i] = function(a, f, g) {
            var h = [];
            f = 1 == f ? {
                entropy: !0
            } : f || {};
            var o = l(k(f.entropy ? [a, n(b)] : null == a ? m() : a, 3), h),
                s = new j(h);
            return l(n(s.S), b), (f.pass || g || function(a, b, d) {
                return d ? (c[i] = a, b) : a
            })(function() {
                for (var a = s.g(e), b = p, c = 0; q > a;) a = (a + c) * d, b *= d, c = s.g(1);
                for (; a >= r;) a /= 2, b /= 2, c >>>= 1;
                return (a + c) / b
            }, o, "global" in f ? f.global : this == c)
        };
    if (l(c[i](), b), g && g.exports) {
        g.exports = t;
        try {
            o = require("crypto")
        } catch (u) {}
    } else h && h.amd && h(function() {
        return t
    })
}(this, [], MMath, 256, 6, 52, "object" == typeof module && module, "function" == typeof define && define, "random");


MMath.seedrandom();


var pageHeight = document.documentElement.clientHeight
var pageWidth = document.documentElement.clientWidth

pageHeight = pageWidth * 2001 / 2172



var mainDiv = document.getElementById("main")
var body = document.getElementById("body")

function appendElement(_type, _id, _className, _left, _top, _width, _height, _fontSize) {
    var newElement = document.createElement(_type)
    newElement.id = _id
    newElement.className = _className
    newElement.style.left = _left * pageWidth + "px"
    newElement.style.top = _top * pageHeight + "px"
    newElement.style.width = _width * pageWidth + "px"
    newElement.style.height = _height * pageHeight + "px"
    newElement.style.fontSize = _fontSize * pageWidth + "px"

    mainDiv.appendChild(newElement)
    return newElement
}

diamantDrawTiles()

function diamantDrawTiles() {
    console.log("function called")
    mainDiv.style.height = pageHeight + "px"
    mainDiv.style.width = pageWidth + "px"

    body.style.height = pageHeight + "px"
    body.style.width = pageWidth + "px"

    {
        var btnCards = appendElement("button", "btnCards", "cards", 0.05, 0.055, 0.365, 0.397, 0.1)
        btnCards.style.borderRadius = "5%"
        btnCards.onclick = funcDrawCard

        var btnDrawCards = appendElement("button", "btnDrawCards", "cards", 0.45, 0.055, 0.365 * 1.4, 0.397 * 1.4, 0.3)
        btnDrawCards.style.borderRadius = "5%"
        btnDrawCards.style.opacity = "1.0"
        btnDrawCards.onclick = funcClearCard



        var btnCave1 = appendElement("button", "btnCave1", "cards", 0.0215, 0.729, 0.151, 0.163, 0.1)
        btnCave1.style.borderRadius = "5%"
        btnCave1.style.backgroundImage = "url('img/diamant/stg1.png')"
        btnCave1.style.backgroundSize = btnCave1.style.width + " " + btnCave1.style.height
        btnCave1.onclick = function() {
            funcCave(1)
        }

        var btnCave2 = appendElement("button", "btnCave2", "cards", 0.1933, 0.793, 0.151, 0.163, 0.1)
        btnCave2.style.borderRadius = "5%"
        btnCave2.style.backgroundImage = "url('img/diamant/stg2.png')"
        btnCave2.style.backgroundSize = btnCave2.style.width + " " + btnCave2.style.height
        btnCave2.onclick = function() {
            funcCave(2)
        }

        var btnCave3 = appendElement("button", "btnCave3", "cards", 0.420, 0.810, 0.151, 0.163, 0.1)
        btnCave3.style.borderRadius = "5%"
        btnCave3.style.backgroundImage = "url('img/diamant/stg3.png')"
        btnCave3.style.backgroundSize = btnCave3.style.width + " " + btnCave3.style.height

        btnCave3.onclick = function() {
            funcCave(3)
        }

        var btnCave4 = appendElement("button", "btnCave4", "cards", 0.624, 0.810, 0.151, 0.163, 0.1)
        btnCave4.style.borderRadius = "5%"
        btnCave4.style.backgroundImage = "url('img/diamant/stg4.png')"
        btnCave4.style.backgroundSize = btnCave4.style.width + " " + btnCave4.style.height

        btnCave4.onclick = function() {
            funcCave(4)
        }

        var btnCave5 = appendElement("button", "btnCave5", "cards", 0.827, 0.810, 0.151, 0.163, 0.1)
        btnCave5.style.borderRadius = "5%"
        btnCave5.style.backgroundImage = "url('img/diamant/stg5.png')"
        btnCave5.style.backgroundSize = btnCave5.style.width + " " + btnCave5.style.height

        btnCave5.onclick = function() {
            funcCave(5)
        }

        var leftIter = 0.025
        for (let idx = 0; idx < 5; idx++) {
            var btnDmg = appendElement("button", "btnDmg" + idx, "dmg", leftIter, 1.02, 0.17, 0.187, 0.05)
            btnDmg.style.borderWidth = 0.003 * pageWidth + "px"
            var btnPerDmg = appendElement("button", "btnPerDmg" + idx, "cards", leftIter, 1.23, 0.17, 0.187, 0.15)
            leftIter += 0.195

        }
    }

}




const cards = new Array(1, 2, 3, 4, 5, 5, 7, 7, 9, 11, 11, 13, 14, 15, 17, "dmg1", "dmg1", "dmg1", "dmg2", "dmg2", "dmg2", "dmg3", "dmg3", "dmg3", "dmg4", "dmg4", "dmg4", "dmg5", "dmg5", "dmg5", "treasure", "treasure", "treasure", "treasure", "treasure")

let order = []

let orderIdx = 0
function shuffleOrder(){
    orderIdx = 0
    for (let idx = 0; idx < cards.length; idx++) {
        order[idx]=cards.length-idx-1
    }
    for (let idx = 0; idx < 1000000; idx++) {
        let idx1 = MMath.getRandom(0,cards.length-1)        
        let idx2 = MMath.getRandom(0,cards.length-1)        
        let temp = order[idx1]
        order[idx1]=order[idx2]
        order[idx2]=temp
    }
}


for (let idx = 0; idx < cards.length; idx++) {
    var btnTemp = appendElement("button", "idTemp" + idx, "empty", 0, 0, 0.005, 0.005, 0.01)
    btnTemp.style.backgroundImage = "url('img/diamant/" + cards[idx] + ".png')"

}
var usingCards = new Array()
var discoverTreasure = new Array()
var permuDmg = new Array()
var thisDmg = new Array()
var onExplo = new Array()
var dmgCount = 0
var dmgPermuCount = 0
var curRound = 1
var numOfDiscoveredTreasure = 0

for (let idx = 0; idx < 35; idx++) {
    usingCards[idx] = true
    if (idx >= 30) {
        usingCards[idx] = false
    }
}

for (let idx = 0; idx < 5; idx++) {
    permuDmg[idx] = thisDmg[idx] = 0
}

for (let idx = 1; idx < 6; idx++) {
    discoverTreasure[idx] = false
    onExplo[idx] = false

}

var roundReady = false
shuffleOrder()

function funcDrawCard() {
    if (roundReady == false) {
        if (curRound == 6) {
            alert("게임이 종료되었습니다!")
            return
        }
        alert("라운드 버튼을 눌러주세요.")
        return
    }
    console.log("draw cards")
    var btn = document.getElementById("btnDrawCards")
    var rndNumber = order[orderIdx++]
    while (usingCards[rndNumber] == false) {
        rndNumber = order[orderIdx++]
    }
    console.log(rndNumber)
    btn.style.backgroundImage = "url('img/diamant/" + cards[rndNumber] + ".png')"
    btn.style.backgroundSize = btn.style.width + " " + btn.style.height
    if (rndNumber >= 15 && rndNumber < 30) {
        var dmgIdx = Math.floor((rndNumber - 15) / 3)
        thisDmg[dmgIdx]++
            if (thisDmg[dmgIdx] == 2) {
                btn.innerHTML = "X"
                permuDmg[dmgIdx]++
                var btnPerDmg = document.getElementById("btnPerDmg" + dmgPermuCount)
                btnPerDmg.style.backgroundImage = "url('img/diamant/" + cards[rndNumber] + ".png')"
                btnPerDmg.style.backgroundSize = btnPerDmg.style.width + " " + btnPerDmg.style.height
                btnPerDmg.innerHTML = "X"
                roundReady = false
                for (let rnd = 1; rnd <= curRound; rnd++) {
                    var btnRound = document.getElementById("btnCave" + rnd)
                    btnRound.style.backgroundImage = "url('img/diamant/stg" + rnd + "close.png')"
                }

                var btnCards = document.getElementById("btnCards")
                btnCards.style.backgroundImage = "url('')"
                btnRound.innerHTML = ""
                curRound++
                dmgPermuCount++

                return

            }
        var btnDmg = document.getElementById("btnDmg" + dmgCount)
        btnDmg.style.backgroundImage = "url('img/diamant/" + cards[rndNumber] + ".png')"
        btnDmg.style.backgroundSize = btnDmg.style.width + " " + btnDmg.style.height

        dmgCount++

    } else if (rndNumber >= 30) {
        numOfDiscoveredTreasure++
        discoverTreasure[numOfDiscoveredTreasure] = true
        var btnRound = document.getElementById("btnCave" + numOfDiscoveredTreasure)
        btnRound.style.backgroundImage = "url('img/diamant/treasure.png')"
        btnRound.innerHTML = ""
    }
    usingCards[rndNumber] = false
}

function funcClearCard() {
    console.log("clear cards")

}

function funcCave(round) {
    if (discoverTreasure[round] == true) {
        var btnRound = document.getElementById("btnCave" + round)
        if (curRound > round) {
            btnRound.style.backgroundImage = "url('img/diamant/stg" + round + "close.png')"
        } else {
            btnRound.style.backgroundImage = "url('img/diamant/stg" + round + ".png')"
        }
        discoverTreasure[round] = false
        return
    }
    if (round != curRound) {
        if (curRound == 6) {
            alert("게임이 종료되었습니다!")
            return
        }
        alert("" + curRound + " 라운드 버튼을 눌러주세요!")
        return
    }

    if (onExplo[curRound] == false) {
        onExplo[curRound] = true
    } else {
        for (let rnd = 1; rnd <= curRound; rnd++) {
            var btnRound = document.getElementById("btnCave" + rnd)
            btnRound.style.backgroundImage = "url('img/diamant/stg" + rnd + "close.png')"
            btnRound.innerHTML = ""
        }
        roundReady = false
        var btnCards = document.getElementById("btnCards")
        btnCards.style.backgroundImage = "url('')"
        curRound++
        return
    }

    usingCards[30 + round - 1] = true

    shuffleOrder()

    for (let idx = 0; idx < 30; idx++) {
        usingCards[idx] = true
    }

    for (let idx = 0; idx < 5; idx++) {
        if (permuDmg[idx] > 0) {
            usingCards[15 + 3 * idx] = false
            if (permuDmg[idx] == 2) {
                usingCards[15 + 3 * idx + 1] = false
            }
        }

        thisDmg[idx] = 0
    }

    var btn = document.getElementById("btnDrawCards")

    btn.style.backgroundImage = "url('')"
    btn.innerHTML = ""

    var btnCards = document.getElementById("btnCards")
    btnCards.style.backgroundImage = "url('img/diamant/back.png')"
    btnCards.style.backgroundSize = btnCards.style.width + " " + btnCards.style.height

    var btnRound = document.getElementById("btnCave" + curRound)
    btnRound.innerHTML = "O"


    for (let idx = 0; idx < dmgCount; idx++) {
        var btnDmg = document.getElementById("btnDmg" + idx)
        btnDmg.style.backgroundImage = "url('')"
    }
    dmgCount = 0

    roundReady = true
    console.log("funcCave" + round)
}

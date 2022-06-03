funcWidthPerHeight(0)

funcUpdatePageSize(true)

function funcDrawWavelength(){


    let range = funcInsertElement("temp", "input", "rangeClass", 0.1, 0.5, 0.9, 0.6)
    range.type="range"

    var style = document.querySelector('[data="test"]');

    style.innerHTML=".rangeClass::-webkit-slider-thumb {height: 200px;}"
    //rangeClass
}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDrawWavelength()
});



funcDrawWavelength()
//funcPrepareGetLocation()
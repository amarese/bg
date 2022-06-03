funcWidthPerHeight(1312 / 1892)

funcUpdatePageSize(true)

function funcDraw(){
    //funcInsertElement(_id, _type, _class, leftTopX, leftTopY, rightBottomX, rightBottomY, _fixedRatio)
}


$(window).resize(function() {
    funcUpdatePageSize(true)
    funcDraw()
});

funcPrepareGetLocation()
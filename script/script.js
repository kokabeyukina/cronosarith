function matrixMult(a, b){
    let aRows = a.length;
    let aColuns = a[0].length;
    let bRows = b.length;
    let bColuns = b[0].length;
    let resultList = [];
    for(i = 0; i < aRows; i++){
        let resultItem = [];
        for(j = 0; j < bColuns; j++){
            resultItem.push(j);
        }
        resultList.push(resultItem);
    }
    if(aColuns == bRows){
        for(x = 0; x < aRows; x++){
            for(y = 0; y < bColuns; y++){
                let sum = 0;
                for(k = 0; k < aColuns; k++){
                    sum += a[x][k]*b[k][y];
                }
                resultList[x][y] += sum;
            }
        }
        return resultList;
    }else{
        console.error('Error: wrong matriz');
    }
}

function cut(list, i){
    for(n = i; n < list.length-1; n++){
            list[n] = list[n+1];
    }
    list.pop();
}

function replaceAll(text, target='x', replacement='(x+t*i)'){
    let result = '';
    let textList = text.split(target);
    for(i in textList){
        result += textList[i];
        if(i != textList.length-1){
            result += replacement;
        }
    } 
    return result;
}

function randomColor(){
    let cor = '#';
    for(i = 0; i < 6; i++){
        let num = Math.floor(Math.random()*16);
        let hexNum = num.toString(16);
        cor += hexNum;
    }
    return cor;
}

function conect(init, final, list, lineColor='black'){
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidthObj.value;
    ctx.moveTo(list[init][0],  list[init][1]);
    ctx.lineTo(list[final][0], list[final][1]);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = 'black';
}

function project(UnprojPoints, UnprojPosition){
    let projectedPoints = [];
    let rotation_x = [
        [1,                0,                 0],
        [0, Math.cos(anglex), -Math.sin(anglex)],
        [0, Math.sin(anglex),  Math.cos(anglex)]
    ];
    let rotation_y = [
        [Math.cos(angley), 0, -Math.sin(angley)],
        [0,                1,                 0],
        [Math.sin(angley), 0,  Math.cos(angley)]
    ];
    let rotation_z = [
        [Math.cos(anglez), -Math.sin(anglez), 0],
        [Math.sin(anglez),  Math.cos(anglez), 0],
        [0,                 0,                1]
    ];
    let rotated2d;
    let x; 
    let y;
    for(w = 0; w < UnprojPoints.length; w++){
        rotated2d = matrixMult(rotation_y, UnprojPoints[w]);
        rotated2d = matrixMult(rotation_x, rotated2d);
        rotated2d = matrixMult(rotation_z, rotated2d);
        
        if(perspective.checked){
            let z = 1/(distanceObj.value-rotated2d[2][0]);
            let projection = [
                [z, 0, 0],
                [0, z, 0]
            ];
            let proj2d = matrixMult(projection, rotated2d);

            x = parseInt(proj2d[0][0]*escala)+UnprojPosition[0];
            y = parseInt(proj2d[1][0]*escala)+UnprojPosition[1];
        }else{
            let esc = Math.floor(escala/distanceObj.value)
            x = parseInt(rotated2d[0][0]*esc)+UnprojPosition[0];
            y = parseInt(rotated2d[1][0]*esc)+UnprojPosition[1];
        }
        projectedPoints[w] = [x, y];
    }
    return projectedPoints;
}

function draw(points, position, liga='', fill='black'){
    if(liga == 'square'){
        let projectedPoints = project(points, position);
        for(m = 0; m < 4; m++){
            conect(m,   (m+1)%4,   projectedPoints);
            conect(m+4, (m+1)%4+4, projectedPoints);
            conect(m,    m+4,      projectedPoints);
        }
    }else if(liga == 'xyzPlan'){
        let projectedPoints = project(points, position);
        conect(0, 1, projectedPoints, lineColor='red');
        conect(2, 3, projectedPoints, lineColor='blue');
        conect(4, 5, projectedPoints, lineColor='green');
    }else if(liga == 'func'){
        let projectedPoints = project(points, position);
        for(p = 0; p < projectedPoints.length; p++){
            if(p != projectedPoints.length-1 &&
              -points[p][1][0]   <= 1   && -points[p][1][0]   >= -1 &&
               points[p][2][0]   <= 1   &&  points[p][2][0]   >= -1 &&
              -points[p+1][1][0] <= 1   && -points[p+1][1][0] >= -1 &&
               points[p+1][2][0] <= 1   &&  points[p+1][2][0] >= -1){
                conect(p, p+1, projectedPoints, lineColor=fill);
            }
        }
    }else if(liga == 'exisPoints'){
        let projectedPoints = project(points, position);
        for(w = 0; w < projectedPoints.length; w++){
            ctx.beginPath();
            ctx.arc(projectedPoints[w][0], projectedPoints[w][1], lineWidthObj.value, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }else if(liga == 'grid'){
        let projectedPoints = project(points, position);
        for(w = 0; w < projectedPoints.length; w+=2){
            conect(w, w+1, projectedPoints, lineColor=fill);
        }
    }else if(liga=='point'){
        if(funcCordsList[n][0][0][0] >= -1 && funcCordsList[n][0][0][0] <= 1 &&
           funcCordsList[n][0][1][0] >= -1 && funcCordsList[n][0][1][0] <= 1 &&
           funcCordsList[n][0][2][0] >= -1 && funcCordsList[n][0][2][0] <= 1 ){
            let projectedPoints = project(points, position);
            ctx.beginPath();
            ctx.fillStyle = fill;
            ctx.arc(projectedPoints[0][0], projectedPoints[0][1], pointWidthObj.value, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.fillStyle = 'black';
        }
    }else if(liga == 'extremos'){
        let projectedPoints = project(points, position);
        let text; 
        let exPoints;
        let optionsList = [negLargura, posLargura, posAltura, negAltura, posProfundidade, negProfundidade];
        for(w = 0; w < projectedPoints.length; w++){
            exPoints = projectedPoints[w];
            text = optionsList[w];
            ctx.fillText(text, exPoints[0]+10, exPoints[1]+30); 
        }
    }else{
        let projectedPoints = project(points, position);
        for(w = 0; w < projectedPoints.length; w++){
            let a = projectedPoints[w];
            for(q = 0; q < projectedPoints.length; q++){
                let p = projectedPoints[q];
                if(p != a){
                    let b = p;
                    ctx.beginPath();
                    ctx.moveTo(a[0], a[1]);
                    ctx.lineTo(b[0], b[1]);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }
}

function parseFunc(funcValue){
    let cords = [];
    let codedFunc;
    codedFunc = math.parse(replaceAll(funcValue, 'x', '(x+t*i)'));
    if(codedFunc.value == undefined && codedFunc.args == undefined && codedFunc.content == undefined && codedFunc.name == undefined){
        for(j = 0; j < funcList.length; j++){
            if(funcList[j] == funcValue){
                delf(j);
                updateFuncList();
                updateFuncCords();
            }
        }
    }
    for(n = negLargura*rezolutionObj.value/(Number(posLargura)-Number(negLargura)); n <= posLargura*rezolutionObj.value/(Number(posLargura)-Number(negLargura)); n++){
        yReturn = codedFunc.evaluate({x: n*(Number(posLargura)-Number(negLargura))/rezolutionObj.value, t:tValue});
        let pCords = [];
        pCords.push([2*n/rezolutionObj.value-(Number(posLargura)+Number(negLargura))/(posLargura-negLargura)]);
        if(yReturn.type == 'Complex'){
            pCords.push([-yReturn.re/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)]);
            pCords.push([-yReturn.im/((posProfundidade-negProfundidade)/2)+(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)]);
        }else{
            pCords.push([-yReturn/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)]);
            pCords.push([(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)]);
        }
        cords.push(pCords);
    }
    return cords;
}

function resetAngle(a){
    let anglesDict = {
        'z':[0,                     0], 
        'y':[-math.PI/2-0.0001,     0], 
        'x':[-0.001, math.PI/2-0.0001]
    };
    anglex = anglesDict[a][0];
    angley = anglesDict[a][1];
}

function moveMouse(xMouse, yMouse){
    if(mouseDown){
        angley -= (xMouse-xPreLoadedMouse)*sensibiltyObj.value/100;
        anglex -= (yMouse-yPreLoadedMouse)*sensibiltyObj.value/100;
    }
    xPreLoadedMouse = xMouse;
    yPreLoadedMouse = yMouse;
}

function moveTouch(xTouch, yTouch){
    angley -= (xTouch-xPreLoadedMouse)*sensibiltyObj.value/100;
    anglex -= (yTouch-yPreLoadedMouse)*sensibiltyObj.value/100;
    xPreLoadedMouse = xTouch;
    yPreLoadedMouse = yTouch;
}

function updateFuncList(){
    funcListObj.innerHTML = '';
    for(n = 0; n < funcList.length; n++){
        funcListObj.innerHTML += `
            <div class="item">
                <input type="text" value="${funcList[n]}" id="funcItem${n}" onchange="updateItemFunc(${n})" class="flistInput">
                <div>
                    <div style="background: ${funcColorList[n]};"></div>
                    <input type="text" value="${funcColorList[n]}" id="colorItem${n}" onchange="updateItemColor(${n})">
                    <button onclick="delf(${n})">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        `;
    }
}

function add(){
    if(funcInputObj.value != funcList[funcList.length-1] && funcInputObj.value != ''){
        funcList.push(funcInputObj.value);
        funcColorList.push(randomColor());
    }
    funcInputObj.value = '';
    updateFuncCords();
    updateFuncList();
}

function delf(n){
    cut(funcList, n);
    cut(funcColorList, n);
    updateFuncCords();
    updateFuncList();
}

function updateItemFunc(n){
    let funcInput = document.getElementById(`funcItem${n}`);
    funcList[n] = funcInput.value;
    updateFuncList();
    updateFuncCords();
}

function updateItemColor(n){
    let colorInput = document.getElementById(`colorItem${n}`);
    funcColorList[n] = colorInput.value;
    updateFuncList();
}

function updateGrids(){
    gridList = [];
    if(xygrid.checked){
        for(x = 0; x <= posLargura; x += Number(xDistanceObj.value)){
            let a = [[x/((posLargura-negLargura)/2)-(Number(posLargura)+Number(negLargura))/(posLargura-negLargura)], [1], [exisPoints[0][2]]];
            let b = [[x/((posLargura-negLargura)/2)-(Number(posLargura)+Number(negLargura))/(posLargura-negLargura)], [-1], [exisPoints[0][2]]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                gridList.push(a);
                gridList.push(b);
            }
        }
        for(x = 0; x >= negLargura; x -= Number(xDistanceObj.value)){
            let a = [[x/((posLargura-negLargura)/2)-(Number(posLargura)+Number(negLargura))/(posLargura-negLargura)], [1], [exisPoints[0][2]]];
            let b = [[x/((posLargura-negLargura)/2)-(Number(posLargura)+Number(negLargura))/(posLargura-negLargura)], [-1], [exisPoints[0][2]]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                gridList.push(a);
                gridList.push(b);
            }
        }
        for(y = 0; y <= posAltura; y += Number(yDistanceObj.value)){
            let a = [[1], [-y/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)], [exisPoints[2][2]]];
            let b = [[-1], [-y/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)], [exisPoints[2][2]]];
            if(a[1][0] >= -1 && a[1][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                gridList.push(a);
                gridList.push(b);
            }
        }
        for(y = 0; y >= negAltura; y -= Number(yDistanceObj.value)){
            let a = [[1], [-y/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)], [exisPoints[2][2]]];
            let b = [[-1], [-y/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)], [exisPoints[2][2]]];
            if(a[1][0] >= -1 && a[1][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                gridList.push(a);
                gridList.push(b);
            }
        }
    }
    if(xzgrid.checked){
        for(x = 0;x <= posLargura; x+= Number(xDistanceObj.value)){
            let a = [[x/((posLargura-negLargura)/2)-(Number(posLargura)+Number(negLargura))/(posLargura-negLargura)], [exisPoints[0][1]], [1]];
            let b = [[x/((posLargura-negLargura)/2)-(Number(posLargura)+Number(negLargura))/(posLargura-negLargura)], [exisPoints[0][1]], [-1]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                gridList.push(a);
                gridList.push(b);
            }
        }
        for(x = 0; x >= negLargura; x -= Number(xDistanceObj.value)){
            let a = [[x/((posLargura-negLargura)/2)-(Number(posLargura)+Number(negLargura))/(posLargura-negLargura)], [exisPoints[0][1]], [1]];
            let b = [[x/((posLargura-negLargura)/2)-(Number(posLargura)+Number(negLargura))/(posLargura-negLargura)], [exisPoints[0][1]], [-1]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                gridList.push(a);
                gridList.push(b);
            }
        }
        for(z = 0; z <= posProfundidade; z += Number(zDistanceObj.value)){
            let a = [[1], [exisPoints[4][1]], [-z/((posProfundidade-negProfundidade)/2)+(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)]];
            let b = [[-1], [exisPoints[4][1]], [-z/((posProfundidade-negProfundidade)/2)+(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)]];
            if(a[1][0] >= -1 && a[1][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                gridList.push(a);
                gridList.push(b);
            }
        }
        for(z = 0; z >= negProfundidade; z -= Number(zDistanceObj.value)){
            let a = [[1], [exisPoints[4][1]], [-z/((posProfundidade-negProfundidade)/2)+(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)]];
            let b = [[-1], [exisPoints[4][1]], [-z/((posProfundidade-negProfundidade)/2)+(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)]];
            if(a[1][0] >= -1 && a[1][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                gridList.push(a);
                gridList.push(b);
            }
        }
    }
    if(yzgrid.checked){
        for(y = 0; y <= posAltura; y += Number(yDistanceObj.value)){
            let a = [[exisPoints[2][0]], [-y/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)], [1]];
            let b = [[exisPoints[2][0]], [-y/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)], [-1]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[1][0] >= -1 && a[1][0] <= 1 ){
                gridList.push(a);
                gridList.push(b);
            }
        }
        for(y = 0;y >= negAltura; y -= Number(yDistanceObj.value)){
            let a = [[exisPoints[2][0]], [-y/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)], [1]];
            let b = [[exisPoints[2][0]], [-y/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)], [-1]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[1][0] >= -1 && a[1][0] <= 1 ){
                gridList.push(a);
                gridList.push(b);
            }
        }
        for(z = 0;z <= posProfundidade; z += Number(zDistanceObj.value)){
            let a = [[exisPoints[4][0]], [1], [-z/((posProfundidade-negProfundidade)/2)+(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)]];
            let b = [[exisPoints[4][0]], [-1], [-z/((posProfundidade-negProfundidade)/2)+(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                gridList.push(a);
                gridList.push(b);
            }
        }
        for(z = 0;z >= negProfundidade; z -= Number(zDistanceObj.value)){
            let a = [[exisPoints[4][0]], [1], [-z/((posProfundidade-negProfundidade)/2)+(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)]];
            let b = [[exisPoints[4][0]], [-1], [-z/((posProfundidade-negProfundidade)/2)+(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                gridList.push(a);
                gridList.push(b);
            }
        }
    }
}

function updateExisPoints(){
    exisPointsList = [];
    for(x = 0; x <= posLargura; x += Number(xDistanceObj.value)){
        let a = [[x/((posLargura-negLargura)/2)-(Number(posLargura)+Number(negLargura))/(posLargura-negLargura)], [exisPoints[0][1]], [exisPoints[0][2]]];
        if(a[0][0] >= -1 && a[0][0] <= 1){
            exisPointsList.push(a);
        }
    }
    for(x = 0; x >= negLargura; x -= Number(xDistanceObj.value)){
        let a = [[x/((posLargura-negLargura)/2)-(Number(posLargura)+Number(negLargura))/(posLargura-negLargura)], [exisPoints[0][1]], [exisPoints[0][2]]];
        if(a[0][0] >= -1 && a[0][0] <= 1){
            exisPointsList.push(a);
        }
    }
    for(y = 0; y <= posAltura; y += Number(yDistanceObj.value)){
        let a = [[exisPoints[2][0]], [-y/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)], [exisPoints[2][2]]];
        if(a[1][0] >= -1 && a[1][0] <= 1){
            exisPointsList.push(a);
        }
    }
    for(y = 0; y >= negAltura; y -= Number(yDistanceObj.value)){
        let a = [[exisPoints[2][0]], [-y/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)], [exisPoints[2][2]]];
        if(a[1][0] >= -1 && a[1][0] <= 1){
            exisPointsList.push(a);
        }
    }
    for(z = 0; z <= posProfundidade; z += Number(zDistanceObj.value)){
        let a = [[exisPoints[4][0]], [exisPoints[4][1]], [-z/((posProfundidade-negProfundidade)/2)+(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)]];
        if(a[2][0] >= -1 && a[2][0] <= 1){
            exisPointsList.push(a);
        }
    }
    for(z = 0; z >= negProfundidade; z -= Number(zDistanceObj.value)){
        let a = [[exisPoints[4][0]], [exisPoints[4][1]], [-z/((posProfundidade-negProfundidade)/2)+(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)]];
        if(a[2][0] >= -1 && a[2][0] <= 1){
            exisPointsList.push(a);
        }
    }
}

function updateExisPointsDistance(){
    if(xDistanceObj.value != 0 && yDistanceObj.value != 0 && zDistanceObj.value != 0){
        updateExisPoints();
        updateGrids();
    }
}

function updateDimentions(n){
    switch(n){
        case 1:
            if(xPosRangeObj.value == xNegRangeObj.value){
                xPosRangeObj.value = 4;
                xNegRangeObj.value = -4;
            }
            posLargura = xPosRangeObj.value;
            negLargura = xNegRangeObj.value;
            break;
        case 2:
            posTempo = tPosRangeObj.value;
            negTempo = tNegRangeObj.value;
            tScrollObj.min = negTempo;
            tScrollObj.max = posTempo;
            tInputObj.min = negTempo;
            tInputObj.max = posTempo;
            tPosRangeObj.min = negTempo;
            tNegRangeObj.max = posTempo;
            break;
        case 3:
            posAltura = yPosRangeObj.value;
            negAltura = yNegRangeObj.value;
            break;
        case 4:
            posProfundidade = zPosRangeObj.value;
            negProfundidade = zNegRangeObj.value;
            break;
    }
    updateFuncCords();
    if(n != 2){
        updateExis();
        updateExisPoints();
        updateGrids();
    }
}

function updateExis(){
    let i = 0; 
    let posPosition = [posLargura, posAltura, posProfundidade]; 
    let negPosition = [negLargura, negAltura, negProfundidade];
    for(p = 0; p < exisPoints.length; p++){
        if(p == 2 || p == 4){
            i = p/2;
        }
        for(c = 0; c < 3; c++){
            if(c != i){
                if(p > 1 && c == 0){
                    exisPoints[p][c] = [-(Number(posPosition[c])+Number(negPosition[c]))/(posPosition[c]-negPosition[c])];
                }else{
                    exisPoints[p][c] = [(Number(posPosition[c])+Number(negPosition[c]))/(posPosition[c]-negPosition[c])];
                }
                if(exisPoints[p][c][0] > 1){
                    exisPoints[p][c][0] = 1;
                }else if(exisPoints[p][c][0] < -1){
                    exisPoints[p][c][0] = -1;
                }
            }
        }
    }
}

function mainDrawer(){
    if(border.checked){
        draw(centralPoints, centralPos, liga='square');
    }
    draw(gridList, centralPos, liga='grid', fill='grey');
    draw(exisPoints, centralPos, liga='xyzPlan');
    draw(exisPoints, centralPos, liga='extremos');
    draw(exisPointsList, centralPos, liga='exisPoints');
    
    for(n = 0; n < funcCordsList.length; n++){
        if(funcCordsList[n].length == 1){
            draw(funcCordsList[n], centralPos, liga='point', fill=funcColorList[n]);
        }else{
            draw(funcCordsList[n], centralPos, 'func', fill=funcColorList[n]);
        }
    }
}

function updateFuncCords(){
    funcCordsList = [];
    for(m = 0; m < funcList.length; m++){
        if(funcList[m].trim().slice(0, 6) == 'point(' && funcList[m].trim()[funcList[m].trim().length-1] == ')'){
            let p = funcList[m].trim().slice(6, funcList[m].trim().length-1);
            let pl = p.split(',');
            pl[0] = [math.parse(pl[0]).evaluate()/((posLargura-negLargura)/2)-(Number(posLargura)+Number(negLargura))/(posLargura-negLargura)];
            pl[1] = [-math.parse(pl[1]).evaluate()/((posAltura-negAltura)/2)+(Number(posAltura)+Number(negAltura))/(posAltura-negAltura)];
            pl[2] = [-math.parse(pl[2]).evaluate()/((posProfundidade-negProfundidade)/2)+(Number(posProfundidade)+Number(negProfundidade))/(posProfundidade-negProfundidade)];
            funcCordsList[m] = [pl];
        }else{
            funcCordsList[m] = parseFunc(funcList[m]);
        }
    }
}

function autoScroll(){
    if(tValue >= posTempo){
        p4dDirection = -1;
    }else if(tValue <= negTempo){
        p4dDirection = 1;
    }
    tValue += Number(tVelocityObj.value)*p4dDirection;
}

function play4d(){
    let icon = document.getElementById('playicon');
    if(p4d){
        p4d = false;
        icon.innerHTML = 'play_circle';
    }else{
        p4d = true;
        icon.innerHTML = 'pause';
    }
}

function updateTimeScroll(){
    if(p4d){
        tInputObj.value = tValue;
        tScrollObj.value = tValue;
        updateFuncCords();
        autoScroll();
    }else if(tScrollHolder != tScrollObj.value){
        tValue = Number(tScrollObj.value);
        tInputObj.value = Number(tScrollObj.value);
        tScrollHolder = Number(tScrollObj.value);
        updateFuncCords();
    }
}

function updateTimeInput(){
    tValue = Number(tInputObj.value);
    tScrollObj.value = Number(tInputObj.value);
    updateFuncCords();
}

function mainLoop(){
    ctx.clearRect(0, 0, dimentions[0], dimentions[1]);
    
    updateTimeScroll();
    mainDrawer();

    requestAnimationFrame(mainLoop);
}

//constructors
const ctx = fundoObj.getContext("2d");
ctx.font = '30px roboto';
let dimentions = [fundoObj.width, fundoObj.height];


//variaveis do sistema
let exisPointsList;
let anglez = 0;
let anglex = -0.2;
let angley = -0.7;
let p4d = false;
let tValue = Number(tInputObj.value);
let tScrollHolder = Number(tScrollObj.value);
let p4dDirection = 1;
let gridList = [];
let xPreLoadedMouse = 0;
let yPreLoadedMouse = 0;
let mouseDown = false;
let escala = 1100;


//variaveis do usuario
let posLargura      = xPosRangeObj.value;
let negLargura      = xNegRangeObj.value;
let posTempo        = tPosRangeObj.value;
let negTempo        = tNegRangeObj.value;
let posAltura       = yPosRangeObj.value;
let negAltura       = yNegRangeObj.value;
let posProfundidade = zPosRangeObj.value;
let negProfundidade = zNegRangeObj.value;


let funcList = ['x^x'];
let funcColorList = ['#000000'];
let funcCordsList = [];
for(j = 0; j < funcList.length; j++){
    funcCordsList.push(parseFunc(funcList[j]));
}


//constantes
let centralPos = [dimentions[0]/2, dimentions[1]/2];
let centralPoints = [
    [[-1], [-1],  [1]],
    [[1],  [-1],  [1]],
    [[1],   [1],  [1]],
    [[-1],  [1],  [1]],
    [[-1], [-1], [-1]],
    [[1],  [-1], [-1]],
    [[1],   [1], [-1]],
    [[-1],  [1], [-1]]
];
let exisPoints = [
    [[-1], [0],  [0]],
    [[1],  [0],  [0]],
    [[0],  [-1], [0]],
    [[0],  [1],  [0]],
    [[0],  [0], [-1]],
    [[0],  [0],  [1]]
];

fundoObj.addEventListener('mousedown',  ()=>{mouseDown =  true;});
fundoObj.addEventListener('mouseup',    ()=>{mouseDown = false;});
fundoObj.addEventListener('mouseleave', ()=>{mouseDown = false;});
fundoObj.addEventListener('mousemove', (e)=>{
    moveMouse(e.pageX, e.pageY);
});

fundoObj.addEventListener('touchstart', (e)=>{
    xPreLoadedMouse = e.targetTouches[0].pageX;
    yPreLoadedMouse = e.targetTouches[0].pageY;
});
fundoObj.addEventListener('touchend',    ()=>{});
fundoObj.addEventListener('touchmove',  (e)=>{
    moveTouch(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

updateFuncList();
updateExis();
updateExisPoints();
mainLoop();

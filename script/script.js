function mMult(a, b){
    var a_rows = a.length;
    var a_coluns = a[0].length;
    var b_rows = b.length;
    var b_coluns = b[0].length;
    var result_list = [];
    for(i=0;i<a_rows;i++){
        var result_item = [];
        for(j=0;j<b_coluns;j++){
            result_item.push(j);
        }
        result_list.push(result_item);
    }
    if (a_coluns==b_rows){
        for(x=0;x<a_rows;x++){
            for(y=0;y<b_coluns;y++){
                var sum = 0;
                for(k=0;k<a_coluns;k++){
                    sum += a[x][k]*b[k][y];
                }
                result_list[x][y] += sum;
            }
        }
        return result_list;
    }else{console.error('Error, wrong matriz');}
}

function cut(a, i){
    for(n=0;n<a.length-1;n++){
        if(n>=i){
            a[n] = a[n+1];
        }
    }
    a.pop();
}

function replaceAll(t, p='x', r='(x+y*i)'){
    let fin = '';
    let te = t.split(p);
    for(i in te){
        if(i==te.length-1){
            fin+=te[i];
        }else{
            fin+=te[i]+r;
        }
    } 
    return fin;
}

function randomColor(){
    let cor = '#';
    for(r=0;r<6;r++){
        let i = Math.floor(Math.random()*16);
        switch(i){
            case 10:
                i = 'a';
                break;
            case 11:
                i = 'b';
                break;
            case 12:
                i = 'c';
                break;
            case 13:
                i = 'd';
                break;
            case 14:
                i = 'e';
                break;
            case 15:
                i = 'f';
                break;
        }
        cor+=i;
    }
    return cor;
}

function conect(i, u, v, fill='black'){
    let a = v[i];
    let b = v[u];
    ctx.beginPath();
    ctx.strokeStyle = fill
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = 'black'
}

function draw(points, pos, liga='', fill='black', escala=1100){
    let index = 0;
    let projPoints = [];
    for(j=0;j<points.length;j++){
        projPoints.push(j);
    }
    let rotation_x = [[1, 0, 0],
                      [0, Math.cos(anglex), -Math.sin(anglex)],
                      [0, Math.sin(anglex), Math.cos(anglex)]];

    let rotation_y = [[Math.cos(angley), 0, -Math.sin(angley)],
                      [0, 1, 0],
                      [Math.sin(angley), 0, Math.cos(angley)]];

    let rotation_z = [[Math.cos(anglez), -Math.sin(anglez), 0],
                      [Math.sin(anglez), Math.cos(anglez), 0],
                      [0, 0, 1]];
    let rotated2d;
    for(w=0;w<points.length;w++){
        let point = points[w];
        rotated2d = mMult(rotation_y, point);
        rotated2d = mMult(rotation_x, rotated2d);
        rotated2d = mMult(rotation_z, rotated2d);
        
        let x; let y;
        if(pers.checked == true){
            let z = 1/(distanci - rotated2d[2][0]);
            let projectionM = [[z, 0, 0],
                               [0, z, 0]];
            let proj2d = mMult(projectionM, rotated2d);

            x = parseInt(proj2d[0][0] * escala) + pos[0];
            y = parseInt(proj2d[1][0] * escala) + pos[1];
        }else{
            let esc = Math.floor(1100/distanci)
            x = parseInt(rotated2d[0][0] * esc) + pos[0];
            y = parseInt(rotated2d[1][0] * esc) + pos[1];
        }
    
        projPoints[index] = [x,y];
        index+=1;
    }
    if(liga=='Square'){
        for(m=0;m<4;m++){
            conect(m, (m + 1) % 4, projPoints);
            conect(m + 4, (m + 1) % 4 + 4, projPoints);
            conect(m, m + 4, projPoints);
        }
    }else if(liga=='xyzPlan'){
        conect(4, 5, projPoints, fill='green');
        conect(0, 1, projPoints, fill='red');
        conect(2, 3, projPoints, fill='blue');
    }else if(liga=='Func'){
        for(p=0;p<projPoints.length;p++){
            if(p!=projPoints.length-1){
                if(-points[p][1][0]   <= 1 &&
                   -points[p][1][0]   >=-1 &&
                    points[p][2][0]   <= 1 &&
                    points[p][2][0]   >=-1 &&
                   -points[p+1][1][0] <= 1 &&
                   -points[p+1][1][0] >=-1 &&
                    points[p+1][2][0] <= 1 &&
                    points[p+1][2][0] >=-1){
                    conect(p, p+1, projPoints, fill=fill);
                }
            }
        }
    }else if(liga=='Points'){
        for(w=0;w<projPoints.length;w++){
            ctx.beginPath();
            ctx.arc(projPoints[w][0], projPoints[w][1], 3, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }else if(liga=='Grid'){
        for(w=0;w<projPoints.length;w+=2){
            conect(w, w+1, projPoints, fill=fill);
        }
    }else if(liga=='Point'){
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.arc(projPoints[0][0], projPoints[0][1], pwd.value, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = 'black';
    }else if(liga=='Extremos'){
        let t;
        for(w=0;w<projPoints.length;w++){
            let p = projPoints[w];
            switch(w){
                case 0:
                    t = nLargura;
                    break;
                case 1:
                    t = largura;
                    break;
                case 2:
                    t = altura;
                    break;
                case 3:
                    t = nAltura;
                    break;
                case 4:
                    t = profundidade;
                    break;
                case 5:
                    t = nProfundidade;
                    break;
            }
            //ctx.strokeText(t, p[0], p[1]);
            ctx.fillText(t, p[0]+10, p[1]+30); 
        }
    }else{
        for(w=0;w<projPoints.length;w++){
            let a = projPoints[w];
            for(q=0;q<projPoints.length;q++){
                let p = projPoints[q];
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

function func(v, escala=60){
    let cords = [];
    let f;
    if(v==''){v='0';}
    try{
        f = math.parse(replaceAll(v));
    }catch{
        f = math.parse('0');
    }
    for(n=nLargura*rez;n<=largura*rez;n++){
        let good = true;
        try{
            y1 = f.evaluate({x: n/rez, y:xi});
        }catch{
            good = false;
            y1 = 0;
        }
        if(good){
            let pCords = [];
            pCords.push([n/(rez*((largura-nLargura)/2))-(Number(largura)+Number(nLargura))/(largura-nLargura)]);
            if(y1.type=='Complex'){
                pCords.push([-y1.re/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)]);
            }else{
                pCords.push([-y1/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)]);
            }
            if(y1.im != undefined){
                pCords.push([-y1.im/((profundidade-nProfundidade)/2)+(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]);
            }else{
                pCords.push([(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]);
            }
            cords.push(pCords);
        }else{
            //console.log(`can't calculate at  ${n} : ${y1}`);
        }
    }
    return cords;
}

function resetAngle(a){
    if(a=='z'){
        anglex = 0;
        angley = 0;
    }else if(a=='y'){
        anglex = -math.PI/2-0.0001;
        angley = 0;
    }else if(a=='x'){
        anglex = 0;
        angley = math.PI/2-0.0001;
    }
}

let _x = 0;
let _y = 0;
function move(x, y){
    try{
        if(x>_x){
            angley -= vel;
        }else if(x<_x){
            angley += vel;
        }
        if(y>_y){
            anglex -= vel;
        }else if(y<_y){
            anglex += vel;
        }
    }catch{
        _x1 = _y1 = 0;
    }
    _x = x;
    _y = y;
}

function add(){
    if(nfun.value != init_func[init_func.length-1] && nfun.value != ''){
        init_func.push(nfun.value);
        init_funcf.push(randomColor());
    }
    nfun.value = '';
    refresh = true;
    let list = document.getElementById('flist');
    list.innerHTML = '';
    for(n=0;n<init_func.length;n++){
        list.innerHTML += `<div class="item"><h3>${init_func[n]}</h3><div><div style="background: ${init_funcf[n]};"></div><input type="text" value="${init_funcf[n]}" id="cor${n}" onchange="changecolor(${n})"><button onclick="delf(${n})"><span class="material-symbols-outlined">delete</span></button></div></div>`;
    }
}

function delf(n){
    cut(init_func, n);
    cut(init_funcf, n);
    refresh = true;
    let list = document.getElementById('flist');
    list.innerHTML = '';
    for(n=0;n<init_func.length;n++){
        list.innerHTML += `<div class="item"><h3>${init_func[n]}</h3><div><div style="background: ${init_funcf[n]};"></div><input type="text" value="${init_funcf[n]}" id="cor${n}" onchange="changecolor(${n})"><button onclick="delf(${n})"><span class="material-symbols-outlined">delete</span></button></div></div>`;
    }
}

function changecolor(n){
    inp = document.getElementById(`cor${n}`);
    funf[n] = inp.value;
    init_funcf[n] = inp.value;
    let list = document.getElementById('flist');
    list.innerHTML = '';
    for(n=0;n<init_func.length;n++){
        list.innerHTML += `<div class="item"><h3>${init_func[n]}</h3><div><div style="background: ${init_funcf[n]};"></div><input type="text" value="${init_funcf[n]}" id="cor${n}" onchange="changecolor(${n})"><button onclick="delf(${n})"><span class="material-symbols-outlined">delete</span></button></div></div>`;
    }
}

function play4d(){
    let icon = document.getElementById('playicon');
    if(p4d==true){
        p4d = false;
        icon.innerHTML = 'play_circle';
    }else{
        p4d = true;
        icon.innerHTML = 'pause';
    }
}

function mainLoop(){
    ctx.clearRect(0,0,900,900);
    largura = lar.value;
    time = tim.value;
    altura = alt.value;
    profundidade = prof.value;
    nLargura = nlar.value;
    nTime = ntim.value;
    nAltura = nalt.value;
    nProfundidade = nprof.value;
    xicv = Number(xiCords.value);
    scrl = Number(scrol.value);
    ctx.lineWidth = wd.value;
    vel = Number(velo.value);
    rez = rezo.value;
    sx = Number(stx.value);
    sy = Number(sty.value);
    sz = Number(stz.value);
    distanci = dis.value;
    if(largura        != _largura       ||
       time           != _time          ||
       altura         != _altura        ||
       profundidade   != _profundidade  ||
       nLargura       != _nLargura      ||
       nTime          != _nTime         ||
       nAltura        != _nAltura       ||
       nProfundidade  != _nProfundidade ||
       xicv           != _xicv          ||
       scrl           != _scrl          ||
       rez            != _rez           ||
       sx             != _sx            ||
       sy             != _sy            ||
       sz             != _sz            ||
       refresh        == true           ||
       p4d            == true           ){
        refresh = false;
        scrol.min = nTime;
        scrol.max = time;
        xiCords.min = nTime;
        xiCords.max = time;
        if(p4d){
            xiCords.value = xi;
            scrol.value = xi;
        }else{
            if(xicv != _xicv){
                xi = xicv;
                scrol.value = xicv;
            }else if(scrl != _scrl){
                xi = scrl;
                xiCords.value = scrl;
            }
        }
        fun = [];
        for(m=0;m<init_func.length;m++){
            if(init_func[m].trim().slice(0, 6)=='point(' && init_func[m].trim()[init_func[m].trim().length-1]==')'){
                let p = init_func[m].trim().slice(6, init_func[m].trim().length-1);
                let pl = p.split(',');
                pl[0] = [math.parse(pl[0]).evaluate()/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)];
                pl[1] = [-math.parse(pl[1]).evaluate()/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)];
                pl[2] = [-math.parse(pl[2]).evaluate()/((profundidade-nProfundidade)/2)+(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)];
                fun[m] = [pl];
            }else{
                fun[m] = func(init_func[m]);
            }
            funf[m] = init_funcf[m];
        }
        _largura = largura;
        _time = time;
        _altura = altura;
        _profundidade = profundidade;
        _nLargura = nLargura;
        _nTime = nTime;
        _nAltura = nAltura;
        _nProfundidade = nProfundidade;
        _xicv = xicv;
        _scrl = scrl;
        _rez = rez;
        _sx = sx;
        _sy = sy;
        _sz = sz;
        _init_func = [];
        _init_funcf = [];
        for(n=0;n<init_func.length;n++){
            _init_func[n] = init_func[n];
            _init_funcf[n] = init_funcf[n];
        }
        if(p4d==true){
            if(xi>time){
                decres = true;
                cres = false;
            }else if(xi<nTime){
                cres = true;
                decres = false;
            }
            if(cres){
                xi += Number(d4vel.value);
            }
            if(decres){
                xi -= Number(d4vel.value);
            }
        }
        let i = 0; pPos = [largura, altura, profundidade]; nPos = [nLargura, nAltura, nProfundidade];
        for(p=0;p<exPoints.length;p++){
            if(p==2){i = 1;}else if(p==4){i = 2;}
            for(c=0;c<3;c++){
                if(c != i){
                    if(p>1 && c==0){
                        exPoints[p][c] = [-(Number(pPos[c])+Number(nPos[c]))/(pPos[c]-nPos[c])];
                    }else{
                        exPoints[p][c] = [(Number(pPos[c])+Number(nPos[c]))/(pPos[c]-nPos[c])];
                    }
                    if(exPoints[p][c][0] > 1){
                        exPoints[p][c][0] = 1;
                    }else if(exPoints[p][c][0] < -1){
                        exPoints[p][c][0] = -1;
                    }
                }
            }
        }
        ponts = [];
        for(x=0;x<=largura;x+=sx){
            let a = [[x/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)], [exPoints[0][1]], [exPoints[0][2]]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[1][0] >= -1 && a[1][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                ponts.push(a);
            }
        }
        for(x=0;x>=nLargura;x-=sx){
            let a = [[x/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)], [exPoints[0][1]], [exPoints[0][2]]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[1][0] >= -1 && a[1][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                ponts.push(a);
            }
        }
        for(y=0;y<=altura;y+=sy){
            let a = [[exPoints[2][0]], [-y/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)], [exPoints[2][2]]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[1][0] >= -1 && a[1][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                ponts.push(a);
            }
        }
        for(y=0;y>=nAltura;y-=sy){
            let a = [[exPoints[2][0]], [-y/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)], [exPoints[2][2]]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[1][0] >= -1 && a[1][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                ponts.push(a);
            }
        }
        for(z=0;z<=profundidade;z+=sz){
            let a = [[exPoints[4][0]], [exPoints[4][1]], [-z/((profundidade-nProfundidade)/2)+(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[1][0] >= -1 && a[1][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                ponts.push(a);
            }
        }
        for(z=0;z>=nProfundidade;z-=sz){
            let a = [[exPoints[4][0]], [exPoints[4][1]], [-z/((profundidade-nProfundidade)/2)+(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]];
            if(a[0][0] >= -1 && a[0][0] <= 1 &&
               a[1][0] >= -1 && a[1][0] <= 1 &&
               a[2][0] >= -1 && a[2][0] <= 1 ){
                ponts.push(a);
            }
        }
        gridList = [];
        if(xygrid.checked){
            for(x=0;x<=largura;x+=sx){
                let a = [[x/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)], [1], [exPoints[0][2]]];
                let b = [[x/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)], [-1], [exPoints[0][2]]];
                if(a[0][0] >= -1 && a[0][0] <= 1 &&
                   a[2][0] >= -1 && a[2][0] <= 1 ){
                    gridList.push(a);
                    gridList.push(b);
                }
            }
            for(x=0;x>=nLargura;x-=sx){
                let a = [[x/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)], [1], [exPoints[0][2]]];
                let b = [[x/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)], [-1], [exPoints[0][2]]];
                if(a[0][0] >= -1 && a[0][0] <= 1 &&
                   a[2][0] >= -1 && a[2][0] <= 1 ){
                    gridList.push(a);
                    gridList.push(b);
                }
            }
            for(y=0;y<=altura;y+=sy){
                let a = [[1], [-y/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)], [exPoints[2][2]]];
                let b = [[-1], [-y/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)], [exPoints[2][2]]];
                if(a[1][0] >= -1 && a[1][0] <= 1 &&
                   a[2][0] >= -1 && a[2][0] <= 1 ){
                    gridList.push(a);
                    gridList.push(b);
                }
            }
            for(y=0;y>=nAltura;y-=sy){
                let a = [[1], [-y/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)], [exPoints[2][2]]];
                let b = [[-1], [-y/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)], [exPoints[2][2]]];
                if(a[1][0] >= -1 && a[1][0] <= 1 &&
                   a[2][0] >= -1 && a[2][0] <= 1 ){
                    gridList.push(a);
                    gridList.push(b);
                }
            }
        }
        if(xzgrid.checked){
            for(x=0;x<=largura;x+=sx){
                let a = [[x/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)], [exPoints[0][1]], [1]];
                let b = [[x/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)], [exPoints[0][1]], [-1]];
                if(a[0][0] >= -1 && a[0][0] <= 1 &&
                   a[2][0] >= -1 && a[2][0] <= 1 ){
                    gridList.push(a);
                    gridList.push(b);
                }
            }
            for(x=0;x>=nLargura;x-=sx){
                let a = [[x/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)], [exPoints[0][1]], [1]];
                let b = [[x/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)], [exPoints[0][1]], [-1]];
                if(a[0][0] >= -1 && a[0][0] <= 1 &&
                   a[2][0] >= -1 && a[2][0] <= 1 ){
                    gridList.push(a);
                    gridList.push(b);
                }
            }
            for(z=0;z<=profundidade;z+=sz){
                let a = [[1], [exPoints[4][1]], [-z/((profundidade-nProfundidade)/2)+(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]];
                let b = [[-1], [exPoints[4][1]], [-z/((profundidade-nProfundidade)/2)+(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]];
                if(a[1][0] >= -1 && a[1][0] <= 1 &&
                   a[2][0] >= -1 && a[2][0] <= 1 ){
                    gridList.push(a);
                    gridList.push(b);
                }
            }
            for(z=0;z>=nProfundidade;z-=sz){
                let a = [[1], [exPoints[4][1]], [-z/((profundidade-nProfundidade)/2)+(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]];
                let b = [[-1], [exPoints[4][1]], [-z/((profundidade-nProfundidade)/2)+(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]];
                if(a[1][0] >= -1 && a[1][0] <= 1 &&
                   a[2][0] >= -1 && a[2][0] <= 1 ){
                    gridList.push(a);
                    gridList.push(b);
                }
            }
        }
        if(yzgrid.checked){
            for(y=0;y<=altura;y+=sy){
                let a = [[exPoints[2][0]], [-y/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)], [1]];
                let b = [[exPoints[2][0]], [-y/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)], [-1]];
                if(a[0][0] >= -1 && a[0][0] <= 1 &&
                   a[1][0] >= -1 && a[1][0] <= 1 ){
                    gridList.push(a);
                    gridList.push(b);
                }
            }
            for(y=0;y>=nAltura;y-=sy){
                let a = [[exPoints[2][0]], [-y/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)], [1]];
                let b = [[exPoints[2][0]], [-y/((altura-nAltura)/2)+(Number(altura)+Number(nAltura))/(altura-nAltura)], [-1]];
                if(a[0][0] >= -1 && a[0][0] <= 1 &&
                   a[1][0] >= -1 && a[1][0] <= 1 ){
                    gridList.push(a);
                    gridList.push(b);
                }
            }
            for(z=0;z<=profundidade;z+=sz){
                let a = [[exPoints[4][0]], [1], [-z/((profundidade-nProfundidade)/2)+(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]];
                let b = [[exPoints[4][0]], [-1], [-z/((profundidade-nProfundidade)/2)+(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]];
                if(a[0][0] >= -1 && a[0][0] <= 1 &&
                   a[2][0] >= -1 && a[2][0] <= 1 ){
                    gridList.push(a);
                    gridList.push(b);
                }
            }
            for(z=0;z>=nProfundidade;z-=sz){
                let a = [[exPoints[4][0]], [1], [-z/((profundidade-nProfundidade)/2)+(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]];
                let b = [[exPoints[4][0]], [-1], [-z/((profundidade-nProfundidade)/2)+(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]];
                if(a[0][0] >= -1 && a[0][0] <= 1 &&
                   a[2][0] >= -1 && a[2][0] <= 1 ){
                    gridList.push(a);
                    gridList.push(b);
                }
            }
        }
    }
    if(bord.checked){
        draw(c_points, c_pos, liga='Square');
    }
    
    draw(gridList, c_pos, liga='Grid', fill='grey');
    draw(exPoints, c_pos, liga='xyzPlan');
    draw(exPoints, c_pos, liga='Extremos');
    

    draw(ponts, c_pos, liga='Points');
    

    for(n=0;n<fun.length;n++){
        try{
            if(fun[n].length==1){
                if( fun[n][0][0][0] >= -1 && fun[n][0][0][0] <= 1 &&
                    fun[n][0][1][0] >= -1 && fun[n][0][1][0] <= 1 &&
                    fun[n][0][2][0] >= -1 && fun[n][0][2][0] <= 1 ){
                    draw(fun[n], c_pos, liga='Point', fill=funf[n]);
                }
            }else{
                draw(fun[n], c_pos, 'Func', fill=funf[n]);
            }
        }catch{
            cut(init_func, n);
            cut(init_funcf, n);
            refresh = true;
            let list = document.getElementById('flist');
            list.innerHTML = '';
            for(n=0;n<init_func.length;n++){
                list.innerHTML += `<div class="item"><h3>${init_func[n]}</h3><div><div style="background: ${init_funcf[n]};"></div><input type="text" value="${init_funcf[n]}" id="cor${n}" onchange="changecolor(${n})"><button onclick="delf(${n})"><span class="material-symbols-outlined">delete</span></button></div></div>`;
            }
        }
    }

    anima = requestAnimationFrame(mainLoop);
}

//constructors
const fundo = document.getElementById('fundo');
const ctx = fundo.getContext("2d");
let anima;
ctx.font = '30px serif';

//constantes
let anglez = 0;
let anglex = -0.5;
let angley = -0.8;
let dim = [fundo.width, fundo.height];
let refresh = false;
let p4d = false;
let xi = 0;
let cres = true;
let decres = false;
let gridList = [];

//variaveis
let distanci = 3;
let largura = 4;
let time = 4;
let altura = 4;
let profundidade = 4;
let nLargura = -4;
let nTime= -4;
let nAltura = -4;
let nProfundidade = -4;
let xicv = 0;
let scrl = 0;
let rez = 100;
let vel = 0.03;
let sx = 1;
let sy = 1;
let sz = 1;
let init_func = ['x^x'];
let init_funcf = ['#000000'];
let fun = [];
let funf = [];
for(n=0;n<init_func.length;n++){
    fun.push(func(init_func[n]));
    funf.push(init_funcf[n]);
}

let _largura = 4;
let _time = 4;
let _altura = 4;
let _profundidade = 4;
let _nLargura = -4;
let _nTime= -4;
let _nAltura = -4;
let _nProfundidade = -4;
let _xicv = 0;
let _scrl = 0;
let _rez = 100;
let _sx = 1;
let _sy = 1;
let _sz = 1;
let _init_func = ['x^x'];
let _init_funcf = ['#000000'];

let lar      = document.getElementById('xr');
let tim      = document.getElementById('xir');
let alt      = document.getElementById('yr');
let prof     = document.getElementById('zr');
let nlar     = document.getElementById('nxr');
let ntim     = document.getElementById('nxir');
let nalt     = document.getElementById('nyr');
let nprof    = document.getElementById('nzr');
let wd       = document.getElementById('wd');
let pwd      = document.getElementById('pwd');
let velo     = document.getElementById('vel');
let rezo     = document.getElementById('rez');
let dis      = document.getElementById('dis');
let nfun     = document.getElementById('func');
let stx      = document.getElementById('sx');
let sty      = document.getElementById('sy');
let stz      = document.getElementById('sz');
let pers     = document.getElementById('pers');
let bord     = document.getElementById('borda');
let xiCords  = document.getElementById('xic');
let scrol    = document.getElementById('d4scr');
let d4vel    = document.getElementById('d4vel');
let xygrid = document.getElementById('xygrid');
let xzgrid = document.getElementById('xzgrid');
let yzgrid = document.getElementById('yzgrid');

//objects
let c_pos = [dim[0]/2, dim[1]/2];
let c_points = [[[-1], [-1], [1]],
                [[1], [-1], [1]],
                [[1], [1], [1]],
                [[-1], [1], [1]],
                [[-1], [-1], [-1]],
                [[1], [-1], [-1]],
                [[1], [1], [-1]],
                [[-1], [1], [-1]]];

let exPoints = [[[-1],[0] ,[0] ],
                [[1] ,[0] ,[0] ],
                [[0] ,[-1],[0] ],
                [[0] ,[1] ,[0] ],
                [[0] ,[0] ,[-1]],
                [[0] ,[0] ,[1] ]];
let ponts = [];
for(x=0;x<=largura;x++){
    let a = [[x/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)], [exPoints[0][1]], [exPoints[0][2]]];
    ponts.push(a);
}
for(x=0;x>=nLargura;x--){
    let a = [[x/((largura-nLargura)/2)-(Number(largura)+Number(nLargura))/(largura-nLargura)], [exPoints[0][1]], [exPoints[0][2]]];
    ponts.push(a);
}
for(y=0;y<=altura;y++){
    let a = [[exPoints[2][0]], [-y/((altura-nAltura)/2)-(Number(altura)+Number(nAltura))/(altura-nAltura)], [exPoints[2][2]]];
    ponts.push(a);
}
for(y=0;y>=nAltura;y--){
    let a = [[exPoints[2][0]], [-y/((altura-nAltura)/2)-(Number(altura)+Number(nAltura))/(altura-nAltura)], [exPoints[2][2]]];
    ponts.push(a);
}
for(z=0;z<=profundidade;z++){
    let a = [[exPoints[4][0]], [exPoints[4][1]], [-z/((profundidade-nProfundidade)/2)-(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]];
    ponts.push(a);
}
for(z=0;z>=nProfundidade;z--){
    let a = [[exPoints[4][0]], [exPoints[4][1]], [-z/((profundidade-nProfundidade)/2)-(Number(profundidade)+Number(nProfundidade))/(profundidade-nProfundidade)]];
    ponts.push(a);
}
let down = false;
fundo.addEventListener('mousedown', ()=>{
    down = true;
});
fundo.addEventListener('mouseup', ()=>{
    down = false;
});
fundo.addEventListener('mouseleave', ()=>{
    down = false;
});
fundo.addEventListener('mousemove', (e)=>{
    let x = e.pageX;
    let y = e.pageY;
    if(down){
        move(x, y);
    }
});
fundo.addEventListener('touchmove', (e)=>{
    move(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
});

mainLoop();

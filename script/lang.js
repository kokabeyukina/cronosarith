function createCookie(n, v){
    document.cookie = n+'='+v+'; expires= Tue, 1 jan 2603 12:00:00 UTC';
}
function delCookie(n, v){
    document.cookie = n+'='+v+'; expires= Tue, 1 jan 1603 12:00:00 UTC';
}

function translates(lang){
    let key;
    switch(lang){
        case 'pt-br':
            document.getElementById(ids[0]).style.padding = '25px 10px';
            document.getElementById(ids[1]).style.marginBottom = '';
            document.getElementById('submenu').style.marginTop = '30px';
            document.getElementById('logo').title = 'Página principal';
            document.getElementById('text0').title = 'Como usar';
            document.getElementById('addbutton').title = 'Adicionar';
            document.getElementById('playbutton').title = 'Iniciar animação';
            document.getElementById('zp').title = 'Focar no plano x e y';
            document.getElementById('yp').title = 'Focar no plano x e z';
            document.getElementById('xp').title = 'Focar no plano y e z';
            key = 0;
            break;
        case 'en':
            document.getElementById(ids[0]).style.padding = '25px 10px';
            document.getElementById(ids[1]).style.marginBottom = '';
            document.getElementById('submenu').style.marginTop = '30px';
            document.getElementById('logo').title = 'Main page';
            document.getElementById('text0').title = 'How to use';
            document.getElementById('addbutton').title = 'Add';
            document.getElementById('playbutton').title = 'Start animation';
            document.getElementById('zp').title = 'Focus on the x and y plane';
            document.getElementById('yp').title = 'Focus on the x and z plane';
            document.getElementById('xp').title = 'Focus on the y and z plane';
            key = 1;
            break;
        case 'ja':
            document.getElementById(ids[0]).style.padding = '20px 10px';
            document.getElementById(ids[1]).style.marginBottom = '0px';
            document.getElementById('submenu').style.marginTop = '10px';
            document.getElementById('logo').title = '主ページ';
            document.getElementById('text0').title = '使い方';
            document.getElementById('addbutton').title = '加える';
            document.getElementById('playbutton').title = 'アニメーションを開始';
            document.getElementById('zp').title = 'x 平面と y 平面に焦点を当てる';
            document.getElementById('yp').title = 'x 平面と z 平面に焦点を当てる';
            document.getElementById('xp').title = 'y 平面と z 平面に焦点を当てる';
            key = 2;
            break;
    }
    for(i in ids){
        let text = document.getElementById(ids[i]);
        if(i==16){
            text.innerHTML = langs[key][i]+' <a href="sobre.html">'+langs[key][0]+'</a>'+langs[key][17];
        }else if(i==17){}else{
            text.innerHTML = langs[key][i];
        }    
    }
    createCookie('lang', lang);
    ht.lang = lang;
}

let ids = [
    'text0',
    'text1',
    'text2',
    'tl',
    'xl',
    'yl',
    'zl',
    'sl',
    'text3',
    'text4',
    'text5',
    'text6',
    'text7',
    'text8',
    'text9',
    'text10',
    'text11','',
    'text12'
];
let langs = [[
'SOBRE',
'Calc. Imaginária',
'Função:',
'Escopo de t:',
'Escopo de x:',
'Escopo de y:',
'Escopo de z:',
'Distância entre os pontos:',
'Perspectiva',
'Borda',
'Grossura da linha:',
'Grossura do ponto:',
'Sensibilidade:',
'Resolução:',
'Velocidade:',
'Distância:',
'Para qualquer dúvida, basta clicar na opção',
'.',
'Grade:'
], [
    'ABOUT',
    'Imag. Calculator',
    'Function:',
    'Range t:',
    'Range x:',
    'Range y:',
    'Range z:',
    'Points distance:',
    'Perspective',
    'Border',
    'Line width:',
    'Point size:',
    'Sensibility:',
    'Resolution:',
    'Velocity:',
    'Distance:',
    'For any question, just click on the option',
    '.',
    'Grid:'
], [
    '電卓について',
    '虚数電卓',
    '関数:',
    '範囲 t:',
    '範囲 x:',
    '範囲 y:',
    '範囲 z:',
    'ポイント距離:',
    '遠近法',
    'ボーダー',
    '線幅:',
    'ポイント大きさ:',
    '感度:',
    '解像度:',
    '速度:',
    '距離:',
    '質問がある場合は、オプション',
    'をクリックして下さい。',
    '格子:'
]];
let ht = document.querySelector('html');
let selector = document.getElementById('lang');
let coo;
coo = document.cookie.split(';');
if(coo[0]==''){
    createCookie('lang', 'en');
    coo = document.cookie.split(';');
}
let cooks = [];
for(i in coo){
    cooks[i] = coo[i].split('=');
}

translates(cooks[0][1]);
selector.value = cooks[0][1];

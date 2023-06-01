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
            document.querySelector('title').innerHTML = 'Sobre';
            document.getElementById('logo').title = 'Página principal';
            key = 0;
            break;
        case 'en':
            document.querySelector('title').innerHTML = 'About';
            document.getElementById('logo').title = 'Main page';
            key = 1;
            break;
        case 'ja':
            document.querySelector('title').innerHTML = '演算について';
            document.getElementById('logo').title = '主ページ';
            key = 2;
            break;
    }
    text.innerHTML = langs[key];
    createCookie('lang', lang);
    ht.lang = lang;
}

let langs = [`
        <h2>Funcionamento:</h2>
        <p>
            &ensp;Esta calculadora funciona usando a função dada no campo "função" e 
            substituindo o x para cada ponto no eixo x (vermelho), 
            e usando o valor retornado pela função, sendo o valor real a cordenada
            do eixo y (azul) e o imaginário a do eixo z (verde). <br>

            &ensp;A resolução define em quantas partes cada intevalo de x será cortado, 
            deixando o gráfico mais definido conforme ela aumenta, portanto, quanto
            maior o escopo ou a resolução mais pesado ficará o carregamento. <br>

            &ensp;Pontos onde o limite positivo e o negativo não convergem acabam sendo
            representados por uma linha reta ligando seus pontos laterais.  <br>

            &ensp;Em alguns casos a calculadora prefere usar os valores imaginários em vez
            dos possíveis reais, por exemplo no caso x^(1/3).
        </p>
        <h2>Funções:</h2>
        <p>
            &ensp;Para criar uma nova função, é necessário escreve-la usando o padrão requerido na lista 
            mais abaixo e clicar no botão "+" ou apertar o enter. <br>

            &ensp;A função será criada com uma cor aleatória. Para muda-la, basta colocar o código da cor
            desejada no padrão HEX ou escrever seu nome em inglês. <br>

            &ensp;Quanto mais funções carregadas, mais pesado fica o site. Para limpar as funções não usadas
            basta clicar no botão vermelho ao lado do input de cor. <br>

            &ensp;É possível usar apenas funções onde o f(x) está isolado, sendo, 
            nessa versão, impossível de se calcular funções como f(x)e<sup>f(x)</sup>=x, por exemplo. <br>
            
            &ensp;Para criar um ponto basta escrever "point" e colocar as cordenadas entre
            parenteses, por exemplo, point(2, 2, 1), também é possível usar expressões 
            como point(log(2), -e^pi, 0).
        </p>
        <h2>Escopo de t:</h2>
        <p>
            &ensp;Infelizmente, para fazer uma cálculadora gráfica que aceite um número imaginário
            como x e retorne outro número imaginário como y, seria preciso 4 dimesões de espaço, 
            2 para as pertes imaginárias de x e y, e mais 2 para seus respectivos valores reais. <br>

            &ensp;Mas, por sorte, ainda conseguimos experienciar 4 dimensões, 3 de espaço e uma de tempo.
            Assim, podemos criar uma variável "t" que pode ser visualizada em uma animação. Com isso, 
            temos o eixo z representando o valor imaginário de y e t representando o valor imaginário
            de x.
        </p>
        <h2>Perspectiva:</h2>
        <p>
            &ensp;O gráfico é gerado usando um ""motor gráfico"" de perspectiva que diminuí os pontos mais distantes
            e aumenta os mais próximos, essa técnica é útil para se ter uma noção 3d do gráfico, 
            deixando-o mais realista. Mas quando se está tentando saber os pontos em apenas 
            2 planos essa técnica acaba deixando o gráfico deformado, para não ter esse problema
            basta desativar a opção "perspectiva".
        </p>
        <h2>Outras configurações:</h2>
        <h3>Botões de foco:</h3>
        <p>
            &ensp;São usados para ter uma visão de apenas dois planos, focando apenas nos planos 
            que nomeiam o botão. Fortemente recomendado que se desative a opção de perspectiva.
        </p>
        <h3>Tamanho da linha e do ponto:</h3>
        <p>
            &ensp;Mudam a grossura das linhas e o tamanho dos pontos.
        </p>
        <h3>Sensibilidade e distância:</h3>
        <p>
            &ensp;A sensibilidade define o arrasto do mause/dedo necessário para mudar o ângulo do gráfico.
            E a distância define a "distância" ou o tamanho do gráfico.
        </p>
        <h3>Resolução e velocidade:</h3>
        <p>
            &ensp;A resolução, como já dito, define a quantidade de pontos para cada intevalo de x,
            enquanto a velocidade define a velocidade da "animação" de t.
        </p>

        <h2>Códigos para representar a função:</h2>
        <ul>
            <li>ab => a*b</li>
            <li>a/b == a/b</li>
            <li>a<sup>b</sup> => a^b</li>
            <li>√a => sqrt(a) | a^(1/2)</li>
            <li>ln(a) => log(a)</li>
            <li>log<sub>b</sub>(a) => log(a, b)</li>
            <li>sen(a) => sin(a)</li>
            <li>cos(a) == cos(a)</li>
            <li>tg(a) => tan(a)</li>
            <li>sen<sup>-1</sup>(a) => asin(a)</li>
            <li>cos<sup>-1</sup>(a) => acos(a)</li>
            <li>tg<sup>-1</sup>(a) => atan(a)</li>
            <li>π => pi</li>
            <li>e == e</li>
            <li>i == i</li>
            <li>senh(a) => sinh(a)</li>
            <li>cosh(a) == cosh(a)</li>
            <li>tgh(a) => tanh(a)</li>
            <li>senh<sup>-1</sup>(a) => asinh(a)</li>
            <li>cosh<sup>-1</sup>(a) => acosh(a)</li>
            <li>tgh<sup>-1</sup>(a) => atanh(a)</li>
            <li>sec(a) == sec(a)</li>
            <li>csc(a) == csc(a)</li>
            <li>cot(a) == cot(a)</li>
            <li>sec<sup>-1</sup>(a) => asec(a)</li>
            <li>csc<sup>-1</sup>(a) => acsc(a)</li>
            <li>cot<sup>-1</sup>(a) => acot(a)</li>
        </ul>

        <h2>Alguns exemplos:</h2>
        <ul>
            <li>x^x</li>
            <li>x^(x^2)</li>
            <li>x^sin(x)</li>
            <li>log(x^x)</li>
            <li>atan(x^x)</li>
            <li>tan(x^x)^x</li>
            <li>e^(x*i)</li>
            <li>(cos(12pi/13)+sin(12pi/13)*i)^x</li>
            <li>(-1)^x</li>
            <li>log(x)*(cos(x)+i*sin(x))</li>
            <li>(x+(x^2-80)^(1/2))/2</li>
            <li>(x-(x^2-80)^(1/2))/2</li>
        </ul>
        <hr>
        <footer>
            <p>
                Agradecimento especial aos responsáveis pela biblioteca de 
                JavaScript, <a title="mathjs.org" href="https://mathjs.org/">Mathjs</a>, responsáveis por escrever o código
                capaz de calcular números imaginários.
            </p>
            <div style="text-align: end; padding-bottom: 10px; font-size: small;">
                Por Murilo B. Fernandes
            </div>
        </footer>
`, `
            <h2>How it works:</h2>
            <p>
                &ensp;This calculator works using the function given in the "function" field and
                substituting the x for each point on the x-axis (red),
                and using the value returned by the function, the real value being the coordinate
                of the y-axis (blue) and the imaginary the coordinate of the z-axis (green). <br>
    
                &ensp;The resolution defines how many parts each interval of x will be cut,
                making the graph more defined as it increases, therefore, the
                the higher the scope or resolution the heavier the loading will be. <br>
    
                &ensp;Points where the positive and negative limits do not converge end up being
                represented by a straight line connecting their lateral points. <br>
    
                &ensp;In some cases the calculator prefers to use imaginary values instead
                of the possible real ones, for example in the case x^(1/3).
            </p>
            <h2>Functions:</h2>
            <p>
                &ensp;To create a new function, it is necessary to write it using the pattern required in the list
                below and click on the "+" button or press enter. <br>
    
                &ensp;The function will be created with a random color. To change it, just put the desired color code
                in HEX pattern or write its name in English. <br>
    
                &ensp;The more functions loaded, the more heavier the site becomes. To clear unused functions
                just click the red button next to the color input. <br>
    
                &ensp;It is possible to use only functions where f(x) is isolated, being
                in this version impossible to calculate functions like f(x)e<sup>f(x)</sup>=x, for example. <br>
                
                &ensp;To create a point just write "point" and put the coordinates between
                parentheses, for example, point(2, 2, 1), you can also use expressions
                like point(log(2), -e^pi, 0).
            </p>
            <h2>Range t:</h2>
            <p>
                &ensp;Unfortunately, to make a graphing calculator that accepts an imaginary number
                as x and return another imaginary number as y, it would take 4 dimensions of space,
                2 for the imaginary parts of x and y plus 2 more for their respective real values. <br>
    
                &ensp;But, luckily, we still managed to experience 4 dimensions, 3 of space and one of time.
                Thus, we can create a variable "t" that can be visualized in an animation. Thereby,
                we have the z axis representing the imaginary value of y and t representing the imaginary value
                from x.
            </p>
            <h2>Perspective:</h2>
            <p>
                &ensp;The graph is generated using a perspective ""graphics engine"" that shrinks the farthest points
                and increases the nearest ones, this technique is useful to get a 3d notion of the graph,
                making it more realistic. But when you are trying to know the points in just
                2 planes, this technique ends up leaving the graph deformed, so as not to have this problem
                just disable the "perspective" option.
            </p>
            <h2>Others configurations:</h2>
            <h3>Focus buttons:</h3>
            <p>
                &ensp;They are used to have a view of only two planes, focusing only on the planes
                that name the button. Strongly recommended to disable the perspective option.
            </p>
            <h3>Line and point size:</h3>
            <p>
                &ensp;Change the thickness of the lines and the size of the points.
            </p>
            <h3>Sensibility and distancie:</h3>
            <p>
                &ensp;Sensibility defines the mouse/finger drag required to change the graph angle.
                And the distance defines the "distance" or size of the graph.
            </p>
            <h3>Resolution and velocity:</h3>
            <p>
                &ensp;The resolution, as already mentioned, defines the number of points for each interval of x,
                while velocity defines the speed of the "animation" of t.
            </p>
    
            <h2>Codes to represent the function:</h2>
            <ul>
                <li>ab => a*b</li>
                <li>a/b == a/b</li>
                <li>a<sup>b</sup> => a^b</li>
                <li>√a => sqrt(a) | a^(1/2)</li>
                <li>ln(a) => log(a)</li>
                <li>log<sub>b</sub>(a) => log(a, b)</li>
                <li>sen(a) => sin(a)</li>
                <li>cos(a) == cos(a)</li>
                <li>tg(a) => tan(a)</li>
                <li>sen<sup>-1</sup>(a) => asin(a)</li>
                <li>cos<sup>-1</sup>(a) => acos(a)</li>
                <li>tg<sup>-1</sup>(a) => atan(a)</li>
                <li>π => pi</li>
                <li>e == e</li>
                <li>i == i</li>
                <li>senh(a) => sinh(a)</li>
                <li>cosh(a) == cosh(a)</li>
                <li>tgh(a) => tanh(a)</li>
                <li>senh<sup>-1</sup>(a) => asinh(a)</li>
                <li>cosh<sup>-1</sup>(a) => acosh(a)</li>
                <li>tgh<sup>-1</sup>(a) => atanh(a)</li>
                <li>sec(a) == sec(a)</li>
                <li>csc(a) == csc(a)</li>
                <li>cot(a) == cot(a)</li>
                <li>sec<sup>-1</sup>(a) => asec(a)</li>
                <li>csc<sup>-1</sup>(a) => acsc(a)</li>
                <li>cot<sup>-1</sup>(a) => acot(a)</li>
            </ul>
    
            <h2>Some examples:</h2>
            <ul>
                <li>x^x</li>
                <li>x^(x^2)</li>
                <li>x^sin(x)</li>
                <li>log(x^x)</li>
                <li>atan(x^x)</li>
                <li>tan(x^x)^x</li>
                <li>e^(x*i)</li>
                <li>(cos(12pi/13)+sin(12pi/13)*i)^x</li>
                <li>(-1)^x</li>
                <li>log(x)*(cos(x)+i*sin(x))</li>
                <li>(x+(x^2-80)^(1/2))/2</li>
                <li>(x-(x^2-80)^(1/2))/2</li>
            </ul>
            <hr>
            <footer>
                <p>
                    Special thanks to those responsible for the library of
                    JavaScript, <a title="mathjs.org" href="https://mathjs.org/">Mathjs</a>, responsible for writing the code
                    able to calculate imaginary numbers.
                </p>
                <div style="text-align: end; padding-bottom: 10px; font-size: small;">
                    By Murilo B. Fernandes
                </div>
            </footer>
`, `
<h2>使い方:</h2>
<p>
    &ensp;この演算は、「関数」フィールドに指定された関数を使用して機能し、x 軸 (赤) 上の各点に x を代入し、
    関数によって返された値を使用して、実際の値は y 軸の座標 (青)です、それで、虚数の値は z 軸の座標 (緑)です。 <br>

    &ensp;解像度は、x の各間隔がカットされる部分の数を定義します。解像度が大きくなるにつれて、グラフがより明確になります。
    したがって、スコープまたは解像度が高くなるほど、負荷が重くなります。 <br>

    &ensp;正と負の限界が収束しないポイントは、横のポイントを結ぶ直線で表されます。 <br>

    &ensp;場合によっては、計算機が可能な実数の代わりに虚数を使用することを好みます、x^(1/3) のように。
</p>
<h2>関数:</h2>
<p>
    &ensp;新しい関数を作成するには、以下のリストで必要なパターンを使用して記述し、
    [+] ボタンをクリックするか、Enter キーを押す必要があります。 <br>

    &ensp;関数はランダムな色で作成されます。変更するには、欲しい色のコードを HEX パターンで入力するか、その名前を英語で書きます。 <br>

    &ensp;搭載する関数が多いほど、サイトが重くなります。未使用の関数をクリアするには、色入力の横にある赤いボタンをクリックします。 <br>

    &ensp;このバージョンでは f(x)e<sup>f(x)</sup>=x のような関数を計算することはできませんが、
    f(x) が分離されている関数のみを使用することが可能です。 <br>
    
    &ensp;ポイントを作成するには、「point」と書き、座標を括弧で囲みます。
    たとえば、point(2, 2, 1) のように、point(log(2), -e^pi, 0) のような式を使用することもできます。
</p>
<h2>範囲 t:</h2>
<p>
    &ensp;残念ながら、虚数を x として受け入れ、別の虚数を y として返すグラフ演算を作成するには、x と y の虚数部分に 2 つ、
    それぞれの実数値にさらに 2 つ、合計 4 つの次元が必要になります。 <br>

    &ensp;しかし幸運なことに、私たちは空間の 3 つと時間の 1 つの 4 つの次元を体験することができます。したがって、
    アニメーションで視覚化できる変数「t」を作成できます。これにより、y の虚数を表す z 軸と、x の虚数を表す t が得られます。
</p>
<h2>遠近法:</h2>
<p>
    &ensp;グラフは、最も遠いポイントを縮小し、最も近いポイントを増やすパースペクティブ「グラフィック エンジン」
    を使用して生成されます。この手法は、グラフの 3D 概念を取得してよりリアルにするのに役立ちます。
    しかし、2 つの平面だけのポイントを知りたい場合、この手法ではグラフが変形したままになるため、この問題が発生しないように、
    「遠近法」オプションを無効にするだけです。
</p>
<h2>他のコンフィグ:</h2>
<h3>集中ボタン:</h3>
<p>
    &ensp;これらは、ボタンに名前を付ける平面のみに焦点を合わせて、2 つの平面のみを表示するために使用されます。
    遠近法オプションを無効にすることを強くお勧めします。
</p>
<h3>線と点のサイズ:</h3>
<p>
    &ensp;線の太さとポイントのサイズを変更します。
</p>
<h3>感度と距離:</h3>
<p>
    &ensp;感度は、グラフの角度を変更するために必要なマウス/指のドラッグを定義します。
    距離は、グラフの「距離」またはサイズを定義します。
</p>
<h3>解像度と速度:</h3>
<p>
    &ensp;既に述べたように、解像度は x の各間隔のポイント数を定義し、速度は t の「アニメーション」の速さを定義します。
</p>

<h2>関数を表すコード:</h2>
<ul>
    <li>ab => a*b</li>
    <li>a/b == a/b</li>
    <li>a<sup>b</sup> => a^b</li>
    <li>√a => sqrt(a) | a^(1/2)</li>
    <li>ln(a) => log(a)</li>
    <li>log<sub>b</sub>(a) => log(a, b)</li>
    <li>sen(a) => sin(a)</li>
    <li>cos(a) == cos(a)</li>
    <li>tg(a) => tan(a)</li>
    <li>sen<sup>-1</sup>(a) => asin(a)</li>
    <li>cos<sup>-1</sup>(a) => acos(a)</li>
    <li>tg<sup>-1</sup>(a) => atan(a)</li>
    <li>π => pi</li>
    <li>e == e</li>
    <li>i == i</li>
    <li>senh(a) => sinh(a)</li>
    <li>cosh(a) == cosh(a)</li>
    <li>tgh(a) => tanh(a)</li>
    <li>senh<sup>-1</sup>(a) => asinh(a)</li>
    <li>cosh<sup>-1</sup>(a) => acosh(a)</li>
    <li>tgh<sup>-1</sup>(a) => atanh(a)</li>
    <li>sec(a) == sec(a)</li>
    <li>csc(a) == csc(a)</li>
    <li>cot(a) == cot(a)</li>
    <li>sec<sup>-1</sup>(a) => asec(a)</li>
    <li>csc<sup>-1</sup>(a) => acsc(a)</li>
    <li>cot<sup>-1</sup>(a) => acot(a)</li>
</ul>

<h2>幾つかの例:</h2>
<ul>
    <li>x^x</li>
    <li>x^(x^2)</li>
    <li>x^sin(x)</li>
    <li>log(x^x)</li>
    <li>atan(x^x)</li>
    <li>tan(x^x)^x</li>
    <li>e^(x*i)</li>
    <li>(cos(12pi/13)+sin(12pi/13)*i)^x</li>
    <li>(-1)^x</li>
    <li>log(x)*(cos(x)+i*sin(x))</li>
    <li>(x+(x^2-80)^(1/2))/2</li>
    <li>(x-(x^2-80)^(1/2))/2</li>
</ul>
<hr>
<footer>
    <p>
        JavaScript のライブラリ <a title="mathjs.org" href="https://mathjs.org/">Mathjs</a> を担当し、
        虚数を計算できるコードを作成して下さった方々に感謝致します。
    </p>
    <div style="text-align: end; padding-bottom: 10px; font-size: small;">
        Murilo B. Fernandes 作
    </div>
</footer>
`];
let ht = document.querySelector('html');
let selector = document.getElementById('lang');
let text = document.querySelector('.board');
let coo = document.cookie.split(';');
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

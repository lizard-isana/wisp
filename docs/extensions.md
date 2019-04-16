# Extentions 機能拡張
Wispにはデフォルトで以下の機能拡張が同包されています（index.htmlでは全てが有効になっています）。

- WispToc:ページ内の見出しのリストを表示
- WispHighlight: highlight.js によるシンタックスハイライト
- WispMathJax: MathJaxによる数式表示
- WispFlowChart: flowchart.jsによるフローチャートの表示
- WispSequenceDiagram: js-sequence-diagramsによるシーケンスダイアグラムの表示


## WispToc (wisp_toc.js)
指定したページ内の見出しのリストを、指定した位置に表示します。

### 例
このサイトで、サイドメニューに使用しています。

### 使い方
ここでは`<div id="main">`の内容を`<div id="sidebar">`に表示することを想定します（このサイトと同じ状態です）。

`<div id="sidebar">`での指定

```html
<p class="toc"></p>

```

スクリプト
```html
<script src="./js/wisp_toc.js">
<script>
    window.onload = function(){
        const main = new Wisp("main");
        main.load(["index.md"]);

        const sidebar = new Wisp("sidebar");
        sidebar.load(["sidebar.md"]);

        const toc = new WispToc(main);
        toc.append(sidebar)
    }
</script>
```

## WispHighlight (wisp_highlight.js)
highlight.js によるシンタックスハイライト

cf. [highlight.js](https://highlightjs.org/)

### 例

```javascript
window.onload = function(){
    var header = new Wisp("header");
    header.load(["header.md"]);

    var sidebar = new Wisp("sidebar");
    sidebar.load(["sidebar.md"]);

    var main = new Wisp("main");
    main.load(["index.md"]);

    var footer = new Wisp("footer");
    footer.load(["footer.md"]);
}
```

    ```javascript
    window.onload = function(){
        var header = new Wisp("header");
        header.load(["header.md"]);

        var sidebar = new Wisp("sidebar");
        sidebar.load(["sidebar.md"]);

        var main = new Wisp("main");
        main.load(["index.md"]);

        var footer = new Wisp("footer");
        footer.load(["footer.md"]);
    }
    ```

### 使い方

```html
<script src="./js/wisp_highlight.js">
<script>
    const wisp_highlight = new WispHighlight()

    window.onload = function(){
        const main = new Wisp("main");
        wisp_highlight(main)
        main.load(["index.md"]);
    }
</script>
```

## WispMathJax (wisp_mathjax.js)
MathJaxによる数式表示

cf. [MathJax Documentation — MathJax 2.7 documentation](http://docs.mathjax.org/en/latest/index.html#)
cf. [Easy Copy MathJax](http://easy-copy-mathjax.xxxx7.com/)

### 例
```
#### ケプラーの第1法則:
$$ r = \frac{a^2/b}{1 + \epsilon \cos \theta} \tag{1}$$
\\( a \\)は軌道長半径、\\( b \\)は軌道短半径、\\( \epsilon \\)は離心率、\\(\theta\\)は真近点角  

#### ケプラーの第2法則:
$$ \frac{1}{2} r^2 \frac{d\theta}{dt} = \frac{dA}{dt} \tag{2}$$

#### ケプラーの第3法則:
$$ \frac{T^2}{a^3} = constant \tag{3}$$

#### ケプラー方程式:
$$ M = E-\epsilon \sin E \tag{4}$$
```

#### ケプラーの第1法則:
$$ r = \frac{a^2/b}{1 + \epsilon \cos \theta} \tag{1}$$
\\( a \\)は軌道長半径、\\( b \\)は軌道短半径、\\( \epsilon \\)は離心率、\\(\theta\\)は真近点角  

#### ケプラーの第2法則:
$$ \frac{1}{2} r^2 \frac{d\theta}{dt} = \frac{dA}{dt} \tag{2}$$

#### ケプラーの第3法則:
$$ \frac{T^2}{a^3} = constant \tag{3}$$

#### ケプラー方程式:
$$ M = E-\epsilon \sin E \tag{4}$$

### 使い方

```html
<script src="./js/wisp_mathjax.js">
<script>
    const wisp_math = new WispMathJax()

    window.onload = function(){
        const main = new Wisp("main");
        wisp_math(main)
        main.load(["index.md"]);
    }
</script>
```

## WispFlowChart (wisp_flowchart.js)
flowchart.jsによるフローチャートの表示、
cf. [flowchart.js](https://flowchart.js.org/)

### 例
    ```flowchart
    st=>start: 開始
    e=>end: 終了
    op1=>operation: 処理
    sub1=>subroutine: サブルーチン
    cond=>condition: 判断
    Yes or No?
    io=>inputoutput: 入力
    para=>parallel: 並行処理
    st->op1->cond
    
    cond(yes)->io->e
    cond(no)->para
    para(path1, bottom)->sub1(right)->op1
    para(path2, top)->op1
    ```

```flowchart
  st=>start: 開始
  e=>end: 終了
  op1=>operation: 処理
  sub1=>subroutine: サブルーチン
  cond=>condition: 判断
  Yes or No?
  io=>inputoutput: 入力
  para=>parallel: 並行処理
  st->op1->cond
  
  cond(yes)->io->e
  cond(no)->para
  para(path1, bottom)->sub1(right)->op1
  para(path2, top)->op1

```
### 使い方

```html
<script src="./js/wisp_flowchart.js">
<script>
    const wisp_chart = new WispFlowChart()

    window.onload = function(){
        const main = new Wisp("main");
        wisp_chart(main)
        main.load(["index.md"]);
    }
</script>
```

## WispSequenceDiagram (wisp_sequence_diagram.js)
js-sequence-diagramsによるシーケンスダイアグラムの表示
cf.[js-sequence-diagrams by bramp](https://bramp.github.io/js-sequence-diagrams/)

### 例

    ```sequence-diagram
    Title: Here is a title
    A->B: Normal line
    B-->C: Dashed line
    C->>D: Open arrow
    D-->>A: Dashed open arrow
    ```

```sequence-diagram
Title: Here is a title
A->B: Normal line
B-->C: Dashed line
C->>D: Open arrow
D-->>A: Dashed open arrow
```

### 使い方

```html
<script src="./js/wisp_sequence_diagrams.js">
<script>
    const wisp_diagram = new WispSequenceDiagram()

    window.onload = function(){
        const main = new Wisp("main");
        wisp_diagram(main)
        main.load(["index.md"]);
    }
</script>
```

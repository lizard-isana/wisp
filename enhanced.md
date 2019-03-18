
## 機能拡張版 enhanced.html
`enhanced.html`では、Wispの拡張機能を使って、あらかじめ以下の機能が追加されています。

- highlight.js によるシンタックスハイライト
- MathJaxによる数式表示
- flowchart.jsによるフローチャートの表示
- js-sequence-diagramsによるシーケンスダイアグラムの表示

ただし、このファイルでは、読み込まれるページが以下のファイルに固定されています。修正する場合は`/js/wisp_enhanced.js`を編集する必要があります。

何をやっているかは、[サンプル](./?main=sample.md)のページにソースコードが転機されているので、そちらを参照してください。

### highlight.js によるシンタックスハイライト
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

cf. [highlight.js](https://highlightjs.org/)

### MathJaxによる数式表示

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

cf. [MathJax Documentation — MathJax 2.7 documentation](http://docs.mathjax.org/en/latest/index.html#)
cf. [Easy Copy MathJax](http://easy-copy-mathjax.xxxx7.com/)

### flowchart.jsによるフローチャートの表示、

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

cf. [flowchart.js](https://flowchart.js.org/)


### js-sequence-diagramsによるシーケンスダイアグラムの表示

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

cf.[js-sequence-diagrams by bramp](https://bramp.github.io/js-sequence-diagrams/)

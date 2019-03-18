
# Markdown Cheatsheet

## 拡張機能 enhanced.html
`enhanced.html`では、Wispの拡張機能を使って、あらかじめ以下の機能が追加されています。

- highlight.js によるシンタックスハイライト
- MathJaxによる数式表示
- flowchart.jsによるフローチャートの表示
- js-sequence-diagramsによるシーケンスダイアグラムの表示

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


## Headers
```
# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------
```

# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------

## Emphasis
```
Emphasis, aka italics, with *asterisks* or _underscores_.
Strong emphasis, aka bold, with **asterisks** or __underscores__.
Combined emphasis with **asterisks and _underscores_**.
Strikethrough uses two tildes. ~~Scratch this.~~
```
Emphasis, aka italics, with *asterisks* or _underscores_.
Strong emphasis, aka bold, with **asterisks** or __underscores__.
Combined emphasis with **asterisks and _underscores_**.
Strikethrough uses two tildes. ~~Scratch this.~~

## List

(In this example, leading and trailing spaces are shown with with dots: ⋅)

```
1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses
```
(In this example, leading and trailing spaces are shown with with dots: ⋅)

1. First ordered list item
2. Another item
  * Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list
4. And another item.

   You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

   To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
   Note that this line is separate, but within the same paragraph.⋅⋅
   (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses


## Links
There are two ways to create links.
```
[I'm an inline-style link](https://www.google.com)

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself]

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
```

[I'm an inline-style link](https://www.google.com)

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself]

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com


## Images
```
Here's our logo (hover to see the title text):

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
```
Here's our logo (hover to see the title text):

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"


## Code
```
Inline `code` has `back-ticks around` it.
```
Inline `code` has `back-ticks around` it.


Blocks of code are either fenced by lines with three back-ticks ```, or are indented with four spaces.

    ```
    var s = "Toto, I've a feeling we're not in Kansas anymore.";
    alert(s);
    ```
```
var s = "Toto, I've a feeling we're not in Kansas anymore.";
alert(s);
```

## Tables
```
Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
```
Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

## Blockquote
```
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.
```
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.


## Inline HTML
```
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
```
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>


## Horizontal Rule
```
Three or more...

---

Hyphens

***

Asterisks

___

Underscores
```
Three or more...

---

Hyphens

***

Asterisks

___

Underscores


## Line Breaks

My basic recommendation for learning how line breaks work is to experiment and discover -- hit <Enter> once (i.e., insert one newline), then hit it twice (i.e., insert two newlines), see what happens. You'll soon learn to get what you want. "Markdown Toggle" is your friend.

Here are some things to try out:
```
Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the *same paragraph*.
```
Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a separate paragraph.

This line is also begins a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the same paragraph.

(Technical note: Markdown Here uses GFM line breaks, so there's no need to use MD's two-space line breaks.)

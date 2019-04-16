# Wisp - A Client-side Flat File CMS

Wispは、Markdownで書いたファイルを読み込んで、レンダリングして、表示するだけのシンプルなCMSです。ブラウザ上のJavaScriptだけで動作し、静的なファイルのみで構成されているので、必要なファイルをアップロードするだけで動きます。ローカルにもサーバ側にも何かをインストールしたり、設定したりする必要がありません。

また、URLクエリを使って読み込むファイルを指定できるため、簡易のWikiシステムのようにも使えます。

さらに、プラグインを使うと、MathJaxを使って数式が出せたり、

$ r = \frac{a^2/b}{1 + \epsilon \cos \theta} \tag{1}$$

flowchart.jsでフローチャートが出せたりします。

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

> **wisp** (noun /wɪsp/):
> a delicate, thin, and sometimes twisting piece or line of something
> *will-o'-the-wisp*

ちなみに、このデモサイトもWispだけで構築されていて、GitHub Pagesでホストされています。
cf. https://github.com/lizard-isana/wisp/tree/master/docs/

## Source Code
https://github.com/lizard-isana/wisp

## License
&copy; 2019 Isana Kashiwai ([MIT license](https://github.com/lizard-isana/wisp/blob/master/LICENSE))

## Copyrights
Wisp highly depends on below superb libraries.
- [marked.js]( https://marked.js.org/ ) ([MIT License]( https://github.com/markedjs/marked/blob/master/LICENSE.md ))
- [highlight.js]( https://highlightjs.org/ ) ([BSD License]( https://github.com/highlightjs/highlight.js/blob/master/LICENSE ))
- [MathJax]( https://www.mathjax.org/ ) ([Apache License 2.0]( https://github.com/mathjax/MathJax/blob/master/LICENSE ))
- [flowchart.js]( https://flowchart.js.org/ ) ([MIT License]( https://github.com/adrai/flowchart.js/blob/master/license ))
- [js-sequence-diagrams]( https://bramp.github.io/js-sequence-diagrams/ ) ([BSD 2-Clause "Simplified" License]( https://github.com/bramp/js-sequence-diagrams/blob/master/LICENCE ))

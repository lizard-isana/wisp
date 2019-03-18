## 基本的な使い方

1. marked.js と wisp.js を読み込む。
2. 任意のidを付加した空要素を必要な位置に挿入する。
3. Wisp()を、先に付与したidで初期化。
4. load() メソッドにmarkdownファイルか、ファイル名の配列を渡す。

以下は最小構成のWispです。 この例では、`<div id="main"></div>`内に、marked.jsでレンダリングされた `index.md` が展開されます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>Wisp - A Client-side Flat File CMS</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.6.1/marked.min.js"></script>
    <script src="./lib/wisp.js"></script>
</head>
<body>
<div id="main"></div>
<script>
  window.onload = function(){
    var wisp = new Wisp("main");
    Wisp.load("index.md")
  }
</script>
</body>
</html>
```


### 複数ファイルの読み込み
Wispオブジェクトは複数生成できるので、異なる要素に対して別のファイルを読み込むことができます。また、`loard()`にファイル名の配列を渡すと、複数のファイルを読み込み、結合して表示します。

以下の例は、このサイトと同じ構成です。

```html
<body>
    <div id="header"></div>
    <div id="sidebar"></div>
    <div id="main"></div>
    <div id="footer"></div>
</body>
```

上のようなHTMLに対して、以下のようなスクリプトを実行すると、それぞれに対して指定されたコンテンツを読み込みます。

```javascript
var header = new Wisp("header");
header.load("header.md");

var sidebar = new Wisp("sidebar");
sidebar.load("sidebar.md");

var main = new Wisp("main");
main.load(["introduction.md","basics.md"]);

var footer = new Wisp("footer");
headfooterer.load("footer.md");

```

## URLクエリでのページ読み込み

Wispは、URLクエリでもファイルを任意のHTML要素内に読み込めるので、HTMLファイルが１つあれば、Wikiのような使い方ができます。以下の例では`main`のidで初期化された要素内に`toto.md`を読み込みます。

[Markdown cheat sheet](./?main=markdown.md)

上記のリンクは以下のように指定されています。

```
  [Markdown cheat sheet](./?main=markdown.md)

```

以下の例は、このサイトのサイドバーの記述の一部です。URLクエリでの指定は、`初期化id=ファイル1,ファイル2...`という形で、初期化時のページ構成を上書きします。

```
[home](./?main=index.md)
[basics](./?main=introduction.md,basics.md)
[enhanced](./enhanced.html?main=enhanced.md)
[markdown](./?main=markdown.md)

```

なお、URLクエリでは別ディレクトリのファイルは指定できないように制限されています。別ディレクトリのファイルを読ませたい場合は、初期化時のオプションでデータディレクトリを指定してください。

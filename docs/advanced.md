# Advanced Usage - 高度な使い方

## ライブラリとしての Wisp

Wisp は Wiki ではありません。指定された HTML の要素内に、Markdown で書かれたファイルをレンダリングして流し込む JavaScript ライブラリです。URL クエリを受け取って要素を更新する機能を使うと Wiki っぽく使える、というだけです。ライブラリとしての Wisp は、シンプルで柔軟性の高いルールと、高い拡張性を持ち、様々な用途に使えます。

ライブラリとしての Wisp の使い方は以下の通りです。

1. wisp.js を読み込む。
2. 任意の id を付加した空要素を必要な位置に挿入する。
3. `Wisp()`を、先に付与した id で初期化。
4. `load()`メソッドに markdown ファイル、もしくはファイル名の配列を渡す。

### サンプル: 最小構成

以下は最小構成の Wisp です。 この例では、`<div id="main"></div>`内に、markdown-it.js でレンダリングされた `index.md` が展開されます。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>wisp</title>
    <script src="./lib/wisp.js"></script>
  </head>
  <body>
    <div id="main"></div>
    <script>
      window.onload = function() {
        var wisp = new Wisp("main");
        wisp.load("index.md");
      };
    </script>
  </body>
</html>
```

この状態で、`./?main=ファイル名`という URL クエリが使えます。ここで指定している`main`は、`var wisp = new Wisp("main");`で初期化している id です。

つまり、デフォルトの`index.html`は、以下のような html と javascript で初期化されている、というわけです（実際にはこれに加えてプラグインなどの指定が入っています）。

```html
<div id="header"></div>
<div id="main"></div>
<div id="sidebar"></div>
<div id="footer"></div>
```

```javascript
var header = new Wisp("header");
header.load("header.md");

var main = new Wisp("main");
main.load("index.md");

var sidebar = new Wisp("sidebar");
sidebar.load("sidebar.md");

var footer = new Wisp("footer");
footer.load("footer.md");
```

### サンプル: リアルタイム更新

ファイルの読み込みと表示は動的に行われているので、ページの中身を書き換えるのに必ずしもリロードは必要ありません。以下の例では、イベントなどの際のリアルタイム更新を想定し、ページ遷移無しで、10 秒ごとに`short_update.md`を読み込んで`main`を更新し、60 秒ごとに`long_update.md`を読み込んで`archive`を更新します。

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>wisp</title>
    <script src="./lib/wisp.js"></script>
  </head>
  <body>
    <div id="main"></div>
    <div id="archive"></div>
    <script>
      window.onload = function() {
        var main = new Wisp("main");
        main.load("short_update.md");

        var archive = new Wisp("archive");
        archive.load("long_update.md");

        var short_updator = window.setInterval(function() {
          main.load("short_update.md");
        }, 10000);

        var long_updator = window.setInterval(function() {
          archive.load("long_update.md");
        }, 60000);
      };
    </script>
  </body>
</html>
```

### 他にも...

- プロトタイピングツールとして
  簡単な指定で、任意の要素中に任意のコンテンツを展開できるので、ブログのテンプレート開発などでプロトタイピングツールとして使えます。後述する初期化オプションで raw を指定すれば、html の断片を流し込むこともできます。

## URL クエリでのファイル指定の制限

URL クエリでのファイル指定は、セキュリティ上のリスクを避けるため、異なるディレクトリのファイルを指定できません。

```
index.html?main=./data/index.md
```

上のように指定しても、以下の指定と同じものとして処理します。

```
index.html?main=index.md
```

## データディレクトリの指定

Wisp は初期化されたディレクトリをデータディレクトリとみなします。つまり、以下のように別ディレクトリのファイルで初期化すると、以後、URL クエリで指定されたファイルは、`./data/`以下にあるものとみなします。

```
  var main = new Wisp("main");
  main.load("./data/index.md");

```

上記のように初期化すると、Wisp は以下の指定で`./data/sub_page.md`を表示します。

```
index.html?main=sub_page.md
```

## 初期化オプション

`Wisp()`は、第２引数にハッシュ（連想配列）を渡すことでオプションを指定できます。

以下の例は、全てデフォルトの値が指定されています。`var main = new Wisp("main")`としたときと同じ結果になります。

```javascript
var id = "main";
var main = new Wisp(id, {
  format: "markdown",
  query: true,
  inner_link_target: id
});
```

### format

読み込むファイルのフォーマット。`raw`を指定すると、Markdownレンダラを通さずに、ファイルの内容をそのまま表示します。デフォルトは`markdown`

### query

URL クエリでの読み込みを許可するか(`true`)、否か(`false`)。デフォルトは`true`。

### inner_link_target

link に（外部リンクではなく）ファイルが指定された際の、コンテンツを展開するエレメントの ID です。デフォルトでは、そのリンクが属する領域に展開されます。

```javascript
var header = new Wisp("header", {
  inner_link_target: "main"
});
```

たとえば、上のように指定すると、header 内で`[link](test.md)` と書かれたリンクをクリックすると、 test.md は`main`内に展開されます。

## API

さらに、Markdown から HTML への変換や、要素への展開のプロセスで何らかの処理を行いたい場合のために、それぞれのプロセスで処理に介入するための Hook が用意されています。詳しくは、[API](./?main=api.md)の項目を参照してください。

```

```

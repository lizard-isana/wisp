
# 高度な使い方

## Wispとはなにか？

1. wisp.js を読み込む。
2. 任意のidを付加した空要素を必要な位置に挿入する。
3. `Wisp()`を、先に付与したidで初期化。
4. `load()`メソッドにmarkdownファイル、もしくはファイル名の配列を渡す。

以下は最小構成のWispです。 この例では、`<div id="main"></div>`内に、marked.jsでレンダリングされた `index.md` が展開されます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>wisp</title>
    <script src="./lib/wisp.js"></script>
</head>
<body>
<div id="main"></div>
<script>
  window.onload = function(){
    var wisp = new Wisp("main");
    wisp.load("index.md")
  }
</script>
</body>
</html>
```

以下の例では、10秒ごとに`short_update.md`を読み込んで`main`を更新し、60秒ごとに`long_update.md`を更新して`archive`を更新します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>wisp</title>
  <script src="./lib/wisp.js"></script>
</head>
<body>
  <div id="main"></div>
  <div id="archive"></div>    
  <script>
      window.onload = function(){
          var main = new Wisp("main");
          main.load("short_update.md");

          var archive = new Wisp("archive");
          archive.load("long_update.md");

          var short_updator = window.setInterval(function(){
              main.load("short_update.md")
          },10000)
                      
          var long_updator = window.setInterval(function(){
              archive.load("long_update.md")
          },60000);
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
header.load(["header.md"]);

var sidebar = new Wisp("sidebar");
sidebar.load(["sidebar.md"]);

var main = new Wisp("main");
main.load(["introduction.md","basics.md"]);

var footer = new Wisp("footer");
headfooterer.load(["footer.md"]);

```

### URLクエリでのページ読み込み

Wispでの、URLクエリでの指定は、`初期化id=ファイル1,ファイル2...`という形で、初期化時のページ構成を上書きしています。

以下の例は、このサイトのサイドバーの記述の一部です。

```
[home](./?main=index.md)
[basics](./?main=introduction.md,basics.md)
[advanced](./?main=advanced.md,customize.md&sidebar=sidebar_02.md)
[markdown](./?main=markdown.md)

```
なお、URLクエリでは別ディレクトリのファイルは指定できないように制限されています。別ディレクトリのファイルを読ませたい場合は、初期化時のオプションでデータディレクトリを指定してください。


## 初期化オプション
Whisper()は、第２引数にハッシュ（連想配列）を渡すことでオプションを指定できます。

以下の例は、全てデフォルトの値が指定されています。`var main = new Wisper("main")`としたときと同じ結果になります。

```javascript
var main = new Wisper("main",{
    format:"markdown",
    query:true,
    query_path:"./",
    marked_options:{
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    }
})
```

#### id
ファイルを展開する要素のid。

#### format
読み込むファイルのフォーマット。`raw`を指定すると、marked.jsを通さずに、ファイルの内容をそのまま表示します。デフォルトは`markdown`

#### query
URLクエリでの読み込みを許可するか(`true`)、否か(`false`)。デフォルトは`true`。

#### query_path
URLクエリで読み込む際に、別のディレクトリから読み込む場合は、ここで指定します。なお、ここでの指定はmarkdownファイル内での相対パス指定には影響を与えません。

#### marked_options
marked.jsの初期化オプションを指定します。ここで指定したオプションはmarked.jsにそのまま渡されます。


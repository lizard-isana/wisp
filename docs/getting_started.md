# Getting Started

## Wisp を Wiki として使う

簡易の Wiki/CMS として使うなら、ライブラリに同包されている index.html がそのまま使えます。準備はライブラリをダウンロードして、解凍して、適当な Web サーバにまるごとアップロードするだけです。

デフォルトのファイル構成は以下のようになっています。

> wisp/
> index.html ... 表示用の html ファイル
> header.md ... ヘッダ部分の Markdown ファイル
> index.md ... 本文エリアの Markdown ファイル 
> footer.md ... フッタ部分の Markdown ファイル
> assets/
>   js/
>     wisp.js ... ライブラリ本体
>     wisp.min.js ... ライブラリ本体(圧縮済)
>   css/
>     default.css ... css ファイル
>   img/

このうち、編集が必要なのは 3 つの Markdown ファイルだけ。見た目に手を入れたくなったら、css ファイルを修正すればたいていは事足りるはずです。システムの本体である`index.html`や`js/`以下のスクリプトを触る必要は、まずありません。

ファイルをサーバにアップロードした状態でブラウザでページを開くとこんな感じ。基本的な構成は、このサイトと同じです。

![](./image/default_screen.png)

各エリアの ID と、対応する Markdown ファイルはこんな感じ。

![](./image/default_screen_annotated.png)

それぞれのエリアには ID が振られていて、それぞれカッコ内の対応する Markdown ファイルが読み込まれています。この ID とファイルの組み合わせは、URL クエリでのページ更新で重要な役割を果たします。

それぞれの Markdown ファイルの内容は以下の通りです。

### main(index.md)

`main`のエリアに表示されるコンテンツです。末尾の`[Markdown Cheatsheet](markdown.md)`に注目してください。これは標準的なMarkdownのリンクの指定ですが、この記述でMainエリア内のコンテンツが指定のファイルの内容に切り替わります。

```
# Wisp - A Client-side Flat File CMS

Welcome to Wisp!

## H2 level header

### H3 level header

[Markdown Cheatsheet](markdown.md)

```


### header(header.md)

`header`のエリアに表示されるコンテンツです。H1の見出し（行頭#）がサイトタイトルに、リスト（行頭 - ）の内容がハンバーガーメニュー内に、通常の段落が、ヘッダメニューとして表示されます（プラグインのWispNavBarによる効果です）。

```
# [Wisp](./)

- Menu 01
- Menu 02
- Menu 03
- [Markdown Cheatsheet](markdown.md)

Menu 01

Menu 02

Menu 03
```


### footer(footer.md)

`footer`のエリアに表示されるコンテンツです。ここでは、外部リンクとして、Wisp の GitHub リポジトリが指定されています。

```
Powered by [Wisp](https://github.com/lizard-isana/wisp/) &copy; Isana Kashiwai

```

## サイト内リンク

上でも少し触れましたが、Wisp でのサイト内リンクは`index.html`に対する URL クエリとして、 `id=ファイル1,ファイル2...`という形で指定します。

`main`に`markdown.md`を表示するなら、こんな感じ。`<a>`タグのリンク指定(`href=`)の中に相対パスを書くときと同じです。

```
[Markdown Cheatsheet](index.html?main=markdown.md)
```

これは、以下のように省略して書くこともできます（内部的に上記の指定と同じ URL を生成します）

```
[Markdown Cheatsheet](markdown.md)
```

試してみましょう（ブラウザの戻るボタンか、ヘッダの Basics をクリックすればこのページに戻ります）。

[Markdown Cheatsheet](markdown.md)

### 複数ファイル指定

markdown ファイルは複数指定できます。以下の例では、`main`に`index.md`と`getting_started.md`を結合して表示します。

```
[Index & Getting Started](index.md,getting_started.md)

```

[Index & Getting Started](index.md,getting_started.md)

### `main` 以外の領域の指定

main 以外の領域を指定することもできます。以下の例では、`main`に`index.md`を読み込み、`header`に`footer.md`を、`sidebar`に`header.md`を指定して読み込んでいます。逆に、`footer`は何も指定していないので、デフォルトの状態が継承されています。

```
[Header & Sidebar Replaced](./?main=index.md&header=footer.md&sidebar=header.md)

```

[Header & Sidebar Replaced](./?main=index.md&header=footer.md&sidebar=header.md)

## データファイルの置き場所

デフォルトでは、データファイルは index.html と同じ場所に置くように設定されています。URL クエリで別ディレクトリを指定しても無視されます。

```
index.html?main=./data/index.md
```

上のように指定しても、以下の指定と同じものとして処理します（これができてしまうと、セキュリティ上のリスクがあるためです）。

```
index.html?main=index.md
```

ファイルを別の場所に置きたい場合は、index.html の修正が必要です。

たとえば、`./data/`以下にファイルを置きたい場合は、index.html の以下の 4 か所を

```
header.load("header.md");
...
main.load("index.md");
...
sidebar.load("sidebar.md");
...
footer.load("footer.md");
```

それぞれ以下のように修正します。

```
header.load("./data/header.md");
...
main.load("./data/index.md");
...
sidebar.load("./data/sidebar.md");
...
footer.load("./data/footer.md");
```

こうすると、たとえば`./?main=getting_started.md`の指定で`/data/getting_started.md`を探しに行くようになります。

ここで何をやっているかについては、[Advanced Usage](./?main=advanced.md)を合わせて参照してください。

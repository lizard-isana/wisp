
## 高度な使い方

### 初期化オプション
Wisp()は、第２引数にハッシュ（連想配列）を渡すことでオプションを指定できます。

以下の例は、全てデフォルトの値が指定されています。`var main = new Wisp("main")`としたときと同じ結果になります。

```javascript
var main = new Wisp("main",{
    format:"markdown",
    query:true,
    query_path:"./data/",
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

### カスタマイズ
Whisperには、Marked.jsによるレンダリングの前と後、そしてヘージの表示後のタイミングで処理に介入する方法が用意されています。

#### pre_rendering_hook(funcion(id,contents){...;return contents})
ここに登録された命令は、marked.jsでのレンダリングの**前に**実行されます。結果をmarked.jsでレンダリングするために、処理後のコンテンツを`return`で返すのを忘れないでください。

#### code_highlight_hook(funcion(id,code,lang){...;return contents})
ここに登録された命令は、marked.jsでのコード("\`\`\`")のレンダリング時に実行されます。処理後のコードを`return`で返すのを忘れないでください。

```javascript
main.code_highlight_hook(function(id, code, lang){
    let highlighted_code 
    highlighted_code = hljs.highlightAuto(code, [lang]).value;
    return highlighted_code
});
```

#### post_rendering_hook(funcion(id,contents){...;return contents})
ここに登録された命令は、marked.jsでのレンダリングが終わり、ブラウザ上に表示される**前に**実行されます。結果をページに表示するために、処理後のコンテンツを`return`で返すのを忘れないでください。

#### post_page_load_hook(funcion(id,contents){...})
ここに登録された命令は、marked.jsでのレンダリングが終わり、ブラウザ上に表示された**後に**実行されます。処理後のコンテンツを`return`で返しても何も起きません。ページ内のコンテンツを書き換えるためには、明示的に`document.getElementById(id)`を呼ぶ必要があります。

```javascript
main.post_page_load_hook(function(id,content){
    MathJax.Hub.Configured();
    var html = document.getElementById(id);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,html]);
});
```

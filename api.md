# API
Whisperには、以下のタイミングでコンテンツの処理に介入するHookが用意されています。

1. marked.jsによるレンダリングの前(ファイルが読み込まれた直後)
2. marked.jsによるコード部分の処理(\`\`\` *CODE* \`\`\`の処理)
3. marked.jsによるレンダリングの後(ページが表示される直前)
4. ヘージが表示された後

## pre_rendering_hook
ここに登録された命令は、marked.jsでのレンダリングの**前に**実行されます。結果をmarked.jsでレンダリングするために、処理後のコンテンツを`return`で返すのを忘れないでください。

```javascript
var main = new Wisp("main");
main.pre_rendering_hook(function(id, contents){
    // do somthing...
    return contents
});
main.load(["index.md"]);
```

## code_highlight_hook
ここに登録された命令は、marked.jsでのコード(\`\`\` *CODE* \`\`\`)のレンダリング時に実行されます。処理後のコードを`return`で返すのを忘れないでください。

```javascript
var main = new Wisp("main");
main.code_highlight_hook(function(id, code, lang){
    // do somthing...
    return code
});
main.load(["index.md"]);
```

以下の例は、highlight.jsでのシンタックスハイライトの指定です。

```javascript
var main = new Wisp("main");
main.code_highlight_hook(function(id, code, lang){
    let highlighted_code 
    highlighted_code = hljs.highlightAuto(code, [lang]).value;
    return highlighted_code
});
main.load(["index.md"]);
```

## post_rendering_hook
ここに登録された命令は、marked.jsでのレンダリングが終わり、ブラウザ上に表示される**前に**実行されます。結果をページに表示するために、処理後のコンテンツを`return`で返すのを忘れないでください。

```javascript
var main = new Wisp("main");
main.post_rendering_hook(function(id, contents){
    // do somthing...
    return contents
});
main.load(["index.md"]);
```

## post_page_load_hook
ここに登録された命令は、marked.jsでのレンダリングが終わり、ブラウザ上に表示された**後に**実行されます。処理後のコンテンツを`return`で返しても何も起きません。ページ内のコンテンツを書き換えるためには、明示的に`document.getElementById(id)`を呼ぶ必要があります。

```javascript
var main = new Wisp("main");
main.post_page_load_hook(function(id, contents){
    // do somthing...
    document.getElementById(id) = contents;
});
main.load(["index.md"]);
```

以下は、MathJaxでの数式表示の指定の例です。MathJaxはデフォルトでは。スクリプトの読み込み時にページ内のLaTeXの記述を探してレンダリングしますが、Wispの場合は動的にページを生成するため、レンダリング終了時にMathJaxの処理を行わないと、数式が正常に表示されません。ここでは、MathJaxの読み込み時のページ処理を止め、ページがロードされた後に処理を実行するように設定しています。

```javascript
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({skipStartupTypeset: true});      
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_HTMLorMML&delayStartupUntil=configured"></script>

<script>
var main = new Wisp("main");
main.post_page_load_hook(function(id,contents){
    MathJax.Hub.Configured();
    var html = document.getElementById(id);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,html]);
});
main.load(["index.md"]);
</script>
```
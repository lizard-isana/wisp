# API
Wispには、以下のタイミングで個々のコンテンツやページ全体の処理に介入するHookが用意されています。

1. Markdownのレンダリングの前(ファイルが読み込まれた直後)
2. ファイル内のコード部分(\`\`\` *CODE* \`\`\`)の処理毎
3. Markdownのレンダリングの後(ターゲットの要素内にコンテンツが表示される直前)
4. ターゲットの要素内にコンテンツが表示された後
5. 全てのコンテンツが表示された後（ページ全体が表示された後）

このうち、1-4は、ファイルが読み込まれ、Markdownがレンダリングされ、コンテンツが要素内に展開されるたびに実行されます。これらの処理は個々のファイルごとに非同期で行われているため、読み込みの順番や要素間の参照などは保証されません。5はページ全体の表示が終わった後で1度だけ実行されます。要素間での参照が必要な場合はこのタイミングで行う必要があります。

## pre_rendering_hook
ここに登録された命令は、個々のファイルが読み込まれ、markdown-it.jsでのレンダリングの**前に**実行されます。結果をmarkdown-it.jsでレンダリングするために、処理後のコンテンツを`return`で返すのを忘れないでください。

```javascript
var main = new Wisp("main");
main.pre_rendering_hook(function(id, contents){
    // do somthing...
    return contents
});
main.load(["index.md"]);
```

## code_highlight_hook
ここに登録された命令は、markdown-it.jsでのコード(\`\`\` *CODE* \`\`\`)のレンダリング時に実行されます。処理後のコードを`return`で返すのを忘れないでください。

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
ここに登録された命令は、markdown-it.jsでのレンダリングが終わり、個々のコンテンツがターゲットの要素内に表示される**前に**実行されます。
結果をページに表示するために、処理後のコンテンツを`return`で返すのを忘れないでください。

```javascript
var main = new Wisp("main");
main.post_rendering_hook(function(id, contents){
    // do somthing...
    return contents
});
main.load(["index.md"]);
```

## post_content_load_hook
ここに登録された命令は、markdown-it.jsでのレンダリングが終わり、コンテンツがターゲットの要素内に表示された**後に**実行されます。レンダリング後のhtmlを操作する必要がある場合は、このHookを使う必要があります。ただし、他の要素にコンテンツが表示されているかどうか（ページ全体の表示が終わっているかどうか）は問いません。要素間をまたいで処理が必要な場合は`post_page_load_hook`を使ってください。

処理後のコンテンツを`return`で返しても何も起きません。要素内のコンテンツを書き換えるためには、明示的に`document.getElementById(id)`を呼ぶ必要があります。

```javascript
var main = new Wisp("main");
main.post_content_load_hook(function(id, contents){
    // do somthing...
    document.getElementById(id) = contents;
});
main.load(["index.md"]);
```

以下は、MathJaxでの数式表示の指定の例です。MathJaxはデフォルトでは。スクリプトの読み込み時にページ内のLaTeXの記述を探してレンダリングしますが、Wispの場合は動的にコンテンツを生成するため、レンダリング終了時にMathJaxの処理を行わないと、数式が正常に表示されません。ここでは、MathJaxの読み込み時の処理を止め、コンテンツがロードされた後に処理を実行するように設定しています。

```javascript
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({skipStartupTypeset: true});      
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_HTMLorMML&delayStartupUntil=configured"></script>

<script>
var main = new Wisp("main");
main.post_content_load_hook(function(id,contents){
    MathJax.Hub.Configured();
    var html = document.getElementById(id);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,html]);
});
main.load(["index.md"]);
</script>
```

## post_page_load_hook
ここに登録された命令は、個々のコンテンツの表示がすべて終わり、ページ全体が表示されたあとで1度だけ実行されます。表示エリアをまたいで処理をする必要がある場合は、このHookを使う必要があります。
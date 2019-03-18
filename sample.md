## サンプル

### サンプル(1) Hookによる機能拡張
以下の例は、`enhanced.html`のソースをそのまま転記したものです。以下の機能が追加されています。

- シンタックスハイライト(highlight.js)、
- 数式表示(MathJax)
- フローチャート(flowchart.js)、
- シーケンスチャート(js-sequence-diagrams)

#### enhanced.html
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>Wisp - A Client-side Flat File CMS</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.6.1/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/github.min.css">
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({skipStartupTypeset: true});      
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_HTMLorMML&delayStartupUntil=configured"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowchart/1.11.3/flowchart.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-sequence-diagrams/1.0.6/sequence-diagram-min.js"></script>
    <script src="./js/wisp.js"></script>
    <script src="./js/wisp_enhanced.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css" />
    <link rel="stylesheet" href="default.css" />
    <body>
        <div id="header"></div>
        <div id="sidebar"></div>
        <div id="main" class="markdown-body"></div>
        <div id="footer"></div>
    </body>
</html>
```
#### wisp_enhanced.js
```javascript
var unescape_entity = function(str){
    return str.replace(/&amp;/g, '&')
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<')
                .replace(/&quot;/g, '\"')
                .replace(/&#039;/g, '\'')
}

var draw_diagram = function(type){
    var diagram_array = document.getElementsByClassName("language-" + type)
    for(var num in diagram_array){
        var code_element = diagram_array[num];
        var p_node = code_element.parentNode;
        var code = code_element.innerHTML
        var diagram_id = type + "_" + num;
        var diagram_element = document.createElement('div');
        diagram_element.setAttribute("id", diagram_id)
        diagram_element.setAttribute("class", type)
        if(code){
            if(type == "flowchart"){
                var diagram = flowchart.parse(unescape_entity(code))
                var diagram_option = {}
            }else if(type == "sequence-diagram"){
                var diagram = Diagram.parse(unescape_entity(code))
                var diagram_option = {theme: 'simple'}
            }
                p_node.parentNode.insertBefore(diagram_element, p_node);
                p_node.parentNode.removeChild(p_node)
                diagram.drawSVG(diagram_id,diagram_option)
        }
    }
}
window.onload = function(){
    var header = new Wisp("header");
    header.load(["header.md"]);

    var sidebar = new Wisp("sidebar");
    sidebar.load(["sidebar.md"]);

    var main = new Wisp("main");
    main.code_highlight_hook(function(id, code, lang){
        let highlighted_code 
        highlighted_code = hljs.highlightAuto(code, [lang]).value;
        return highlighted_code
    });
    main.post_page_load_hook(function(id,content){
        // MathJax
        MathJax.Hub.Configured();
        var html = document.getElementById(id);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,html]);
        // flowchart.js
        draw_diagram("flowchart");
        //js-sequence-diagrams
        draw_diagram("sequence-diagram");
    });
    main.load(["index.md"]);

    var footer = new Wisp("footer");
    footer.load(["footer.md"]);
}
```

### サンプル(2): リアルタイム更新
以下の例では、10秒ごとに`short_update.md`を読み込んで`main`を更新し、60秒ごとに`long_update.md`を更新して`archive`を更新します。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>whisper</title>
</head>
<script async src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.6.1/marked.min.js"></script>
<script src="./lib/whisper.js"></script>
<link rel="stylesheet" href="base.css">
<body>
    <div id="main"></div>
    <div id="archive"></div>    
    <script>
        window.onload = function(){
        
            var main = new Whisper("main");
            main.load("short_update.md");
            var short_updator = window.setInterval(function(){
                main.load("short_update.md")
            },10000)
            
            var archive = new Whisper("archive");
            archive.load("long_update.md");
            var long_updator = window.setInterval(function(){
                archive.load("long_update.md")
            },60000);
        }
    </script>
</body>
</html>
```

var WispHighlight = WispHighlight || function(id,option){
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js';
    document.getElementsByTagName("head")[0].appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/github.min.css';
    link.rel = 'stylesheet'
    document.getElementsByTagName("head")[0].appendChild(link);
}

WispHighlight.prototype = {
    append:function(obj){
        obj.code_highlight_hook(function(id, code, lang){
            let highlighted_code 
            highlighted_code = hljs.highlightAuto(code, [lang]).value;
            return highlighted_code
        });        
    }
}
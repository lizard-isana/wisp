var WispMathJax = WispMathJax || function(){
    const script_mathjax_config = document.createElement('script');
    script_mathjax_config.type = 'text/x-mathjax-config';
    document.getElementsByTagName("head")[0].appendChild(script_mathjax_config);
    const script_mathjax_main = document.createElement('script');
    script_mathjax_main.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_HTMLorMML&delayStartupUntil=configured';
    document.getElementsByTagName("head")[0].appendChild(script_mathjax_main);
}

WispMathJax.prototype = {
    append:function(obj){
        obj.post_page_load_hook(function(id,content){
            // MathJax
            MathJax.Hub.Configured();
            var html = document.getElementById(id);
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,html]);
        });        
    }
}

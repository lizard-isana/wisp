var WispSequenceDiagram = WispSequenceDiagram || function(){
    const scripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/raphael/2.2.7/raphael.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js",
        "https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/js-sequence-diagrams/1.0.6/sequence-diagram-min.js"
    ]
    var len = scripts.length;
    var i = 0;
    function appendScript() {
        var script = document.createElement('script');
        script.src = scripts[i];
        document.getElementsByTagName("head")[0].appendChild(script);
        i++
        if (i < len) {
            script.onload = appendScript;
        }
    };
    appendScript()
}

WispSequenceDiagram.prototype = {
    append:function(obj){
        obj.post_content_load_hook(function(id,content){
            var unescape_entity = function(str){
                return str.replace(/&amp;/g, '&')
                            .replace(/&gt;/g, '>')
                            .replace(/&lt;/g, '<')
                            .replace(/&quot;/g, '\"')
                            .replace(/&#039;/g, '\'')
            }
            var diagram_array = document.getElementsByClassName("language-sequence-diagram")
            for(var num in diagram_array){
                var code_element = diagram_array[num];
                var p_node = code_element.parentNode;
                var code = code_element.innerHTML
                var diagram_id = "sequence-diagram_" + num;
                var diagram_element = document.createElement('div');
                diagram_element.setAttribute("id", diagram_id)
                diagram_element.setAttribute("class", "sequence-diagram")
                if(code){
                    var diagram = Diagram.parse(unescape_entity(code))
                    var diagram_option = {theme: 'simple'}
                    p_node.parentNode.insertBefore(diagram_element, p_node);
                    p_node.parentNode.removeChild(p_node)
                    diagram.drawSVG(diagram_id,diagram_option)
                }
            }
        });        
    }
}
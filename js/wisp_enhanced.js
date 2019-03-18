
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
var WispChart = WispChart || function(){
    var scripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.0/c3.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.2/d3.min.js"
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
    const link = document.createElement('link');
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.0/c3.min.css";
    link.rel = 'stylesheet'
    document.getElementsByTagName("head")[0].appendChild(link);
} 
WispChart.prototype = {
    append:function(obj){
        obj.post_content_load_hook(function(id,content){
            var chart_array = document.getElementsByClassName("language-chart")
            var code_array = []
            for(var num = 0, ln = chart_array.length;num<ln;num++){
                var code_element = chart_array[num];
                var p_node = code_element.parentNode;
                var code = JSON.parse(code_element.innerHTML);
                var chart_id = "chart_" + num;
                var chart_element = document.createElement('div');
                chart_element.setAttribute("id", chart_id)
                chart_element.setAttribute("class", "chart")
                chart_element.style.width="90%";
                chart_element.style.padding="0";
                chart_element.style.margin="0";
                p_node.parentNode.insertBefore(chart_element, p_node);
                p_node.style.display="none";
                code.bindto = "#"+ chart_id;
                code_array.push()
                if(code){
                    var chart = c3.generate(code)
                }
            }
        });        
    }
}
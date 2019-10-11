var WispToc = function(obj){
    Willo.Storage[obj.id] = {}
    this.storage = {}
    obj.post_content_load_hook(function(id,content){
      var header_array = document.querySelectorAll(`#${obj.id} h2`)
      var toc_str_array = []
      toc_str_array.push(`<ul>\n`)
      for (const i in header_array){
        if(header_array[i].id){
        var str = `<li><a href="#${header_array[i].id}">${header_array[i].textContent}</a></li>`
          toc_str_array.push(str)
        }
      }
      toc_str_array.push(`</ul>\n`)
      var toc = toc_str_array.join("\n")
      obj.toc = toc
    })
    this.owner = obj;
  }

  WispToc.prototype = {
    append:function(obj){
      obj.toc_owner = this.owner
      obj.post_page_load_hook(function(){
        const toc_array = document.getElementById(obj.id).getElementsByClassName("toc");
        for(const i in toc_array){
          toc_array[i].innerHTML = obj.toc_owner.toc;
        }
      });        
  }
}
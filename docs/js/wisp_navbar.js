var WispNavBar = WispNavBar || function(target){
    this.target = target;
}
WispNavBar.prototype = {
    append:function(obj){
    obj.menu_target = this.target;
    obj.post_content_load_hook(function(id, contents){
        const wrapper = document.getElementById(id);
        const menu_target = document.getElementById(obj.menu_target);
        console.log(obj.menu_target)
        menu_target.addEventListener('click', function (e) {
        let menu_items = wrapper.querySelectorAll("ul");
        for(let i=0, ln=menu_items.length;i<ln;i++){
            let target = menu_items[i];
            if(target.style.display == "block"){
                target.style.display = "none";
            }else{
                target.style.display = "block";
            }
        }
        })
    })
    }
}

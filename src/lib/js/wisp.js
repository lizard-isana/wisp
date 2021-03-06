/*! Wisp https://github.com/lizard-isana/wisp @license MIT */

var Willo = Willo || {};

var scripts = [
  "./lib/js/vendor/markdown-it.js",
  "./lib/js/vendor/markdown-it-task-lists.js",
  "./lib/js/vendor/markdown-it-footnote.js"
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

Willo.Storage = {};
Willo.Storage.loaded_page_num = Willo.Storage.loaded_page_num || 0;
Willo.Storage.GlobalPageLoadHook = [];

Willo.DataLoader = function (option) {
  var XMLhttpObject;
  var createXMLhttpObject = function () {
    XMLhttpObject = false;
    if (window.XMLHttpRequest) {
      XMLhttpObject = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      try {
        XMLhttpObject = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        if (console) {
          console.log(e);
        }
        XMLhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
      }
    }
    return XMLhttpObject;
  };

  var Loader = function (option) {
    XMLhttpObject = createXMLhttpObject();
    if (!XMLhttpObject) {
      return;
    }
    XMLhttpObject.open("GET", option.path, option.ajax);
    XMLhttpObject.send(null);
    if (option.ajax == false) {
      try {
        if (option.format === "json") {
          var data = JSON.parse(XMLhttpObject.responseText);
        } else {
          var data = XMLhttpObject.responseText;
        }
        if (option.callback !== undefined) {
          option.callback(data, option.id);
        } else {
          return data;
        }
      } catch (e) {
        if (console) {
          console.log(e);
        }
        return;
      }
    } else {
      try {
        XMLhttpObject.onreadystatechange = function () {
          if (XMLhttpObject.readyState == 4) {
            if (XMLhttpObject.status == 200) {
              if (option.format === "json") {
                var data = JSON.parse(XMLhttpObject.responseText);
              } else {
                var data = XMLhttpObject.responseText;
              }
              if (option.callback) {
                console.log();
                option.callback(data, option.id);
              } else {
                return data;
              }
            }
          } else {
            return;
          }
        };
      } catch (e) {
        if (console) {
          console.log(e);
        }
        return;
      }
    }
  };
  return Loader(option);
};

Willo.QueryDecoder = function () {
  var query = [];
  var search = decodeURIComponent(location.search);
  var q = search.replace(/^\?/, "&").split("&");
  for (var i = 1, l = q.length; i < l; i++) {
    var tmp_array = q[i].split("=");
    var name = tmp_array[0];
    var value = tmp_array[1];
    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    }
    query[name] = value;
  }
  return query;
};

Willo.Wisp = Willo.Wisp || function (id, option) {
  var Storage = {};

  var ResourceLoader = function (array, storage, callback) {
    Storage.loaded_data_num = 0;
    let length = array.length;
    for (const value of array) {
      var loader = new Willo.DataLoader({
        format: "text",
        path: value + "?nocache=" + new Date().getTime(),
        id: value,
        ajax: true, // or "false"
        callback: function (data, id) {
          storage[id] = data;
          var catcher = new ResourceCatcher(length, callback);
        }
      });
    }
  };

  var ResourceCatcher = function (length, callback) {
    Storage.loaded_data_num += 1;
    if (Storage.loaded_data_num == length) {
      callback();
    }
  };

  var Initialize = function (option) {
    Storage.Renderer = window.markdownit({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true,
      highlight: function (code, lang) {
        if (Storage.CodeHighlightHook.length > 0) {
          for (const i in Storage.CodeHighlightHook) {
            code = Storage.CodeHighlightHook[i](
              Storage.element_id,
              code,
              lang
            );
          }
        }
        return code;
      }
    })
      .use(markdownitFootnote)
      .use(markdownitTaskLists);

    Storage.Renderer.linkify.set({ fuzzyLink: false });

    Storage.format = "markdown";
    Storage.permit_query = true;
    Storage.query_path = "./";
    Storage.element_id = id;
    Storage.inner_link_target = id;

    if (option) {
      if (option.format) {
        Storage.format = format;
      }
      if (option.query) {
        Storage.permit_query = option.query;
        if (option.query_path) {
          Storage.query_path = option.query_path;
        }
      }
      if (option.inner_link_target) {
        Storage.inner_link_target = option.inner_link_target;
      };
    }
  };

  Storage.PreRenderingHook = [];
  this.add_pre_rendering_hook = function (f) {
    Storage.PreRenderingHook.push(f);
  };

  Storage.CodeHighlightHook = [];
  this.add_code_highlight_hook = function (f) {
    Storage.CodeHighlightHook.push(f);
  };

  Storage.PostRenderingHook = [];
  this.add_post_rendering_hook = function (f) {
    Storage.PostRenderingHook.push(f);
  };

  Storage.PostContentLoadHook = [];
  this.add_post_content_load_hook = function (f) {
    Storage.PostContentLoadHook.push(f);
  };
  Storage.PostPageLoadHook = [];
  this.add_post_page_load_hook = function (f) {
    Storage.PostPageLoadHook.push(f);
  };

  this.id = id;

  this.load_page = function (list) {
    var query = Willo.QueryDecoder();

    Storage.contents = {};
    var content_list = [];

    if (Object.keys(query).length > 0) {
      for (let key in query) {
        if (key == Storage.element_id) {
          var content_list = [];
          var tmp = query[key].split(",");
          for (let value in tmp) {
            var target = tmp[value].split("/").reverse()[0];
            content_list.push(target);
          }
        } else {
          content_list = list;
        }
      }
    } else {
      content_list = list;
    }
    Willo.Storage.loaded_page_num += content_list.length;
    if (content_list.length > 0) {
      var loader = new ResourceLoader(
        content_list,
        Storage.contents,
        function (data) {
          var page_content = [];
          for (let value in content_list) {
            var content = content_list[value];
            page_content.push(Storage.contents[content]);
          }
          var merged_page_content = page_content.join("\n");

          if (Storage.PreRenderingHook.length > 0) {
            for (const i in Storage.PreRenderingHook) {
              merged_page_content = Storage.PreRenderingHook[i](
                Storage.element_id,
                merged_page_content
              );
            }
          }
          if (Storage.format == "raw") {
            document.getElementById(
              Storage.element_id
            ).innerHTML = merged_page_content;
          } else {

            var marked_page_content = Storage.Renderer.render(merged_page_content);

            if (Storage.PostRenderingHook.length > 0) {
              for (const i in Storage.PostRenderingHook) {
                marked_page_content = Storage.PostRenderingHook[i](
                  Storage.element_id,
                  marked_page_content
                );
              }
            }
            document.getElementById(
              Storage.element_id
            ).innerHTML = marked_page_content;

            var loaded_content = document.getElementById(Storage.element_id);
            var link = loaded_content.querySelectorAll("a");
            for (var i = 0, ln = link.length; i < ln; i++) {
              var href = link[i].getAttribute("href");
              if (href.match(/^(?!http(|s))/) && href.match(/^(?!.*(\/|=)).*/)) {
                link[i].href = "?" + Storage.inner_link_target + "=" + href;
              }
            }
          }
          if (Storage.PostContentLoadHook.length > 0) {
            for (const i in Storage.PostContentLoadHook) {
              Storage.PostContentLoadHook[i](
                Storage.element_id,
                marked_page_content
              );
            }
          }

          Willo.Storage.display_page_num =
            Willo.Storage.display_page_num || 0;
          Willo.Storage.display_page_num++;
          if (
            Willo.Storage.display_page_num == Willo.Storage.loaded_page_num
          ) {
            for (const i in Storage.PostPageLoadHook) {
              Storage.PostPageLoadHook[i]();
            }
          }
        }
      );
    }
  };
  Initialize(option);
  this.renderer = Storage.Renderer;
};

Willo.Wisp.prototype = {
  pre_rendering_hook: function (f) {
    this.add_pre_rendering_hook(f);
  },
  code_highlight_hook: function (f) {
    this.add_code_highlight_hook(f);
  },
  post_rendering_hook: function (f) {
    this.add_post_rendering_hook(f);
  },
  post_content_load_hook: function (f) {
    this.add_post_content_load_hook(f);
  },
  post_page_load_hook: function (f) {
    this.add_post_page_load_hook(f);
  },
  load: function (param) {
    if (Array.isArray(param)) {
      var content_list = param;
    } else if (typeof param == "string") {
      var content_list = [param];
    } else {
      var content_list = ["index.md"];
    }
    this.load_page(content_list);
  }
};

var Wisp = Willo.Wisp;
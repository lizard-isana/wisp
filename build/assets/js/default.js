      // load extentions
      const wisp_navbar = new WispNavBar("menu_icon");
      const wisp_highlight = new WispHighlight();
      const wisp_math = new WispMathJax();
      const wisp_chart = new WispChart();
      const wisp_flowchart = new WispFlowChart();
      const wisp_diagram = new WispSequenceDiagram();
 
      window.onload = function() {
        // init header
        const header = new Wisp("header");
 
        // append extensions to header
        wisp_navbar.append(header);
 
        // load header
        header.load("header.md");
 
       // init main
        const main = new Wisp("main");
 
        // append extensions to main
        wisp_highlight.append(main);
        wisp_math.append(main);
        wisp_chart.append(main);
        wisp_flowchart.append(main);
        wisp_diagram.append(main);
 
        // load main
        main.load("index.md");
 
        const toc = new WispToc(main);
        toc.append(main);
 
        const footer = new Wisp("footer");
        footer.load("footer.md");
      };

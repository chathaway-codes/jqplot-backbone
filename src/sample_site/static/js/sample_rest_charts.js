require(["jquery", "v/jqplot", "m/coconuts", "jquery.jqplot", "plugins/jqplot.dateAxisRenderer.min", "plugins/jqplot.canvasTextRenderer.min", "plugins/jqplot.canvasAxisTickRenderer.min"], function($, jqChart, coconuts) {
    "use strict";

    var myChart = new jqChart({
        el: $("#main"),
        collection: new coconuts(),
        jqplotOptions: {
            title: "Buy vs Time",
            axesDefaults: {
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                tickOptions: {
                    angle: 30,
                },
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.DateAxisRenderer,
                    tickOptions: {
                        formatString: "%b, %#d, %Y",
                    },
                }
            },
        },
        X: "when",
        Y: "looking_to_sell",
    });
});

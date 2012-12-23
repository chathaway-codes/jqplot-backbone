require(["jquery", "v/jqplot", "m/coconuts", "jquery.jqplot", 
    "plugins/jqplot.barRenderer.min", "plugins/jqplot.barRenderer.min", "plugins/jqplot.dateAxisRenderer.min", "plugins/jqplot.canvasTextRenderer.min", "plugins/jqplot.canvasAxisTickRenderer.min", "plugins/jqplot.categoryAxisRenderer.min"], 
    function($, jqChart, coconuts) {
    "use strict";

    var collection = new coconuts();

    $.jqplot.config.enablePlugins = true;

    new jqChart({
        el: $("#sell_v_time"),
        collection: collection,
        jqplotOptions: {
            title: "Sell vs Time",
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
                        formatString: "%b %#d, %Y",
                    },
                }
            },
        },
        variables: [
            "when",
            "looking_to_sell",
        ],
    });

    // Make a bar chart for sell v buy over time
    new jqChart({
        el: $("#buy_v_time"),
        collection: collection,
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
                        formatString: "%b %#d, %Y",
                    },
                }
            },
        },
        variables: [
            "when",
            "looking_to_buy",
        ],
    });

    new jqChart({
        el: $("#buy_sell_v_time"),
        collection: collection,
        jqplotOptions: {
            title: "Buy and Sell vs Time",
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {fillToZero: true}
            },
            series: [
                {label: "Buying"},
                {label: "Selling"},
                {label: "Testing"},
            ],
            axesDefaults: {
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                tickOptions: {
                    angle: 30,
                },
            },
            legend: {
                show: true,
                placement: "outsideGrid",
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                }
            },
        },
        ticks: function(collection) {
            var ticks = [];
            collection.forEach(function(d) {
                //ticks.push(d.get("when"));
                ticks.push("Test");
            });
            return ticks;
        },
        variables: [
            "looking_to_buy",
            "looking_to_sell",
        ],
        variableType: "groups",
    });

    collection.fetch();
});

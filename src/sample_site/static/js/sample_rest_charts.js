require(["jquery", "v/jqplot", "v/jqplot.piechart", "v/jqplot.barchart", "v/jqplot.linechart", "m/coconuts", "jquery.jqplot",
    "plugins/jqplot.dateAxisRenderer.min", "plugins/jqplot.canvasAxisTickRenderer.min"], 
    function($, jqChart, jqPieChart, jqBarChart, jqLineChart, coconuts) {
    "use strict";

    var collection = new coconuts();

    $.jqplot.config.enablePlugins = true;

    new jqLineChart({
        el: $("#sell_v_time"),
        collection: collection,
        jqplotOptions: {
            title: "Sell vs Time",
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

    new jqBarChart({
        el: $("#buy_sell_v_time"),
        collection: collection,
        jqplotOptions: {
            title: "Buy and Sell vs Time",
            series: [
                {label: "Buying"},
                {label: "Selling"},
                {label: "Testing"},
            ],
        },
        variables: [
            "looking_to_buy",
            "looking_to_sell",
        ],
        variableType: "groups",
    });

    new jqPieChart({
        el: $("#buy_sell_pie"),
        collection: collection,
        jqplotOptions: {
            title: "Buy vs Sell",
        },
        variables: [
            "looking_to_buy",
            "looking_to_sell",
        ],
        ticks: [
            "Buying",
            "Selling",
        ],
    });

    collection.fetch();
});

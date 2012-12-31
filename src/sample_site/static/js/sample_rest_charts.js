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

    new jqLineChart({
        el: $("#sell_v_time_buy_v_time"),
        collection: collection,
        jqplotOptions: {
            title: "Sell vs Time",
            series: [
                {label: "Looking to sell"},
                {label: "Looking to buy"},
            ],
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
            [
                "when",
                "looking_to_sell",
            ],
            [
                "when",
                "looking_to_buy",
            ],
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

    new jqLineChart({
        el: $("#sell_v_time_static"),
        collection: [
            {
            
                "id": "1",
                "looking_to_buy": 61,
                "looking_to_sell": 18,
                "resource_uri": "/api/raw/coconuteco/1/",
                "when": "2012-12-18"
            
            },
            {
            
                "id": "2",
                "looking_to_buy": 92,
                "looking_to_sell": 5,
                "resource_uri": "/api/raw/coconuteco/2/",
                "when": "2012-12-17"
            
            },
            {
            
                "id": "3",
                "looking_to_buy": 21,
                "looking_to_sell": 34,
                "resource_uri": "/api/raw/coconuteco/3/",
                "when": "2012-12-16"
            
            },
            {
            
                "id": "4",
                "looking_to_buy": 37,
                "looking_to_sell": 63,
                "resource_uri": "/api/raw/coconuteco/4/",
                "when": "2012-12-15"
            
            },
            {
            
                "id": "5",
                "looking_to_buy": 63,
                "looking_to_sell": 66,
                "resource_uri": "/api/raw/coconuteco/5/",
                "when": "2012-12-14"
            
            },
            {
            
                "id": "6",
                "looking_to_buy": 39,
                "looking_to_sell": 13,
                "resource_uri": "/api/raw/coconuteco/6/",
                "when": "2012-12-13"
            
            },
            {
            
                "id": "7",
                "looking_to_buy": 79,
                "looking_to_sell": 85,
                "resource_uri": "/api/raw/coconuteco/7/",
                "when": "2012-12-12"
            
            },
            {
            
                "id": "8",
                "looking_to_buy": 52,
                "looking_to_sell": 79,
                "resource_uri": "/api/raw/coconuteco/8/",
                "when": "2012-12-11"
            
            },
            {
            
                "id": "9",
                "looking_to_buy": 38,
                "looking_to_sell": 6,
                "resource_uri": "/api/raw/coconuteco/9/",
                "when": "2012-12-10"
            
            },
            {
            
                "id": "10",
                "looking_to_buy": 77,
                "looking_to_sell": 72,
                "resource_uri": "/api/raw/coconuteco/10/",
                "when": "2012-12-09"
            
            },
            {
            
                "id": "11",
                "looking_to_buy": 70,
                "looking_to_sell": 43,
                "resource_uri": "/api/raw/coconuteco/11/",
                "when": "2012-12-08"
            
            },
            {
            
                "id": "12",
                "looking_to_buy": 23,
                "looking_to_sell": 94,
                "resource_uri": "/api/raw/coconuteco/12/",
                "when": "2012-12-07"
            
            },
            {
            
                "id": "13",
                "looking_to_buy": 93,
                "looking_to_sell": 33,
                "resource_uri": "/api/raw/coconuteco/13/",
                "when": "2012-12-06"
            
            },
            {
            
                "id": "14",
                "looking_to_buy": 94,
                "looking_to_sell": 43,
                "resource_uri": "/api/raw/coconuteco/14/",
                "when": "2012-12-05"
            
            },
            {
            
                "id": "15",
                "looking_to_buy": 54,
                "looking_to_sell": 73,
                "resource_uri": "/api/raw/coconuteco/15/",
                "when": "2012-12-04"
            
            },
            {
            
                "id": "16",
                "looking_to_buy": 31,
                "looking_to_sell": 10,
                "resource_uri": "/api/raw/coconuteco/16/",
                "when": "2012-12-03"
            
            },
            {
            
                "id": "17",
                "looking_to_buy": 77,
                "looking_to_sell": 60,
                "resource_uri": "/api/raw/coconuteco/17/",
                "when": "2012-12-02"
            
            },
            {
            
                "id": "18",
                "looking_to_buy": 100,
                "looking_to_sell": 48,
                "resource_uri": "/api/raw/coconuteco/18/",
                "when": "2012-12-01"
            
            },
            {
            
                "id": "19",
                "looking_to_buy": 31,
                "looking_to_sell": 71,
                "resource_uri": "/api/raw/coconuteco/19/",
                "when": "2012-11-30"
            
            },
            {
            
                "id": "20",
                "looking_to_buy": 98,
                "looking_to_sell": 2,
                "resource_uri": "/api/raw/coconuteco/20/",
                "when": "2012-11-29"
            
            }
        ],
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

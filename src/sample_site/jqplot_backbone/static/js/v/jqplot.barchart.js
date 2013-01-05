define(["jquery", "v/jqplot", "jquery.jqplot", 
    "plugins/jqplot.canvasAxisTickRenderer.min", "plugins/jqplot.barRenderer.min", "plugins/jqplot.canvasTextRenderer.min", "plugins/jqplot.categoryAxisRenderer.min"], 
    function($, jqChart) {
    /**
     * jqBarChart class
     * <p>This class provides an API for generating graphs.
     *  It handles registering itself with the Backbone collection
     *  so that it can render as soon as the collection is fetched.</p>
     * <p>jqBarChart extends the jqChart class to provide the "generic"
     *  options for creating bar charts. The usage is the same, if anything
     *  needs to be overrided.</p>
     * @name jqBarChart
     * @class jqBarChart
     * @constructor
     * @param options
     *  The options parameter should be a hash. It will accept the following options:
     * <ul>
     *   <li>jqplotOptions - These options will be merged with the default options provided by this class.
     *     Preference will be given to the options provided in this constructor.</li>
     *   <li>variables - An array of the variables that should be used for constructing the graphs.
     *     These variables will fetched from each model provided by the colleciton and inserted
     *      into an array that will be given to jqplot in a manner specified by the variableType option.
     *   </li>
     *   <li>collection - The collection that will be used as the data source for this chart. This class will register itself
     *     with the collection so that it calls the "render" function when the data is available. This allows for async data requests,
     *     and the reuse of collections.</li>
     * </ul>
     * @return jqplot view object
     */
    "use strict";


    $.jqplot.config.enablePlugins = true;

    var jqBarChart = jqChart.extend({
        jqplotOptions: {
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer,
                rendererOptions: {fillToZero: true}
            },
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
                ticks.push(d.get("when"));
                //ticks.push("Test");
            });
            return ticks;
        },
        variableType: "groups",

    });
    return jqBarChart;
});

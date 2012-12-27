define(["jquery", "v/jqplot", "jquery.jqplot", 
    "plugins/jqplot.canvasAxisTickRenderer.min", "plugins/jqplot.categoryAxisRenderer.min", "plugins/jqplot.pieRenderer.min"], 
    function($, jqChart) {
    /**
     * jqPieChart class
     * <p>This class provides an API for generating graphs.
     *  It handles registering itself with the Backbone collection
     *  so that it can render as soon as the collection is fetched.</p>
     * <p>jqPieChart extends the jqChart class to provide the "generic"
     *  options for creating pie charts. The usage is the same, if anything
     *  needs to be overrided.</p>
     * @name jqPieChart
     * @class jqPieChart
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

    var jqPieChart = jqChart.extend({
        jqplotOptions: {
            seriesDefaults: {
                renderer: $.jqplot.PieRenderer,
                rendererOptions: {
                    showDataLabels: true,
                },
            },
            axesDefaults: {
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
            },
            legend: { show:true, location: 'e' }
        },

        variableType: function(collection) {
            var self = this;
            var elements = [];

            collection.forEach(function(e) {
                for(var i=0; i < self.variables.length; i++) {
                    if(elements[i] == null) {
                        elements.push([self.variables[i], 0]);
                        // If there is a label specified, use that
                        if(self.ticks != null && self.ticks[i] != null)
                            elements[i][0] = self.ticks[i];
                    }
                    elements[i][1] = elements[i][1] + e.get(self.variables[i]);
                }
            });

            // Nullify the ticks so they aren't provided to the jqplot program by accident.
            self.ticks = null;

            return [elements];
        },
    });
    return jqPieChart;
});

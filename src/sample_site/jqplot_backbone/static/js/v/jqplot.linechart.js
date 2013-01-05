define(["jquery", "v/jqplot", "jquery.jqplot"],
    function($, jqChart) {
    /**
     * jqLineChart class
     * <p>This class provides an API for generating graphs.
     *  It handles registering itself with the Backbone collection
     *  so that it can render as soon as the collection is fetched.</p>
     * <p>jqLineChart simply returns the jqChart object, since by default
     *  jqplot creates line charts :).</p>
     * @name jqLineChart
     * @class jqLineChart
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


    return jqChart;
});

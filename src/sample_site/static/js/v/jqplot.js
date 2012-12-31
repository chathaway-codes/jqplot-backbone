define(["jquery", "backbone", "underscore", "backbone-tastypie", "jquery.jqplot",
        "plugins/jqplot.canvasAxisTickRenderer.min", "plugins/jqplot.canvasTextRenderer.min", "plugins/jqplot.categoryAxisRenderer.min",
    ], function($, Backbone, _) {
    /** 
     * jqplot class
     * <p>This class provides an API for generating graphs.
     *  It handles registering itself with the Backbone collection
     *  so that it can render as soon as the collection is fetched.</p>
     * @name jqplot
     * @class jqplot
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
     *   <li>variableType - This indicates how the variables will be put into an array. The valid options are:
     *    <ul>
     *      <li>groups - Data is "grouped" in a way that can be used for bar charts. Each variable represents one
     *        bar in each group.</li>
     *      <li>lines - Data is out into tuples consisting of ["Tick", "Value]. This data representation is appropiate
     *        line charts.</li>
     *      <li>pie - Data is put into a form appropiate for pie charts. Each variable is summed across the collection,
     *        and put into a single slice in the pie chart</li>
     *      <li>function(collection) - This should be a function that accepts a variable and returns an array of data.
     *        The data will be provided to this function in the first parameter, as the fetched collection. Please look
     *          at the jqplot documentation for how this data should be parsed.</li>
     *    </ul>
     *   <li>collection - The collection that will be used as the data source for this chart. This class will register itself
     *     with the collection so that it calls the "render" function when the data is available. This allows for async data requests,
     *     and the reuse of collections.</li>
     *   <li>ticks - This variable will be used to generate the "ticks" for the line charts. It is passed into jqplot as
     *     the "['axes']['xaxis']['ticks']" option. This should be either null, or an array of strings.</li>
     * </ul>
     * @return jqplot view object
     */
    "use strict";

    /**
     * Takes two hashes and merges them, returning the merged hash
     *  That is, it goes through all elements in the array and
     *   combines hashes, otherwise prefering the second hash.
     * @param hash1 The "default" hash
     * @param hash2 The "preferred" hash
     */
    function mergeHash(hash1, hash2) {
        var out = {};
        for(var key in hash2) {
            if(hash2[key] != null) {
                if(typeof hash2[key] == "object" && hash1[key] != null) {
                    // Recurse and merge
                    out[key] = mergeHash(hash1[key], hash2[key]);
                } else {
                    // Else, take the specified value over the default
                    out[key] = hash2[key];
                }
            }
        }

        // And make sure to keep the keys from hash1
        for(var key in hash1) {
            if(out[key] == null) {
                out[key] = hash1[key];
            }
        }
        return out;
    }

    var view = Backbone.View.extend({
        jqplotOptions: {
            legend: { show:true, location: 'ne' },
            axesDefaults: {
                tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
                tickOptions: {
                    angle: 30,
                },
            },
            axes: {
              xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer
              },
            }
        },
        /**
         * This method is responsible for initializing all the variables,
         *  scanning through the supplied options and meshing them with our defaults,
         *  and setting anything that needs to be set
         * You must call fetch for the graphs to render!
         * You can specify the following in the constructor:
         *  -> jqplotOptions
         *  -> variables
         *  -> variableType ["groups", "lines", "pie", function(collection)]
         *  -> collection
         *  -> ticks
         */
        initialize: function() {
            if(this.options.jqplotOptions != null) {
                this.jqplotOptions = mergeHash(this.jqplotOptions, this.options.jqplotOptions);
            }
            // Make sure a collection is specified
            if(this.options.collection == null) {
                throw "A collection must be specified to query against!";
            }
            // Make sure both X and Y values are specified
            if(this.options.variables == null && !_.isFunction(this.options.variableType)) {
                throw "An array of variables is required.";
            }

            if(this.options.variableType != null) {
                this.variableType = this.options.variableType;
            }

            this.variables = this.options.variables;
            if(this.options.ticks != null)
                this.ticks = this.options.ticks;

            if(this.collection instanceof Array) {
                // If this already an array, put it into a collection and call render
                setTimeout(function() {
                    this.collection = new Backbone.Collection(this.collection);
                    this.render();
                }, 1);
            } else {
                this.collection.bind('reset', this.render, this);
            }

            self = this;
        },


        /**
         * This is called after the collection has been fetched
         */
        render: function() {
            // Create the list that will be fed into jqplot
            var elements;

            if(this.variableType == "groups") {
                elements = this.dataGroups();
            } else if(this.variableType == "lines") {
                elements = this.dataLines();
            } else if(this.variableType == "pie") {
                elements = this.dataPie();
            } else if(_.isFunction(this.variableType)) {
                elements = this.variableType(this.collection);
            } else {
                throw "Unknown variable type: " + this.variableType;
            }

            // Get the ticks, if they are needed
            if(this.ticks != null) {
                if(_.isFunction(this.ticks))
                    this.jqplotOptions['axes']['xaxis']['ticks'] = this.ticks(this.collection);
                else
                    this.jqplotOptions['axes']['xaxis']['ticks'] = this.ticks;
                console.log(this.jqplotOptions['axes']['xaxis']['ticks']);
            }

            if(elements.length == 0 || elements[0].length == 0)
                return;

            $.jqplot($(this.el).attr('id'), elements, this.jqplotOptions);
        },

        dataGroups: function() {
            var self = this;
            var elements = [];
            this.collection.forEach(function(e) {
                for(var i=0; i < self.variables.length; i++) {
                    if(elements[i] == null)
                        elements.push([]);
                    elements[i].push(e.get(self.variables[i]));
                }
            });
            return elements;
        },

        dataLines: function() {
            var elements = []
            var self = this;
            function addElements(e, variables) {
                var arr = []

                for(var i=0; i < variables.length; i++) {
                    arr.push(e.get(variables[i]));
                }
                return arr;
            }

            // If we are dealing with an array of variable variables, do this for each
            if(this.variables[0] instanceof Array) {
                for(var i=0; i < this.variables.length; i++) {
                    var t_el = [];
                    this.collection.forEach(function(e) {
                        t_el.push(addElements(e, self.variables[i]));
                    });
                    elements.push(t_el);
                }
            }
            else {
                this.collection.forEach(function(e) {
                    elements.push(addElements(e, self.variables));
                });

                elements = [elements];
            }

            return elements;
        },

        dataPie: function() {
            var self = this;
            var elements = [];

            this.collection.forEach(function(e) {
                for(var i=0; i < self.variables.length; i++) {
                    if(elements[i] == null) {
                        elements.push([self.variables[i], 0]);
                        // If there is a label specified, use that
                        if(self.ticks[i] != null)
                            elements[i][0] = self.ticks[i];
                    }
                    elements[i][1] = elements[i][1] + e.get(self.variables[i]);
                }
            });

            return [elements];
        },

        /**
         * This function calls the function specified by the "failure" element in the prototype
         */
        fetchFailure: function(collection, response, options) {
            // This is bad. Call the user specified failure function? Or throw?
            if(this.failure != null)
                this.failure(response);
            else
                throw "Failed to fetch data: " + response;
        },

        variableType: "lines",
    });

    return view;
});

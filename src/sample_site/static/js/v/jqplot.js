define(["jquery", "backbone", "backbone-tastypie", "jquery.jqplot"], function($, Backbone) {
    "use strict";

    /**
     * Takes two hashes and merges them, returning the merged hash
     *  That is, it goes through all elements in the array and
     *   combines hashes, otherwise prefering the second hash.
     * @param hash1 The "default" hash
     * @param hash2 The "preferred" hash
     */
    function mergeHash(hash1, hash2) {
        for(var key in hash2) {
            if(hash2[key] != null) {
                if(typeof hash2[key] == "object" && hash1[key] != null) {
                    // Recurse and merge
                    hash1[key] = mergeHash(hash1[key], hash2[key]);
                } else {
                    // Else, take the specified value over the default
                    hash1[key] = hash2[key];
                }
            }
        }
        return hash1;
    }

    var view = Backbone.View.extend({
        jqplotOptions: {
            axesDefaults: {
                tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
            },
            axes: {
              xaxis: {
                renderer: $.jqplot.CategoryAxisRenderer
              },
              yaxis: {
                autoscale:true
              },
            }
        },
        /**
         * This method is responsible for initializing all the variables,
         *  scanning through the supplied options and meshing them with our defaults,
         *  and setting anything that needs to be set
         * This method will call "fetch" on the collection specified!
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
            if(this.options.X == null || this.options.Y == null) {
                throw "Both a X and Y option are required.";
            }

            this.options.collection.X = this.options.X;
            this.options.collection.Y = this.options.Y;
            this.options.collection.jqplotOptions = this.jqplotOptions;

            this.failure = this.options.failure;
            this.options.collection.el = this.el;
            this.options.collection.fetch({success: this.fetchComplete, failure: this.fetchFailure});
        },

        /**
         * This function should parse the collection, and render the chart
         */
        fetchComplete: function(collection, response, options) {
            // Create the list that will be fed into jqplot
            var elements = []
            collection.forEach(function(e) {
                elements.push([e.get(e.collection.X), e.get(e.collection.Y)]);
            });

            console.log(collection.jqplotOptions);
            $.jqplot($(collection.el).attr('id'), [elements], collection.jqplotOptions);
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
        }
    });

    return view;
});

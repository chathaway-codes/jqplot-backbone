define(["jquery", "backbone", "backbone-tastypie"], function($, Backbone) {
    var collection = Backbone.Collection.extend({
        url: "/api/raw/coconutres/",
        parse: function(data) {
            return data.objects;
        }
    });
    return collection;
});

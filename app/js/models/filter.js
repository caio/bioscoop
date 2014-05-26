MovieList.Models.Filter = Backbone.Model.extend({
    defaults: {
        titlefilter: '',
    },

    initialize: function(opts) {
        this.collection = opts.collection;
        this.filtered = new Backbone.Collection(opts.collection.models);
        this.on('change:titlefilter', this.filter);
    },

    filter: function() {
        var title = this.get('titlefilter').trim().toLowerCase();
        var models;

        if (title === '') {
            models = this.collection.models;
        } else {
            models = this.collection.filter(function (model) {
                return ~ model.get('title').toLowerCase().indexOf(title);
            });
        }

        this.filtered.reset(models);
    },
});

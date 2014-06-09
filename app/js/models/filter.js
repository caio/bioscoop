MovieList.Models.Filter = Backbone.Model.extend({
    defaults: {
        titlefilter: '',
        watchedfilter: false,
    },

    initialize: function(opts) {
        this.collection = opts.collection;
        this.filtered = new Backbone.Collection(opts.collection.models);
        this.on('change:titlefilter', this.filter);
        this.on('change:watchedfilter', this.filter);

        if ((opts.titlefilter && opts.titlefilter.length > 0) || opts.watchedfilter) {
            this.filter();
        }
    },

    filter: function() {
        var title = this.get('titlefilter').trim().toLowerCase();
        var watched = this.get('watchedfilter');
        var models;

        if (title === '') {
            models = this.collection.models;
        } else {
            models = this.collection.filter(function (model) {
                return ~ model.get('title').toLowerCase().indexOf(title);
            });
        }

        if (watched) {
            models = _.filter(models, function (movie) {
                return (movie.get("playcount") === 0
                        || ! movie.get("lastplayed"));
            });
        }

        this.filtered.reset(models);
    },
});

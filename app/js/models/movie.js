MovieList.Models.Movie = Backbone.Model.extend({
    defaults: {
        id: null,
        title: null,
        year: null,

        genres: [],
        directors: [],

        imdbnumber: null,
        thumbnail: null,

        dateadded: null,
        playcount: 0,
        lastplayed: null,
    },

    thumbnailUrl: function() {
        return "app/img/thumbs/" + this.get("id") + ".jpg";
    },

    toJSON: function () {
        return _.extend(
            Backbone.Model.prototype.toJSON.apply(this),
            {
                thumbnail: this.thumbnailUrl(),
            }
        );
    },
});

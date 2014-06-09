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

    imdbUrl: function() {
        return "http://www.imdb.com/title/" + this.get("imdbnumber") + "/";
    },

    toJSON: function () {
        return _.extend(
            Backbone.Model.prototype.toJSON.apply(this),
            {
                thumbnail: this.thumbnailUrl(),
                imdburl: this.imdbUrl(),
            }
        );
    },
});

MovieList.Models.Movie = Backbone.Model.extend({
    defaults: {
        movieid: null,
        title: null,
        year: null,

        genres: [],
        directors: [],

        imdbnumber: null,
        thumbnail: null,

        dateadded: null,
        playcount: 0,
        lastplayed: null,
    }
});

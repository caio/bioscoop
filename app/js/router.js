MovieList.Router = Backbone.Router.extend({
    routes: {
        '': 'listMovies',
        'movie/:id': 'viewMovieDetails',
    },
});

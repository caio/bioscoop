MovieList.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'movies': 'listMovies',
        'movies/info/:id': 'viewMovieDetails',
    },
});

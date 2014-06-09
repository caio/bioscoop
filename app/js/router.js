MovieList.Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'movies': 'listMovies',
        'movies/:id': 'viewMovieDetails',
        'about': 'about',
    },
});

window.MovieList = {
    Models: {},
    Collections: {},
    Views: {},

    start: function(setup) {
        console.log("Starting MovieList");

        var movies = new MovieList.Collections.Movies(setup.movies);
        var router = new MovieList.Router();

        router.on('route:listMovies', function() {
            console.log("listMovies route");

            var moviesview = new MovieList.Views.Movies({
                collection: movies,
            });

            $('.main-container').html(moviesview.render().$el);
        });

        router.on('route:viewMovieDetails', function() {
            console.log("viewMovieDetails route");
        });

        Backbone.history.start();
    },
};

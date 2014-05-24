window.MovieList = {
    Models: {},
    Collections: {},
    Views: {},

    start: function(setup) {
        console.log("Starting MovieList");

        var movies = new MovieList.Collections.Movies(setup.movies);

        var moviesview = new MovieList.Views.Movies({
            collection: movies,
        });

        $('.main-container').html(moviesview.render().$el);
    },
};

window.MovieList = {
    Models: {},
    Collections: {},
    Views: {},

    start: function(setup) {
        console.log("Starting MovieList");

        var movies = new MovieList.Collections.Movies(setup.movies);

        movies.each(function (movie) {
            console.log(">>> " + movie.get("title"));
        });
    },
};

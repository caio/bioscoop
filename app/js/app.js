window.MovieList = {
    Models: {},
    Collections: {},
    Views: {},

    start: function(setup) {
        console.log("Starting MovieList");

        var movies = new MovieList.Collections.Movies(setup.movies);
        var router = new MovieList.Router();

        router.on('route:home', function() {
            console.log("Default route");
            router.navigate('movies', {
                trigger: true,
                replace: true,
            });
        });

        router.on('route:listMovies', function() {
            console.log("listMovies route");

            var filter = new MovieList.Models.Filter({
                collection: movies,
                titlefilter: $('input[name="titlefilter"]').val(),
                watchedfilter: $('input[name="watchedfilter"]').prop('checked'),
            });

            var moviesview = new MovieList.Views.Movies({
                collection: filter.filtered,
            });

            var searchbox = new MovieList.Views.Searchbox({
                model: filter,
            });

            $('.searchbox').html(searchbox.render().$el);
            $('.main-container').html(moviesview.render().$el);
        });

        router.on('route:viewMovieDetails', function(id) {
            console.log("viewMovieDetails route id=" + id);

            var movie = movies.get(id);

            if (movie) {
                var detailsview = new MovieList.Views.MovieDetails({ model: movie, });

                $('.main-container').html(detailsview.render().$el);

            } else {
                console.log("Couldn't find movie, redirecting back to listing");
                router.navigate('movies', true);
            }

        });

        router.on('route:about', function() {
            console.log("about route");

            $.ajax({
                url: "README.md",
                datatype: "text",
                success: function (data) {
                    var converter = new Showdown.converter();
                    var html = $("<div/>", {
                        class: "row col-md-8 col-sm-8 col-xd-8 col-md-offset-2 col-xd-offset-2"
                    }).append(converter.makeHtml(data));
                    $('.main-container').html(html);
                },
            });
        });

        Backbone.history.start();
    },
};

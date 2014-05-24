MovieList.Views.Movies = Backbone.View.extend({
    template: _.template($('#tmpl-movies').html()),

    renderMovie: function(movie) {
        var movieview = new MovieList.Views.Movie({ model: movie });
        this.$('.movies-container').append(movieview.render().$el);
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);

        this.collection.each(this.renderMovie, this);

        return this;
    },
});

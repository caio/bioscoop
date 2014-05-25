MovieList.Views.MovieDetails = Backbone.View.extend({
    tagName: 'div',
    className: 'media col-md-offset-3 col-lg-offset-3 col-sm-offset-1 col-md-6 col-lg-6 col-sm-6',
    template: _.template($('#tmpl-moviedetails').html()),

    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        return this;
    },
});

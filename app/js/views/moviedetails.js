MovieList.Views.MovieDetails = Backbone.View.extend({
    tagName: 'div',
    className: 'col-md-offset-3 col-lg-offset-3 col-sm-offset-2 col-md-6 col-lg-6 col-sm-8',
    template: _.template($('#tmpl-moviedetails').html()),

    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        return this;
    },
});

MovieList.Views.Movie = Backbone.View.extend({
    tagName: 'li',
    className: 'media col-md-6 col-lg-4',
    template: _.template($('#tmpl-movie').html()),

    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        return this;
    }
});

MovieList.Views.Movie = Backbone.View.extend({
    tagName: 'li',
    className: 'media col-md-3 col-lg-3 col-sm-3',
    template: _.template($('#tmpl-movie').html()),

    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.append(html);
        return this;
    }
});

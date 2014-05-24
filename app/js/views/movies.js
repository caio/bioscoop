MovieList.Views.Movies = Backbone.View.extend({
    template: _.template($('#tmpl-movies').html()),

    render: function() {
        var html = this.template();
        this.$el.html(html);
        return this;
    },
});

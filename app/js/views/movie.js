MovieList.Views.Movie = Backbone.View.extend({
    render: function() {
        var html = '<h1>' + this.model.get('title') + '</h1>';
        this.$el.html(html);
        return this;
    }
});

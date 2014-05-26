MovieList.Views.Searchbox = Backbone.View.extend({
    template: _.template($('#tmpl-search').html()),

    events: {
        'keyup input[name="titlefilter"]': _.throttle(function (ev) {
            this.model.set("titlefilter", ev.currentTarget.value);
        }, 200),
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);
        return this;
    }
});

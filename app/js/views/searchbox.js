MovieList.Views.Searchbox = Backbone.View.extend({
    template: _.template($('#tmpl-search').html()),

    events: {
        'keyup input[name="titlefilter"]': _.debounce(function (ev) {
            this.model.set("titlefilter", ev.currentTarget.value);
        }, 200),
        'change input[name="watchedfilter"]': function (ev) {
            this.model.set("watchedfilter", ev.currentTarget.checked);
        },
    },

    render: function() {
        var html = this.template();
        this.$el.html(html);
        return this;
    }
});

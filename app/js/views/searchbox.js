MovieList.Views.Searchbox = Backbone.View.extend({
    template: _.template($('#tmpl-search').html()),

    events: {
        'keyup input[name="titlefilter"]': _.debounce(function (ev) {
            this.model.set("titlefilter", ev.currentTarget.value);

        }, 300),
        'change input[name="watchedfilter"]': function (ev) {
            this.model.set("watchedfilter", ev.currentTarget.checked);
        },

        // Hide the menubar when the checkbox is clicked
        'click input[name="watchedfilter"]': function(ev) {
            $('.navbar-toggle:visible').click();
        },
    },

    modelTemplateData: function() {
        return {
            titlefilter: this.model.get("titlefilter"),
            watchedfilter: this.model.get("watchedfilter") ? "checked" : "",
        };
    },

    render: function() {
        var html = this.template(this.modelTemplateData());
        this.$el.html(html);
        return this;
    }
});

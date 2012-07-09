Ext.define("Strevusproto.view.charts.Topic", {
    extend: "Ext.List",
    depth: [0, 1],
    config: {
        id: 'topicList',
        store: 'Topic',
        itemTpl: '{value}'
    }
});
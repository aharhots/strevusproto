Ext.define("Strevusproto.view.charts.Region", {
    extend: "Ext.List",
    requires: [
        'Strevusproto.store.charts.Region'
    ],
    depth: [1, 0],
    config: {
        id: 'regionList',
        store: 'Region',
        itemTpl: '{name}'
    }
});
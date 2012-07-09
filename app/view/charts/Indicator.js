Ext.define("Strevusproto.view.charts.Indicator", {
    extend: "Ext.List",
    depth: [0, 2],
    config: {
        id: 'indicatorList',
        store: 'Indicator',
        itemTpl: '{name}'
    }
});
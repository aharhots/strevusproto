Ext.define("Strevusproto.store.charts.Indicator", {
    extend: "Ext.data.Store",
    alias: "store.indicator",
    config: {
        model: "Strevusproto.model.charts.Indicator",
        pageSize: 300,
        proxy: {
            type: "scripttag",
            callbackKey: "prefix",
            limitParam: "per_page",
            reader: {
                type: "worldbank",
                rootProperty: "result"
            }
        }
    }
});
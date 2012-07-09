Ext.define("Strevusproto.store.charts.Country", {
    extend: "Ext.data.Store",
    alias: "store.country",
    config: {
        model: "Strevusproto.model.charts.Country",
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
})
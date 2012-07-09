Ext.define("Strevusproto.store.charts.Region", {
    extend: "Ext.data.Store",
    alias: 'store.region',
    config: {
        model: 'Strevusproto.model.charts.Region',
        autoLoad: true,
        proxy: {
            type: 'scripttag',
            url: 'http://api.worldbank.org/region?format=jsonP',
            callbackKey: 'prefix',
            reader: {
                type: 'worldbank',
                rootProperty: 'result'
            }
        }
    }
});
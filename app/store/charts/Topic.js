Ext.define("Strevusproto.store.charts.Topic", {
    extend: "Ext.data.Store",
    alias: 'store.topics',
    config: {
        model: 'Strevusproto.model.charts.Topic',
        autoLoad: true,
        proxy: {
            type: 'scripttag',
            url: 'http://api.worldbank.org/topics?format=jsonP',
            callbackKey: 'prefix',
            reader: {
                type: 'worldbank',
                rootProperty: 'result'
            }
        }
    }
});
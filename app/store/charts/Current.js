Ext.define("Strevusproto.store.charts.Current", {
    extend: "Ext.data.Store",
    alias: "store.current",
    config: {
        fields: [
            {name: "date", type: "date", dateFormat: "Y"},
            {name: "value", type: "float"}
        ],
        data: [],
        proxy: {
            type: 'scripttag',
            callbackKey: 'prefix',
            reader: {
                type: 'worldbank',
                rootProperty: 'result'
            }
        }
    }
});
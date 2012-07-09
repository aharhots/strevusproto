Ext.define('Strevusproto.store.States', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Strevusproto.model.State',
        autoLoad: true,
        alias: 'store.States',
        sorters: 'value',
        grouper: {
            groupFn: function(record) {
                return record.get('value')[0];
            }
        },
        proxy: {
            type: 'ajax',
            url: 'states.json'
        }
    }
});

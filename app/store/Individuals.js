Ext.define('Strevusproto.store.Individuals', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Strevusproto.model.Individual',
        autoLoad: true,
        alias: 'store.Individuals',
        sorters: 'lastName',
        grouper: {
            groupFn: function(record) {
                return record.get('lastName')[0];
            }
        },
        proxy: {
            type: 'ajax',
            url: 'individuals.json'
        }
    }
});

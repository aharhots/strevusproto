Ext.require('Strevusproto.model.Address', function() {
    Ext.define('Strevusproto.model.Companies', {
        extend: 'Ext.data.Model',
        config: {
            fields: ['id', 'name', 'duns', 'web', 'color'],
            hasMany: {
                model: 'Strevusproto.model.Address',
                name: 'addresses'
            },
            proxy: {
                type: 'ajax',
                url : 'companies.json'
            }
        }
    });
});

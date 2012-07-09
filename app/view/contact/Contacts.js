Ext.define('Strevusproto.view.contact.Contacts',
    {
    extend: 'Ext.List',
    xtype: 'contacts',
//    roles: 'Admin',
    config: {
        title: 'Individuals',
        indexBar: true,
        cls: 'x-contacts',
        grouped: true,
        store: 'Individuals',
        itemTpl: [
            '{firstName} {lastName}',
            '<span>{title}</span>'
        ].join('')
    }
}

);

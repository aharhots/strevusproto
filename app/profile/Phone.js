Ext.define('Strevusproto.profile.Phone', {
    extend: 'Strevusproto.profile.Base',

    config: {
        controllers: ['Main'],
        views: ['Main']
    },

    isActive: function() {
        return Ext.os.is.Phone; // || Ext.os.is.Desktop;
    },

    launch: function() {
        Ext.create('Strevusproto.view.phone.Main');

        this.callParent();
    }
});

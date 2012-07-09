Ext.define('Strevusproto.profile.Tablet', {
    extend: 'Strevusproto.profile.Base',

    config: {
        controllers: ['Main'],
        views: ['Main']
    },

    isActive: function() {
        return Ext.os.is.Tablet || Ext.os.is.Desktop;
    },

    launch: function() {
        Ext.Viewport.add({
            xclass: 'Strevusproto.view.Login'
        });
        this.callParent();
    }
});

Ext.define('Strevusproto.view.tablet.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',

    requires: [
        'Ext.dataview.NestedList',
        'Ext.navigation.Bar'
    ],

    config: {
        fullscreen: true,

        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'left',
                duration: 250
            }
        },

        items: [
            {
                id: 'launchscreen',
                cls : 'card',
                scrollable: true,
                html: '<div><h2>Welcome to Strevus Sencha Touch <span class="version">' + Ext.version +'</span> Prototype Application</h2>' +
                    '<div class="feature main"><img src="resources/images/circle-touch.png" width="52" height="52"><p>This is the learning ' +
                    'application &#8212; a collection of features to simulate upcoming web-mobile development. <br/>Each example also has a &#8220;view source&#8221; ' +
                    'button which shows how it was created.</p></div>' +
                    '<div>You are running: <b>' + Ext.os.name + '</b>, your browser engine is <b>' + Ext.browser.engineName + '</b></div>'
            },
            {
                id: 'mainNestedList',
                xtype : 'nestedlist',
                useTitleAsBackText: true,
                docked: 'left',
                width : 256,
                store: 'Nav'
            }
        ]
    }
});

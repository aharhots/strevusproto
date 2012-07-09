Ext.define('Strevusproto.view.Login', {
    extend: 'Ext.Container',
    xtype: 'loginview',

    config: {
        centered: true,
        styleHtmlContent: true,
        width: 400,
        id: 'loginView',
        layout: {
            pack: 'center',
            type: 'vbox'
        },
        modal: false,
        items: [
            {
                xtype: 'container',
                layout: {
                    align: 'center',
                    pack: 'center',
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'image',
                        height: 256,
                        width: 256,
                        src: 'resources/images/strevus-logo.jpg'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '40%'
                },
                title: '',
                items: [
                    {
                        xtype: 'emailfield',
                        label: 'Login (use email address)',
                        placeHolder: 'email@example.com'
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Password'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '40%'
                },
                title: '',
                items: [
                    {
                        xtype: 'togglefield',
                        label: 'Remember Me'
                    }
                ]
            },
            {
                xtype: 'segmentedbutton',
                height: 44,
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        id: 'loginButton',
                        itemId: 'mybutton',
                        text: 'Login'
                    },
                    {
                        xtype: 'button',
                        text: 'Login as Administrator'
                    },
                    {
                        xtype: 'button',
                        text: 'Login as User'
                    }
                ]
            }
        ]

    }

});

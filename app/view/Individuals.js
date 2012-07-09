/**
 * Demonstrates a NestedList, which uses a TreeStore to drill down through hierarchical data
 */
Ext.require('Ext.data.TreeStore', function() {
    Ext.define('Strevusproto.view.Individuals', {
        requires: [
            'Strevusproto.model.Individual',
            'Strevusproto.store.Individuals',
            'Strevusproto.view.contact.Contacts',
            'Strevusproto.view.contact.Show',
            'Strevusproto.view.contact.Edit'
        ],
        extend: 'Ext.navigation.View',
        xtype: 'navigationview',
        config: {
            autoDestroy: false,
            navigationBar: {
                items: [
                    {
                        text: 'Explain',
                        id: 'explainIndividuals',
                        handler: function() {
                            if (!this.explanation) {
                                this.explanation = Ext.create('Ext.Panel', {
                                    modal: true,
                                    hideOnMaskTap: true,
                                    centered: true,
                                    width: 340,
                                    height: 205,
                                    styleHtmlContent: true,
                                    scrollable: true,
                                    items: {
                                        docked : 'top',
                                        xtype: 'toolbar',
                                        title: 'List of available Individuals'
                                    },
                                    html: [
                                        '<p>Shows usage of few Sencha Touch MVC components (<i><b>Ext.navigation.View</b></i>, ' +
                                            '<i><b>Ext.List</b></i>, <i><b>Ext.Container</b></i>, <i><b>Ext.Form.FieldSet</b></i>, ' +
                                            '<i><b>Ext.data.Store</b></i> and <i><b>Ext.data.Model</b></i>), as well as ' +
                                            'work with Google Maps via <i><b>Ext.Map</b></i>.</p>'
                                    ].join("")
                                });
                                Ext.Viewport.add(this.explanation);
                            }
                            this.explanation.show();
                        }
                    },
                    {
                        xtype: 'button',
                        id: 'editButton',
                        text: 'Edit',
                        align: 'right',
                        hidden: true,
                        hideAnimation: Ext.os.is.Android ? false : {
                            type: 'fadeOut',
                            duration: 200
                        },
                        showAnimation: Ext.os.is.Android ? false : {
                            type: 'fadeIn',
                            duration: 200
                        }
                    },
                    {
                        xtype: 'button',
                        id: 'saveButton',
                        text: 'Save',
                        align: 'right',
                        hidden: true,
                        hideAnimation: Ext.os.is.Android ? false : {
                            type: 'fadeOut',
                            duration: 200
                        },
                        showAnimation: Ext.os.is.Android ? false : {
                            type: 'fadeIn',
                            duration: 200
                        }
                    }
                ]
            },
            items: [
                {
                    xtype: 'contacts'
                }
            ]
        }
    });
});
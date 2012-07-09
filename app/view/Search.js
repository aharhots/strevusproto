/**
 * Demonstrates a NestedList, which uses a TreeStore to drill down through hierarchical data
 */

Ext.require('Ext.data.TreeStore', function() {
    Ext.define('Strevusproto.view.Search', {
        requires: [
            'Strevusproto.view.search.SearchFilter',
            'Strevusproto.view.search.TweetList'
        ],
        extend: 'Ext.navigation.View',
        xtype: 'navigationSearchView',
        id: 'navigationSearchView',
        config: {
            autoDestroy: false,
            navigationBar: {
                items: [
                    {
                        text: 'Explain',
                        id: 'explainSearch',
                        handler: function() {
                            if (!this.explanation) {
                                this.explanation = Ext.create('Ext.Panel', {
                                    modal: true,
                                    hideOnMaskTap: true,
                                    centered: true,
                                    width: 340,
                                    height: 230,
                                    styleHtmlContent: true,
                                    scrollable: true,
                                    items: {
                                        docked : 'top',
                                        xtype: 'toolbar',
                                        title: 'Search Filter'
                                    },
                                    html: [
                                        '<p>Shows how to access remote data via <i><b>Ext.data.proxy.JsonP</b></i></p>' +
                                            'Contains <i><b>Ext.dataview.DataView</i></b> which is used to display the tweets returned by the twitter search.'
                                    ].join("")
                                });
                                Ext.Viewport.add(this.explanation);
                            }
                            this.explanation.show();
                        }
                    },
                    {
                        xtype: 'button',
                        id: 'resetButton',
                        text: 'Reset',
                        align: 'right',
                        hidden: false,
                        hideAnimation: Ext.os.is.Android ? false : {
                            type: 'fadeOut',
                            duration: 200
                        },
                        showAnimation: Ext.os.is.Android ? false : {
                            type: 'fadeIn',
                            duration: 200
                        },
                        handler: function(){
                            Ext.getCmp('individualForm').reset();
                            Ext.getCmp('companyForm').reset();
                        }
                    },
                    {
                        xtype: 'button',
                        id: 'applyButton',
                        text: 'Apply',
                        align: 'right',
                        hidden: false,
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
                    xtype: 'searchfilter'
                }
            ]
        }
    });
});
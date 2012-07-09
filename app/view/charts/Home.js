Ext.define("Strevusproto.view.charts.Home", {
    extend: "Ext.Panel",
    requires: [
        'Strevusproto.view.charts.InfoPanel',
        'Strevusproto.store.charts.Curated'
    ],
    depth: [0, 0],
    config: {
        id: 'homeCard',
        layout: 'fit',
        items: [
//            {
////                ui: 'neutral',
//                xtype: 'toolbar',
//                docked: 'top',
//                layout: 'hbox',
//                items: [
////                    {
////                        xtype: 'button',
////                        text: 'Data by region',
////                        align: 'right',
//////                        flex: 1,
////                        action: 'byRegion'
////                    },
////                    {
////                        xtype: 'button',
////                        text: 'Data by indicator',
////                        align: 'right',
//////                        flex: 1,
////                        action: 'byIndicator'
////                    }
//                ]
//            },
            {
                xtype: 'list',
                store: "Curated",
                itemTpl: '{alias}'
            }
        ]
    }
});

Ext.define("Strevusproto.view.Charts", {
    extend: "Ext.Panel",
    requires: [
        'Strevusproto.view.charts.Home',
        'Strevusproto.view.charts.Region',
        'Strevusproto.view.charts.Country',
        'Strevusproto.view.charts.Topic',
        'Strevusproto.view.charts.Topic',
        'Strevusproto.view.charts.Indicator',
        'Strevusproto.view.charts.Data'
    ],
    config: {
        id: 'main',
        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'right'
            }
        },
        hidden: true,
        items: [
            {
                xtype: 'toolbar',
                docked: "top",
                title: '',
                items: [
                    {
                        id: 'backButton',
                        ui: 'back',
                        text: 'Regions',
                        hidden: true,
                        zIndex: 10
                    },
                    {xtype: 'spacer'},

                    {
                        xtype: 'button',
                        id: 'dataByRegion',
                        text: 'Data by region',
                        align: 'right',
                        action: 'byRegion'
                    },
                    {
                        xtype: 'button',
                        id: 'dataByIndicator',
                        text: 'Data by indicator',
                        align: 'right',
                        action: 'byIndicator'
                    },

                    {
                        text: 'Explain',
                        id: 'explainCharts',
                        handler: function() {
                            if (!this.explanation) {
                                this.explanation = Ext.create('Ext.Panel', {
                                    modal: true,
                                    hideOnMaskTap: true,
                                    centered: true,
                                    width: 340,
                                    height: 300,
                                    styleHtmlContent: true,
                                    scrollable: true,
                                    items: {
                                        docked : 'top',
                                        xtype: 'toolbar',
                                        title: 'Use of Touch Charts'
                                    },
                                    html: [
                                        '<p>Sencha Touch Charts breathes new life into your data and utilizes hardware ' +
                                            'acceleration for optimized performance. With natural gestures in Sencha ' +
                                            'Touch Charts, visualizing and understanding complex datasets is effortless. ' +
                                            'Pinch-to-zoom, swipe-to-pan across data, and tap for deep dives. Data flows ' +
                                            'come to life with every tap, pinch, and swipe.</p>'
                                    ].join("")
                                });
                                Ext.Viewport.add(this.explanation);
                            }
                            this.explanation.show();
                        }
                    }
                ]
            },
            {xclass: 'Strevusproto.view.charts.Home'},
            {xclass: 'Strevusproto.view.charts.Region'},
            {xclass: 'Strevusproto.view.charts.Country'},
            {xclass: 'Strevusproto.view.charts.Topic'},
            {xclass: 'Strevusproto.view.charts.Indicator'},
            {xclass: 'Strevusproto.view.charts.Data'}
        ]
    }
});
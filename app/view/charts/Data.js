Ext.define("Strevusproto.view.charts.Data", {
    extend: "Ext.chart.Chart",
    depth: [3, 3],
    config: {
        id: 'dataView',
        store: 'Current',
       theme: 'WorldData',
        interactions: [
            {
                type: 'reset'
            },
            {
                type: 'panzoom'
            },
            {
                type: 'iteminfo',
                listeners: {
                    show: function (interaction, item, panel) {
                        var storeItem = item.storeItem;
                        Ext.Msg.alert('Details', 'For '+ Ext.Date.format(item.value[0], 'Y') + ' :' + item.value[1]);
                    }
                }
            },
            {
                type: 'itemcompare',
                listeners: {
                    show: function(interaction) {
                        var val1 = interaction.item1.value,
                            val2 = interaction.item2.value;
                        Ext.Msg.alert(
                            'Trend',
                            'Trend from ' + val1[0] + ' to ' + val2[0] + ': ' +
                                Math.round((val2[1] - val1[1]) / val1[1] * 100) + '%',
                            interaction.reset,
                            interaction
                        );
                    }
                }
            }

        ],
        axes: [
            {
                type: 'Numeric',
                grid: true,
                position: 'left',
                fields: ['value'],
                title: 'Value',
                label: {
                    renderer: Ext.util.Format.si
                }
            },
            {
                type: 'Time',
                dateFormat: 'Y',
                grid: true,
                position: 'bottom',
                fields: ['date'],
                title: 'Date',
                step: [Ext.Date.YEAR, 1],
                label: {
                }
            }
        ],
        series: [
            {
                type: 'line',
                lineWidth: 1,
                showMarkers: true,
                fill: true,
                axis: ['left', 'bottom'],
                xField: 'date',
                yField: 'value'
            }
        ]
    }
});
Ext.define("Strevusproto.view.charts.InfoPanel", {
    extend: "Ext.Panel",
    config: {
        id: 'infoPanel',
        floating: true,
        modal: true,
        centered: true,
        width: 250,
        height: 250,
        styleHtmlContent: true,
        scrollable: 'vertical',
        tpl: '<b>{d.title}</b> {d.direction} {d.value}% from {i1.value:si} to {i2.value:si}',
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title: 'Item Detail'
            }
        ],
        hideOnMaskTap: true,
        hidden: true
    }
});
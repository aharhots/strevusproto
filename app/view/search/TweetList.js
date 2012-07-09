/**
* The TweetList component is a simple dataview which is used to display the
* tweets returned by the twitter search. It also has a toolbar docked at the
* top which is used in phones to display a back button.
*
* The {@link #defaultType} is a tweetlistitem.
*/
Ext.define('Strevusproto.view.search.TweetList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'tweetlist',
    requires: [
        'Strevusproto.view.search.TweetListItem',
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging'
    ],

    config: {
        title: 'Search Results',
        ui           : 'timeline',
        defaultType  : 'tweetlistitem',
        allowDeselect: false,
        useComponents: true,
        emptyText: 'No tweets found.',

        plugins: [
            'pullrefresh',
            {
                type: 'listpaging',
                autoPaging: true
            }
        ],

        items: [
            {
                docked: 'top',
                xtype : 'toolbar',
                hidden: true,
                ui    : 'searchbar',
                items: [
                    {
                        xtype: 'button',
                        ui   : 'back',
                        text : 'Searches'
                    }
                ]
            }
        ]
    }
});

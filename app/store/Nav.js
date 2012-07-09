(function() {

    var root = {
        id: 'root',
        text: 'Main Menu',
        items: [
            {
                text: 'Browse Parties',
                id: 'ui',
                cls: 'launchscreen',
                items: [
                    {
                        text: 'Individuals',
                        view: 'Individuals',
                        leaf: true,
                        id: 'individuals'
                    },
                    {
                        text: 'Companies',
                        view: 'Companies',
                        leaf: true,
                        id: 'companies'
                    }
                ]
            }
        ]
    };

    root.items.push({
        text: 'Search',
        id: 'search',
        view: 'Search',
        leaf: true
    }, {
        text: 'Reports',
        id: 'media',
        items: [
            {
                text: 'World Data Charts',
                leaf: true,
                id: 'charts',
                view: 'Charts'
            }
        ]
    }, {
        text: 'Latest Sencha Blogs',
        id: 'yql',
        view: 'YQL',
        leaf: true
    });

    Ext.define('Strevusproto.store.Nav', {
        alias: 'store.Nav',
        extend: 'Ext.data.TreeStore',
        requires: ['Strevusproto.model.Nav'],

        config: {
            model: 'Strevusproto.model.Nav',
            root: root,
            defaultRootProperty: 'items'
        }
    });
})();
/**
 * Demonstrates using YQL to fetch data from remote sources (in this case loading from the Sencha blog)
 */

Ext.require('Ext.data.JsonP', function() {
    Ext.YQL = {
        useAllPublicTables: true,
        yqlUrl: 'http://query.yahooapis.com/v1/public/yql',
        request: function(cfg) {
            var p = cfg.params || {};
            p.q = cfg.query;
            p.format = 'json';
            if (this.useAllPublicTables) {
                p.env = 'store://datatables.org/alltableswithkeys';
            }

            Ext.data.JsonP.request({
                url: this.yqlUrl,
                callbackKey: 'callback',
                params: p,
                callback: cfg.callback,
                scope: cfg.scope || window
            });
        }
    };

    Ext.define('Strevusproto.view.YQL', {
        extend: 'Ext.Container',
        config: {
            scrollable: true,
            listeners: {
                activate: function(list, opts){

                    var panel = Ext.getCmp('YQL'),
                        tpl = new Ext.XTemplate([
                            '<tpl for="item">',
                            '<div class="blog-post">',
                            '<h3><a href="{link}" target="_blank">{title}</a></h3>',
                            '<p>{description}',
                            '<br/><small>by {author}</small></p>',
                            '</div>',
                            '</tpl>'
                        ]);

                    panel.getParent().setMasked({
                        xtype: 'loadmask',
                        message: 'Loading...'
                    });

                    Ext.YQL.request({
                        query: "select * from rss where url='http://feeds.feedburner.com/extblog'",
                        callback: function(success, response) {
                            if (success && response.query && response.query.results) {
                                panel.setHtml(tpl.apply(response.query.results));
                            }
                            else {
                                Ext.Msg.alert('Error', 'There was an error retrieving the YQL request.', Ext.emptyFn);
                            }

                            panel.getParent().unmask();
                        }
                    });

                }
            },
            items: [
                {
                    xtype: 'panel',
                    id   : 'YQL',
                    styleHtmlContent: true
                },
                {
                    docked: 'top',
                    xtype: 'toolbar',
                    title: 'Latest from Sencha Blogs',
                    items: [
                        {
                            text: 'Explain',
                            id: 'explainYUI',
                            handler: function() {
                                if (!this.explanation) {
                                    this.explanation = Ext.create('Ext.Panel', {
                                        modal: true,
                                        hideOnMaskTap: true,
                                        centered: true,
                                        width: 340,
                                        height: 330,
                                        styleHtmlContent: true,
                                        scrollable: true,
                                        items: {
                                            docked : 'top',
                                            xtype: 'toolbar',
                                            title: 'List of latest Sencha Blogs'
                                        },
                                        html: [
                                            '<p>Demonstrates use of Yahoo! Query Language via <b><i>Ext.YQL</i></a></b> to fetch data from remote source.</p>' +
                                                '<p>YQL exposes an SQL-like SELECT syntax that is both familiar to developers and ' +
                                                'expressive enough for getting the right data. Through the SHOW and DESC commands, ' +
                                                'we enable developers to discover the available data sources and structure without ' +
                                                'opening another Web browser.</p>'
                                        ].join("")
                                    });
                                    Ext.Viewport.add(this.explanation);
                                }
                                this.explanation.show();
                            }
                        }
                    ]
                }
            ]
        }
    });
});

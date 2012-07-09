Ext.define('Strevusproto.controller.Charts', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            main: '#main',
            titleBar: '#main > toolbar',
            infoPanel: '#infoPanel',
            backButton: '#backButton',
            homeView: '#homeCard',
            homeList: '#homeCard list',
            regionList: '#regionList',
            countryList: '#countryList',
            topicList: '#topicList',
            indicatorList: '#indicatorList',
            dataView: '#dataView',
            chart: 'chart',
            itemComp: 'chart interaction[type=itemcompare]',
            itemInfo: 'chart interaction[type=iteminfo]',
            dataByRegion: '#dataByRegion',
            dataByIndicator: '#dataByIndicator'
        },
        control: {
            dataByRegion: {
                tap: 'byRegion'
            },
            dataByIndicator: {
                tap: 'byIndicator'
            },
            homeList: {
                itemtap: 'goCurated'
            },
            regionList: {
                itemtap: 'goRegion'
            },
            topicList: {
                itemtap: 'goTopic'
            },
            indicatorList: {
                itemtap: 'goIndicator'
            },
            countryList: {
                itemtap: 'goCountry'
            },
            backButton: {
                tap: 'goBack'
            },
            itemComp: {
                show: 'showCompare'
            },
            itemInfo: {
                show: 'showInfo'
            }
        },
        routes: {
            'home': 'showHome',
            'regions': 'showRegions',
            'regions/:code': 'showRegion',
            'topics': 'showTopics',
            'topics/:topic': 'showIndicator',
            'data/:country/:indicator': 'showData'
        }
    },

    backTo: 'home',
    lastPath: 'home',
    curate: null,
    region: null,
    country: null,
    topic: null,
    indicator: null,
    back: null,

    enter: function (title, back, backTo) {
        if (back) {
            this.getBackButton().setText(back);
            this.getBackButton().show();
            this.backTo = backTo;
            this.getDataByRegion().hide();
            this.getDataByIndicator().hide();
        } else {
            this.getBackButton().hide();
            this.getDataByRegion().show();
            this.getDataByIndicator().show();
        }
        this.getTitleBar().getTitle().setHtml(title);
    },

    goto: function (view) {
        var me = this,
            main = me.getMain(),
            current = main.getActiveItem();
        if (me.back === null) {
            main.getLayout().getAnimation().setReverse(current.depth[0] > view.depth[0] || current.depth[1] > view.depth[1]);
        } else {
            main.getLayout().getAnimation().setReverse(!me.back);
        }

        main.setActiveItem(view);
        me.back = false;
    },

    goBack: function () {
        this.back = true;
        this.redirectTo(this.backTo);
    },

    byRegion: function () {
        this.region = null;
        this.redirectTo('regions');
    },

    byIndicator: function () {
        this.topic = null;
        this.enter('Topics', 'World Data', 'home');
        this.redirectTo('topics');
    },

    goCurated: function () {
        var data = arguments[3].getData();
        if (data) {
            this.curate = {
                alias: data.alias,
                unit: data.unit
            }
            this.redirectTo(["data", data.countryId, data.indicatorId.replace(/\./g, '_')].join('/'));
        }
    },

    goRegion: function () {
        var data = arguments[3].getData();
        if (data) {
            this.region = {
                id: data.code,
                name: data.name
            };
            this.redirectTo(["regions", data.code].join('/'));
        }
    },

    goCountry: function () {
        var data = arguments[3].getData();
        if (data) {
            this.country = {
                id: data.id,
                name: data.name
            };
            if (this.indicator) {
                this.redirectTo(['data', this.country.id, this.indicator.id.replace(/\./g, '_')].join('/'));
            } else {
                this.redirectTo('topics');
            }
        }
    },

    goTopic: function () {
        var data = arguments[3].getData();
        if (data) {
            this.topic = {
                id: data.id,
                name: data.value
            };
            this.redirectTo(["topics", data.id].join('/'));
        }
    },

    goIndicator: function () {
        var data = arguments[3].getData();
        if (data) {
            this.indicator = {
                id: data.id,
                name: data.name
            };
            if (this.country) {
                this.redirectTo(['data', this.country.id, this.indicator.id.replace(/\./g, '_')].join('/'));
            } else {
                this.redirectTo('regions');
            }
        }
    },

    showHome: function () {
        this.enter('World Data');
        this.curate = null;
        this.goto(this.getHomeView());
    },

    showData: function (country, indicator) {
        var me = this,
            dataView = me.getDataView(),
            current = Ext.getStore('Current'),
            proxy = current && current.getProxy();
        me.goto(dataView);
        if (me.curate) {
            me.enter(me.curate.alias, 'World Data', 'home');
        } else if (me.country && me.indicator) {
            me.enter(me.indicator.name + ' of ' + me.country.name, 'Back', this.lastPath);
        } else {
            this.curate = {
                country: country,
                indicator: indicator
            }
            var indicatorName, countryName;
            Ext.data.JsonP.request({
                url: 'http://api.worldbank.org/countries/' + country + '?format=jsonP',
                callbackKey: 'prefix',
                success: function (object) {
                    countryName = object[1][0].name;
                    if (indicatorName) {
                        me.curate.alias = indicatorName + ' of ' + countryName;
                        me.enter(indicatorName + ' of ' + countryName, 'World Data', 'home');
                    }
                }
            });
            Ext.data.JsonP.request({
                url: 'http://api.worldbank.org/indicators/' + indicator.replace(/_/g, '.') + '?format=jsonP',
                callbackKey: 'prefix',
                success: function (object) {
                    indicatorName = object[1][0].name.replace(/\(.*\)/g, '');
                    me.curate.unit = object[1][0].name.match(/\((.*)\)/g);
                    if (me.curate.unit) {
                        me.curate.unit = me.curate.unit[1];
                    } else {
                        me.curate.unit = '';
                    }
                    if (countryName) {
                        me.curate.alias = indicatorName + ' of ' + countryName;
                        me.enter(indicatorName + ' of ' + countryName, 'World Data', 'home');
                    }
                }
            });
        }
        proxy.setUrl('http://api.worldbank.org' +
            '/countries/' + country +
            '/indicators/' + indicator.replace(/_/g, '.') +
            '?per_page=100&MRV=100&frequency=Y&format=jsonP');
        me.getItemComp().reset();
        current.load(null);
    },

    showRegions: function () {
        this.region = null;
        this.goto(this.getRegionList());
        if (this.topic) {
            this.enter(this.indicator.name + ' for Regions', this.topic.name, 'topics/' + this.topic.id);
        } else {
            this.enter('Regions', 'World Data', 'home');
        }
    },

    showRegion: function (code) {
        var me = this;
        me.country = null;
        me.goto(me.getCountryList());
        if (me.region) {
            me.enter(me.region.name, 'Regions', 'regions');
        } else {
            Ext.data.JsonP.request({
                url: 'http://api.worldbank.org/regions/' + code + '?format=jsonP',
                callbackKey: 'prefix',
                success: function (object) {
                    me.region = {
                        name: object[1][0].name,
                        id: code
                    };
                    me.enter(me.region.name, 'Regions', 'regions');
                }
            });
        }

        var country = Ext.getStore('Country'),
            proxy = country.getProxy();
        proxy.setUrl('http://api.worldbank.org' +
            '/regions/' + code +
            '/countries' +
            '?format=jsonP');
        this.lastPath = 'regions/' + code;
        country.load(null);
    },

    showTopics: function () {
        this.topic = null;
        this.goto(this.getTopicList());
        if (this.country) {
            this.enter('Topics for ' + this.country.name, this.region.name, 'regions/' + this.region.id);
        } else {
            this.enter('Topics', 'World Data', 'home');
        }
    },

    showIndicator: function (topic) {
        var me = this;
        me.indicator = null;
        me.goto(me.getIndicatorList());
        if (me.topic) {
            me.enter(me.topic.name, 'Topics', 'topics');
        } else {
            Ext.data.JsonP.request({
                url: 'http://api.worldbank.org/topics/' + topic + '?format=jsonP',
                callbackKey: 'prefix',
                success: function (object) {
                    me.topic = {
                        name: object[1][0].value,
                        id: topic
                    };
                    me.enter(me.topic.name, 'Topics', 'topics');
                }
            });
        }
        var indicator = Ext.getStore('Indicator'),
            proxy = indicator.getProxy();
        proxy.setUrl('http://api.worldbank.org' +
            '/topics/' + topic +
            '/indicators' +
            '?format=jsonP');
        this.lastPath = 'topics/' + topic;
        indicator.load(null);
    },

    showCompare: function (interaction) {
        var me = this,
            record1 = interaction.item1.storeItem,
            record2 = interaction.item2.storeItem,
            panel = this.getInfoPanel(),
            y1 = record1.get('date').getFullYear(),
            y2 = record2.get('date').getFullYear();

        panel.getItems().get(0).setTitle(
            y1 < y2 ?
                y1 + ' to ' + y2 :
                y2 + ' to ' + y1
        );
        panel.show('pop');
        var data = (
            y1 < y2 ?
            {i1: record1.data, i2: record2.data} :
            {i1: record2.data, i2: record1.data}
            );
        data.d = {
            value: Math.abs(Math.round(100 * (data.i2.value - data.i1.value) / data.i1.value)),
            direction: data.i2.value > data.i1.value ? 'Rose' : 'Fell',
            unit: me.curate && me.curate.unit || ''
        };
        panel.setData(data);
    },

    showInfo: function (interaction, item, panel) {
        var me = this,
            record = item.storeItem,
            unit = me.indicator && me.indicator.name.match(/\((.*)\)/);
        panel.getItems().get(0).setTitle('' + record.get('date').getFullYear());
        panel.setData({
            title: me.curate && me.curate.alias || me.getTitleBar().getTitle().getHtml(),
            value: record.data.value,
            unit: me.curate && me.curate.unit || unit && unit[1] || ''
        });
        this.getItemComp().reset();
    }
});
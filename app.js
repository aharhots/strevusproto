//<debug>
Ext.Loader.setPath({
    'Ext': '../../src'
});
//</debug>

Ext.define("Strevusproto.models.WorldBankReader", {
    extend: 'Ext.data.reader.Json',
    alias: 'reader.worldbank',
    type: 'json',
    config: {
        rootProperty: 'result'
    },
    constructor: function () {
        this.callParent(arguments);
    },
    readRecords: function (data) {
        if (data[1]) {
            return this.callParent([data[1]]);
        }
        return this.nullResultSet;
    }
});

Ext.util.Format.si = function (number) {
    var number = parseFloat(number),
        suffix = ['', 'k', 'm', 'b', 't'],
        len = Math.round(Math.abs(number)).toString().length - 1;
    if (len < 15) {
        return (Math.round(number / Math.pow(10, len - 2)) / Math.pow(10, 2 - (len % 3))) + suffix[Math.floor(len / 3)];
    }
    return number.toString();
}

/**
 * Ext.application is the heart of your app. It sets the application name, can specify the icon and startup images to
 * use when your app is added to the home screen, and sets up your application's dependencies - usually the models,
 * views and controllers that your app uses.
 */
Ext.application({
    name: 'Strevusproto',
    requires: ['Strevusproto.proxy.Twitter'],

    //sets up the icon and startup screens for when the app is added to a phone/tablet home screen
    glossOnIcon: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@114.png'
    },

    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    controllers: [
        'Search', 'Charts'
    ],

    models: ['Search', 'Tweet', 'charts.CountryIndicator', 'charts.Region', 'charts.Country', 'charts.Topic', 'charts.Indicator'],

    //loads the views used by the app from the app/view folder
    views: [
        'Login', 'Individuals', 'Companies', 'Search', 'YQL', 'Charts', 'charts.Data'
    ],

    //loads app/store/Nav.js, which contains the tree data for our main navigation NestedList
    //loads app/store/Individuals.js, which contains the Individuals data
    stores: ['Nav', 'Individuals', 'States', 'Searches', 'charts.Curated', 'charts.Region', 'charts.Current', 'charts.Country', 'charts.Topic', 'charts.Indicator'],

    //has Phone and Tablet modes, which rearrange the screen based on the type of device detected
    profiles: ['Tablet', 'Phone']

});

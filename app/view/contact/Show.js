Ext.define('Strevusproto.view.contact.Show', {
    extend: 'Ext.Container',
    xtype: 'contact-show',

    config: {
        title: 'Information',
        baseCls: 'x-show-contact',
        layout: 'vbox',
        itemSelector:'dv',

        items: [
            {
                id: 'content',
                tpl: [
                    '<div class="top">',
                        '<div class="name">{firstName} {lastName}<span>{title}</span><span>{city}, {state} {country}</span><span>{telephone}</span></div>',
                    '</div>'
                ].join('')
            },
            {
                xtype: 'map',
                flex: 1,
                mapOptions : {
                    zoom : 15,
                    panControl : true,
                    rotateControl : true,
                    scaleControl : true,
                    mapTypeId : google.maps.MapTypeId.ROADMAP,
                    navigationControl: true,
                    navigationControlOptions: {
                        style: google.maps.NavigationControlStyle.DEFAULT
                    }
                }
            }
        ],

        record: null
    },

    /**
     * Called when User selects item in Individuals list and after successful data saving
     * Used for Google Maps setup
     * @param newRecord Record object
     */
    updateRecord: function(newRecord) {
        if (newRecord) {
            this.down('#content').setData(newRecord.data);

            var mapST = this.down('map');

            mapST.setMapCenter({
                latitude: newRecord.data.latitude,
                longitude: newRecord.data.longitude
            });

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(newRecord.data.latitude, newRecord.data.longitude),
                title: 'Person Location',
                map: mapST.getMap()
            });

            var infoWindow = new google.maps.InfoWindow({
                content: '<br/>' + newRecord.data.city + ', ' + newRecord.data.state + ' ' + newRecord.data.country + '<br/>' +
                    newRecord.data.latitude + '<br/>' + newRecord.data.longitude + '<br/>'
            });

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.open(mapST.getMap(), marker);
            });
        }
    }
});
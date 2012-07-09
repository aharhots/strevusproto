/*
 * This panel sets up a DataView, which defines an XTemplate used to render our data. We also set up
 * the toolbar with the "Load Nested Data" button here
 */
Ext.require(['Ext.data.Store', 'Strevusproto.model.Companies'], function() {
    Ext.define('Strevusproto.view.Companies', {
        extend: 'Ext.Container',
        config: {
            layout: 'vbox',
            baseCls: 'x-show-contact',
            listeners: {
                activate: function(list, opts){
                    var myStore = Ext.getCmp('NestedLoadingDataView').getStore();
                    myStore.load();
                    myStore.on('load', function () {
                        var mapST = Ext.getCmp('companiesMap');
                        var geocoder = new google.maps.Geocoder();
                        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow", new google.maps.Size(40, 37), new google.maps.Point(0, 0), new google.maps.Point(12, 35));
                        myStore.data.each(function(item, index, totalItems ) {
                            // Set different colors to pins by Company
                            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + item.data['color'], new google.maps.Size(21, 34), new google.maps.Point(0,0), new google.maps.Point(10, 34));
                            item.addresses().each(function(innerItem, innerIndex, innerTotalItems ) {
                                var addressLine = innerItem.data['address'] + " " + innerItem.data['city'] + " " + innerItem.data['country'];
                                if (geocoder) {
                                    // Get Google Maps location by street address and set Markers
                                    geocoder.geocode( { 'address': addressLine}, function(results, status) {
                                        if (status == google.maps.GeocoderStatus.OK) {
                                            if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                                                var marker = new google.maps.Marker({
                                                    position: results[0].geometry.location,
                                                    title: 'Company Location',
                                                    icon: pinImage,
                                                    shadow: pinShadow,
                                                    map: mapST.getMap()
                                                });

                                                // Create pop-up info window object, which appears on pin click
                                                var infoWindow = new google.maps.InfoWindow({
                                                    content: item.data['name'] + '<br/>' + innerItem.data['address'] + ' ' + innerItem.data['city'] + ', ' + innerItem.data['state'] + ' ' + innerItem.data['country'] + '<br/>'
                                                });

                                                // Add listener to open info window
                                                google.maps.event.addListener(marker, 'click', function() {
                                                    infoWindow.open(mapST.getMap(), marker);
                                                });

                                            } else {
                                                alert("No results found");
                                            }
                                        } else {
                                             alert("Geocode was not successful for the following reason: " + status);
                                        }
                                    });
                                }
                            });
                        });
                    });
                }
            },
            items: [
                {
                    docked: 'top',
                    xtype: 'toolbar',
                    title: 'Companies',
                    items: [
                        {
                            text: 'Explain',
                            handler: function() {
                                if (!this.explanation) {
                                    this.explanation = Ext.create('Ext.Panel', {
                                        modal: true,
                                        hideOnMaskTap: true,
                                        centered: true,
                                        width: 320,
                                        height: 310,
                                        styleHtmlContent: true,
                                        scrollable: true,
                                        items: {
                                            docked : 'top',
                                            xtype: 'toolbar',
                                            title: 'Loading Nested Data'
                                        },
                                        html: [
                                            '<p>The data package can load deeply nested data in a single request. In this example we are loading a fictional',
                                            'dataset containing Companies and their Addresses.</p>',
                                            '<p>Instead of pulling down each record in turn, we load the full data set in a single request and allow the data',
                                            'package to automatically parse the nested data.</p>'
                                        ].join("")
                                    });
                                    Ext.Viewport.add(this.explanation);
                                }
                                this.explanation.show();
                            }
                        }
                    ]
                },
                {

                    xtype: 'list',
                    id: 'NestedLoadingDataView',
                    flex: 1,
                    height: 200,
                    emptyText: 'No Data Loaded',
                    styleHtmlContent: true,

                    //The XTemplate allows us to easily render the data from our Companies model, as well as iterating over each Companies's Addresses:
                    itemTpl: [
                        '<div class="user">',
                            '<a target="_blank" href="{web}">{name}\'s</a> - DUNS:{duns}, addresses marked as <img src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|{color}">',
                        '</div>'
                    ].join(''),
                    store: new Ext.data.Store({
                        model: 'Strevusproto.model.Companies',
                        autoLoad: false
                    })
                },
                {
                    xtype: 'map',
                    id: 'companiesMap',
                    flex: 2,
                    mapOptions : {
                        zoom : 2,
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
            ]
        }
    });
});

Ext.define('Strevusproto.view.search.AddressFilter', {
    extend: 'Ext.form.FieldSet',
    xtype: 'addressfilter',

    config: {
        title: 'Address Info',
        instructions: 'Please use Filter above to narrow your Search criteria by Party\'s Addresses attributes. All fields are optional.',
        defaults: {
            xtype     : 'radiofield',
            labelWidth: '35%'
        },
        items: [
            {
                xtype         : 'textfield',
                name          : 'streetaddress',
                label         : 'Street Address',
                placeHolder   : '100 Main Str',
                autoCapitalize: true,
                clearIcon     : true
            },
            {
                xtype         : 'textfield',
                name          : 'city',
                label         : 'City',
                placeHolder   : 'San Francisco',
                autoCapitalize: true,
                clearIcon     : true
            },

            {
                xtype: 'selectfield',
                name : 'state',
                label: 'State',
                store: 'States',
                displayField: 'text',
                valueField: 'value'
            },
            {
                xtype         : 'textfield',
                name          : 'country',
                label         : 'Country',
                placeHolder   : 'USA',
                autoCapitalize: true,
                clearIcon     : true
            },
            {
                xtype         : 'textfield',
                name          : 'postalcode',
                label         : 'Postal Code',
                placeHolder   : '77478',
                autoCapitalize: true,
                clearIcon     : true
            },
            {
                xtype: 'selectfield',
                name : 'lastsystem',
                label: 'Last Source System',
                options: [
                    {
                        text : '',
                        value: ''
                    },
                    {
                        text : 'DnB',
                        value: 'dnb'
                    },
                    {
                        text : 'SFA',
                        value: 'sfa'
                    },
                    {
                        text : 'SYS0',
                        value: 'sys0'
                    },
                    {
                        text : 'Legacy',
                        value: 'legacy'
                    }
                ]
            }


        ]
}

});
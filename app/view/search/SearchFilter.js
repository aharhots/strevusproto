/**
 * Demonstrates a tabbed form panel. This uses a tab panel with 3 tabs - Basic, Sliders and Toolbars - each of which is
 * defined below.
 *
 * See this in action at http://dev.sencha.com/deploy/sencha-touch-2-b3/examples/kitchensink/index.html#demo/forms
 */
Ext.define('Strevusproto.view.search.SearchFilter', {
    extend: 'Ext.tab.Panel',
    xtype: 'searchfilter',

    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.DatePicker',
        'Ext.field.Select',
        'Strevusproto.model.State',
        'Strevusproto.store.States',
        'Strevusproto.view.search.AddressFilter'
    ],

    config: {
        activeItem: 0,
        title: 'Search Filter',
        tabBar: {
            ui: 'neutral',
            layout: {
                pack: 'center'
            }
        },
        items: [
            {
                title: 'Filter by Individual Data',
                xtype: 'formpanel',
                id: 'individualForm',
                iconCls: 'refresh',
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Personal Info',
                        instructions: 'Please use Filter above to narrow your Search criteria by Party attributes. All fields are optional.',
                        defaults: {
                            labelWidth: '35%'
                        },
                        items: [
                            {
                                xtype         : 'textfield',
                                id            : 'individualLastname',
                                name          : 'lastname',
                                label         : 'Last Name',
                                placeHolder   : 'Tom',
                                autoCapitalize: true,
                                clearIcon     : true
                            },
                            {
                                xtype         : 'textfield',
                                name          : 'firstname',
                                label         : 'First Name',
                                placeHolder   : 'Hanks',
                                autoCapitalize: true,
                                clearIcon     : true
                            },
                            {
                                xtype: 'datepickerfield',
                                destroyPickerOnHide: true,
                                name : 'birthdate',
                                label: 'Birth Date',
                                value: '',
                                picker: {
                                    yearFrom: 1900,
                                    value: new Date()
                                }
                            },
                            {
                                xtype: 'selectfield',
                                name : 'gender',
                                label: 'Gender',
                                options: [
                                    {
                                        text : '',
                                        value: ''
                                    },
                                    {
                                        text : 'Male',
                                        value: 'male'
                                    },
                                    {
                                        text : 'Female',
                                        value: 'female'
                                    }
                                ]
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
                    },
                    {
                        xtype: 'addressfilter'
                    }
                ]
            },

            {
                title: 'Filter by Company Data',
                xtype: 'formpanel',
                id: 'companyForm',
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Company Info',
                        instructions: 'Please use Filter above to narrow your Search criteria by Party attributes. All fields are optional.',
                        defaults: {
                            labelWidth: '35%'
                        },
                        items: [
                            {
                                xtype         : 'textfield',
                                name          : 'orgname',
                                label         : 'Organization Name',
                                placeHolder   : 'Apple',
                                autoCapitalize: true,
                                clearIcon     : true
                            },
                            {
                                xtype         : 'textfield',
                                name          : 'duns',
                                label         : 'DUNS Number',
                                placeHolder   : '1234567890',
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
                    },
                    {
                        xtype: 'addressfilter'
                    }
                ]
            }
        ]
    }

});
/**
 * @class Strevusproto.controller.Main
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('Strevusproto.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {

        viewCache: [],

        refs: {
            nav: '#mainNestedList',
            main: 'mainview',
            loginButton: '#loginButton',
            loginview: 'loginview',
            navigationview: 'navigationview',
            editButton: '#editButton',
            contacts: 'contacts',
            showContact: 'contact-show',
            editContact: 'contact-edit',
            saveButton: '#saveButton'
        },

        control: {
            nav: {
                itemtap: 'onNavTap'
            },
            navigationview: {
                push: 'onNavPush',
                pop: 'onNavPop'
            },
            editButton: {
                tap: 'onContactEdit'
            },
            contacts: {
                itemtap: 'onContactSelect'
            },
            saveButton: {
                tap: 'onContactSave'
            },
            editContact: {
                change: 'onContactChange'
            },
            loginButton: {
                tap: 'onLogin'
            }
        },

        routes: {
            'nav/:id': 'showViewById',
            'menu/:id': 'showMenuById'
        },

        /**
         * @cfg {Ext.data.Model} currentNav The View that is currently loaded. This is set whenever showViewById is called
         */
        currentNav: undefined
    },

    /**
     * Navigates from Login View to Main View, which depends on device ("app/view/phone/Charts.js" or "app/view/tablet/Charts.js")
     */
    onLogin: function() {
//      var json = Ext.decode(response.responseText);
//
//      if (json.type == 'success') {
        if (!this.main) {
            this.main = Ext.create('Strevusproto.view.tablet.Main');
        }
        Ext.getCmp('loginView').destroy();
        Ext.Viewport.add(this.main);
//        } else {
//            console.log(json.value);
//        }
    },


    /**
     * Finds a given view by ID and shows it. End-point of the "nav/:id" route
     */
    showViewById: function(id) {
        var nav = this.getNav();
            if (nav) {
                view = nav.getStore().getNodeById(id);
                this.showView(view);
                this.setCurrentNav(view);
                this.hideSheets();
            }
    },

    /**
     * @private
     * We have a large number of dynamic views. If we were to keep all of them rendered
     * we'd risk causing the browser to run out of memory, especially on older devices. If we destroy them as
     * soon as we're done with them, the app can appear sluggish. Instead, we keep a small number of rendered
     * views in a viewCache so that we can easily reuse recently used views while destroying those we haven't
     * used in a while.
     * @param {String} name The full class name of the view to create (e.g. "Strevusproto.view.Forms")
     * @return {Ext.Component} The component, which may be from the cache
     */
    createView: function(name) {
        var cache = this.getViewCache(),
            ln = cache.length,
            limit = 20,
            view, i, oldView;

        Ext.each(cache, function(item) {
            if (item.viewName === name) {
                view = item;
                return;
            }
        }, this);

        if (view) {
            return view;
        }

        if (ln >= limit) {
            for (i = 0; i < ln; i++) {
                oldView = cache[i];
                if (!oldView.isPainted()) {
                    oldView.destroy();
                    cache.splice(i, 1);
                    break;
                }
            }
        }

        view = Ext.create(name);
        view.viewName = name;
        cache.push(view);
        this.setViewCache(cache);

        return view;
    },

    /**
     * @private
     * Returns the full class name of the view to construct for a given Navigation
     * @param {Strevusproto.model.Nav} item The Navigation
     * @return {String} The full class name of the view
     */
    getViewName: function(item) {
        var name = item.get('view') || item.get('text'),
            ns   = 'Strevusproto.view.';
            return ns + name;
    },
    
    /**
     * We iterate over all of the floating sheet components and make sure they're hidden when we
     * navigate to a new view. This stops things like Picker overlays staying visible when you hit
     * the browser's back button
     */
    hideSheets: function() {
        Ext.each(Ext.ComponentQuery.query('sheet'), function(sheet) {
            sheet.setHidden(true);
        });
    },

    /**
     * Called when {Strevusproto.view.Individuals} Navigation pushed to View
     * Used for Edit button visibility set and active Contact reset
     * @param view
     * @param item
     */
    onNavPush: function(view, item) {
        var editButton = this.getEditButton();

        if (item.xtype == "contact-show") {
            this.getContacts().deselectAll();
            this.showEditButton();
        } else {
            this.hideEditButton();
        }
    },

    /**
     * Called when {Strevusproto.view.Individuals} Navigation popped from View
     * Used for Edit button visibility
     * @param view
     * @param item
     */
    onNavPop: function(view, item) {
        if (item.xtype == "contact-edit") {
            this.showEditButton();
        } else {
            this.hideEditButton();
        }
    },

    /**
     * Pushes Individual Detail View into the Individuals View
     * @param list
     * @param index
     * @param node
     * @param record
     */
    onContactSelect: function(list, index, node, record) {
        var editButton = this.getEditButton();

        if (!this.showContact) {
            this.showContact = Ext.create('Strevusproto.view.contact.Show');
        }
        // Bind the record onto the show contact view, indirectly calls updateRecord of {Strevusproto.view.contact.Show}
        this.showContact.setRecord(record);
        // Push the show contact view into the navigation view
        this.getNavigationview().push(this.showContact);
    },

    /**
     * Pushes Edit Individual View into Individuals View
     */
    onContactEdit: function() {
        if (!this.editContact) {
            this.editContact = Ext.create('Strevusproto.view.contact.Edit');
        }

        // Bind the record onto the edit contact view
        this.editContact.setRecord(this.getShowContact().getRecord());

        this.getNavigationview().push(this.editContact);
    },

    /**
     * Called when User makes any changes on Individual Edit View
     * Makes Save button visible
     */
    onContactChange: function() {
        this.showSaveButton();
    },

    /**
     * Saves User's changes into {Strevusproto.store.Contacts}
     */
    onContactSave: function() {
        var record = this.getEditContact().saveRecord();

        this.getShowContact().updateRecord(record);

        this.getNavigationview().pop();
    },

    /**
     * Shows Edit button and hides Save button
     */
    showEditButton: function() {
        var editButton = this.getEditButton();

        if (!editButton.isHidden()) {
            return;
        }

        this.hideSaveButton();

        editButton.show();
    },

    /**
     * Hides Edit button on {Strevusproto.view.Individuals} View
     */
    hideEditButton: function() {
        var editButton = this.getEditButton();

        if (!editButton || editButton.isHidden()) {
            return;
        }

        editButton.hide();
    },

    /**
     * Shows Save button on {Strevusproto.view.Individuals} View
     */
    showSaveButton: function() {
        var saveButton = this.getSaveButton();

        if (!saveButton.isHidden()) {
            return;
        }

        saveButton.show();
    },

    /**
     * Hides Save button on {Strevusproto.view.Individuals} View
     */
    hideSaveButton: function() {
        var saveButton = this.getSaveButton();

        if (saveButton.isHidden()) {
            return;
        }

        saveButton.hide();
    }
});
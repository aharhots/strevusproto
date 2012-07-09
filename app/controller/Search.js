/*
 * This controller is the main, and only controller for this application. It handles all the views and functionality
 * of this application.
 */
Ext.define('Strevusproto.controller.Search', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            tweetList: 'tweetlist',
            searchField: '#individualLastname',
            applyButton: '#applyButton',
            resetButton: '#resetButton',
            navigationSearchView: '#navigationSearchView'
        },

        control: {
            navigationSearchView: {
                push: 'onNavPush',
                pop: 'onNavPop'
            },
            tweetList: {
                itemtap: 'onTweetTap'
            },

            applyButton: {
                tap: 'onApplyButtonTap'
            }
        }
    },

    /**
     * Called when a user taps on an item in the tweetList. This is used to check if the element the user tapped on is a hashtag.
     * If it is a hashtag, we get watchever that hashtag is and call {@link #doSearch} with it.
     * We could possibly extend this to users, too.
     */
    onTweetTap: function(list, index, target, record, e) {
        target = Ext.get(e.target);

        if (target && target.dom && target.hasCls('hashtag')) {
            this.doSearch(target.dom.innerHTML);
        }
    },

    /**
     * Called on the keyup event of the search field. If the enter/return key was pressed, it will fire the search action.
     */
    onSearch: function(field, e) {
          var  searchField = this.getSearchField();
          this.fireAction('search', [searchField.getValue()], 'doSearch');
    },

    /**
     * Called with the search action above. Searches twitter for a specified search term or record
     */
    doSearch: function(search) {
        var model         = Strevusproto.model.Search,
            tweetList     = this.getTweetList(),
            searchesStore = Ext.getStore('Searches'),
            searchField   = this.getSearchField(),
            query, index;

        //if the passed argument is not an instance of a Search mode, create a new instance
        if (!(search instanceof Strevusproto.model.Search)) {
            query = search.replace("%20", " ");
            search = new model({
                query: query
            });
        }

        //add the new search instance to the searchsStore
        searchesStore.add(search);
        searchesStore.sync();

        var store = search.tweets();
        this.getTweetList().setStore(store);
        store.load();
    },

    /**
     * Called when User taps Apply button on Filter
     */
    onApplyButtonTap: function() {
        if (!this.tweetlist) {
            this.tweetlist = Ext.create('Strevusproto.view.search.TweetList');
        }

        this.onSearch();
        this.getNavigationSearchView().push(this.tweetlist);
    },

    /**
     * Called when {Strevusproto.view.Search} Navigation pushed to View
     * Used for buttons visibility set
     * @param view
     * @param item
     */
    onNavPush: function(view, item) {
        if (item.xtype == "navigationSearchView") {
            this.getApplyButton().show();
            this.getResetButton().show();
        } else {
            this.getApplyButton().hide();
            this.getResetButton().hide();
        }
    },

    /**
     * Called when {Strevusproto.view.Search} Navigation popped from View
     * Used for buttons visibility set
     * @param view
     * @param item
     */
    onNavPop: function(view, item) {
        if (item.xtype == "navigationSearchView") {
            this.getApplyButton().hide();
            this.getResetButton().hide();
        } else {
            this.getApplyButton().show();
            this.getResetButton().show();
        }
    }

});

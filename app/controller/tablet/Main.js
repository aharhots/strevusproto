/**
 * @class Strevusproto.controller.tablet.Main
 * @extends Strevusproto.controller.Main
 *
 * This is the Main controller subclass for the 'tablet' profile. Almost all of the functionality is implemented in the
 * superclass, here we just define showView, which is the function that is called whenever any view is navigated to via
 * the navigation NestedList or a url change.
 */
Ext.define('Strevusproto.controller.tablet.Main', {
    extend: 'Strevusproto.controller.Main',

    /**
     * This is called whenever the user taps on an item in the main navigation NestedList
     */
    onNavTap: function(nestedList, list, index) {
        var record = list.getStore().getAt(index);
        if (record.isLeaf()) {
            this.redirectTo(record);
        }
    },

    /**
     * For a given Navigation model instance, shows the appropriate view. This is the endpoint for all routes matching
     * 'nav/:id', so is called automatically whenever the user navigates back or forward between Navigation items.
     * @param {Strevusproto.model.Nav} item The Navigation model instance for which we want to show a view
     */
    showView: function(item) {
        var nav  = this.getNav(),
            view = this.createView(this.getViewName(item)),
            main = this.getMain(),
            anim = item.get('animation'),
            layout  = main.getLayout(),
            initialAnim = layout.getAnimation(),
            newAnim;

        if (anim) {
            layout.setAnimation(anim);
            newAnim = layout.getAnimation();
        }

        nav.setDetailContainer(main);
        nav.setDetailCard(view);
        nav.goToNode(item.parentNode);
        nav.goToLeaf(item);
        nav.getActiveItem().select(item);

        if (newAnim) {
            newAnim.on('animationend', function() {
                layout.setAnimation(initialAnim);
            }, this, { single: true });
        }
    },

    showMenuById: Ext.emptyFn
});
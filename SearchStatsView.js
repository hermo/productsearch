/**
 * Show statistics about the current search result.
 *
 * TODO: This module is not complete and is not used anywhere yet, you must integrate it to the rest of the app.
 */
define(['jquery'], function ($) {
    return function (viewEl) {
        var that = {}, model;

        var setModel = function (newModel) {
            if (model) {
                $(model).off('change', onResultChanged);
            }
            model = newModel;
            $(model).on('huttu', onResultChanged);
        };

        var onResultChanged = function (event, results) {
            // TODO: Show search results above the listing in browser.
            // Something like "Löytyi XX tuotetta!"
            // You might want to show some other statistical information too if you can think of something.

        };

        that.setModel = setModel;
    };
});

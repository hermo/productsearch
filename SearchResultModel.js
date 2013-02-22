/**
 * Search result "model". Contains search results and notifies interested parties when the search result changes.
 */
define(['jquery'], function ($) {
    return function () {
        var that = {}, products;

        var onResultChanged = function () {
            $(that).trigger('change', products);
        };

        var setProducts = function (newProducts) {
            products = newProducts;
            onResultChanged();
        };

        var getProducts = function () {
            return products;
        };

        that.setProducts = setProducts;
        that.getProducts = getProducts;

        return that;
    };
});
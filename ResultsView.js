/**
 * Results view. Shows search results.
 */
define(['jquery', 'template'], function ($, template) {
    return function (viewEl) {
        var that = {}, searchResultModel, rowTemplate, rowRenderer;

        rowTemplate = '<div class="product-row">' +
            '<span class="id">{id}</span>' +
            '<span class="descr">{descr}</span>' +
            '<span class="price">{price}</span></div>';


        var defaultRowRenderer = function (product) {
            product.descr = product.descr.replace(/<(?:.|\n)*?>/gm, '');
            var eolPos = product.descr.indexOf("\n");
            if (eolPos === -1) {
                eolPos = 100;
            }
            product.descr = product.descr.substr(0, eolPos);
            product.price = product.price.toFixed(2).replace(".", ",") + " €";

            return template.render(rowTemplate, product);
        };

        var setModel = function (newResult) {
            if (searchResultModel) {
                $(searchResultModel).off('change', onResultChanged);
            }
            searchResultModel = newResult;
            $(searchResultModel).on('change', onResultChanged);
        };

        var setRowRenderer = function (newRowRenderer) {
            rowRenderer = newRowRenderer;
        };

        var getRowRenderer = function () {
            return rowRenderer || defaultRowRenderer;
        };

        var onResultChanged = function (event, results) {
            redraw();
        };

        var showError = function (error) {
            viewEl.innerHTML = error;
        };

        var redraw = function () {
            var products = searchResultModel.getProducts(),
                renderRow = getRowRenderer();

            var html = products.map(function (product) {
                var productClone = $.extend({}, product);
                return renderRow(productClone);
            }).join('');

            viewEl.innerHTML = html;
        };

        that.setModel = setModel;
        that.showError = showError;
        that.setRowRenderer = setRowRenderer;

        return that;
    };
});
/**
 * Product search controls view. Listens for user input.
 */
define(['jquery'], function ($) {
    return function (viewEl) {
        var that = {}, idField, minPriceField, maxPriceField;

        var getValues = function () {
            var ret = {};

            if (idField.value) {
                ret.id = idField.value;
            }

            if (minPriceField.value) {
                ret.minPrice = minPriceField.value;
            }

            if (maxPriceField.value) {
                ret.maxPrice = maxPriceField.value;
            }

            return ret;
        };

        var onSubmit = function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(that).trigger('search', getValues());
        };

        idField = $('.id-field', viewEl)[0];
        minPriceField = $('.min-field', viewEl)[0];
        maxPriceField = $('.max-field', viewEl)[0];
        $(".control-form", viewEl).on('submit', onSubmit);

        return that;
    };
});

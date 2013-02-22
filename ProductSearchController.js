/**
 * Product search controller. Listens for events from the controls view and tells everyone what to do.
 */
define(function () {
    return function () {
        var that = {}, view, model, productRepository;

        var setView = function (newView) {
            if (view) {
                $(view).off('search', onSearch);
            }
            view = newView;
            $(view).on('search', onSearch);
        };

        var setModel = function (newModel) {
            model = newModel;
        };

        var setProductRepository = function (newProductRepository) {
            productRepository = newProductRepository;
        };

        var onSearch = function (event, params) {
            var resultPromise;

            if (params.id) {
                resultPromise = productRepository.findById(params.id);
            }
            else {
                resultPromise = productRepository.findByPriceRange(params.minPrice, params.maxPrice);
            }

            resultPromise.then(function (products) {
                if (!(products instanceof Array)) {
                    products = [products];
                }

                model.setProducts(products);
            }, function (error) {
                model.setProducts([]);
                console.warn(error);
            });
        }

        that.setView = setView;
        that.setModel = setModel;
        that.setProductRepository = setProductRepository;

        return that;
    };
});

/**
 * The Product repository is responsible for searching product information.
 *
 * TODO: Implement findByDescription, return products which have a specified string in their description.
 *
 * It's find* functions return one ore more Product objects depending on the function.
 *
 * A Product object consists of:
 * - {Number} id    Product id
 * - {String} descr Product description.
 * - {Number} price Product price.
 */
define(['jquery'], function ($) {
    return function () {
        var that = {}, productsPromise, productList, productIdMap = {};

        /**
         * Is the given product id currently cached?
         *
         * @param {Number} productId
         * @return {Boolean}
         */
        var cacheContains = function (productId) {
            return productIdMap.hasOwnProperty(productId);
        };

        /**
         * Get given product from cache.
         *
         * @param {Number} productId
         * @return {Object|undefined} A product object.
         */
        var cacheGet = function (productId) {
            return productList[productIdMap[productId]];
        };

        /**
         * Builds a map for quickly searching for products via id.
         *
         * @param {Array} products
         */
        var buildProductIdMap = function (products) {
            products.forEach(function (product, index) {
                productIdMap[product.id] = index;
            });
        };

        /**
         * Load product data from backend if necessary.
         *
         * @return {Promise} Promise resolving to an Array of Product objects.
         */
        var loadProducts = function () {
            // Use existing promise if we have already promised to load product data.
            if (productsPromise) {
                return productsPromise;
            }

            // Create a new deferred and promise to return product data when loaded.
            var dfd = $.Deferred();
            productsPromise = dfd.promise();

            // Load product data
            $.getJSON('products.json').then(function (reply) {
                // Store product list
                productList = reply.data;
                // Create id lookup map
                buildProductIdMap(productList);

                // Clone the product list to prevent repository clients from tampering the
                // original data.
                var productListClone = $.map(productList, function (product) {
                    return $.extend(true, {}, product);
                });

                // Resolve with product list
                dfd.resolve(productListClone);
            }, function (error) {
                // Reject if something went wrong.
                dfd.reject(error);
            });

            return productsPromise;
        };

        /**
         * Find a product by id.
         *
         * @public
         * @param {Number} productId
         * @return {Promise} Promise resolving to a Product object.
         */
        var findById = function (productId) {
            var dfd = $.Deferred(), product;

            // Resolve immediately if we have loaded the product.
            if (cacheContains(productId)) {
                dfd.resolve(cacheGet(productId));
            } else {
                // Otherwise load the products and then try to find it again.
                loadProducts().then(function () {
                    product = cacheGet(productId);
                    // If the product still can't be found, it's not known to us at all.
                    if (!product) {
                        dfd.reject('Unknown product: ' + productId);
                    }
                    dfd.resolve(product);
                });
            }

            return dfd.promise();
        }

        /**
         * Find products in a certain price range.
         *
         * @public
         * @param {Number} [minPrice] Minimum price. Optional.
         * @param {Number} [maxPrice] Maximum price. Optional
         * @return {Promise} Promise resolving to an Array of Product objects.
         */
        var findByPriceRange = function (minPrice, maxPrice) {
            var dfd = $.Deferred();

            // Make sure the whole product list is loaded
            loadProducts().then(function (products) {

                // Find products matching the criteria.
                var matchingProducts = products.filter(function (product) {
                    if (minPrice !== undefined && product.price < minPrice) {
                        return false;
                    }

                    if (maxPrice !== undefined && product.price > maxPrice) {
                        return false;
                    }
                    return true;
                });

                // Resolve with matching products
                dfd.resolve(matchingProducts);
            });

            return dfd.promise();
        };

        // Export public functions
        that.findById = findById;
        that.findByPriceRange = findByPriceRange;

        return that;
    };
});
/**
 * Main app.
 *
 * Creates all components and wires them together.
 */
require([
    'jquery',
    'ProductRepository',
    'ControlsView',
    'ResultsView',
    'SearchResultModel',
    'ProductSearchController'
],
    function ($, ProductRepository, ControlsView, ResultsView, SearchResultModel, ProductSearchController) {
        var model = new SearchResultModel();


        var controlsView = new ControlsView($('#ProductSearch .controls')[0]);
        var resultsView = new ResultsView($('#ProductSearch .results')[0]);
        resultsView.setModel(model);
        // TODO: We should show some statistics about the current search result someshow.

        var productSearchController = new ProductSearchController();
        productSearchController.setView(controlsView);
        productSearchController.setModel(model);
        productSearchController.setProductRepository(new ProductRepository());
    });
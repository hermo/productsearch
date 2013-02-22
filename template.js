/**
 * Mini template library.
 *
 * Takes in a template like "Hello {name}" and an object containing data, like { name: 'John' }.
 * Returns a string with the placeholder replaced, eg. "Hello John".
 */
define(function () {
    templateRe = /{(\w+)}/g;

    /**
     * Render template.
     *
     * @param {String} template
     * @param {Object} context
     * @return {String}
     */
    var render = function (template, context) {
        return template.replace(templateRe, function (match, key) {
            return context[key];
        });
    };

    return {
        render: render
    };
});
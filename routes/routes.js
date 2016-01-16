var modTimes = require("./times");

var routes = (function () {
    function routes() {
        this.times = new modTimes();
    }
    return routes;
})();

module.exports = routes;

"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class Tool {
        type;
        constructor(type) {
            this.type = type;
            console.log(this.type);
        }
        work(sapling, _cell) {
            // erst mal nur Harvest
            _cell = undefined;
            console.log("worked on sapling: " + sapling.getField());
            sapling = undefined;
        }
    }
    GemueseGarten.Tool = Tool;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=tool.js.map
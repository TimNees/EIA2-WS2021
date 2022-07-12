"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class Helper {
        static clamp(value, min, max) {
            if (value < min) { //Wenn Wert kurzzeitig unter Min geht, wird er anschließend wieder auf den Mindestwert (20) gesetzt.
                value = min;
            }
            if (value > max) {
                value = max;
            }
            return value;
        }
        static getClickedCell(x, y) {
            let row = Math.floor(y / GemueseGarten.GameField.CELL_SIZE);
            let col = Math.floor(x / GemueseGarten.GameField.CELL_SIZE);
            return [row, col];
        }
    }
    GemueseGarten.Helper = Helper;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=helper.js.map
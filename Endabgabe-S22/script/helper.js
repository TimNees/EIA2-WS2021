"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class Helper {
        static clamp(value, min, max) {
            if (value < min) { //Wenn der Preis unter min ist,              
                value = min; //wird der Preis auf min zurückgesetzt.
            }
            if (value > max) { //Wenn der Preis über max ist,
                value = max; //wird der Preis auf max zurückgesetzt.
            }
            return value;
        }
        static getClickedCell(x, y) {
            let row = Math.floor(y / 100);
            let col = Math.floor(x / 100);
            return [row, col];
        }
    }
    GemueseGarten.Helper = Helper;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=helper.js.map
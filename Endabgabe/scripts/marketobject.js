"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class MarketObject {
        minPrice;
        maxPrice;
        priceChangeProbability;
        priceInCent;
        constructor(minPrice, maxPrice, priceChangeProbability) {
            this.minPrice = minPrice;
            this.maxPrice = maxPrice;
            this.priceChangeProbability = priceChangeProbability;
            this.priceInCent = this.maxPrice;
        }
        getMinPrice() {
            return this.minPrice;
        }
        getMaxPrice() {
            return this.maxPrice;
        }
        getPriceChangeProbability() {
            return this.priceChangeProbability;
        }
        getPriceInCent() {
            return this.priceInCent;
        }
        setPriceInCent(priceInCent) {
            this.priceInCent = priceInCent;
        }
    }
    GemueseGarten.MarketObject = MarketObject;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=marketobject.js.map
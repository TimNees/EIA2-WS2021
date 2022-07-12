"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class Market {
        marketObjCarrot = new GemueseGarten.MarketObject(10, 60, 0.25);
        marketObjPotato = new GemueseGarten.MarketObject(10, 60, 0.25);
        marketObjBeetRoot = new GemueseGarten.MarketObject(10, 60, 0.25);
        marketObjMelon = new GemueseGarten.MarketObject(10, 60, 0.25);
        marketObjRedOnion = new GemueseGarten.MarketObject(10, 60, 0.25);
        getMarketObjCarrot() {
            return this.marketObjCarrot;
        }
        getMarketObjBeetRoot() {
            return this.marketObjBeetRoot;
        }
        getMarketObjPotato() {
            return this.marketObjPotato;
        }
        getMarketObjMelon() {
            return this.marketObjMelon;
        }
        getMarketObjRedOnion() {
            return this.marketObjRedOnion;
        }
    }
    GemueseGarten.Market = Market;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=market.js.map
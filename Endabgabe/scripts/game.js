"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class Game {
        gameField;
        market;
        player;
        constructor() {
            this.gameField = new GemueseGarten.GameField();
            this.market = new GemueseGarten.Market();
            this.player = new GemueseGarten.Player();
        }
        getGameField() {
            return this.gameField;
        }
        getMarket() {
            return this.market;
        }
        getPlayer() {
            return this.player;
        }
    }
    GemueseGarten.Game = Game;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=game.js.map
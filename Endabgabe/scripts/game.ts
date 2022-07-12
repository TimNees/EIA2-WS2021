namespace GemueseGarten {
    export class Game {
        private gameField: GameField;
        private market: Market;
        private player: Player;

        constructor() {
            this.gameField = new GameField();
            this.market = new Market();
            this.player = new Player();
        }

        public getGameField(): GameField {
            return this.gameField;
        }

        public getMarket(): Market {
            return this.market;
        }

        public getPlayer(): Player {
            return this.player;
        }
    }
}
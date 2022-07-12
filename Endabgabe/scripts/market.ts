namespace GemueseGarten {
    export class Market {
        private marketObjCarrot: MarketObject = new MarketObject(10, 60, 0.25);
        private marketObjPotato: MarketObject = new MarketObject(10, 60, 0.25);
        private marketObjBeetRoot: MarketObject = new MarketObject(10, 60, 0.25);
        private marketObjMelon: MarketObject = new MarketObject(10, 60, 0.25);
        private marketObjRedOnion: MarketObject = new MarketObject(10, 60, 0.25);

        public getMarketObjCarrot(): MarketObject {
            return this.marketObjCarrot;
        }

        public getMarketObjBeetRoot(): MarketObject {
            return this.marketObjBeetRoot;
        }

        public getMarketObjPotato(): MarketObject {
            return this.marketObjPotato;
        }

        public getMarketObjMelon(): MarketObject {
            return this.marketObjMelon;
        }

        public getMarketObjRedOnion(): MarketObject {
            return this.marketObjRedOnion;
        }

        /*
                private calcNewPrice(currentPrice: number, changeValue: number): number {
                    return currentPrice + changeValue;
                }
            
                private _calcChangeValue(priceChangeRateMin: number, priceChangeRateMax: number): number {
                    let change: number = ((Math.floor(Math.random() * (priceChangeRateMax - priceChangeRateMin + 1)) + priceChangeRateMin));
                    return change;
                }
        
                private _isPriceChanging(): boolean {
                    let probability: number = 1;      //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
                    let val: number = Math.random();
                    if (val <= probability) {
                        return true;
                    }
                    return false;
                }
                */
    }
}
namespace GemueseGarten {
    export class MarketObject {
        private minPrice: number;
        private maxPrice: number;
        private priceChangeProbability: number;
        private priceInCent: number;

        constructor(minPrice: number, maxPrice: number, priceChangeProbability: number) {
            this.minPrice = minPrice;
            this.maxPrice = maxPrice;
            this.priceChangeProbability = priceChangeProbability;
            this.priceInCent = this.maxPrice;
        }

        public getMinPrice (): number {
            return this.minPrice;
        }

        public getMaxPrice (): number {
            return this.maxPrice;
        }

        public getPriceChangeProbability (): number {
            return this.priceChangeProbability;
        }

        public getPriceInCent (): number {
            return this.priceInCent;
        }
        
        public setPriceInCent(priceInCent: number) {
            this.priceInCent = priceInCent;
        }
    }
}
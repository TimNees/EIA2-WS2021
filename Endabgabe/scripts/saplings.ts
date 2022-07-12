namespace GemueseGarten {
    export class Carrot extends Sapling {
        private static readonly imgNames: string[] = ["carrot1", "carrot2", "carrot3", "carrot4"];
        private static readonly selectImage: HTMLImageElement = <HTMLImageElement>document.getElementById("iconCarrot");
        private static readonly growTimes: number[] = [2000, 2000, 2000, 2000];
        private static marketObject: MarketObject;

        constructor(marketObject: MarketObject, field: number[]) {
            super(SaplingType.CARROT, Carrot.growTimes, field, Carrot.imgNames, Carrot.selectImage);
            Carrot.marketObject = marketObject;
        }

        public getMarketObject(): MarketObject {
            return Carrot.marketObject;
        }
    }

    export class Potato extends Sapling {
        private static readonly imgNames: string[] = ["potato1", "potato2", "potato3", "potato4"];
        private static readonly selectImage: HTMLImageElement = <HTMLImageElement>document.getElementById("iconPotato");
        private static readonly growTimes: number[] = [2000, 2000, 2000, 2000];
        private static marketObject: MarketObject;

        constructor(marketObject: MarketObject, field: number[]) {
            super(SaplingType.POTATO, Potato.growTimes, field, Potato.imgNames, Potato.selectImage);
            Potato.marketObject = marketObject;
        }

        public getMarketObject(): MarketObject {
            return Potato.marketObject;
        }
    }

    export class BeetRoot extends Sapling {
        private static readonly imgNames: string[] = ["beetroot1", "beetroot2", "beetroot3", "beetroot4"];
        private static readonly selectImage: HTMLImageElement = <HTMLImageElement>document.getElementById("iconBeetroot");
        private static readonly growTimes: number[] = [2000, 2000, 2000, 2000];
        private static marketObject: MarketObject;

        constructor(marketObject: MarketObject, field: number[]) {
            super(SaplingType.BEETROOT, BeetRoot.growTimes, field, BeetRoot.imgNames, BeetRoot.selectImage);
            BeetRoot.marketObject = marketObject;
        }

        public getMarketObject(): MarketObject {
            return BeetRoot.marketObject;
        }

    }

    export class Melon extends Sapling {
        private static readonly imgNames: string[] = ["melon1", "melon2", "melon3", "melon4"];
        private static readonly selectImage: HTMLImageElement = <HTMLImageElement>document.getElementById("iconMelon");
        private static readonly growTimes: number[] = [2000, 2000, 2000, 2000];
        private static marketObject: MarketObject;

        constructor(marketObject: MarketObject, field: number[]) {
            super(SaplingType.MELON, Melon.growTimes, field, Melon.imgNames, Melon.selectImage);
            Melon.marketObject = marketObject;
        }

        public getMarketObject(): MarketObject {
            return Melon.marketObject;
        }

    }

    export class RedOnion extends Sapling {
        private static readonly imgNames: string[] = ["redOnion1", "redOnion2", "redOnion3", "redOnion4"];
        private static readonly selectImage: HTMLImageElement = <HTMLImageElement>document.getElementById("iconRedOnion");
        private static readonly growTimes: number[] = [2000, 2000, 2000, 2000];
        private static marketObject: MarketObject;

        constructor(marketObject: MarketObject, field: number[]) {
            super(SaplingType.REDONION, RedOnion.growTimes, field, RedOnion.imgNames, RedOnion.selectImage);
            RedOnion.marketObject = marketObject;
        }

        public getMarketObject(): MarketObject {
            return RedOnion.marketObject;
        }
    }
}
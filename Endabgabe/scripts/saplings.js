"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class Carrot extends GemueseGarten.Sapling {
        static imgNames = ["carrot1", "carrot2", "carrot3", "carrot4"];
        static selectImage = document.getElementById("iconCarrot");
        static growTimes = [2000, 2000, 2000, 2000];
        static marketObject;
        constructor(marketObject, field) {
            super(GemueseGarten.SaplingType.CARROT, Carrot.growTimes, field, Carrot.imgNames, Carrot.selectImage);
            Carrot.marketObject = marketObject;
        }
        getMarketObject() {
            return Carrot.marketObject;
        }
    }
    GemueseGarten.Carrot = Carrot;
    class Potato extends GemueseGarten.Sapling {
        static imgNames = ["potato1", "potato2", "potato3", "potato4"];
        static selectImage = document.getElementById("iconPotato");
        static growTimes = [2000, 2000, 2000, 2000];
        static marketObject;
        constructor(marketObject, field) {
            super(GemueseGarten.SaplingType.POTATO, Potato.growTimes, field, Potato.imgNames, Potato.selectImage);
            Potato.marketObject = marketObject;
        }
        getMarketObject() {
            return Potato.marketObject;
        }
    }
    GemueseGarten.Potato = Potato;
    class BeetRoot extends GemueseGarten.Sapling {
        static imgNames = ["beetroot1", "beetroot2", "beetroot3", "beetroot4"];
        static selectImage = document.getElementById("iconBeetroot");
        static growTimes = [2000, 2000, 2000, 2000];
        static marketObject;
        constructor(marketObject, field) {
            super(GemueseGarten.SaplingType.BEETROOT, BeetRoot.growTimes, field, BeetRoot.imgNames, BeetRoot.selectImage);
            BeetRoot.marketObject = marketObject;
        }
        getMarketObject() {
            return BeetRoot.marketObject;
        }
    }
    GemueseGarten.BeetRoot = BeetRoot;
    class Melon extends GemueseGarten.Sapling {
        static imgNames = ["melon1", "melon2", "melon3", "melon4"];
        static selectImage = document.getElementById("iconMelon");
        static growTimes = [2000, 2000, 2000, 2000];
        static marketObject;
        constructor(marketObject, field) {
            super(GemueseGarten.SaplingType.MELON, Melon.growTimes, field, Melon.imgNames, Melon.selectImage);
            Melon.marketObject = marketObject;
        }
        getMarketObject() {
            return Melon.marketObject;
        }
    }
    GemueseGarten.Melon = Melon;
    class RedOnion extends GemueseGarten.Sapling {
        static imgNames = ["redOnion1", "redOnion2", "redOnion3", "redOnion4"];
        static selectImage = document.getElementById("iconRedOnion");
        static growTimes = [2000, 2000, 2000, 2000];
        static marketObject;
        constructor(marketObject, field) {
            super(GemueseGarten.SaplingType.REDONION, RedOnion.growTimes, field, RedOnion.imgNames, RedOnion.selectImage);
            RedOnion.marketObject = marketObject;
        }
        getMarketObject() {
            return RedOnion.marketObject;
        }
    }
    GemueseGarten.RedOnion = RedOnion;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=saplings.js.map
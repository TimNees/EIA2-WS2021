"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class Sapling {
        imgDir = "./Assets/Seeds/";
        type;
        imgPhaseNames;
        imageElement;
        growTimes;
        field;
        needsWater;
        needsFertilizer;
        needsPesticide;
        currentGrowPhase;
        constructor(saplingType, growTimes, field, imgNames, img) {
            this.type = saplingType;
            this.imageElement = img;
            this.imgPhaseNames = new Array();
            imgNames.forEach(imgName => {
                this.imgPhaseNames.push(this.imgDir + imgName + ".png");
            });
            this.growTimes = growTimes;
            this.field = field;
            this.currentGrowPhase = 0;
            setInterval(() => { this.grow(); }, this.growTimes[0]);
            setInterval(() => { this.checkWater(); }, 1000);
            setInterval(() => { this.checkFertilizer(); }, 1000);
            setInterval(() => { this.checkPesticide(); }, 1000);
        }
        grow() {
            if (this.currentGrowPhase >= 3 || !this.canGrow()) {
                return;
            }
            console.log("grow: " + this.field);
            this.currentGrowPhase++;
        }
        getImgPhaseNames() {
            return this.imgPhaseNames;
        }
        //TODO: functions umbenennen bzw. Variablennamen anpassen z.B. getSaplingType() -> getType()
        getSaplingType() {
            return this.type;
        }
        getImage() {
            return this.imageElement;
        }
        getGrowTimes() {
            return this.growTimes;
        }
        getField() {
            return this.field;
        }
        getCurrentGrowPhase() {
            return this.currentGrowPhase;
        }
        increaseCurrentGrowPhase() {
            if (this.currentGrowPhase < 4) {
                this.currentGrowPhase++;
            }
        }
        checkWater() {
            let probability = 0.005; //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
            let val = Math.random();
            if (val <= probability) {
                this.needsWater = true;
                console.log("Setzling vertrocknet");
            }
        }
        checkFertilizer() {
            let probability = 0.0075; //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
            let val = Math.random();
            if (val <= probability) {
                this.needsFertilizer = true;
                console.log("Braucht Dünger");
            }
        }
        checkPesticide() {
            let probability = 0.005; //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
            let val = Math.random();
            if (val <= probability) {
                this.needsPesticide = true;
                console.log("Braucht Dünger");
            }
        }
        canGrow() {
            return !this.needsWater && !this.needsFertilizer && !this.needsPesticide;
        }
    }
    GemueseGarten.Sapling = Sapling;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=sapling.js.map
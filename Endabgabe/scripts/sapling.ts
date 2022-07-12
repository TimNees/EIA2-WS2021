namespace GemueseGarten {
    export class Sapling {
        readonly imgDir: string = "./Assets/Seeds/";
        private type: SaplingType;
        private imgPhaseNames: string[];
        private imageElement: HTMLImageElement;
        private growTimes: number[];
        private field: number[];
        private needsWater: boolean;
        private needsFertilizer: boolean;
        private needsPesticide: boolean;
        private currentGrowPhase: number;

        constructor(
            saplingType: SaplingType, growTimes: number[], field: number[],
            imgNames: string[], img: HTMLImageElement
        ) {
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

        public grow(): void {
            if (this.currentGrowPhase >= 3 || !this.canGrow()) {
                return;
            }
            console.log("grow: " + this.field);
            this.currentGrowPhase++;
        }

        public getImgPhaseNames(): string[] {
            return this.imgPhaseNames;
        }

        //TODO: functions umbenennen bzw. Variablennamen anpassen z.B. getSaplingType() -> getType()
        public getSaplingType(): SaplingType {
            return this.type;
        }

        public getImage(): HTMLImageElement {
            return this.imageElement;
        }

        public getGrowTimes(): number[] {
            return this.growTimes;
        }

        public getField(): number[] {
            return this.field;
        }

        public getCurrentGrowPhase(): number {
            return this.currentGrowPhase;
        }

        public increaseCurrentGrowPhase(): void {
            if (this.currentGrowPhase < 4) {
                this.currentGrowPhase++;
            }
        }

        public checkWater(): void {
            let probability: number = 0.005;      //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
            let val: number = Math.random();
            if (val <= probability) {
                this.needsWater = true;
                console.log("Setzling vertrocknet");
            }
        }

        public checkFertilizer(): void {
            let probability: number = 0.0075;      //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
            let val: number = Math.random();
            if (val <= probability) {
                this.needsFertilizer = true;
                console.log("Braucht Dünger");
            }
        }

        public checkPesticide(): void {
            let probability: number = 0.005;      //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
            let val: number = Math.random();
            if (val <= probability) {
                this.needsPesticide = true;
                console.log("Braucht Dünger");
            }
        }

        public canGrow(): boolean {
            return !this.needsWater && !this.needsFertilizer && !this.needsPesticide;
        }
    }
}
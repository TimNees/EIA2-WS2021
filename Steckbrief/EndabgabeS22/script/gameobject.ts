namespace GemueseGarten {

    export abstract class GameObject {
        public static currentGameObject: GameObject;
        private image: HTMLImageElement;
        private cell: [number, number];

        constructor(image: HTMLImageElement, cell: [number, number]) {
            this.image = image;
            this.cell = cell;
        }

        public getImage(): HTMLImageElement {
            return this.image;
        }

        public getCell(): [number, number] {
            return this.cell;
        }
    }

    export abstract class Sapling extends GameObject {
        private readonly assetFolderPath: string = "../Assets/Seeds/";
        private saplingImagePaths: string[];
        private growPhase: number;

        private needsWater: boolean;
        private needsFertilizer: boolean;
        private needsPesticide: boolean;
        private currentDisaster: string;

        constructor(iconImage: HTMLImageElement, saplingImageName: string, cell: [number, number]) {
            super(iconImage, cell);
            this.saplingImagePaths = new Array();
            for (let i: number = 0; i < 4; i++) {
                this.saplingImagePaths.push(this.assetFolderPath + saplingImageName + (i + 1) + ".png");
            }
            this.growPhase = 0;

            this.needsWater = false;
            this.needsFertilizer = false;
            this.needsPesticide = false;
            this.currentDisaster = "";

            setTimeout(() => { this.grow(); }, 1000);
            setTimeout(() => { this.checkDisaster(); }, 1000);
        }

        public getSaplingImagePaths(): string[] {
            return this.saplingImagePaths;
        }

        public getGrowPhase(): number {
            return this.growPhase;
        }

        public getNeedsWater(): boolean {
            return this.needsWater;
        }

        public getNeedsFertilizer(): boolean {
            return this.needsFertilizer;
        }

        public getNeedsPesticide(): boolean {
            return this.needsPesticide;
        }

        public setNeedsWater(value: boolean): void {
            this.needsWater = value;
        }

        public setNeedsFertilizer(value: boolean): void {
            this.needsFertilizer = value;
        }

        public setNeedsPesticide(value: boolean): void {
            this.needsPesticide = value;
        }

        public setCurrentDisaster(value: string): void {
            this.currentDisaster = value;
        }

        public grow(): void {
            if (!this.canGrow()) {                          //Wenn canGrow den Rückgabewert false gibt, wird grow() nicht weiter ausgeführt, da der Setzling nicht wachsen kann.
                return;
            }
            this.growPhase++;                               //Die Growpahse wird um 1 erhöhrt -> nächste Wachstumsstufe
            setTimeout(() => { this.grow(); }, 1000);       
            setTimeout(() => { this.checkDisaster(); }, 1000);  //Es wird in einem Abstand von einer Sekunde gecheckt, ob ein Disaster vorliegt.
            redraw();
        }

        public checkDisaster(): void {                          
            if (!this.canGrow()) {
                return;
            }

            let probability: number = 0.2;      //Es wird bestimmt, zu welcher Wahrscheinlichkeit Wasser, Dünger- und Pestizidenmittel benötigt werden.
            let val: number = Math.random();    //Die Variable "val" erhält den Wert von Math.random() - Math.random() gibt eine Zahl von 0-1 aus.
            if (val <= probability) {
                let val: number = Math.random();
                if (val <= 0.33) {                                          //Wenn val kleiner gleich 0.33 ist wird das Disaster "Wasser benötigt" aufgerufen.
                    this.needsWater = true;
                    this.currentDisaster = "watering";
                    setTimeout(() => { this.saplingDies(); }, 7000);        //Wenn das Disaster nach 7 Sekunden nicht bereinigt wurde, vertrocknet die Pflanze.
                } else if (val <= 0.66) {                                   //Wenn val kleiner gleich 0.66 ist wird das Disaster "Wasser benötigt" aufgerufen.
                    this.needsFertilizer = true;
                    this.currentDisaster = "fortizizePlants";
                    setTimeout(() => { this.saplingDies(); }, 12000);       //Wenn das Disaster nach 12 Sekunden nicht bereinigt wurde, stirbt die Pflanze.
                } else {
                    this.needsPesticide = true;
                    this.currentDisaster = "pest";
                    setTimeout(() => { this.saplingDies(); }, 10000);       //Wenn das Disaster nach 10 Sekunden nicht bereinigt wurde, stirbt die Pflanze.
                }

                this.drawDisaster();                                        //Das Disaster wird auf dem Setzling gepflanzt.
            }
        }

        public saplingDies(): void {
            if (!this.needsWater && !this.needsFertilizer && !this.needsPesticide) {    //Wenn der Wert von needsWater etc. falsch ist, wird die Funktion abgebrochen.
                return;               
            }
            let index: number = getSaplingIndex(this.getCell());
            plantedSaplings.splice(index, 1, undefined!);                               //Das Feld auf dem der Setzling war, wird wieder undefined = leer.
            redraw();
        }

        public drawDisaster(): void {

            if (this.currentDisaster == "") {                           //Wenn der Wert von currentDisaster leer ist, soll die Funktion nicht ausgeführt werden (es gibt kein Disaster)
                return;
            }

            let img: HTMLImageElement = document.createElement("img");
            img.src = `../Assets/${this.currentDisaster}.png`;          //Das Icon des Disasters wird ausgewählt

            let width: number = 50;                                     //Größe und Ort des Disasters auf dem Feld wird bestimmt
            let height: number = 50;
            let xDraw: number = this.getCell()[1] * CELL_SIZE + CELL_SIZE - width;
            let yDraw: number = this.getCell()[0] * CELL_SIZE + CELL_SIZE - height;

            img.onload = () => {
                context.drawImage(img, xDraw, yDraw, width, height);    //Disaster wird mit den Parametern img, xDraw, yDraw, width und height auf dem Canvas gezeichnet.
            };
        }

        private canGrow(): boolean {
            return (!this.needsWater && !this.needsFertilizer && !this.needsPesticide) && this.growPhase < 3; //Der Sapling kann nicht mehr wachsen WENN: needsWater, needsFertilizer,
        }                                                                                                     // needsPesticide = true sind & growPhase < 3 (die höchste Wachstumsstufe)
    }




    //===== Erweitert die Superklasse Sapling um die fünf Subklassen =====
    export class Carrot extends Sapling {
        constructor(iconImage: HTMLImageElement, cell: [number, number]) {
            super(iconImage, "carrot", cell);
        }
    }
    export class Potato extends Sapling {
        constructor(iconImage: HTMLImageElement, cell: [number, number]) {
            super(iconImage, "potato", cell);
        }
    }
    export class RedOnion extends Sapling {
        constructor(iconImage: HTMLImageElement, cell: [number, number]) {
            super(iconImage, "redOnion", cell);
        }
    }
    export class BeetRoot extends Sapling {
        constructor(iconImage: HTMLImageElement, cell: [number, number]) {
            super(iconImage, "beetroot", cell);
        }
    }
    export class Melon extends Sapling {
        constructor(iconImage: HTMLImageElement, cell: [number, number]) {
            super(iconImage, "melon", cell);
        }
    }



    export abstract class Tool extends GameObject {

        constructor(iconImage: HTMLImageElement, cell: [number, number]) {
            super(iconImage, cell);
        }

        public abstract work(): void;                                  
    }


    //===== Erweitert die Superklasse Tool um die vier Funktionen =====
    export class Harvester extends Tool {
        public work(): void {
            let index: number = getSaplingIndex(this.getCell());

            let sapling: Sapling = plantedSaplings[index];
            if (sapling == undefined) {
                return;
            }

            let sellingPrice: number = 0;

            if (sapling.getGrowPhase() < 3) {                   //Wenn der Setzling nicht ausgewachsen ist, erhält der Nutzer beim Ernten kein Kapital gutgeschrieben,
                sellingPrice = 0;                               //...denn der sellingPrice hat den Wert 0
            } else if (sapling instanceof Carrot) {             //Wenn der Setzling jedoch ausgewachsen ist...
                sellingPrice = market.getCarrotPrice();         //...erhält die Variable sellingPrice den Wert aktuellen verkaufs-Wert von CarrotPrice
            } else if (sapling instanceof Potato) {
                sellingPrice = market.getPotatoPrice();
            } else if (sapling instanceof RedOnion) {
                sellingPrice = market.getRedOnionPrice();
            } else if (sapling instanceof BeetRoot) {
                sellingPrice = market.getBeetRootPrice();
            } else if (sapling instanceof Melon) {
                sellingPrice = market.getMelonPrice();
            }

            player.setMoney(player.getMoney() + sellingPrice);  //Der Verkaufswert wird mit einer einfachen Additionsrechnung von Kapital und Verkaufswert angepasst.
            plantedSaplings.splice(index, 1, undefined!); // Wir geben dem Feld auf dem der Setzling war den Wert undefined - das Feld ist leer. https://stackabuse.com/javascript-how-to-insert-elements-into-a-specific-index-of-an-array/
            redraw();
        }
    }


    export class Water extends Tool {
        public work(): void {
            let index: number = getSaplingIndex(this.getCell());
            let sapling: Sapling = plantedSaplings[index];

            if (sapling == undefined) {                             //Wenn das Feld nicht bepflanzt ist, wird die Aktion nicht ausgeführt. (FehlerMeldung in der Console)
                return;
            }

            if (!sapling.getNeedsWater()) {                         //Wenn der Sapling Wasser benötigt (boolean = true) wird die Funktion beendet und der Sapling kann wachsen.
                return;
            }

            sapling.setNeedsWater(false);                           //Wenn der Sapling kein Wasser benötigt (boolean = false) läuft die Funktion weiter und der Sapling kann in der grow () wachsen.
            sapling.setCurrentDisaster("");                         //Es gibt kein Disaster, deshalb 
            setTimeout(() => { sapling.grow(); }, 1000);           
            redraw();                                               
        }
    }

    export class Fertilizer extends Tool {
        public work(): void {
            if (player.getFertilizer() <= 0) {                      //Wenn der Fertilizer 0 beträgt, wird die Funktion returned (Düngerbestand ist leer)
                return;
            }

            let index: number = getSaplingIndex(this.getCell());
            let sapling: Sapling = plantedSaplings[index];

            if (sapling == undefined) {                             //Wenn das Feld undefined ist, wird die Funktion returned (Es ist kein Setzling besetzt)
                return;
            }

            if (!sapling.getNeedsFertilizer()) {                    //Wenn der Sapling kein Dünger benötigt, wird die Funktion returned.
                return;
            }

            sapling.setNeedsFertilizer(false);
            sapling.setCurrentDisaster("");
            player.setFertilizer(player.getFertilizer() - 1);       //Der Düngerbestand wird nach benutzen des Düngermittels um -1 gesetzt.

            setTimeout(() => { sapling.grow(); }, 1000);
            redraw();
        }
    }

    export class Pesticide extends Tool {
        public work(): void {
            if (player.getPesticide() <= 0) {
                return;
            }

            let index: number = getSaplingIndex(this.getCell());
            let sapling: Sapling = plantedSaplings[index];

            if (sapling == undefined) {
                return;
            }

            if (!sapling.getNeedsPesticide()) {
                return;
            }

            sapling.setNeedsPesticide(false);
            sapling.setCurrentDisaster("");
            player.setPesticide(player.getPesticide() - 1);

            setTimeout(() => { sapling.grow(); }, 1000);
            redraw();
        }
    }

    export class GameObjectFactory {
        public static new(icon: HTMLImageElement, cell: [number, number]): GameObject {
            switch (icon.id) {
                case "iconCarrot":
                    return new Carrot(icon, cell);
                case "iconPotato":
                    return new Potato(icon, cell);
                case "iconRedOnion":
                    return new RedOnion(icon, cell);
                case "iconBeetRoot":
                    return new BeetRoot(icon, cell);
                case "iconMelon":
                    return new Melon(icon, cell);
                case "iconHarvester":
                    return new Harvester(icon, cell);
                case "iconWater":
                    return new Water(icon, cell);
                case "iconFertilizer":
                    return new Fertilizer(icon, cell);
                case "iconPesticide":
                    return new Pesticide(icon, cell);
                default:
                    return new Carrot(icon, cell);
            }
        }
    }
}
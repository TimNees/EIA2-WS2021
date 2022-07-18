"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class GameObject {
        static currentGameObject;
        image;
        cell;
        constructor(image, cell) {
            this.image = image;
            this.cell = cell;
        }
        getImage() {
            return this.image;
        }
        getCell() {
            return this.cell;
        }
    }
    GemueseGarten.GameObject = GameObject;
    class Sapling extends GameObject {
        assetFolderPath = "../Assets/Seeds/";
        saplingImagePaths;
        growPhase;
        needsWater;
        needsFertilizer;
        needsPesticide;
        currentDisaster;
        constructor(iconImage, saplingImageName, cell) {
            super(iconImage, cell);
            this.saplingImagePaths = new Array();
            for (let i = 0; i < 4; i++) {
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
        getSaplingImagePaths() {
            return this.saplingImagePaths;
        }
        getGrowPhase() {
            return this.growPhase;
        }
        getNeedsWater() {
            return this.needsWater;
        }
        getNeedsFertilizer() {
            return this.needsFertilizer;
        }
        getNeedsPesticide() {
            return this.needsPesticide;
        }
        setNeedsWater(value) {
            this.needsWater = value;
        }
        setNeedsFertilizer(value) {
            this.needsFertilizer = value;
        }
        setNeedsPesticide(value) {
            this.needsPesticide = value;
        }
        setCurrentDisaster(value) {
            this.currentDisaster = value;
        }
        grow() {
            if (!this.canGrow()) { //Wenn canGrow den Rückgabewert false gibt, wird grow() nicht weiter ausgeführt, da der Setzling nicht wachsen kann.
                return;
            }
            this.growPhase++; //Die Growpahse wird um 1 erhöhrt -> nächste Wachstumsstufe
            setTimeout(() => { this.grow(); }, 1000);
            setTimeout(() => { this.checkDisaster(); }, 1000); //Es wird in einem Abstand von einer Sekunde gecheckt, ob ein Disaster vorliegt.
            GemueseGarten.redraw();
        }
        checkDisaster() {
            if (!this.canGrow()) {
                return;
            }
            let probability = 0.2; //Es wird bestimmt, zu welcher Wahrscheinlichkeit Wasser, Dünger- und Pestizidenmittel benötigt werden.
            let val = Math.random(); //Die Variable "val" erhält den Wert von Math.random() - Math.random() gibt eine Zahl von 0-1 aus.
            if (val <= probability) {
                let val = Math.random();
                if (val <= 0.33) { //Wenn val kleiner gleich 0.33 ist wird das Disaster "Wasser benötigt" aufgerufen.
                    this.needsWater = true;
                    this.currentDisaster = "watering";
                    setTimeout(() => { this.saplingDies(); }, 7000); //Wenn das Disaster nach 7 Sekunden nicht bereinigt wurde, vertrocknet die Pflanze.
                }
                else if (val <= 0.66) { //Wenn val kleiner gleich 0.66 ist wird das Disaster "Wasser benötigt" aufgerufen.
                    this.needsFertilizer = true;
                    this.currentDisaster = "fortizizePlants";
                    setTimeout(() => { this.saplingDies(); }, 12000); //Wenn das Disaster nach 12 Sekunden nicht bereinigt wurde, stirbt die Pflanze.
                }
                else {
                    this.needsPesticide = true;
                    this.currentDisaster = "pest";
                    setTimeout(() => { this.saplingDies(); }, 10000); //Wenn das Disaster nach 10 Sekunden nicht bereinigt wurde, stirbt die Pflanze.
                }
                this.drawDisaster(); //Das Disaster wird auf dem Setzling gepflanzt.
            }
        }
        saplingDies() {
            if (!this.needsWater && !this.needsFertilizer && !this.needsPesticide) { //Wenn der Wert von needsWater etc. falsch ist, wird die Funktion abgebrochen.
                return;
            }
            let index = GemueseGarten.getSaplingIndex(this.getCell());
            GemueseGarten.plantedSaplings.splice(index, 1, undefined); //Das Feld auf dem der Setzling war, wird wieder undefined = leer.
            GemueseGarten.redraw();
        }
        drawDisaster() {
            if (this.currentDisaster == "") { //Wenn der Wert von currentDisaster leer ist, soll die Funktion nicht ausgeführt werden (es gibt kein Disaster)
                return;
            }
            let img = document.createElement("img");
            img.src = `../Assets/${this.currentDisaster}.png`; //Das Icon des Disasters wird ausgewählt
            let width = 50; //Größe und Ort des Disasters auf dem Feld wird bestimmt
            let height = 50;
            let xDraw = this.getCell()[1] * GemueseGarten.CELL_SIZE + GemueseGarten.CELL_SIZE - width;
            let yDraw = this.getCell()[0] * GemueseGarten.CELL_SIZE + GemueseGarten.CELL_SIZE - height;
            img.onload = () => {
                GemueseGarten.context.drawImage(img, xDraw, yDraw, width, height); //Disaster wird mit den Parametern img, xDraw, yDraw, width und height auf dem Canvas gezeichnet.
            };
        }
        canGrow() {
            return (!this.needsWater && !this.needsFertilizer && !this.needsPesticide) && this.growPhase < 3; //Der Sapling kann nicht mehr wachsen WENN: needsWater, needsFertilizer,
        } // needsPesticide = true sind & growPhase < 3 (die höchste Wachstumsstufe)
    }
    GemueseGarten.Sapling = Sapling;
    //===== Erweitert die Superklasse Sapling um die fünf Subklassen =====
    class Carrot extends Sapling {
        constructor(iconImage, cell) {
            super(iconImage, "carrot", cell);
        }
    }
    GemueseGarten.Carrot = Carrot;
    class Potato extends Sapling {
        constructor(iconImage, cell) {
            super(iconImage, "potato", cell);
        }
    }
    GemueseGarten.Potato = Potato;
    class RedOnion extends Sapling {
        constructor(iconImage, cell) {
            super(iconImage, "redOnion", cell);
        }
    }
    GemueseGarten.RedOnion = RedOnion;
    class BeetRoot extends Sapling {
        constructor(iconImage, cell) {
            super(iconImage, "beetroot", cell);
        }
    }
    GemueseGarten.BeetRoot = BeetRoot;
    class Melon extends Sapling {
        constructor(iconImage, cell) {
            super(iconImage, "melon", cell);
        }
    }
    GemueseGarten.Melon = Melon;
    class Tool extends GameObject {
        constructor(iconImage, cell) {
            super(iconImage, cell);
        }
    }
    GemueseGarten.Tool = Tool;
    //===== Erweitert die Superklasse Tool um die vier Funktionen =====
    class Harvester extends Tool {
        work() {
            let index = GemueseGarten.getSaplingIndex(this.getCell());
            let sapling = GemueseGarten.plantedSaplings[index];
            if (sapling == undefined) {
                return;
            }
            let sellingPrice = 0;
            if (sapling.getGrowPhase() < 3) { //Wenn der Setzling nicht ausgewachsen ist, erhält der Nutzer beim Ernten kein Kapital gutgeschrieben,
                sellingPrice = 0; //...denn der sellingPrice hat den Wert 0
            }
            else if (sapling instanceof Carrot) { //Wenn der Setzling jedoch ausgewachsen ist...
                sellingPrice = GemueseGarten.market.getCarrotPrice(); //...erhält die Variable sellingPrice den Wert aktuellen verkaufs-Wert von CarrotPrice
            }
            else if (sapling instanceof Potato) {
                sellingPrice = GemueseGarten.market.getPotatoPrice();
            }
            else if (sapling instanceof RedOnion) {
                sellingPrice = GemueseGarten.market.getRedOnionPrice();
            }
            else if (sapling instanceof BeetRoot) {
                sellingPrice = GemueseGarten.market.getBeetRootPrice();
            }
            else if (sapling instanceof Melon) {
                sellingPrice = GemueseGarten.market.getMelonPrice();
            }
            GemueseGarten.player.setMoney(GemueseGarten.player.getMoney() + sellingPrice); //Der Verkaufswert wird mit einer einfachen Additionsrechnung von Kapital und Verkaufswert angepasst.
            GemueseGarten.plantedSaplings.splice(index, 1, undefined); // Wir geben dem Feld auf dem der Setzling war den Wert undefined - das Feld ist leer. https://stackabuse.com/javascript-how-to-insert-elements-into-a-specific-index-of-an-array/
            GemueseGarten.redraw();
        }
    }
    GemueseGarten.Harvester = Harvester;
    class Water extends Tool {
        work() {
            let index = GemueseGarten.getSaplingIndex(this.getCell());
            let sapling = GemueseGarten.plantedSaplings[index];
            if (sapling == undefined) { //Wenn das Feld nicht bepflanzt ist, wird die Aktion nicht ausgeführt. (FehlerMeldung in der Console)
                return;
            }
            if (!sapling.getNeedsWater()) { //Wenn der Sapling Wasser benötigt (boolean = true) wird die Funktion beendet und der Sapling kann wachsen.
                return;
            }
            sapling.setNeedsWater(false); //Wenn der Sapling kein Wasser benötigt (boolean = false) läuft die Funktion weiter und der Sapling kann in der grow () wachsen.
            sapling.setCurrentDisaster(""); //Es gibt kein Disaster, deshalb 
            setTimeout(() => { sapling.grow(); }, 1000);
            GemueseGarten.redraw();
        }
    }
    GemueseGarten.Water = Water;
    class Fertilizer extends Tool {
        work() {
            if (GemueseGarten.player.getFertilizer() <= 0) { //Wenn der Fertilizer 0 beträgt, wird die Funktion returned (Düngerbestand ist leer)
                return;
            }
            let index = GemueseGarten.getSaplingIndex(this.getCell());
            let sapling = GemueseGarten.plantedSaplings[index];
            if (sapling == undefined) { //Wenn das Feld undefined ist, wird die Funktion returned (Es ist kein Setzling besetzt)
                return;
            }
            if (!sapling.getNeedsFertilizer()) { //Wenn der Sapling kein Dünger benötigt, wird die Funktion returned.
                return;
            }
            sapling.setNeedsFertilizer(false);
            sapling.setCurrentDisaster("");
            GemueseGarten.player.setFertilizer(GemueseGarten.player.getFertilizer() - 1); //Der Düngerbestand wird nach benutzen des Düngermittels um -1 gesetzt.
            setTimeout(() => { sapling.grow(); }, 1000);
            GemueseGarten.redraw();
        }
    }
    GemueseGarten.Fertilizer = Fertilizer;
    class Pesticide extends Tool {
        work() {
            if (GemueseGarten.player.getPesticide() <= 0) {
                return;
            }
            let index = GemueseGarten.getSaplingIndex(this.getCell());
            let sapling = GemueseGarten.plantedSaplings[index];
            if (sapling == undefined) {
                return;
            }
            if (!sapling.getNeedsPesticide()) {
                return;
            }
            sapling.setNeedsPesticide(false);
            sapling.setCurrentDisaster("");
            GemueseGarten.player.setPesticide(GemueseGarten.player.getPesticide() - 1);
            setTimeout(() => { sapling.grow(); }, 1000);
            GemueseGarten.redraw();
        }
    }
    GemueseGarten.Pesticide = Pesticide;
    class GameObjectFactory {
        static new(icon, cell) {
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
    GemueseGarten.GameObjectFactory = GameObjectFactory;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=gameobject.js.map
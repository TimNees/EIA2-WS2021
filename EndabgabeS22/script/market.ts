namespace GemueseGarten {
    export class Market {
        
        private carrotPrice: number;                    //Deklaration der (Klassen)Eigenschaften
        private potatoPrice: number;
        private beetRootPrice: number;
        private melonPrice: number;
        private redOnionPrice: number;

        private carrotCost: number;
        private potatoCost: number;
        private redOnionCost: number;
        private beetRootCost: number;
        private melonCost: number;

        private fertilizerCost: number;
        private pesticidesCost: number;

        private currentPriceRange: number = 2;
        

        constructor() {
            this.carrotPrice = 160;                     //Die Standard-Verkaufswerte für die Saplings
            this.potatoPrice = 350;
            this.beetRootPrice = 600;
            this.melonPrice = 800;
            this.redOnionPrice = 150;

            this.carrotCost = 80;                       //Die Einkaufswerte für die jeweiligen Saplings.
            this.potatoCost = 250;
            this.redOnionCost = 100;
            this.beetRootCost = 300;
            this.melonCost = 400;

            this.fertilizerCost = 500;                 //Die Einkaufswerte für Dünger und Pestizide
            this.pesticidesCost = 870;

            this.currentPriceRange = 0.6;

            setInterval(() => { this.updatePrices(); }, 800);      //Es wird bestimmt in welchem Abstand immer ein Preisupdate ausgelöst werden soll.
        }

        public getCarrotPrice(): number {
            return this.carrotPrice;
        }

        public getPotatoPrice(): number {
            return this.potatoPrice;
        }

        public getBeetRootPrice(): number {
            return this.beetRootPrice;
        }

        public getMelonPrice(): number {
            return this.melonPrice;
        }

        public getRedOnionPrice(): number {
            return this.redOnionPrice;
        }

        public setCarrotPrice(price: number): void {
            this.carrotPrice = price;
        }

        public setPotatoPrice(price: number): void {
            this.potatoPrice = price;
        }

        public setBeetRootPrice(price: number): void {
            this.beetRootPrice = price;
        }

        public setMelonPrice(price: number): void {
            this.melonPrice = price;
        }

        public setRedOnionPrice(price: number): void {
            this.redOnionPrice = price;
        }

        public getCarrotCost(): number {
            return this.carrotCost;
        }

        public getPotatoCost(): number {
            return this.potatoCost;
        }

        public getRedOnionCost(): number {
            return this.redOnionCost;
        }

        public getBeetRootCost(): number {
            return this.beetRootCost;
        }

        public getMelonCost(): number {
            return this.melonCost;
        }

        public setCarrotCost(cost: number): void {
            this.carrotCost = cost;
        }

        public setPotatoCost(cost: number): void {
            this.potatoCost = cost;
        }

        public setRedOnionCost(cost: number): void {
            this.redOnionCost = cost;
        }

        public setBeetRootCost(cost: number): void {
            this.beetRootCost = cost;
        }

        public setMelonCost(cost: number): void {
            this.melonCost = cost;
        }

        public getFertilizerCost(): number {
            return this.fertilizerCost;
        }

        public getPesticideCost(): number {
            return this.pesticidesCost;
        }

        public setFertilizerCost(cost: number): void {
            this.fertilizerCost = cost;
        }

        public setPesticidesCost(cost: number): void {
            this.pesticidesCost = cost;
        }

        public setPriceRange(priceRange: number): void {
            this.currentPriceRange = priceRange;
        }


        public updatePrices(): void {
            let probability: number = 0.75;      //Variable Probability beschreibt, zu welcher Wahrscheinlichkeit der Preis aktualisiert wird 
            let val: number = Math.random();
            //console.log(this.currentPriceRange);
            if (this.currentPriceRange == 0.2)      //Preisschwankung "wenig"
                if (val <= probability) {           //Wenn val kleiner/gleich die Probability ist, wird das Preisupdate ausgeführt.
                    this.carrotPrice = Helper.clamp(this.carrotPrice + this.calculatingPriceChanges(), 30, 250);    //Der Karottenpreis wird + die ausgerechnete Preisveränderung gerechnet.
                    this.potatoPrice = Helper.clamp(this.potatoPrice + this.calculatingPriceChanges(), 30, 300);    //30 und 300 bilden den Min und Max Wert - Funktion clamp überprüft, dass beide Werte nicht überschritten werden.
                    this.beetRootPrice = Helper.clamp(this.beetRootPrice + this.calculatingPriceChanges(), 30, 750);
                    this.melonPrice = Helper.clamp(this.melonPrice + this.calculatingPriceChanges(), 30, 850);
                    this.redOnionPrice = Helper.clamp(this.redOnionPrice + this.calculatingPriceChanges(), 30, 130);
                }

            if (this.currentPriceRange == 0.4)
                if (val <= probability) {           //Wenn val kleiner/gleich die Probability ist, wird das Preisupdate ausgeführt.
                    this.carrotPrice = Helper.clamp(this.carrotPrice + this.calculatingPriceChanges(), 20, 250);    //Der Karottenpreis wird + die ausgerechnete Preisveränderung gerechnet.
                    this.potatoPrice = Helper.clamp(this.potatoPrice + this.calculatingPriceChanges(), 20, 350);    //20 und 350 bilden den Min und Max Wert - Funktion clamp überprüft, dass beide Werte nicht überschritten werden.
                    this.beetRootPrice = Helper.clamp(this.beetRootPrice + this.calculatingPriceChanges(), 20, 80);
                    this.melonPrice = Helper.clamp(this.melonPrice + this.calculatingPriceChanges(), 20, 1050);
                    this.redOnionPrice = Helper.clamp(this.redOnionPrice + this.calculatingPriceChanges(), 20, 160);
                }

            if (this.currentPriceRange == 0.6)      //Preisschwankung "stark"
                if (val <= probability) {           //Wenn val kleiner/gleich die Probability ist, wird das Preisupdate ausgeführt.
                    this.carrotPrice = Helper.clamp(this.carrotPrice + this.calculatingPriceChanges(), 10, 250);    //Der Karottenpreis wird + die ausgerechnete Preisveränderung gerechnet.
                    this.potatoPrice = Helper.clamp(this.potatoPrice + this.calculatingPriceChanges(), 10, 350);    //10 und 350 bilden den Min und Max Wert - Funktion clamp überprüft, dass beide Werte nicht überschritten werden.
                    this.beetRootPrice = Helper.clamp(this.beetRootPrice + this.calculatingPriceChanges(), 10, 850);
                    this.melonPrice = Helper.clamp(this.melonPrice + this.calculatingPriceChanges(), 10, 1250);
                    this.redOnionPrice = Helper.clamp(this.redOnionPrice + this.calculatingPriceChanges(), 10, 160);
                }



            this.updatePriceViews();            //Die aktuallisierten Preise werden weitergegeben.
        }

        private calculatingPriceChanges(): number {                                     //Mathematische Berechnung der Preisveränderung
            let sign: number = Math.random() < 0.5 ? -1 : 1;    //Wenn Math.Random kleiner als 0.5 ist, dann liefer -1 zurück, ansonsten 1. (50% Chance ob Vorzeichen + oder -) Gefunden: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
            let change: number = (Math.floor(Math.random() * (3 - 1 + 1) + 1)) * 10 * sign; //Die eigentliche Änderung wird berechnet zwischen -30 und +30 - durch herumspielen herausgefunden: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/random
            //console.log(change); 
            return change;
        }

        private updatePriceViews(): void {                                                          //Die aktualisierten Verkaufspreise werden im DOM angezeigt.                                       
            let priceCarrot: HTMLElement = <HTMLElement>document.getElementById("priceCarrot");     //Wir selektieren den Pricetag im DOM.
            let pricePotato: HTMLElement = <HTMLElement>document.getElementById("pricePotato");
            let priceBeetRoot: HTMLElement = <HTMLElement>document.getElementById("priceBeetRoot");
            let priceMelon: HTMLElement = <HTMLElement>document.getElementById("priceMelon");
            let priceRedOnion: HTMLElement = <HTMLElement>document.getElementById("priceRedOnion");

            priceCarrot.innerHTML = this.formatPrice(this.carrotPrice);                             //Die Preise werden im DOM geändert.
            pricePotato.innerHTML = this.formatPrice(this.potatoPrice);
            priceBeetRoot.innerHTML = this.formatPrice(this.beetRootPrice);
            priceMelon.innerHTML = this.formatPrice(this.melonPrice);
            priceRedOnion.innerHTML = this.formatPrice(this.redOnionPrice);
        }

        private formatPrice(price: number): string {                                                //Das Format des Preises wird bestimmt***Probleme beim Runden = komische Ergebnisse
            let priceString: string = price.toString();
            let position: number = priceString.length - 2;
            let firstPart: string = priceString.substring(0, position);
            let secondPart: string = priceString.substring(position);
            return [firstPart.padStart(1, "0"), ".", secondPart.padEnd(2, "0")].join("");
        }
    }
}
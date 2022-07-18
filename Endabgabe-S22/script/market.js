"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class Market {
        currentPriceRange = 2;
        carrotPrice; //Deklaration der Eigenschaften
        potatoPrice;
        beetRootPrice;
        melonPrice;
        redOnionPrice;
        carrotCost;
        potatoCost;
        redOnionCost;
        beetRootCost;
        melonCost;
        fertilizerCost;
        pesticidesCost;
        constructor() {
            this.carrotPrice = 160; //Die Standard-Verkaufswerte für die Saplings
            this.potatoPrice = 350;
            this.beetRootPrice = 600;
            this.melonPrice = 800;
            this.redOnionPrice = 150;
            this.carrotCost = 80; //Die Einkaufswerte für die jeweiligen Saplings.
            this.potatoCost = 250;
            this.redOnionCost = 100;
            this.beetRootCost = 300;
            this.melonCost = 400;
            this.fertilizerCost = 500; //Die Einkaufswerte für Dünger und Pestizide
            this.pesticidesCost = 870;
            this.currentPriceRange = 0.6;
            setInterval(() => { this.updatePrices(); }, 800); //Es wird bestimmt in welchem Abstand immer ein Preisupdate ausgelöst werden soll.
        }
        getCarrotPrice() {
            return this.carrotPrice;
        }
        getPotatoPrice() {
            return this.potatoPrice;
        }
        getBeetRootPrice() {
            return this.beetRootPrice;
        }
        getMelonPrice() {
            return this.melonPrice;
        }
        getRedOnionPrice() {
            return this.redOnionPrice;
        }
        setCarrotPrice(price) {
            this.carrotPrice = price;
        }
        setPotatoPrice(price) {
            this.potatoPrice = price;
        }
        setBeetRootPrice(price) {
            this.beetRootPrice = price;
        }
        setMelonPrice(price) {
            this.melonPrice = price;
        }
        setRedOnionPrice(price) {
            this.redOnionPrice = price;
        }
        getCarrotCost() {
            return this.carrotCost;
        }
        getPotatoCost() {
            return this.potatoCost;
        }
        getRedOnionCost() {
            return this.redOnionCost;
        }
        getBeetRootCost() {
            return this.beetRootCost;
        }
        getMelonCost() {
            return this.melonCost;
        }
        setCarrotCost(cost) {
            this.carrotCost = cost;
        }
        setPotatoCost(cost) {
            this.potatoCost = cost;
        }
        setRedOnionCost(cost) {
            this.redOnionCost = cost;
        }
        setBeetRootCost(cost) {
            this.beetRootCost = cost;
        }
        setMelonCost(cost) {
            this.melonCost = cost;
        }
        getFertilizerCost() {
            return this.fertilizerCost;
        }
        getPesticideCost() {
            return this.pesticidesCost;
        }
        setFertilizerCost(cost) {
            this.fertilizerCost = cost;
        }
        setPesticidesCost(cost) {
            this.pesticidesCost = cost;
        }
        setPriceRange(priceRange) {
            this.currentPriceRange = priceRange;
        }
        updatePrices() {
            let probability = 0.75; //Variable Probability beschreibt, zu welcher Wahrscheinlichkeit der Preis aktualisiert wird 
            let val = Math.random();
            //console.log(this.currentPriceRange);
            if (this.currentPriceRange == 0.2) //Preisschwankung "wenig"
                if (val <= probability) { //Wenn val kleiner/gleich die Probability ist, wird das Preisupdate ausgeführt.
                    this.carrotPrice = GemueseGarten.Helper.clamp(this.carrotPrice + this.calculatingPriceChanges(), 30, 250); //Der Karottenpreis wird + die ausgerechnete Preisveränderung gerechnet.
                    this.potatoPrice = GemueseGarten.Helper.clamp(this.potatoPrice + this.calculatingPriceChanges(), 30, 300); //30 und 300 bilden den Min und Max Wert - Funktion clamp überprüft, dass beide Werte nicht überschritten werden.
                    this.beetRootPrice = GemueseGarten.Helper.clamp(this.beetRootPrice + this.calculatingPriceChanges(), 30, 750);
                    this.melonPrice = GemueseGarten.Helper.clamp(this.melonPrice + this.calculatingPriceChanges(), 30, 850);
                    this.redOnionPrice = GemueseGarten.Helper.clamp(this.redOnionPrice + this.calculatingPriceChanges(), 30, 130);
                }
            if (this.currentPriceRange == 0.4)
                if (val <= probability) { //Wenn val kleiner/gleich die Probability ist, wird das Preisupdate ausgeführt.
                    this.carrotPrice = GemueseGarten.Helper.clamp(this.carrotPrice + this.calculatingPriceChanges(), 20, 250); //Der Karottenpreis wird + die ausgerechnete Preisveränderung gerechnet.
                    this.potatoPrice = GemueseGarten.Helper.clamp(this.potatoPrice + this.calculatingPriceChanges(), 20, 350); //20 und 350 bilden den Min und Max Wert - Funktion clamp überprüft, dass beide Werte nicht überschritten werden.
                    this.beetRootPrice = GemueseGarten.Helper.clamp(this.beetRootPrice + this.calculatingPriceChanges(), 20, 80);
                    this.melonPrice = GemueseGarten.Helper.clamp(this.melonPrice + this.calculatingPriceChanges(), 20, 1050);
                    this.redOnionPrice = GemueseGarten.Helper.clamp(this.redOnionPrice + this.calculatingPriceChanges(), 20, 160);
                }
            if (this.currentPriceRange == 0.6) //Preisschwankung "stark"
                if (val <= probability) { //Wenn val kleiner/gleich die Probability ist, wird das Preisupdate ausgeführt.
                    this.carrotPrice = GemueseGarten.Helper.clamp(this.carrotPrice + this.calculatingPriceChanges(), 10, 250); //Der Karottenpreis wird + die ausgerechnete Preisveränderung gerechnet.
                    this.potatoPrice = GemueseGarten.Helper.clamp(this.potatoPrice + this.calculatingPriceChanges(), 10, 350); //10 und 350 bilden den Min und Max Wert - Funktion clamp überprüft, dass beide Werte nicht überschritten werden.
                    this.beetRootPrice = GemueseGarten.Helper.clamp(this.beetRootPrice + this.calculatingPriceChanges(), 10, 850);
                    this.melonPrice = GemueseGarten.Helper.clamp(this.melonPrice + this.calculatingPriceChanges(), 10, 1250);
                    this.redOnionPrice = GemueseGarten.Helper.clamp(this.redOnionPrice + this.calculatingPriceChanges(), 10, 160);
                }
            this.updatePriceViews(); //Die aktuallisierten Preise werden weitergegeben.
        }
        calculatingPriceChanges() {
            let sign = Math.random() < 0.5 ? -1 : 1;
            let change = (Math.floor(Math.random() * (3 - 1 + 1) + 1)) * 10 * sign;
            //console.log(change); 
            return change;
        }
        updatePriceViews() {
            let priceCarrot = document.getElementById("priceCarrot"); //Wir selektieren den Pricetag im DOM.
            let pricePotato = document.getElementById("pricePotato");
            let priceBeetRoot = document.getElementById("priceBeetRoot");
            let priceMelon = document.getElementById("priceMelon");
            let priceRedOnion = document.getElementById("priceRedOnion");
            priceCarrot.innerHTML = this.formatPrice(this.carrotPrice); //Die Preise werden im DOM geändert.
            pricePotato.innerHTML = this.formatPrice(this.potatoPrice);
            priceBeetRoot.innerHTML = this.formatPrice(this.beetRootPrice);
            priceMelon.innerHTML = this.formatPrice(this.melonPrice);
            priceRedOnion.innerHTML = this.formatPrice(this.redOnionPrice);
        }
        formatPrice(price) {
            let priceString = price.toString();
            let position = priceString.length - 2;
            let firstPart = priceString.substring(0, position);
            let secondPart = priceString.substring(position);
            return [firstPart.padStart(1, "0"), ".", secondPart.padEnd(2, "0")].join("");
        }
    }
    GemueseGarten.Market = Market;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=market.js.map
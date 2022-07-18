"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class Player {
        money;
        fertilizer;
        pesticide;
        constructor() {
            this.money = 1500;
            this.fertilizer = 0;
            this.pesticide = 0;
        }
        getMoney() {
            return this.money;
        }
        setMoney(money) {
            this.money = money;
            this.updateMoneyView();
        }
        getFertilizer() {
            return this.fertilizer;
        }
        setFertilizer(fertilizer) {
            this.fertilizer = fertilizer;
            this.updateFertilizerView();
        }
        updateFertilizerView() {
            let fertilizerView = document.getElementById("amountFertilizier");
            fertilizerView.innerHTML = this.fertilizer.toString();
        }
        getPesticide() {
            return this.pesticide;
        }
        setPesticide(pesticide) {
            this.pesticide = pesticide;
            this.updatePesticideView();
        }
        updatePesticideView() {
            let pesticideView = document.getElementById("amountPesticide");
            pesticideView.innerHTML = this.pesticide.toString();
        }
        updateMoneyView() {
            let currentCapital = document.getElementById("currentCapital");
            let moneyString = this.money.toString();
            let position = moneyString.length - 2;
            let firstPart = moneyString.substring(0, position);
            let secondPart = moneyString.substring(position);
            currentCapital.innerHTML = [firstPart.padStart(1, "0"), ".", secondPart.padEnd(2, "0")].join("");
        }
    }
    GemueseGarten.Player = Player;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=player.js.map
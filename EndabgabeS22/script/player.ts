namespace GemueseGarten {
    export class Player {
        private money: number;
        private fertilizer: number;
        private pesticide: number;

        constructor() {
            this.money = 1500;      //Startwert wird überschrieben mit Wert von index.
            this.fertilizer = 0;
            this.pesticide = 0;
        }

        public getMoney(): number {
            return this.money;
        }

        public setMoney(money: number): void {      //Setzt das Geld des Spielers auf übergebenen Wert und updated die Ansicht auf der Seite.
            this.money = money;
            this.updateMoneyView();
        }

        public getFertilizer(): number {
            return this.fertilizer;
        }

        public setFertilizer(fertilizer: number): void {
            this.fertilizer = fertilizer;
            this.updateFertilizerView();
        }

        public updateFertilizerView(): void {
            let fertilizerView: HTMLSpanElement = document.getElementById("amountFertilizier") as HTMLSpanElement;
            fertilizerView.innerHTML = this.fertilizer.toString();
        }

        public getPesticide(): number {
            return this.pesticide;
        }

        public setPesticide(pesticide: number): void {
            this.pesticide = pesticide;
            this.updatePesticideView();
        }

        public updatePesticideView(): void {
            let pesticideView: HTMLSpanElement = document.getElementById("amountPesticide") as HTMLSpanElement;
            pesticideView.innerHTML = this.pesticide.toString();
        }

        public updateMoneyView(): void {
            let currentCapital: HTMLElement = document.getElementById("currentCapital") as HTMLElement;
            let moneyString: string = this.money.toString();
            let position: number = moneyString.length - 2;
            let firstPart: string = moneyString.substring(0, position);                    //Beispiel: money = 1000 dann wird der erste Teil -> 10(00)
            let secondPart: string = moneyString.substring(position);                      //Beispiel: money = 1000 wird der zweite Teil (10) 00 <-
            currentCapital.innerHTML = [firstPart.padStart(1, "0"), ".", secondPart.padEnd(2, "0")].join(""); //padStart brauchen wir wenn Spieler nur noch Centbeträge hat, padEnde wenn Spieler 5.50 hat stand nur 5.5 da -> ergänzt 0
        }
    }
}
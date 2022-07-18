namespace GemueseGarten {
    export class Player {
        private money: number;
        private fertilizer: number;
        private pesticide: number;

        constructor() {
            this.money = 1500;
            this.fertilizer = 0;
            this.pesticide = 0;
        }

        public getMoney(): number {
            return this.money;
        }

        public setMoney(money: number): void {
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
            let firstPart: string = moneyString.substring(0, position);
            let secondPart: string = moneyString.substring(position);
            currentCapital.innerHTML = [firstPart.padStart(1, "0"), ".", secondPart.padEnd(2, "0")].join("");
        }
    }
}
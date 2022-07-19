namespace GemueseGarten {

    export class Helper {
        public static clamp(value: number, min: number, max: number): number {      //Überprüft, ob der min und max Wert des Verkaufswerts überschritten werden - falls ja wird er automatisch auf min und max gesetzt.
            if (value < min) {                     //Wenn der Preis unter min ist,              
                value = min;                       //wird der Preis auf min zurückgesetzt.
            }

            if (value > max) {                     //Wenn der Preis über max ist,
                value = max;                       //wird der Preis auf max zurückgesetzt.
            }
            return value;
        }

        public static getClickedCell(x: number, y: number): [number, number] {      //Anhand von X,Y geben wir die angeklickte Zelle zurück.
            let row: number = Math.floor(y / 100);
            let col: number = Math.floor(x / 100);
            return [row, col];
        }
    }
}
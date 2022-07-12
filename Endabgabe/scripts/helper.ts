namespace GemueseGarten {
    export class Helper {
        public static clamp(value: number, min: number, max: number): number {
            if (value < min) {                                  //Wenn Wert kurzzeitig unter Min geht, wird er anschließend wieder auf den Mindestwert (20) gesetzt.
                value = min;
            }

            if (value > max) {
                value = max;
            }
            return value;
        }

        public static getClickedCell(x: number, y: number): [number, number] {
            let row: number = Math.floor(y / GameField.CELL_SIZE);
            let col: number = Math.floor(x / GameField.CELL_SIZE);
            return [row, col];
        }

    }
}
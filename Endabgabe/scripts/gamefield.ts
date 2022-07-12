namespace GemueseGarten {
    export class GameField implements Drawable {
        public static readonly WIDTH: number = 800;
        public static readonly HEIGHT: number = 500;
        public static readonly CELL_SIZE: number = 100;
        public static readonly COLS: number = this.WIDTH / this.CELL_SIZE;
        public static readonly ROWS: number = this.HEIGHT / this.CELL_SIZE;

        private canvas: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;
        private patch: Sapling[];

        constructor() {
            this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
            this.context = this.canvas.getContext("2d");
            this.init();
            this.patch = Array(40).fill(undefined);
        }

        public getPatch(): Sapling[] {
            return this.patch;
        }

        public init(): void {
            this.context.lineCap = "round";
            this.context.lineJoin = "round";
            this.context.strokeStyle = "black";
            this.context.lineWidth = 1;
            this.drawFields();
            console.log("init");
        }

        public drawFields(): void {
            this.drawVerticalLines(this.context, GameField.COLS, GameField.HEIGHT, GameField.CELL_SIZE);
            this.drawHorizontalLines(this.context, GameField.ROWS, GameField.WIDTH, GameField.CELL_SIZE);

        }

        public newSapling(currentSaplingType: SaplingType, cell: number[], marketObject: MarketObject): Sapling {
            let sapling: Sapling;
            switch (currentSaplingType) {
                case SaplingType.CARROT:
                    sapling = new Carrot(marketObject, cell);
                    break;
                case SaplingType.POTATO:
                    sapling = new Potato(marketObject, cell);
                    break;
                case SaplingType.REDONION:
                    sapling = new RedOnion(marketObject, cell);
                    break;
                case SaplingType.MELON:
                    sapling = new Melon(marketObject, cell);
                    break;
                case SaplingType.BEETROOT:
                    sapling = new BeetRoot(marketObject, cell);
                    break;
                default:
                    return undefined;
            }
            return sapling;
        }

        public getSaplingIndex(field: number[]): number {
            return GameField.COLS * field[0] + field[1];
        }

        public addSapling(sapling: Sapling): void {
            this.patch[this.getSaplingIndex(sapling.getField())] = sapling;
        }

        public drawSapling(sapling: Sapling, context: CanvasRenderingContext2D): void {
            let img: HTMLImageElement = document.createElement("img");
            let width: number = 75;
            let height: number = 75;
            let xDraw: number = sapling.getField()[1] * GameField.CELL_SIZE + GameField.CELL_SIZE / 2 - width / 2;
            let yDraw: number = sapling.getField()[0] * GameField.CELL_SIZE + GameField.CELL_SIZE / 2 - height / 2;

            img.src = sapling.getImgPhaseNames()[sapling.getCurrentGrowPhase()];
            img.alt = "Sapling";

            img.onload = function (): void {
                context.drawImage(img, xDraw, yDraw, width, height);
            };

            context.drawImage(img, xDraw, yDraw, width, height);

            this.patch[this.getSaplingIndex(sapling.getField())] = sapling;
            console.log("Setzling gepflanzt");
        }

        public redraw(context: CanvasRenderingContext2D): void {
            context.clearRect(0, 0, GameField.WIDTH, GameField.HEIGHT);
            this.drawFields();

            this.getPatch().forEach(sapling => {
                if (sapling != undefined) {
                    this.drawSapling(sapling, context);
                }
            });
        }

        private drawVerticalLines(context: CanvasRenderingContext2D, cols: number, length: number, fieldWidth: number): void {
            for (let col: number = 0; col < cols; col++) {
                let beginX: number = (col + 1) * fieldWidth;
                let beginY: number = 0;
                let endX: number = beginX;
                let endY: number = beginY + length;
                this.drawLine(context, beginX, beginY, endX, endY);
            }
        }

        private drawHorizontalLines(context: CanvasRenderingContext2D, rows: number, length: number, fieldHeight: number): void {
            for (let row: number = 0; row < rows; row++) {
                let beginX: number = 0;
                let beginY: number = (row + 1) * fieldHeight;
                let endX: number = beginX + length;
                let endY: number = beginY;
                this.drawLine(context, beginX, beginY, endX, endY);
            }
        }

        private drawLine(context: CanvasRenderingContext2D, beginX: number, beginY: number, endX: number, endY: number): void {
            context.beginPath();
            context.moveTo(beginX, beginY);
            context.lineTo(endX, endY);
            context.closePath();
            context.stroke();
        }
    }
}
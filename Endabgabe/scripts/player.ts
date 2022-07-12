namespace GemueseGarten {
    export class Player {
        /* private currentCapital: number;
        private harvesterTool: Tool; */

        public workOnField(event: MouseEvent, selectedToolSaplingType: SaplingType, gameField: GameField): void {
            let mouseX: number = (event as MouseEvent).pageX;
            let mouseY: number = (event as MouseEvent).pageY;
            mouseX -= 100;
            mouseY -= 100;
            let field: [number, number] = Helper.getClickedCell(mouseX, mouseY);
    
            let currentPatchCell: Sapling = gameField.getPatch()[gameField.getSaplingIndex(field)];
    
            console.log(currentPatchCell + selectedToolSaplingType.toString());
           
    
            event = undefined;
        }

        public harvest(sapling: Sapling): void {
            if (sapling.getCurrentGrowPhase() == 3) {
                /* this.currentCapital = changeCapital(this.currentCapital, sapling.get);
                if (isPriceChanging()) {
                    sapling.setPriceInCent(calcNewPrice(currentCapital, calcChangeValue(
                        sapling.getMinPrice() / 10,
                        sapling.getMaxPrice() / 10
                    )));
                } */
            }

            //harvester.work(sapling);
        }

        public plantSapling(_cell: number[], _currentCellSapling: Sapling, _market: Market, _gameField: GameField): void {
            /*let sapling: Sapling = gameField.newSapling(cell);
    
            if (sapling != undefined && currentCellSapling == undefined) {
                drawSapling(sapling, context);
                currentCapital = decreaseCapital(currentCapital, sapling.getSaplingPriceInCent());
            }*/
        }

        public changeCapital(value: number, change: number): number {
            let currentCapitalElement: HTMLElement = document.getElementById("currentCapital");
            value += change;
            currentCapitalElement.innerHTML = value.toString();
            return value;
        }
    }
}
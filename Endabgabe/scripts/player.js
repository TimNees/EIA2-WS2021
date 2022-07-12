"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class Player {
        /* private currentCapital: number;
        private harvesterTool: Tool; */
        workOnField(event, selectedToolSaplingType, gameField) {
            let mouseX = event.pageX;
            let mouseY = event.pageY;
            mouseX -= 100;
            mouseY -= 100;
            let field = GemueseGarten.Helper.getClickedCell(mouseX, mouseY);
            let currentPatchCell = gameField.getPatch()[gameField.getSaplingIndex(field)];
            console.log(currentPatchCell + selectedToolSaplingType.toString());
            event = undefined;
        }
        harvest(sapling) {
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
        plantSapling(_cell, _currentCellSapling, _market, _gameField) {
            /*let sapling: Sapling = gameField.newSapling(cell);
    
            if (sapling != undefined && currentCellSapling == undefined) {
                drawSapling(sapling, context);
                currentCapital = decreaseCapital(currentCapital, sapling.getSaplingPriceInCent());
            }*/
        }
        changeCapital(value, change) {
            let currentCapitalElement = document.getElementById("currentCapital");
            value += change;
            currentCapitalElement.innerHTML = value.toString();
            return value;
        }
    }
    GemueseGarten.Player = Player;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=player.js.map
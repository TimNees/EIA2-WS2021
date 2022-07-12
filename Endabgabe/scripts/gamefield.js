"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class GameField {
        static WIDTH = 800;
        static HEIGHT = 500;
        static CELL_SIZE = 100;
        static COLS = this.WIDTH / this.CELL_SIZE;
        static ROWS = this.HEIGHT / this.CELL_SIZE;
        canvas;
        context;
        patch;
        constructor() {
            this.canvas = document.getElementById("canvas");
            this.context = this.canvas.getContext("2d");
            this.init();
            this.patch = Array(40).fill(undefined);
        }
        getPatch() {
            return this.patch;
        }
        init() {
            this.context.lineCap = "round";
            this.context.lineJoin = "round";
            this.context.strokeStyle = "black";
            this.context.lineWidth = 1;
            this.drawFields();
            console.log("init");
        }
        drawFields() {
            this.drawVerticalLines(this.context, GameField.COLS, GameField.HEIGHT, GameField.CELL_SIZE);
            this.drawHorizontalLines(this.context, GameField.ROWS, GameField.WIDTH, GameField.CELL_SIZE);
        }
        newSapling(currentSaplingType, cell, marketObject) {
            let sapling;
            switch (currentSaplingType) {
                case GemueseGarten.SaplingType.CARROT:
                    sapling = new GemueseGarten.Carrot(marketObject, cell);
                    break;
                case GemueseGarten.SaplingType.POTATO:
                    sapling = new GemueseGarten.Potato(marketObject, cell);
                    break;
                case GemueseGarten.SaplingType.REDONION:
                    sapling = new GemueseGarten.RedOnion(marketObject, cell);
                    break;
                case GemueseGarten.SaplingType.MELON:
                    sapling = new GemueseGarten.Melon(marketObject, cell);
                    break;
                case GemueseGarten.SaplingType.BEETROOT:
                    sapling = new GemueseGarten.BeetRoot(marketObject, cell);
                    break;
                default:
                    return undefined;
            }
            return sapling;
        }
        getSaplingIndex(field) {
            return GameField.COLS * field[0] + field[1];
        }
        addSapling(sapling) {
            this.patch[this.getSaplingIndex(sapling.getField())] = sapling;
        }
        drawSapling(sapling, context) {
            let img = document.createElement("img");
            let width = 75;
            let height = 75;
            let xDraw = sapling.getField()[1] * GameField.CELL_SIZE + GameField.CELL_SIZE / 2 - width / 2;
            let yDraw = sapling.getField()[0] * GameField.CELL_SIZE + GameField.CELL_SIZE / 2 - height / 2;
            img.src = sapling.getImgPhaseNames()[sapling.getCurrentGrowPhase()];
            img.alt = "Sapling";
            img.onload = function () {
                context.drawImage(img, xDraw, yDraw, width, height);
            };
            context.drawImage(img, xDraw, yDraw, width, height);
            this.patch[this.getSaplingIndex(sapling.getField())] = sapling;
            console.log("Setzling gepflanzt");
        }
        redraw(context) {
            context.clearRect(0, 0, GameField.WIDTH, GameField.HEIGHT);
            this.drawFields();
            this.getPatch().forEach(sapling => {
                if (sapling != undefined) {
                    this.drawSapling(sapling, context);
                }
            });
        }
        drawVerticalLines(context, cols, length, fieldWidth) {
            for (let col = 0; col < cols; col++) {
                let beginX = (col + 1) * fieldWidth;
                let beginY = 0;
                let endX = beginX;
                let endY = beginY + length;
                this.drawLine(context, beginX, beginY, endX, endY);
            }
        }
        drawHorizontalLines(context, rows, length, fieldHeight) {
            for (let row = 0; row < rows; row++) {
                let beginX = 0;
                let beginY = (row + 1) * fieldHeight;
                let endX = beginX + length;
                let endY = beginY;
                this.drawLine(context, beginX, beginY, endX, endY);
            }
        }
        drawLine(context, beginX, beginY, endX, endY) {
            context.beginPath();
            context.moveTo(beginX, beginY);
            context.lineTo(endX, endY);
            context.closePath();
            context.stroke();
        }
    }
    GemueseGarten.GameField = GameField;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=gamefield.js.map
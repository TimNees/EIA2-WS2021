"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    GemueseGarten.WIDTH = 800;
    GemueseGarten.HEIGHT = 500;
    GemueseGarten.CELL_SIZE = 100;
    GemueseGarten.COLS = GemueseGarten.WIDTH / GemueseGarten.CELL_SIZE;
    GemueseGarten.ROWS = GemueseGarten.HEIGHT / GemueseGarten.CELL_SIZE;
    const chooserImagesIds = [
        "iconCarrot", "iconPotato", "iconBeetRoot", "iconMelon", "iconRedOnion",
        "iconHarvester", "iconPesticide", "iconFertilizer", "iconWater"
    ];
    let selectableObjects;
    let selectedImg;
    //===== Canvas-Variablen =====
    let canvas;
    let chooserImages = new Array();
    let clickedCanvasCell;
    //===== Working =====
    function workWithTool() {
        let tool = GemueseGarten.GameObjectFactory.new(selectedImg, clickedCanvasCell);
        tool.work();
    }
    function plantSapling() {
        if (GemueseGarten.plantedSaplings[getSaplingIndex(clickedCanvasCell)] instanceof GemueseGarten.GameObject) {
            return;
        }
        let buyingPrice = 0;
        switch (selectedImg.id) { //Im Switch-Case wird anhand der Id überprüft, welcher Setzling ausgewählt wird und die variable buyingPrice erhält den Preis für den jewiligen Setzling.
            case "iconCarrot":
                buyingPrice = GemueseGarten.market.getCarrotCost();
                break;
            case "iconPotato":
                buyingPrice = GemueseGarten.market.getPotatoCost();
                break;
            case "iconBeetRoot":
                buyingPrice = GemueseGarten.market.getBeetRootCost();
                break;
            case "iconMelon":
                buyingPrice = GemueseGarten.market.getMelonCost();
                break;
            case "iconRedOnion":
                buyingPrice = GemueseGarten.market.getRedOnionCost();
                break;
        }
        if (GemueseGarten.player.getMoney() - buyingPrice < 0) { //Überprüft, ob der Nutzer mit dem Kauf das Kapital 0 erreicht - falls es kleiner als 0 wäre, kann der Nutzer nicht einkaufen.
            alert("Dein Kapital reicht dafür nicht aus!"); //Rückmeldung für den Nutzer, warum sein Kauf nicht ausgeführt werden kann.
            return;
        }
        let sapling = GemueseGarten.GameObjectFactory.new(selectedImg, clickedCanvasCell);
        GemueseGarten.player.setMoney(GemueseGarten.player.getMoney() - buyingPrice); //Der Preis für den Setzling wird vom Kapital des Nutzers abgebucht.
        drawSapling(sapling, GemueseGarten.context); //Der Setzling wird auf dem Canvas gezeichnet
        GemueseGarten.plantedSaplings[getSaplingIndex(clickedCanvasCell)] = sapling;
    }
    function drawSapling(sapling, context) {
        let img = document.createElement("img");
        let width = 75;
        let height = 75;
        let xDraw = sapling.getCell()[1] * GemueseGarten.CELL_SIZE + GemueseGarten.CELL_SIZE / 2 - width / 2;
        let yDraw = sapling.getCell()[0] * GemueseGarten.CELL_SIZE + GemueseGarten.CELL_SIZE / 2 - height / 2;
        img.src = sapling.getSaplingImagePaths()[sapling.getGrowPhase()];
        img.onload = function () {
            context.drawImage(img, xDraw, yDraw, width, height);
        };
        sapling.drawDisaster();
        GemueseGarten.plantedSaplings[getSaplingIndex(sapling.getCell())] = sapling;
    }
    function getSaplingIndex(field) {
        return GemueseGarten.COLS * field[0] + field[1];
    }
    GemueseGarten.getSaplingIndex = getSaplingIndex;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //===== Canvas Zeichnen =====//
    function initCanvas() {
        canvas = document.getElementById("canvas"); //CRC wird von einem Canvas aufgefordert.
        GemueseGarten.context = canvas.getContext("2d");
        GemueseGarten.plantedSaplings = Array(40);
        drawFields();
    }
    function drawFields() {
        drawVerticalLines(GemueseGarten.context, GemueseGarten.COLS, GemueseGarten.HEIGHT, GemueseGarten.CELL_SIZE);
        drawHorizontalLines(GemueseGarten.context, GemueseGarten.ROWS, GemueseGarten.WIDTH, GemueseGarten.CELL_SIZE);
    }
    function drawVerticalLines(context, cols, length, fieldWidth) {
        for (let col = 0; col < cols; col++) {
            let beginX = (col + 1) * fieldWidth;
            let beginY = 0;
            let endX = beginX;
            let endY = beginY + length;
            drawLine(context, beginX, beginY, endX, endY);
        }
    }
    function drawHorizontalLines(context, rows, length, fieldHeight) {
        for (let row = 0; row < rows; row++) {
            let beginX = 0;
            let beginY = (row + 1) * fieldHeight;
            let endX = beginX + length;
            let endY = beginY;
            drawLine(context, beginX, beginY, endX, endY);
        }
    }
    function drawLine(context, beginX, beginY, endX, endY) {
        context.beginPath(); //Methoden zum Zeichnen des Canvas
        context.moveTo(beginX, beginY); //Methoden zum Zeichnen des Canvas
        context.lineTo(endX, endY); //Methoden zum Zeichnen des Canvas
        context.closePath(); //Methoden zum Zeichnen des Canvas
        context.stroke(); //Methoden zum Zeichnen des Canvas
    }
    function redraw() {
        GemueseGarten.context.clearRect(0, 0, GemueseGarten.WIDTH, GemueseGarten.HEIGHT); //Die Methode clearRect sorgt mit Hilfe der angegebenen Paramater dafür, dass die Pixel transparent gesetzt werden.
        drawFields();
        GemueseGarten.plantedSaplings.forEach(sapling => {
            if (sapling != undefined) {
                drawSapling(sapling, GemueseGarten.context);
            }
        });
    }
    GemueseGarten.redraw = redraw;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Anzeige Selected Tool/Sapling
    function selectSaplingTool(selectedImg) {
        clearImageSelection(); //Durch clearImageSelection wird die Auswahl wieder aufgehoben (sonst wären bei 5xmaligen auswählen alle grau)
        selectedImg.style.backgroundColor = "rgba(150, 150, 150, 0.75)"; //Das ausgewählte Tool/Sapling wird grau hinterlegt.
    }
    function clearImageSelection() {
        chooserImages.forEach(chooserImage => {
            chooserImage.style.backgroundColor = "transparent"; //Der Hintergrund wird wieder auf transparent gestellt.
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ===== Handler =====
    function handleCanvasClick(_event) {
        canvas = document.getElementById("canvas");
        canvas.addEventListener("click", (_event) => { clickCanvas(_event); });
    }
    function handleGameObjectClick(_event) {
        chooserImagesIds.forEach(id => {
            let clickedGameObject = document.getElementById(id);
            clickedGameObject.addEventListener("click", clickImage);
        });
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Pestezide und Dünger im Shop kaufen
    function handlePesticideButtonClick(_event) {
        let button = document.getElementById("buyPesticide"); //Den Button "Pestezide kaufen" auswählen.
        button.addEventListener("click", () => {
            if (GemueseGarten.player.getMoney() - GemueseGarten.market.getPesticideCost() < 0) {
                alert("Dein Kapital reicht nicht aus, um Pestiziden-Mittel zu kaufen."); //Alert Meldung, falls das Kapital beim Kauf des Rohstoffs unter 0 gehen würde + Funktionsende
                return;
            }
            GemueseGarten.player.setPesticide(GemueseGarten.player.getPesticide() + 1); //Anzahl des Pestiziden-Bestands nach Kaufe = "+1"
            GemueseGarten.player.setMoney(GemueseGarten.player.getMoney() - GemueseGarten.market.getPesticideCost()); //Der Preis des Pesziden-Mittels wird vom Kapital des Nutzers abgezogen.
        });
    }
    function handleFertilizerButtonClick(_event) {
        let button = document.getElementById("buyFertilizer");
        button.addEventListener("click", () => {
            if (GemueseGarten.player.getMoney() - GemueseGarten.market.getFertilizerCost() < 0) {
                alert("Dein Kapital reicht nicht aus, um Dünger zu kaufen.");
                return;
            }
            GemueseGarten.player.setFertilizer(GemueseGarten.player.getFertilizer() + 1);
            GemueseGarten.player.setMoney(GemueseGarten.player.getMoney() - GemueseGarten.market.getFertilizerCost());
        });
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Click auf dem Canvas soll eine Funktion auslösen
    function clickCanvas(event) {
        let mouseX = event.pageX;
        let mouseY = event.pageY;
        mouseX -= 100; // -100 weil das Event auf dem Canvas ausgelöst werden soll und das Canvas erst bei 100px beginnt - zu Beginn wurde so der ganze Bildschirm berechnet
        mouseY -= 100; // -100 weil das Event auf dem Canvas ausgelöst werden soll und das Canvas erst bei 100px beginnt.- zu Beginn wurde so der ganze Bildschirm berechnet
        clickedCanvasCell = GemueseGarten.Helper.getClickedCell(mouseX, mouseY);
        if (selectedImg == undefined) { //Sobald der Nutzer auf das Canvas gedrückt hat ohne eine Funktion auszuwählen, kam eine Error-Meldung in der Konsole.
            return;
        }
        else if (selectedImg.classList[0] === "sapling") {
            plantSapling();
        }
        else if (selectedImg.classList[0] === "tool") {
            workWithTool();
        }
    }
    function clickImage(event) {
        let imgElement = event.currentTarget;
        if (!chooserImages.includes(imgElement)) {
            chooserImages.push(imgElement);
        }
        if (!selectableObjects.has(imgElement.id)) {
            selectableObjects.set(imgElement.id, imgElement);
        }
        selectSaplingTool(imgElement);
        selectedImg = imgElement;
    }
    window.onload = function (event) {
        handleCanvasClick(event);
        handleGameObjectClick(event);
        handlePesticideButtonClick(event);
        handleFertilizerButtonClick(event);
        selectableObjects = new Map();
        initCanvas();
        GemueseGarten.player = new GemueseGarten.Player();
        GemueseGarten.market = new GemueseGarten.Market();
        GemueseGarten.market.updatePrices();
        let url = window.location.href;
        let search = url.split("?")[1];
        let vars = search.split("&");
        //console.log(vars);
        let currentCapital = vars[0].split("=")[1];
        let currentPriceRange = vars[1].split("=")[1];
        GemueseGarten.player.setMoney(parseInt(currentCapital) * 100);
        GemueseGarten.market.setPriceRange(parseFloat(currentPriceRange));
        console.log("Test2");
    };
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=gamepage.js.map
"use strict";
var GemuseKarten;
(function (GemuseKarten) {
    console.log("test12345");
    let SaplingType;
    (function (SaplingType) {
        SaplingType[SaplingType["EMPTY"] = -1] = "EMPTY";
        SaplingType[SaplingType["POTATO"] = 0] = "POTATO";
        SaplingType[SaplingType["REDONION"] = 1] = "REDONION";
        SaplingType[SaplingType["MELON"] = 2] = "MELON";
        SaplingType[SaplingType["REDBEET"] = 3] = "REDBEET";
        SaplingType[SaplingType["CARROT"] = 4] = "CARROT";
    })(SaplingType || (SaplingType = {}));
    //TODO Marktklasse erstellen mit neuen Preisen
    class Sapling {
        saplingImgDir = "./Assets/Seeds/";
        imgPhaseNames;
        saplingType;
        saplingImage;
        saplingPriceInCent;
        saplingGrowTimes;
        field;
        currentSaplingPhase;
        context;
        canGrow;
        constructor(saplingType, saplingPriceInCent, saplingGrowTimes, field, imgNames, img, context) {
            this.saplingType = saplingType;
            this.saplingPriceInCent = saplingPriceInCent;
            this.saplingImage = img;
            this.imgPhaseNames = new Array();
            imgNames.forEach(imgName => {
                this.imgPhaseNames.push(this.saplingImgDir + imgName + ".png");
            });
            this.saplingGrowTimes = saplingGrowTimes;
            this.field = field;
            this.currentSaplingPhase = 0;
            this.context = context;
            this.canGrow = true;
            setInterval(() => { this.grow(); }, 1000);
            setInterval(() => { this.dry(); }, 1000);
            setInterval(() => { this.needsFertilizer(); }, 1000);
            setInterval(() => { this.needsPesticide(); }, 1000);
        }
        getImgPhaseNames() {
            return this.imgPhaseNames;
        }
        getSaplingType() {
            return this.saplingType;
        }
        getSaplingImage() {
            return this.saplingImage;
        }
        getSaplingPriceInCent() {
            return this.saplingPriceInCent;
        }
        getSaplingGrowTimes() {
            return this.saplingGrowTimes;
        }
        getField() {
            return this.field;
        }
        getCurrentSaplingPhase() {
            return this.currentSaplingPhase;
        }
        setCanGrow(canGrow) {
            this.canGrow = canGrow;
        }
        increaseCurrentSaplingPhase() {
            if (this.currentSaplingPhase < 4) {
                this.currentSaplingPhase++;
            }
        }
        grow() {
            if (this.currentSaplingPhase >= 3 || !this.canGrow) {
                return;
            }
            console.log("grow: " + this.field);
            this.currentSaplingPhase++;
            setTimeout(() => { this.grow(); }, this.saplingGrowTimes[this.currentSaplingPhase]);
            redraw(this.context);
        }
        dry() {
            let probability = 0.15; //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
            let val = Math.random();
            if (val <= probability) {
                this.canGrow = false;
                console.log("Setzling vertrocknet");
            }
        }
        needsFertilizer() {
            let probability = 0.075; //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
            let val = Math.random();
            if (val <= probability) {
                this.canGrow = false;
                console.log("Braucht Dünger");
            }
        }
        needsPesticide() {
            let probability = 0.05; //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
            let val = Math.random();
            if (val <= probability) {
                this.canGrow = false;
                console.log("Braucht Dünger");
            }
        }
    }
    const PATCH_COLS = 8;
    const PATCH_ROWS = 5;
    //===== Canvas-Konstanten ======
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 500;
    const FIELD_SIZE = 100;
    //===== Canvas-Variablen =====
    let canvas;
    let context;
    let currentSaplingImg = undefined;
    let currentTool = undefined;
    let chooserImages = new Array();
    let patch = Array(40).fill(undefined);
    let currentSaplingType = SaplingType.EMPTY;
    //===== Markt-Variablen =====
    let currentCapital = 50;
    let currentPriceRange = 0.6;
    let fertilizerAmount = 0;
    //TODO: Variablen für andere Gemüse anlegen, und auskommentieren
    let currentPriceCarrot = 60;
    let maxPriceCarrot = 60;
    let minPriceCarrot = 20;
    let priceChangeRateMin = 1;
    let priceChangeRateMax = 15;
    /*let currentPricePotato: number;
    let currentPriceMelon: number;
    
    let currentPriceRedOnion: number;
    let currentPriceRedBeet: number;
    */
    function calculatePrice(decreasePrice) {
        if (currentPriceCarrot >= maxPriceCarrot && !decreasePrice) { //Max Price kann nicht erhöht werden & Min Price kann nicht verringert werden.
            return;
        }
        if (currentPriceCarrot <= minPriceCarrot && decreasePrice) {
            return;
        }
        let factor = 1;
        if (decreasePrice) {
            factor = -1;
        }
        let priceCarrotCash = document.getElementById("priceCarrotCash");
        let change = ((Math.floor(Math.random() * (priceChangeRateMax - priceChangeRateMin + 1)) + priceChangeRateMin));
        currentPriceCarrot += change * factor; //return Math.floor(Math.random() * (Maximale Preis - Minimalen Preis + 1) ) + minimalen Preis / 10 (Dezimalzahl)
        priceCarrotCash.innerHTML = clamp(currentPriceCarrot, minPriceCarrot, maxPriceCarrot).toString(); //toFixed sorgt dafür, dass nur 2 Nachkommastellen angezeigt werden (Rundungsfehler)
        console.log("change: " + change);
        console.log(currentPriceCarrot);
    }
    function clamp(value, min, max) {
        if (value < min) { //Wenn Wert kurzzeitig unter Min geht, wird er anschließend wieder auf den Mindestwert (20) gesetzt.
            value = min;
        }
        if (value > max) {
            value = max;
        }
        return value;
    }
    function handlePriceChange() {
        let probability = 1; //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
        let val = Math.random();
        if (val <= probability) {
            calculatePrice(true);
        }
    }
    //Alle Funktionen beim Starten der Seite Laden (Problem 08.07, ich musste alles Doppelt anklicken)
    window.onload = function (event) {
        handleCanvasClick(event);
        //Sapling
        handlePotatoClick(event);
        handleCarrotClick(event);
        handleWaterMelonClick(event);
        handleBeetRootClick(event);
        handleRedOnionClick(event);
        selectHarvest(event);
        selectWatering(event);
        selectFortizize(event);
        selectFightPest(event);
        addButtonEvent(event);
        selectFertilizer(event);
        hideMainPage();
        init();
    };
    document.addEventListener("change", setPriceRange);
    document.addEventListener("change", setCurrentCapital);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //LANDINGPAGE SHOW & HIDDEN
    function hideMainPage() {
        let secondPage = document.getElementById("secondPage");
        secondPage.style.display = "none"; //Die Mainpage wird über .style ausgeblendet, damit die Settings sichtbar sind.
    }
    function addButtonEvent(_event) {
        let startButton = document.querySelector("#startGame");
        startButton.addEventListener("click", showMainPage); //Durch Klick auf den "Spiel Starten!" - Button wird die Funktion aufgerufen, dass die Settingsseite verschwindet.
    }
    function showMainPage(_event) {
        let secondPage = document.getElementById("secondPage"); //Die beiden DIVS mit den Inhalten aus Page 1 und 2 werden angesprochen.
        let firstPage = document.getElementById("settings");
        secondPage.style.display = "unset"; //Das style Attribut wird bei den beiden DIVS vertauscht - Settings unsichbar - MainPage sichtbar
        firstPage.style.display = "none";
        setInterval(handlePriceChange, 1000);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Spieleinstellungen auf der Landing-Page einstellen + in den Kapital-Wert auf der Spielpage einsetzen.
    //Kapital über Regler einstellen und Werte speichern.
    function setCurrentCapital(event) {
        let capital = Number(event.currentTarget.activeElement.value);
        currentCapital = capital * 100;
        console.log(currentCapital);
        document.getElementById("amountOnPage").innerHTML = currentCapital.toString();
        document.getElementById("currentCapital").innerHTML = currentCapital.toString();
    }
    //Preisschwankungen über Regler einstellen.
    function setPriceRange(event) {
        let priceRange = Number(event.currentTarget.activeElement.value);
        currentPriceRange = priceRange;
        console.log(priceRange);
        document.getElementById("priceRangeOnPage").innerHTML = currentPriceRange.toString();
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //TODO: Funktion läuft unsichtbar weiter, auch wenn das Kapital 0 ist.
    //Dünger-Mittel aus dem Shop kaufen + Invetar Gutschrift - ShopKaital
    //Dünger verwenden (Theoretische Funktion - funktioniert)
    function selectFertilizer(_event) {
        let chooseFertiliizer = document.querySelector("#testUse");
        chooseFertiliizer.addEventListener("click", useFertilizer);
    }
    function useFertilizer(_event) {
        fertilizerAmount--;
        document.getElementById("amountFertilizier").innerHTML = fertilizerAmount.toString();
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Werkzeuge bzw. Aktionen auswählen.
    function selectTool(selectedTool) {
        if (currentTool != undefined) {
            currentTool.style.backgroundColor = "transparent";
        }
        currentTool = selectedTool;
        currentTool.style.backgroundColor = "rgba(150, 150, 150, 0.75)"; //Hintergrund des ausgewählten Werkzeugs grau markieren.
        console.log(currentTool);
    }
    //Aktion Ernten auswählen.
    function selectHarvest(_event) {
        let selectHarvestSeed = document.querySelector("img#iconHarvest"); //Erntewerkzeug aus dem DOM ansprechen.
        selectHarvestSeed.addEventListener("click", clickHarvest);
    }
    function clickHarvest(_event) {
        selectTool(_event.currentTarget);
    }
    //Aktion Gießen auswählen.
    function selectWatering(_event) {
        let selectWateringSeed = document.querySelector("img#iconWatering");
        selectWateringSeed.addEventListener("click", clickWatering);
    }
    function clickWatering(_event) {
        selectTool(_event.currentTarget);
    }
    //Aktion Düngern auswählen.
    function selectFortizize(_event) {
        let selectFortizizedSeed = document.querySelector("img#iconFortizizePlants");
        selectFortizizedSeed.addEventListener("click", clickFortizize);
    }
    function clickFortizize(_event) {
        selectTool(_event.currentTarget);
    }
    //Aktion Schädling bekämpfen auswählen.
    function selectFightPest(_event) {
        let selectFightPestSeed = document.querySelector("img#iconFightPest");
        selectFightPestSeed.addEventListener("click", clickFightPest);
    }
    function clickFightPest(_event) {
        selectTool(_event.currentTarget);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Die verschiedenen Gemüsesorten auswählen.
    //TODO: ergänzen der Gemüseauswahl
    function selectSapling(selectedSapling) {
        clearImageSelection();
        currentSaplingImg = selectedSapling;
        currentSaplingImg.style.backgroundColor = "rgba(150, 150, 150, 0.75)";
        switch (currentSaplingImg.id) {
            case "iconCarrot":
                currentSaplingType = SaplingType.CARROT;
                break;
            case "iconPotato":
                currentSaplingType = SaplingType.POTATO;
                break;
        }
        console.log(currentSaplingType);
    }
    function clearImageSelection() {
        chooserImages.forEach(chooserImage => {
            chooserImage.style.backgroundColor = "transparent";
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Das Erntefeld (Canvas) generieren.
    function init() {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        drawFields(5, 8);
        console.log("init");
    }
    function plantSapling(event) {
        let mouseX = event.pageX;
        let mouseY = event.pageY;
        mouseX -= 100;
        mouseY -= 100;
        let field = getClickedField(mouseX, mouseY);
        let sapling = newSapling(field);
        let currentPatchField = patch[PATCH_COLS * field[0] + field[1]];
        if (currentPatchField == undefined && sapling != undefined) {
            drawSapling(sapling, context);
            event = undefined;
            currentCapital = decreaseCapital(currentCapital, sapling.getSaplingPriceInCent());
        }
    }
    function decreaseCapital(value, decrease) {
        let currentCapitalElement = document.getElementById("currentCapital");
        value -= decrease;
        currentCapitalElement.innerHTML = value.toString();
        return value;
    }
    //TODO: alle Saplings ergänzen
    function newSapling(field) {
        let sapling;
        switch (currentSaplingType) {
            case SaplingType.CARROT:
                sapling = new Sapling(currentSaplingType, currentPriceCarrot, [3000, 3000, 3000, 3000], field, ["carrot1", "carrot2", "carrot3", "carrot4"], currentSaplingImg, context);
                break;
            case SaplingType.POTATO:
                sapling = new Sapling(currentSaplingType, currentPriceCarrot, [5000, 5000, 5000, 5000], field, ["potato1", "potato2", "potato3", "potato4"], currentSaplingImg, context); //TODO potato price ändern
                break;
            default:
                return undefined;
        }
        return sapling;
    }
    function drawSapling(sapling, context) {
        let img = document.createElement("img");
        let width = 75;
        let height = 75;
        let xDraw = sapling.getField()[1] * FIELD_SIZE + FIELD_SIZE / 2 - width / 2;
        let yDraw = sapling.getField()[0] * FIELD_SIZE + FIELD_SIZE / 2 - height / 2;
        img.src = sapling.getImgPhaseNames()[sapling.getCurrentSaplingPhase()];
        img.alt = "Sapling";
        img.onload = function () {
            context.drawImage(img, xDraw, yDraw, width, height);
        };
        context.drawImage(img, xDraw, yDraw, width, height);
        patch[PATCH_COLS * sapling.getField()[0] + sapling.getField()[1]] = sapling;
        console.log("Setzling gepflanzt");
    }
    function getClickedField(x, y) {
        let row = Math.floor(y / FIELD_SIZE);
        let col = Math.floor(x / FIELD_SIZE);
        return [row, col];
    }
    function drawFields(rows, cols) {
        drawVerticalLines(context, cols, CANVAS_HEIGHT, FIELD_SIZE);
        drawHorizontalLines(context, rows, CANVAS_WIDTH, FIELD_SIZE);
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
        context.beginPath();
        context.moveTo(beginX, beginY);
        context.lineTo(endX, endY);
        context.closePath();
        context.stroke();
    }
    function redraw(context) {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        drawFields(PATCH_ROWS, PATCH_COLS);
        patch.forEach(sapling => {
            if (sapling != undefined) {
                switch (sapling.getSaplingType()) {
                    case SaplingType.CARROT:
                        drawSapling(sapling, context);
                        break;
                    default:
                        break;
                }
            }
        });
    }
    // ===== Handler =====
    function handleCanvasClick(_event) {
        canvas = document.getElementById("canvas");
        canvas.addEventListener("click", (event) => { plantSapling(event); });
    }
    //Kartoffeln auswählen
    function handlePotatoClick(_event) {
        let choosePotato = document.querySelector("img#iconPotato");
        choosePotato.addEventListener("click", clickImage);
    }
    //Rote-Zwiebeln auswählen
    function handleRedOnionClick(_event) {
        let chooseRedOnion = document.querySelector("img#iconRedonion");
        chooseRedOnion.addEventListener("click", clickImage);
    }
    //Melonen auswählen
    function handleWaterMelonClick(_event) {
        let chooseWaterMelon = document.querySelector("img#iconMelon");
        chooseWaterMelon.addEventListener("click", clickImage);
    }
    //RoteBeete auswählen
    function handleBeetRootClick(_event) {
        let chooseRedBeet = document.querySelector("img#iconBeetroot");
        chooseRedBeet.addEventListener("click", clickImage);
    }
    //Karotte auswählen
    function handleCarrotClick(_event) {
        let chooseWaterMelon = document.querySelector("img#iconCarrot");
        chooseWaterMelon.addEventListener("click", clickImage);
    }
    function clickImage(event) {
        let imgElement = event.currentTarget;
        chooserImages.push(imgElement);
        selectSapling(imgElement);
    }
})(GemuseKarten || (GemuseKarten = {}));
//# sourceMappingURL=script.js.map
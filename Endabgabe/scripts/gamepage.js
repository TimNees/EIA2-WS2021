"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    let SaplingType;
    (function (SaplingType) {
        SaplingType[SaplingType["EMPTY"] = -1] = "EMPTY";
        SaplingType[SaplingType["POTATO"] = 0] = "POTATO";
        SaplingType[SaplingType["REDONION"] = 1] = "REDONION";
        SaplingType[SaplingType["MELON"] = 2] = "MELON";
        SaplingType[SaplingType["BEETROOT"] = 3] = "BEETROOT";
        SaplingType[SaplingType["CARROT"] = 4] = "CARROT";
    })(SaplingType || (SaplingType = {}));
    let ToolType;
    (function (ToolType) {
        ToolType[ToolType["EMPTY"] = -1] = "EMPTY";
        ToolType[ToolType["HARVEST"] = 0] = "HARVEST";
        ToolType[ToolType["WATER"] = 1] = "WATER";
        ToolType[ToolType["FERTILIZER"] = 2] = "FERTILIZER";
        ToolType[ToolType["PESTICIDE"] = 3] = "PESTICIDE";
    })(ToolType || (ToolType = {}));
    //Alle Funktionen beim Starten der Seite Laden (Problem 08.07, ich musste alles Doppelt anklicken)
    window.onload = function (event) {
        handleCanvasClick(event);
        //Sapling
        handlePotatoClick(event);
        handleCarrotClick(event);
        handleWaterMelonClick(event);
        handleBeetRootClick(event);
        handleRedOnionClick(event);
        //Tools
        handleHarvestClick(event);
    };
    //===== Canvas-Variablen =====
    let canvas;
    let currentSaplingImg = undefined;
    let chooserImages = new Array();
    let currentSaplingType = SaplingType.EMPTY;
    //===== Tools-Variablen =====
    let currentToolType = ToolType.EMPTY;
    let game = new GemueseGarten.Game();
    //TODO: ergänzen der Gemüseauswahl
    function selectSaplingTool(selectedImg) {
        clearImageSelection();
        selectedImg.style.backgroundColor = "rgba(150, 150, 150, 0.75)";
        currentSaplingType = SaplingType.EMPTY;
        currentToolType = ToolType.EMPTY;
        console.log(currentSaplingType);
        console.log(currentToolType);
        switch (currentSaplingImg.id) {
            case "iconPotato":
                currentSaplingType = SaplingType.POTATO;
                break;
            case "iconRedonion":
                currentSaplingType = SaplingType.REDONION;
                break;
            case "iconMelon":
                currentSaplingType = SaplingType.MELON;
                break;
            case "iconBeetroot":
                currentSaplingType = SaplingType.BEETROOT;
                break;
            case "iconCarrot":
                currentSaplingType = SaplingType.CARROT;
                break;
            case "iconHarvest":
                currentToolType = ToolType.HARVEST;
                break;
        }
    }
    function clearImageSelection() {
        chooserImages.forEach(chooserImage => {
            chooserImage.style.backgroundColor = "transparent";
        });
    }
    //TODO: alle Saplings ergänzen
    // ===== Handler =====
    function handleCanvasClick(_event) {
        canvas = document.getElementById("canvas");
        canvas.addEventListener("click", (event) => { game.getPlayer().workOnField(event, undefined, undefined); });
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
    //Karotte auswählen
    function handleHarvestClick(_event) {
        let chooseHarvestTool = document.querySelector("img#iconHarvest");
        chooseHarvestTool.addEventListener("click", clickImage);
    }
    function clickImage(event) {
        let imgElement = event.currentTarget;
        chooserImages.push(imgElement);
        selectSaplingTool(imgElement);
    }
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=gamepage.js.map
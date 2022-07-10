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
    class Sapling {
        saplingImgDir = "./Assets/Seeds/";
        imgNames;
        saplingType;
        constructor(imgNames, saplingType) {
            this.imgNames = imgNames;
            this.saplingType = saplingType;
        }
    }
    let patch = [
        [SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY],
        [SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY],
        [SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY],
        [SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY],
        [SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY]
    ];
    let currentCapital = 50;
    let currentPriceRange = 0.60;
    let fieldSize = 100;
    let width = 800;
    let height = 500;
    let canvas;
    let context;
    let currentSap = SaplingType.EMPTY;
    let currentSapling = undefined;
    let currentSaplingImg = "";
    let currentTool = undefined;
    let moneyCount = 50;
    let pestizideAmount = 0;
    let saplingAmount = 0;
    let fertilizerAmount = 0;
    //TODO: Preisschwankungen bei 0.20 Cent, 0.40 Cent u nd 60
    let pricePotato = 0.7;
    let pricePotato20 = [0.50, 0.70, 0.90];
    let pricePotato40 = [0.30, 0.70, 1.10];
    let pricePotato60 = [0.10, 0.70, 1.30];
    let priceRedOnion = 0.6;
    let priceMelon = 0.5;
    let priceBeetRoot = 0.8;
    let priceCarrot = 0.5;
    let priceFertilizer = 0.5;
    let pricePesticides = 0.5;
    let priceSeeds = 0.5;
    /*
//VARIABLEN FÜR WACHSTUMSZEIT, BEDARF WASSER, BEDARF DÜNGER ETC //TODO:

Potato
let growingTime: number = 15s
let needWater: number = 2;
let needFertilizer: number =1;


    */
    //Alle Funktionen beim Starten der Seite Laden (Problem 08.07, ich musste alles Doppelt anklicken)
    window.onload = function (event) {
        handleCanvasClick(event);
        handlePotatoClick(event);
        handleCarrotClick(event);
        handleWaterMelonClick(event);
        handleBeetRootClick(event);
        handleRedOnionClick(event);
        buyFertilizer(event);
        buyPestizide(event);
        buySaplings(event);
        selectHarvest(event);
        selectWatering(event);
        selectFortizize(event);
        selectFightPest(event);
        chooseSellPotato(event);
        chooseSellCarrot(event);
        chooseSellMelon(event);
        addButtonEvent(event);
        choosepricePotato(event);
        selectFertilizer(event);
        selectPestizide(event);
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
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Spieleinstellungen auf der Landing-Page einstellen + in den Kapital-Wert auf der Spielpage einsetzen.
    //Kapital über Regler einstellen und Werte speichern.
    function setCurrentCapital(event) {
        let capital = Number(event.currentTarget.activeElement.value);
        currentCapital = capital;
        console.log(currentCapital);
        document.getElementById("amountOnPage").innerHTML = currentCapital.toString();
        document.getElementById("kapitalAmount").innerHTML = currentCapital.toString();
        moneyCount = capital; //moneycount wird zu dem Wert aus dem Regler, somit mit das Aktuelle Kapital für die restlichen Funktionen.
    }
    //Preisschwankungen über Regler einstellen.
    function setPriceRange(event) {
        let priceRange = Number(event.currentTarget.activeElement.value);
        currentPriceRange = priceRange;
        console.log(priceRange);
        document.getElementById("priceRangeOnPage").innerHTML = currentPriceRange.toString();
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //TODO: RANDOM WERT AUS ARRAY AUSGEBEN LASSEN, der SICH NACH EINER ZEIT WIEDER ÄNDERT
    //Preis anzeigen
    function choosepricePotato(_event) {
        let sellTestCarrot = document.querySelector("#anotherTestButton");
        sellTestCarrot.addEventListener("click", giveOutPricePotato);
    }
    function giveOutPricePotato(_event) {
        document.getElementById("pricePotatoCash").innerHTML = pricePotato20.toString();
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //TODO: Funktion läuft unsichtbar weiter, auch wenn das Kapital 0 ist.
    //Dünger-Mittel aus dem Shop kaufen + Invetar Gutschrift - ShopKaital
    function buyFertilizer(_event) {
        let shopFertilizer = document.querySelector("#buyFertilizer"); //Kauf-Button aus dem DOM ansprechen.
        shopFertilizer.addEventListener("click", buyFertilizerFunction); //Eventlistener mit dem Event "click" - für die buySeedsFunction.
    }
    function buyFertilizerFunction(_event) {
        let actualMoney = moneyCount - priceFertilizer; //Einfache Rechnung der Variablen um aktualiserten Bedarf nach Kauf zu erlangen.
        fertilizerAmount++; //Inventarbestand wird erhöht.
        moneyCount = actualMoney; //Oben deklarierte Varibale moneyCount wird durch die Rechnung acutalMoney getauscht.
        if (actualMoney < 0) { //If Anweisung, um zu überprüfen, ob das Kapital bei 0 liegt.
            alert("Du hast kein Geld mehr!"); //Meldung, damit der Spieler aufgrund des Kapitals keine weiteren Rohstoffe mehr kaufen kann.
            return; //Zurück zur Funktion, der Wert vom Kapital ist 0.
        }
        else {
            document.getElementById("amountFertilizier").innerHTML = fertilizerAmount.toString(); //Aktualisierten Inventarbestand im DOM ändern.
            document.getElementById("kapitalAmount").innerHTML = actualMoney.toString(); //Aktualisertes Kapital im DOM ändern.
        }
    }
    //Dünger verwenden (Theoretische Funktion - funktioniert)
    function selectFertilizer(_event) {
        let chooseFertiliizer = document.querySelector("#testUse");
        chooseFertiliizer.addEventListener("click", useFertilizer);
    }
    function useFertilizer(_event) {
        fertilizerAmount--;
        document.getElementById("amountFertilizier").innerHTML = fertilizerAmount.toString();
    }
    //Pestiziden-Mittel aus dem Shop kaufen + Invetar Gutschrift - ShopKaital
    function buyPestizide(_event) {
        let shopPestizide = document.querySelector("#buyPestizide");
        shopPestizide.addEventListener("click", buyPestizideFunction);
    }
    function buyPestizideFunction(_event) {
        let actualMoney = moneyCount - pricePesticides;
        pestizideAmount++;
        moneyCount = actualMoney;
        if (actualMoney < 0) {
            alert("Du hast kein Geld mehr!");
            return;
        }
        else {
            document.getElementById("amountPestizide").innerHTML = pestizideAmount.toString();
            document.getElementById("kapitalAmount").innerHTML = actualMoney.toString();
        }
    }
    //Pestiziden-Mittel verwenden (Theoretische Funktion - funktioniert)
    function selectPestizide(_event) {
        let chooseFertiliizer = document.querySelector("#testUse2");
        chooseFertiliizer.addEventListener("click", usePestizide);
    }
    function usePestizide(_event) {
        pestizideAmount--;
        document.getElementById("amountPestizide").innerHTML = pestizideAmount.toString();
    }
    //Setzlinge aus dem Shop kaufen + Invetar Gutschrift - ShopKaital
    function buySaplings(_event) {
        let shopSappling = document.querySelector("#buySapling");
        shopSappling.addEventListener("click", buySaplingFunction);
    }
    function buySaplingFunction(_event) {
        let actualMoney = moneyCount - priceSeeds;
        saplingAmount++;
        moneyCount = actualMoney;
        if (moneyCount < 0) {
            alert("Du hast kein Cash mehr!");
            return;
        }
        else {
            document.getElementById("amountSaplingCount").innerHTML = saplingAmount.toString();
            document.getElementById("kapitalAmount").innerHTML = actualMoney.toString();
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //GEMÜSE VERKAUFEN (SOON ERNTEN) + KAPITAL GUTSCHRIFT / VERLUST
    //Karotte verkaufen            + Kapital Gutschrift
    function chooseSellCarrot(_event) {
        let sellTestCarrot = document.querySelector("#sellCarrot");
        sellTestCarrot.addEventListener("click", sellCarrot);
    }
    function sellCarrot(_event) {
        let actualMoney = moneyCount + priceCarrot; //Einfache Rechnung der Variablen um aktualisertes Kapital nach Verkauf zu erlangen.           
        moneyCount = actualMoney;
        document.getElementById("kapitalAmount").innerHTML = actualMoney.toString();
        //if (moneyCount > 50.50) {
        //alert("Du hast deine ersten 55€ erwirtschaftet!");
        //}
    }
    //Potato Verkaufen + Kapital Gutschrift
    function chooseSellPotato(_event) {
        let sellTestCarrot = document.querySelector("#sellPotato");
        sellTestCarrot.addEventListener("click", sellPotato);
    }
    function sellPotato(_event) {
        let actualMoney = moneyCount + pricePotato;
        moneyCount = actualMoney;
        document.getElementById("kapitalAmount").innerHTML = actualMoney.toString();
        //if (moneyCount > 50.50) {
        //    alert("Du hast deine ersten 55€ erwirtschaftet!");
        //}
    }
    //Melone Verkaufen + Kapital Gutschrift
    function chooseSellMelon(_event) {
        let sellTestMelon = document.querySelector("#sellMelon");
        sellTestMelon.addEventListener("click", sellMelon);
    }
    function sellMelon(_event) {
        let actualMoney = moneyCount + priceMelon;
        moneyCount = actualMoney;
        document.getElementById("kapitalAmount").innerHTML = actualMoney.toString();
        //if (moneyCount > 50.50) {
        //    alert("Du hast deine ersten 55€ erwirtschaftet!");
        //}
    }
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
    function selectSapling(selectedSapling) {
        if (currentSapling != undefined) {
            currentSapling.style.backgroundColor = "transparent";
        }
        currentSapling = selectedSapling;
        currentSapling.style.backgroundColor = "rgba(150, 150, 150, 0.75)";
        console.log(currentSapling);
    }
    function handleCanvasClick(_event) {
        canvas = document.getElementById("canvas");
        canvas.addEventListener("click", (event) => { plantSapling(event); });
    }
    //Kartoffeln auswählen
    function handlePotatoClick(_event) {
        let choosePotato = document.querySelector("img#iconPotato");
        choosePotato.addEventListener("click", clickPotato);
    }
    function clickPotato(event) {
        let imgElement = event.currentTarget;
        selectSapling(imgElement);
        console.log(currentSaplingImg);
        currentSaplingImg = imgElement.src;
    }
    //Rote-Zwiebeln auswählen
    function handleRedOnionClick(_event) {
        let chooseRedOnion = document.querySelector("img#iconRedonion");
        chooseRedOnion.addEventListener("click", clickRedOnion);
    }
    function clickRedOnion(_event) {
        let imgElement = event.currentTarget;
        selectSapling(imgElement);
        console.log(currentSaplingImg);
        currentSaplingImg = imgElement.src;
    }
    //Melonen auswählen
    function handleWaterMelonClick(_event) {
        let chooseWaterMelon = document.querySelector("img#iconMelon");
        chooseWaterMelon.addEventListener("click", clickWaterMelon);
    }
    function clickWaterMelon(_event) {
        let imgElement = event.currentTarget;
        selectSapling(imgElement);
        console.log(currentSaplingImg);
        currentSaplingImg = imgElement.src;
    }
    //RoteBeete auswählen
    function handleBeetRootClick(_event) {
        let chooseWaterMelon = document.querySelector("img#iconBeetroot");
        chooseWaterMelon.addEventListener("click", clickBeetRoot);
    }
    function clickBeetRoot(_event) {
        let imgElement = event.currentTarget;
        selectSapling(imgElement);
        console.log(currentSaplingImg);
        currentSaplingImg = imgElement.src;
    }
    //Karotte auswählen
    function handleCarrotClick(_event) {
        let chooseWaterMelon = document.querySelector("img#iconCarrot");
        chooseWaterMelon.addEventListener("click", clickCarrot);
    }
    function clickCarrot(event) {
        let imgElement = event.currentTarget;
        selectSapling(imgElement);
        console.log(currentSaplingImg);
        currentSaplingImg = imgElement.src;
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
        //let canvas = <HTMLCanvasElement>document.getElementById("canvas");
        let mouseX = event.pageX;
        let mouseY = event.pageY;
        mouseX -= 100;
        mouseY -= 100;
        drawSapling(context, mouseX, mouseY);
        event = undefined;
    }
    function drawSapling(context, x, y) {
        let field = getClickedField(x, y);
        let sapling = patch[field[0]][field[1]];
        if (sapling == SaplingType.EMPTY) {
            let img = document.createElement("img");
            let width = 75;
            let height = 75;
            let xDraw = field[1] * fieldSize + fieldSize / 2 - width / 2;
            let yDraw = field[0] * fieldSize + fieldSize / 2 - height / 2;
            img.src = currentSaplingImg; //`./Assets/${imageName}`;
            context.drawImage(img, xDraw, yDraw, width, height);
            patch[field[0]][field[1]] = SaplingType.CARROT;
            console.log("Setzling gepflanzt");
        }
    }
    function getClickedField(x, y) {
        let row = Math.floor(y / fieldSize);
        let col = Math.floor(x / fieldSize);
        return [row, col];
    }
    function drawFields(rows, cols) {
        drawVerticalLines(context, cols, height, fieldSize);
        drawHorizontalLines(context, rows, width, fieldSize);
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
})(GemuseKarten || (GemuseKarten = {}));
//# sourceMappingURL=script.js.map
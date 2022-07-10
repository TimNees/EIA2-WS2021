
namespace GemuseKarten {
    console.log("test12345");

    enum SaplingType {
        EMPTY = -1,
        POTATO,
        REDONION,
        MELON,
        REDBEET,
        CARROT
    }

    class Sapling {
        private saplingImgDir: string = "./Assets/Seeds/";
        private imgNames: string[];
        private saplingType: SaplingType;

        constructor(imgNames: string[], saplingType: SaplingType) {
            this.imgNames = imgNames;
            this.saplingType = saplingType;
        }
    }

    let patch: SaplingType[][] = [
        [SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY],
        [SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY],
        [SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY],
        [SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY],
        [SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY, SaplingType.EMPTY]
    ];


    let currentCapital: number = 50;
    let currentPriceRange: number = 0.60;


    let fieldSize: number = 100;
    let width: number = 800;
    let height: number = 500;
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let currentSap: SaplingType = SaplingType.EMPTY;
    let currentSapling: HTMLImageElement = undefined;
    let currentSaplingImg: string = "";


    let currentTool: HTMLImageElement = undefined;



    let moneyCount: number = 50;
    let pestizideAmount: number = 0;
    let saplingAmount: number = 0;
    let fertilizerAmount: number = 0;


    //TODO: Preisschwankungen bei 0.20 Cent, 0.40 Cent u nd 60
    let pricePotato: number = 0.7;

    let pricePotato20: number[] = [0.50, 0.70, 0.90];
    let pricePotato40: number[] = [0.30, 0.70, 1.10];
    let pricePotato60: number[] = [0.10, 0.70, 1.30];


    let priceRedOnion: number = 0.6;
    let priceMelon: number = 0.5;
    let priceBeetRoot: number = 0.8;
    let priceCarrot: number = 0.5;

    let priceFertilizer: number = 0.5;
    let pricePesticides: number = 0.5;
    let priceSeeds: number = 0.5;

    /*
//VARIABLEN FÜR WACHSTUMSZEIT, BEDARF WASSER, BEDARF DÜNGER ETC //TODO:

Potato
let growingTime: number = 15s
let needWater: number = 2;
let needFertilizer: number =1;


    */

    //Alle Funktionen beim Starten der Seite Laden (Problem 08.07, ich musste alles Doppelt anklicken)
    window.onload = function (event: Event): void {
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
    function hideMainPage(): void {
        let secondPage: HTMLDivElement = <HTMLDivElement>document.getElementById("secondPage");
        secondPage.style.display = "none";                                                      //Die Mainpage wird über .style ausgeblendet, damit die Settings sichtbar sind.
    }

    function addButtonEvent(_event: Event): void {
        let startButton: HTMLElement = <HTMLElement>document.querySelector("#startGame");
        startButton.addEventListener("click", showMainPage);                                    //Durch Klick auf den "Spiel Starten!" - Button wird die Funktion aufgerufen, dass die Settingsseite verschwindet.
    }
    function showMainPage(_event: MouseEvent): void {
        let secondPage: HTMLDivElement = <HTMLDivElement>document.getElementById("secondPage"); //Die beiden DIVS mit den Inhalten aus Page 1 und 2 werden angesprochen.
        let firstPage: HTMLDivElement = <HTMLDivElement>document.getElementById("settings");
        secondPage.style.display = "unset";                                                     //Das style Attribut wird bei den beiden DIVS vertauscht - Settings unsichbar - MainPage sichtbar
        firstPage.style.display = "none";
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Spieleinstellungen auf der Landing-Page einstellen + in den Kapital-Wert auf der Spielpage einsetzen.


    //Kapital über Regler einstellen und Werte speichern.
    function setCurrentCapital(event: Event): void {
        let capital: number = Number(((event.currentTarget as Document).activeElement as HTMLInputElement).value);
        currentCapital = capital;
        console.log(currentCapital);
        document.getElementById("amountOnPage").innerHTML = currentCapital.toString();
        document.getElementById("kapitalAmount").innerHTML = currentCapital.toString();

        moneyCount = capital; //moneycount wird zu dem Wert aus dem Regler, somit mit das Aktuelle Kapital für die restlichen Funktionen.
    }


    //Preisschwankungen über Regler einstellen.
    function setPriceRange(event: Event): void {

        let priceRange: number = Number(((event.currentTarget as Document).activeElement as HTMLInputElement).value);
        currentPriceRange = priceRange;
        console.log(priceRange);
        document.getElementById("priceRangeOnPage").innerHTML = currentPriceRange.toString();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //TODO: RANDOM WERT AUS ARRAY AUSGEBEN LASSEN, der SICH NACH EINER ZEIT WIEDER ÄNDERT

    //Preis anzeigen
    function choosepricePotato(_event: Event): void {
        let sellTestCarrot: HTMLElement = document.querySelector("#anotherTestButton");
        sellTestCarrot.addEventListener("click", giveOutPricePotato);
    }

    function giveOutPricePotato(_event: Event): void {
        document.getElementById("pricePotatoCash").innerHTML = pricePotato20.toString();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //TODO: Funktion läuft unsichtbar weiter, auch wenn das Kapital 0 ist.

    //Dünger-Mittel aus dem Shop kaufen + Invetar Gutschrift - ShopKaital

    function buyFertilizer(_event: Event): void {
        let shopFertilizer: HTMLElement = <HTMLElement>document.querySelector("#buyFertilizer");      //Kauf-Button aus dem DOM ansprechen.
        shopFertilizer.addEventListener("click", buyFertilizerFunction);                              //Eventlistener mit dem Event "click" - für die buySeedsFunction.
    }
    function buyFertilizerFunction(_event: MouseEvent): void {
        let actualMoney: number = moneyCount - priceFertilizer; //Einfache Rechnung der Variablen um aktualiserten Bedarf nach Kauf zu erlangen.
        fertilizerAmount++;                                     //Inventarbestand wird erhöht.
        moneyCount = actualMoney;                               //Oben deklarierte Varibale moneyCount wird durch die Rechnung acutalMoney getauscht.
        if (actualMoney < 0) {                                  //If Anweisung, um zu überprüfen, ob das Kapital bei 0 liegt.
            alert("Du hast kein Geld mehr!");                   //Meldung, damit der Spieler aufgrund des Kapitals keine weiteren Rohstoffe mehr kaufen kann.
            return;                                             //Zurück zur Funktion, der Wert vom Kapital ist 0.
        } else {
            document.getElementById("amountFertilizier").innerHTML = fertilizerAmount.toString();   //Aktualisierten Inventarbestand im DOM ändern.
            document.getElementById("kapitalAmount").innerHTML = actualMoney.toString();             //Aktualisertes Kapital im DOM ändern.
        }
    }


    //Dünger verwenden (Theoretische Funktion - funktioniert)
    function selectFertilizer(_event: Event): void {
        let chooseFertiliizer: HTMLElement = <HTMLElement>document.querySelector("#testUse");
        chooseFertiliizer.addEventListener("click", useFertilizer);
    }

    function useFertilizer(_event: MouseEvent): void {
        fertilizerAmount--;
        document.getElementById("amountFertilizier").innerHTML = fertilizerAmount.toString();
    }


    //Pestiziden-Mittel aus dem Shop kaufen + Invetar Gutschrift - ShopKaital

    function buyPestizide(_event: Event): void {
        let shopPestizide: HTMLElement = <HTMLElement>document.querySelector("#buyPestizide");
        shopPestizide.addEventListener("click", buyPestizideFunction);
    }
    function buyPestizideFunction(_event: MouseEvent): void {
        let actualMoney: number = moneyCount - pricePesticides;
        pestizideAmount++;
        moneyCount = actualMoney;
        if (actualMoney < 0) {
            alert("Du hast kein Geld mehr!");
            return;
        } else {
            document.getElementById("amountPestizide").innerHTML = pestizideAmount.toString();
            document.getElementById("kapitalAmount").innerHTML = actualMoney.toString();
        }
    }

    //Pestiziden-Mittel verwenden (Theoretische Funktion - funktioniert)
    function selectPestizide(_event: Event): void {
        let chooseFertiliizer: HTMLElement = <HTMLElement>document.querySelector("#testUse2");
        chooseFertiliizer.addEventListener("click", usePestizide);
    }

    function usePestizide(_event: MouseEvent): void {
        pestizideAmount--;
        document.getElementById("amountPestizide").innerHTML = pestizideAmount.toString();
    }

    //Setzlinge aus dem Shop kaufen + Invetar Gutschrift - ShopKaital

    function buySaplings(_event: Event): void {
        let shopSappling: HTMLElement = <HTMLElement>document.querySelector("#buySapling");
        shopSappling.addEventListener("click", buySaplingFunction);
    }
    function buySaplingFunction(_event: MouseEvent): void {
        let actualMoney: number = moneyCount - priceSeeds;
        saplingAmount++;
        moneyCount = actualMoney;
        if (moneyCount < 0) {
            alert("Du hast kein Cash mehr!");
            return;
        } else {
            document.getElementById("amountSaplingCount").innerHTML = saplingAmount.toString();
            document.getElementById("kapitalAmount").innerHTML = actualMoney.toString();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //GEMÜSE VERKAUFEN (SOON ERNTEN) + KAPITAL GUTSCHRIFT / VERLUST


    //Karotte verkaufen            + Kapital Gutschrift
    function chooseSellCarrot(_event: Event): void {
        let sellTestCarrot: HTMLElement = document.querySelector("#sellCarrot");
        sellTestCarrot.addEventListener("click", sellCarrot);
    }

    function sellCarrot(_event: Event): void {
        let actualMoney: number = moneyCount + priceCarrot;                 //Einfache Rechnung der Variablen um aktualisertes Kapital nach Verkauf zu erlangen.           
        moneyCount = actualMoney;
        document.getElementById("kapitalAmount").innerHTML = actualMoney.toString();
        //if (moneyCount > 50.50) {
        //alert("Du hast deine ersten 55€ erwirtschaftet!");
        //}
    }

    //Potato Verkaufen + Kapital Gutschrift
    function chooseSellPotato(_event: Event): void {
        let sellTestCarrot: HTMLElement = document.querySelector("#sellPotato");
        sellTestCarrot.addEventListener("click", sellPotato);
    }

    function sellPotato(_event: Event): void {
        let actualMoney: number = moneyCount + pricePotato;
        moneyCount = actualMoney;
        document.getElementById("kapitalAmount").innerHTML = actualMoney.toString();
        //if (moneyCount > 50.50) {
        //    alert("Du hast deine ersten 55€ erwirtschaftet!");
        //}
    }

    //Melone Verkaufen + Kapital Gutschrift
    function chooseSellMelon(_event: Event): void {
        let sellTestMelon: HTMLElement = document.querySelector("#sellMelon");
        sellTestMelon.addEventListener("click", sellMelon);
    }

    function sellMelon(_event: Event): void {
        let actualMoney: number = moneyCount + priceMelon;
        moneyCount = actualMoney;
        document.getElementById("kapitalAmount").innerHTML = actualMoney.toString();
        //if (moneyCount > 50.50) {
        //    alert("Du hast deine ersten 55€ erwirtschaftet!");
        //}
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Werkzeuge bzw. Aktionen auswählen.


    function selectTool(selectedTool: HTMLImageElement): void {
        if (currentTool != undefined) {
            currentTool.style.backgroundColor = "transparent";
        }
        currentTool = selectedTool;
        currentTool.style.backgroundColor = "rgba(150, 150, 150, 0.75)";        //Hintergrund des ausgewählten Werkzeugs grau markieren.
        console.log(currentTool);

    }


    //Aktion Ernten auswählen.
    function selectHarvest(_event: Event): void {
        let selectHarvestSeed: HTMLElement = <HTMLElement>document.querySelector("img#iconHarvest");   //Erntewerkzeug aus dem DOM ansprechen.
        selectHarvestSeed.addEventListener("click", clickHarvest);
    }

    function clickHarvest(_event: MouseEvent): void {                                                  //SelectTool Funktion aufrufen.
        selectTool(_event.currentTarget as HTMLImageElement);
    }

    //Aktion Gießen auswählen.
    function selectWatering(_event: Event): void {
        let selectWateringSeed: HTMLElement = <HTMLElement>document.querySelector("img#iconWatering");
        selectWateringSeed.addEventListener("click", clickWatering);
    }

    function clickWatering(_event: MouseEvent): void {
        selectTool(_event.currentTarget as HTMLImageElement);
    }

    //Aktion Düngern auswählen.
    function selectFortizize(_event: Event): void {
        let selectFortizizedSeed: HTMLElement = <HTMLElement>document.querySelector("img#iconFortizizePlants");
        selectFortizizedSeed.addEventListener("click", clickFortizize);
    }

    function clickFortizize(_event: MouseEvent): void {
        selectTool(_event.currentTarget as HTMLImageElement);
    }

    //Aktion Schädling bekämpfen auswählen.
    function selectFightPest(_event: Event): void {
        let selectFightPestSeed: HTMLElement = <HTMLElement>document.querySelector("img#iconFightPest");
        selectFightPestSeed.addEventListener("click", clickFightPest);
    }

    function clickFightPest(_event: MouseEvent): void {
        selectTool(_event.currentTarget as HTMLImageElement);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Die verschiedenen Gemüsesorten auswählen.

    function selectSapling(selectedSapling: HTMLImageElement): void {
        if (currentSapling != undefined) {
            currentSapling.style.backgroundColor = "transparent";
        }
        currentSapling = selectedSapling;
        currentSapling.style.backgroundColor = "rgba(150, 150, 150, 0.75)";
        console.log(currentSapling);
    }

    function handleCanvasClick(_event: Event): void {
        canvas = <HTMLCanvasElement>document.getElementById("canvas");
        canvas.addEventListener("click", (event) => { plantSapling(event); });
    }


    //Kartoffeln auswählen
    function handlePotatoClick(_event: Event): void {
        let choosePotato: HTMLElement = <HTMLElement>document.querySelector("img#iconPotato");
        choosePotato.addEventListener("click", clickPotato);
    }

    function clickPotato(event: MouseEvent): void {
        let imgElement: HTMLImageElement = event.currentTarget as HTMLImageElement;
        selectSapling(imgElement);
        console.log(currentSaplingImg);
        currentSaplingImg = imgElement.src;
    }

    //Rote-Zwiebeln auswählen
    function handleRedOnionClick(_event: Event): void {
        let chooseRedOnion: HTMLElement = <HTMLElement>document.querySelector("img#iconRedonion");
        chooseRedOnion.addEventListener("click", clickRedOnion);
    }

    function clickRedOnion(_event: MouseEvent): void {
        let imgElement: HTMLImageElement = event.currentTarget as HTMLImageElement;
        selectSapling(imgElement);
        console.log(currentSaplingImg);
        currentSaplingImg = imgElement.src;
    }

    //Melonen auswählen
    function handleWaterMelonClick(_event: Event): void {
        let chooseWaterMelon: HTMLElement = <HTMLElement>document.querySelector("img#iconMelon");
        chooseWaterMelon.addEventListener("click", clickWaterMelon);
    }

    function clickWaterMelon(_event: MouseEvent): void {
        let imgElement: HTMLImageElement = event.currentTarget as HTMLImageElement;
        selectSapling(imgElement);
        console.log(currentSaplingImg);
        currentSaplingImg = imgElement.src;
    }

    //RoteBeete auswählen
    function handleBeetRootClick(_event: Event): void {
        let chooseWaterMelon: HTMLElement = <HTMLElement>document.querySelector("img#iconBeetroot");
        chooseWaterMelon.addEventListener("click", clickBeetRoot);
    }

    function clickBeetRoot(_event: MouseEvent): void {
        let imgElement: HTMLImageElement = event.currentTarget as HTMLImageElement;
        selectSapling(imgElement);
        console.log(currentSaplingImg);
        currentSaplingImg = imgElement.src;
    }

    //Karotte auswählen
    function handleCarrotClick(_event: Event): void {
        let chooseWaterMelon: HTMLElement = <HTMLElement>document.querySelector("img#iconCarrot");
        chooseWaterMelon.addEventListener("click", clickCarrot);
    }

    function clickCarrot(event: MouseEvent): void {
        let imgElement: HTMLImageElement = event.currentTarget as HTMLImageElement;
        selectSapling(imgElement);
        console.log(currentSaplingImg);
        currentSaplingImg = imgElement.src;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Das Erntefeld (Canvas) generieren.

    function init(): void {
        canvas = <HTMLCanvasElement>document.getElementById("canvas");
        context = canvas.getContext("2d");
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        drawFields(5, 8);
        console.log("init");
    }

    function plantSapling(event: MouseEvent): void {
        //let canvas = <HTMLCanvasElement>document.getElementById("canvas");
        let mouseX = (event as MouseEvent).pageX;
        let mouseY = (event as MouseEvent).pageY;
        mouseX -= 100;
        mouseY -= 100;
        drawSapling(context, mouseX, mouseY);
        event = undefined;
    }

    function drawSapling(context: CanvasRenderingContext2D, x: number, y: number): void {
        let field: [number, number] = getClickedField(x, y);
        let sapling: SaplingType = patch[field[0]][field[1]];
        if (sapling == SaplingType.EMPTY) {
            let img: HTMLImageElement = document.createElement("img");
            let width: number = 75;
            let height: number = 75;
            let xDraw: number = field[1] * fieldSize + fieldSize / 2 - width / 2;
            let yDraw: number = field[0] * fieldSize + fieldSize / 2 - height / 2;
            img.src = currentSaplingImg; //`./Assets/${imageName}`;
            context.drawImage(img, xDraw, yDraw, width, height);
            patch[field[0]][field[1]] = SaplingType.CARROT;
            console.log("Setzling gepflanzt");
        }
    }

    function getClickedField(x: number, y: number): [number, number] {
        let row: number = Math.floor(y / fieldSize);
        let col: number = Math.floor(x / fieldSize);
        return [row, col];
    }

    function drawFields(rows: number, cols: number): void {
        drawVerticalLines(context, cols, height, fieldSize);
        drawHorizontalLines(context, rows, width, fieldSize);

    }

    function drawVerticalLines(context: CanvasRenderingContext2D, cols: number, length: number, fieldWidth: number): void {
        for (let col: number = 0; col < cols; col++) {
            let beginX: number = (col + 1) * fieldWidth;
            let beginY: number = 0;
            let endX: number = beginX;
            let endY: number = beginY + length;
            drawLine(context, beginX, beginY, endX, endY);
        }
    }

    function drawHorizontalLines(context: CanvasRenderingContext2D, rows: number, length: number, fieldHeight: number): void {
        for (let row: number = 0; row < rows; row++) {
            let beginX: number = 0;
            let beginY: number = (row + 1) * fieldHeight;
            let endX: number = beginX + length;
            let endY: number = beginY;
            drawLine(context, beginX, beginY, endX, endY);
        }
    }

    function drawLine(context: CanvasRenderingContext2D, beginX: number, beginY: number, endX: number, endY: number): void {
        context.beginPath();
        context.moveTo(beginX, beginY);
        context.lineTo(endX, endY);
        context.closePath();
        context.stroke();
    }











}


















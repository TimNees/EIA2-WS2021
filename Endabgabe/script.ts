
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

    //TODO Marktklasse erstellen mit neuen Preisen
    class Sapling {
        private saplingImgDir: string = "./Assets/Seeds/";
        private imgPhaseNames: string[];
        private saplingType: SaplingType;
        private saplingImage: HTMLImageElement;
        private saplingPriceInCent: number;
        private saplingGrowTimes: number[];
        private field: number[];
        private currentSaplingPhase: number;
        private context: CanvasRenderingContext2D;
        private canGrow: boolean;

        constructor(
            saplingType: SaplingType, saplingPriceInCent: number, saplingGrowTimes: number[],
            field: number[], imgNames: string[], img: HTMLImageElement, context: CanvasRenderingContext2D
        ) {
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

        public getImgPhaseNames(): string[] {
            return this.imgPhaseNames;
        }

        public getSaplingType(): SaplingType {
            return this.saplingType;
        }

        public getSaplingImage(): HTMLImageElement {
            return this.saplingImage;
        }

        public getSaplingPriceInCent(): number {
            return this.saplingPriceInCent;
        }

        public getSaplingGrowTimes() {
            return this.saplingGrowTimes;
        }

        public getField() {
            return this.field;
        }

        public getCurrentSaplingPhase() {
            return this.currentSaplingPhase;
        }

        public setCanGrow(canGrow: boolean) {
            this.canGrow = canGrow;
        }

        public increaseCurrentSaplingPhase(): void {
            if (this.currentSaplingPhase < 4) {
                this.currentSaplingPhase++;
            }
        }

        public grow(): void {
            if (this.currentSaplingPhase >= 3 || !this.canGrow) {
                return;
            }
            console.log("grow: " + this.field);
            this.currentSaplingPhase++;
            setTimeout(() => { this.grow(); }, this.saplingGrowTimes[this.currentSaplingPhase]);
            redraw(this.context);
        }

        public dry(): void {
            let probability: number = 0.15;      //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
            let val: number = Math.random();
            if (val <= probability) {
                this.canGrow = false;
                console.log("Setzling vertrocknet");
            }
        }

        public needsFertilizer(): void {
            let probability: number = 0.075;      //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
            let val: number = Math.random();
            if (val <= probability) {
                this.canGrow = false;
                console.log("Braucht Dünger");
            }
        }

        public needsPesticide(): void {
            let probability: number = 0.05;      //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
            let val: number = Math.random();
            if (val <= probability) {
                this.canGrow = false;
                console.log("Braucht Dünger");
            }
        }
    }


    const PATCH_COLS: number = 8;
    const PATCH_ROWS: number = 5;

    //===== Canvas-Konstanten ======
    const CANVAS_WIDTH: number = 800;
    const CANVAS_HEIGHT: number = 500;
    const FIELD_SIZE: number = 100;

    //===== Canvas-Variablen =====
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let currentSaplingImg: HTMLImageElement = undefined;
    let currentTool: HTMLImageElement = undefined;
    let chooserImages: HTMLImageElement[] = new Array();


    let patch: Sapling[] = Array(40).fill(undefined);
    let currentSaplingType: SaplingType = SaplingType.EMPTY;

    //===== Markt-Variablen =====
    let currentCapital: number = 50;
    let currentPriceRange: number = 0.6;

    let fertilizerAmount: number = 0;


    //TODO: Variablen für andere Gemüse anlegen, und auskommentieren

    let currentPriceCarrot: number = 60;
    let maxPriceCarrot: number = 60;
    let minPriceCarrot: number = 20;

    let priceChangeRateMin: number = 1;
    let priceChangeRateMax: number = 15;


    /*let currentPricePotato: number; 
    let currentPriceMelon: number;
    
    let currentPriceRedOnion: number;  
    let currentPriceRedBeet: number;
    */

    function calculatePrice(decreasePrice: boolean): void {
        if (currentPriceCarrot >= maxPriceCarrot && !decreasePrice) {            //Max Price kann nicht erhöht werden & Min Price kann nicht verringert werden.
            return;
        }

        if (currentPriceCarrot <= minPriceCarrot && decreasePrice) {
            return;
        }

        let factor: number = 1;
        if (decreasePrice) {
            factor = -1;
        }

        let priceCarrotCash: HTMLElement = document.getElementById("priceCarrotCash");
        let change: number = ((Math.floor(Math.random() * (priceChangeRateMax - priceChangeRateMin + 1)) + priceChangeRateMin));
        currentPriceCarrot += change * factor;  //return Math.floor(Math.random() * (Maximale Preis - Minimalen Preis + 1) ) + minimalen Preis / 10 (Dezimalzahl)
        priceCarrotCash.innerHTML = clamp(currentPriceCarrot, minPriceCarrot, maxPriceCarrot).toString();   //toFixed sorgt dafür, dass nur 2 Nachkommastellen angezeigt werden (Rundungsfehler)
        console.log("change: " + change);
        console.log(currentPriceCarrot);

    }

    function clamp(value: number, min: number, max: number): number {
        if (value < min) {                                  //Wenn Wert kurzzeitig unter Min geht, wird er anschließend wieder auf den Mindestwert (20) gesetzt.
            value = min;
        }

        if (value > max) {
            value = max;
        }
        return value;
    }


    function handlePriceChange(): void {
        let probability: number = 1;      //Prob * 100 ist die Chance, dass der Preis geändert wird. (20%)
        let val: number = Math.random();
        if (val <= probability) {
            calculatePrice(true);
        }
    }

    //Alle Funktionen beim Starten der Seite Laden (Problem 08.07, ich musste alles Doppelt anklicken)
    window.onload = function (event: Event): void {
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
        setInterval(handlePriceChange, 1000);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Spieleinstellungen auf der Landing-Page einstellen + in den Kapital-Wert auf der Spielpage einsetzen.


    //Kapital über Regler einstellen und Werte speichern.
    function setCurrentCapital(event: Event): void {
        let capital: number = Number(((event.currentTarget as Document).activeElement as HTMLInputElement).value);
        currentCapital = capital * 100;
        console.log(currentCapital);
        document.getElementById("amountOnPage").innerHTML = currentCapital.toString();
        document.getElementById("currentCapital").innerHTML = currentCapital.toString();
    }


    //Preisschwankungen über Regler einstellen.
    function setPriceRange(event: Event): void {

        let priceRange: number = Number(((event.currentTarget as Document).activeElement as HTMLInputElement).value);
        currentPriceRange = priceRange;
        console.log(priceRange);
        document.getElementById("priceRangeOnPage").innerHTML = currentPriceRange.toString();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    

    //Dünger-Mittel aus dem Shop kaufen + Invetar Gutschrift - ShopKaital




    //Dünger verwenden (Theoretische Funktion - funktioniert)
    function selectFertilizer(_event: Event): void {
        let chooseFertiliizer: HTMLElement = <HTMLElement>document.querySelector("#testUse");
        chooseFertiliizer.addEventListener("click", useFertilizer);
    }

    function useFertilizer(_event: MouseEvent): void {
        fertilizerAmount--;
        document.getElementById("amountFertilizier").innerHTML = fertilizerAmount.toString();
    }




    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





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
    //TODO: ergänzen der Gemüseauswahl
    function selectSapling(selectedSapling: HTMLImageElement): void {
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

    function clearImageSelection(): void {
        chooserImages.forEach(chooserImage => {
            chooserImage.style.backgroundColor = "transparent";
        });
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

    //TODO Überprüfen ob Kapital >=0 wenn preis der pflanze abgezogen wurde
    function plantSapling(event: MouseEvent): void {
        let mouseX: number = (event as MouseEvent).pageX;
        let mouseY: number = (event as MouseEvent).pageY;
        mouseX -= 100;
        mouseY -= 100;
        let field: [number, number] = getClickedField(mouseX, mouseY);

        let sapling: Sapling = newSapling(field);
        let currentPatchField: Sapling = patch[PATCH_COLS * field[0] + field[1]];
        if (currentPatchField == undefined && sapling != undefined) {
            drawSapling(sapling, context);
            event = undefined;
            currentCapital = decreaseCapital(currentCapital, sapling.getSaplingPriceInCent());
        }
    }

    function decreaseCapital(value: number, decrease: number): number {
        let currentCapitalElement: HTMLElement = document.getElementById("currentCapital");
        value -= decrease;
        currentCapitalElement.innerHTML = value.toString();
        return value;
    }


    //TODO: alle Saplings ergänzen
    function newSapling(field: number[]): Sapling {

        let sapling: Sapling;

        switch (currentSaplingType) {
            case SaplingType.CARROT:
                sapling = new Sapling(currentSaplingType, currentPriceCarrot, [3000, 3000, 3000, 3000], field, ["carrot1", "carrot2", "carrot3", "carrot4"], currentSaplingImg, context);
                break;
            case SaplingType.POTATO:
                sapling = new Sapling(currentSaplingType, currentPriceCarrot, [5000, 5000, 5000, 5000], field, ["potato1", "potato2", "potato3", "potato4"], currentSaplingImg, context); //TODO potato price ändern. currentPricePotato
                break;
            default:
                return undefined;
        }
        return sapling;
    }

    function drawSapling(sapling: Sapling, context: CanvasRenderingContext2D): void {
        let img: HTMLImageElement = document.createElement("img");
        let width: number = 75;
        let height: number = 75;
        let xDraw: number = sapling.getField()[1] * FIELD_SIZE + FIELD_SIZE / 2 - width / 2;
        let yDraw: number = sapling.getField()[0] * FIELD_SIZE + FIELD_SIZE / 2 - height / 2;

        img.src = sapling.getImgPhaseNames()[sapling.getCurrentSaplingPhase()];
        img.alt = "Sapling";

        img.onload = function (): void {
            context.drawImage(img, xDraw, yDraw, width, height);
        };

        context.drawImage(img, xDraw, yDraw, width, height);

        patch[PATCH_COLS * sapling.getField()[0] + sapling.getField()[1]] = sapling;
        console.log("Setzling gepflanzt");

    }

    function getClickedField(x: number, y: number): [number, number] {
        let row: number = Math.floor(y / FIELD_SIZE);
        let col: number = Math.floor(x / FIELD_SIZE);
        return [row, col];
    }

    function drawFields(rows: number, cols: number): void {
        drawVerticalLines(context, cols, CANVAS_HEIGHT, FIELD_SIZE);
        drawHorizontalLines(context, rows, CANVAS_WIDTH, FIELD_SIZE);

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

    function redraw(context: CanvasRenderingContext2D): void {
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
    function handleCanvasClick(_event: Event): void {
        canvas = <HTMLCanvasElement>document.getElementById("canvas");
        canvas.addEventListener("click", (event) => { plantSapling(event); });
    }

    //Kartoffeln auswählen
    function handlePotatoClick(_event: Event): void {
        let choosePotato: HTMLElement = <HTMLElement>document.querySelector("img#iconPotato");
        choosePotato.addEventListener("click", clickImage);
    }

    //Rote-Zwiebeln auswählen
    function handleRedOnionClick(_event: Event): void {
        let chooseRedOnion: HTMLElement = <HTMLElement>document.querySelector("img#iconRedonion");
        chooseRedOnion.addEventListener("click", clickImage);
    }

    //Melonen auswählen
    function handleWaterMelonClick(_event: Event): void {
        let chooseWaterMelon: HTMLElement = <HTMLElement>document.querySelector("img#iconMelon");
        chooseWaterMelon.addEventListener("click", clickImage);
    }

    //RoteBeete auswählen
    function handleBeetRootClick(_event: Event): void {
        let chooseRedBeet: HTMLElement = <HTMLElement>document.querySelector("img#iconBeetroot");
        chooseRedBeet.addEventListener("click", clickImage);
    }


    //Karotte auswählen
    function handleCarrotClick(_event: Event): void {
        let chooseWaterMelon: HTMLElement = <HTMLElement>document.querySelector("img#iconCarrot");
        chooseWaterMelon.addEventListener("click", clickImage);
    }

    function clickImage(event: MouseEvent): void {
        let imgElement: HTMLImageElement = event.currentTarget as HTMLImageElement;
        chooserImages.push(imgElement);
        selectSapling(imgElement);
    }
}

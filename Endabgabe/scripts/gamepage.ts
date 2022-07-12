namespace GemueseGarten {

    enum SaplingType {
        EMPTY = -1,
        POTATO,
        REDONION,
        MELON,
        BEETROOT,
        CARROT
    }

    enum ToolType {
        EMPTY = -1,
        HARVEST,
        WATER,
        FERTILIZER,
        PESTICIDE
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

        //Tools
        handleHarvestClick(event);
    };

    //===== Canvas-Variablen =====
    let canvas: HTMLCanvasElement;
    let currentSaplingImg: HTMLImageElement = undefined;
    let chooserImages: HTMLImageElement[] = new Array();

    let currentSaplingType: SaplingType = SaplingType.EMPTY;

    //===== Tools-Variablen =====
    let currentToolType: ToolType = ToolType.EMPTY;

    let game: Game = new Game();

    //TODO: ergänzen der Gemüseauswahl
    function selectSaplingTool(selectedImg: HTMLImageElement): void {
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

    function clearImageSelection(): void {
        chooserImages.forEach(chooserImage => {
            chooserImage.style.backgroundColor = "transparent";
        });
    }

    //TODO: alle Saplings ergänzen
    

    // ===== Handler =====
    function handleCanvasClick(_event: Event): void {
        canvas = <HTMLCanvasElement>document.getElementById("canvas");
        canvas.addEventListener("click", (event) => { game.getPlayer().workOnField(event, undefined, undefined); });
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

    //Karotte auswählen
    function handleHarvestClick(_event: Event): void {
        let chooseHarvestTool: HTMLElement = <HTMLElement>document.querySelector("img#iconHarvest");
        chooseHarvestTool.addEventListener("click", clickImage);
    }

    function clickImage(event: MouseEvent): void {
        let imgElement: HTMLImageElement = event.currentTarget as HTMLImageElement;
        chooserImages.push(imgElement);
        selectSaplingTool(imgElement);
    }
}

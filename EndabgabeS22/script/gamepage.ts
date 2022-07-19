namespace GemueseGarten {

    export const WIDTH: number = 800;
    export const HEIGHT: number = 500;
    export const CELL_SIZE: number = 100;
    export const COLS: number = WIDTH / CELL_SIZE;
    export const ROWS: number = HEIGHT / CELL_SIZE;

    const chooserImagesIds: string[] = [
        "iconCarrot", "iconPotato", "iconBeetRoot", "iconMelon", "iconRedOnion",
        "iconHarvester", "iconPesticide", "iconFertilizer", "iconWater"
    ];

    //===== Game-Variablen =====
    export let player: Player;
    export let market: Market;
    export let fly: Fly;
    let selectedImg: HTMLImageElement;      //Das ausgewählte Image, entweder Pflanze oder Tool.

    export let plantedSaplings: Sapling[];

    //===== Canvas-Variablen =====
    let canvas: HTMLCanvasElement;
    export let context: CanvasRenderingContext2D;
    let chooserImages: HTMLImageElement[] = new Array();    //Ausgewähltes Image (Tool oder Sapling)
    let clickedCanvasCell: [number, number];                //Angeglickte Zelle auf Canvas

    //===== Working =====
    function workWithTool(): void {
        let tool: Tool = GameObjectFactory.new(selectedImg, clickedCanvasCell) as Tool;
        tool.work();
    }

    function plantSapling(): void {
        if (plantedSaplings[getSaplingIndex(clickedCanvasCell)] instanceof GameObject) {  //Wenn an der Stelle an der wir geklickt haben nicht undefined ist, return. (Verhindert, dass man mehrere Karotten auf ein Feld setzen kann.)
            return;
        }

        let buyingPrice: number = 0;
        switch (selectedImg.id) {                           //Im Switch-Case wird anhand der Id überprüft, welcher Setzling ausgewählt wird und die variable buyingPrice erhält den Preis für den jewiligen Setzling.
            case "iconCarrot":
                buyingPrice = market.getCarrotCost();
                break;
            case "iconPotato":
                buyingPrice = market.getPotatoCost();
                break;
            case "iconBeetRoot":
                buyingPrice = market.getBeetRootCost();
                break;
            case "iconMelon":
                buyingPrice = market.getMelonCost();
                break;
            case "iconRedOnion":
                buyingPrice = market.getRedOnionCost();
                break;
        }

        if (player.getMoney() - buyingPrice < 0) {                          //Überprüft, ob der Nutzer mit dem Kauf das Kapital 0 erreicht - falls es kleiner als 0 wäre, kann der Nutzer nicht einkaufen.
            alert("Dein Kapital reicht dafür nicht aus!");                  //Rückmeldung für den Nutzer, warum sein Kauf nicht ausgeführt werden kann.
            return;
        }

        let sapling: Sapling = GameObjectFactory.new(selectedImg, clickedCanvasCell) as Sapling; //Durch as Sapling schließen wir aus, dass es noch ein Tool sein könnte - so können wir es immer als Sapaling behandeln.

        player.setMoney(player.getMoney() - buyingPrice);                   //Der Preis für den Setzling wird vom Kapital des Nutzers abgebucht.
        drawSapling(sapling, context);                                      //Der Setzling wird auf dem Canvas gezeichnet
        plantedSaplings[getSaplingIndex(clickedCanvasCell)] = sapling;      //An dem jeweiligen Index wird der Sapling gesetzt.
    }



    function drawSapling(sapling: Sapling, context: CanvasRenderingContext2D): void {    //Die Eigenschaften, wo der Sapling gesetzt und wie groß er sein soll werden definiert.
        let img: HTMLImageElement = document.createElement("img");
        let width: number = 75;
        let height: number = 75;
        let xDraw: number = sapling.getCell()[1] * CELL_SIZE + CELL_SIZE / 2 - width / 2;       //Wird berechnet, damit der Sapling in der Mitte der Zelle gezeichnet wird.
        let yDraw: number = sapling.getCell()[0] * CELL_SIZE + CELL_SIZE / 2 - height / 2;

        
        img.src = sapling.getSaplingImagePaths()[sapling.getGrowPhase()];                       //Bild des Setzlings, von der Phase 0 (da es noch ein Setzling der Stufe 0 ist)wird ausgewählt.

        img.onload = function (): void {                                                //Code lief weiter auf schnellen PC (ist beim Testing aufgefallen, verhindert dass gezeichnet wird ohne das Element fertig ist.)
            context.drawImage(img, xDraw, yDraw, width, height);
        };

        sapling.drawDisaster();                                                        //Wenn ein Disaster vorhanden ist, wird es in die untere rechte Ecke des Feldes gezeichnet.
        plantedSaplings[getSaplingIndex(sapling.getCell())] = sapling;
    }

    export function getSaplingIndex(field: number[]): number {
        return COLS * field[0] + field[1];
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //===== Canvas Zeichnen =====//
    function initCanvas(): void {
        canvas = <HTMLCanvasElement>document.getElementById("canvas");                     //CRC wird von einem Canvas aufgefordert.
        context = canvas.getContext("2d") as unknown as CanvasRenderingContext2D;
        plantedSaplings = Array(40);
        drawFields();
    }

    function drawFields(): void {                           //Es werden die beiden Funktionen gezeichnet, um durch die Überschneidungen von Vertikal / Horizontal die Felder anzeigen zu lassen.
        drawVerticalLines(context, COLS, HEIGHT, CELL_SIZE);
        drawHorizontalLines(context, ROWS, WIDTH, CELL_SIZE);
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
        context.beginPath();                //Methoden zum Zeichnen des Canvas
        context.moveTo(beginX, beginY);     //Methoden zum Zeichnen des Canvas
        context.lineTo(endX, endY);         //Methoden zum Zeichnen des Canvas
        context.closePath();                //Methoden zum Zeichnen des Canvas
        context.stroke();                   //Methoden zum Zeichnen des Canvas
    }

    export function redraw(): void {
        context.clearRect(0, 0, WIDTH, HEIGHT);             //Die Methode clearRect leert das Canvas.
        drawFields();                                       //Zeichnet wieder die Linien.

        plantedSaplings.forEach(sapling => {                //Man geht alle Saplings durch und überprüfen, wenn nicht undefined ist -> wird der Sapling wieder gezeichnet.
            if (sapling != undefined) {
                drawSapling(sapling, context);
            }
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    //Anzeige Selected Tool/Sapling

    function selectSaplingTool(selectedImg: HTMLImageElement): void {
        clearImageSelection();                                             //Durch clearImageSelection wird die Auswahl wieder aufgehoben (sonst wären bei 5xmaligen auswählen alle grau)
        selectedImg.style.backgroundColor = "rgba(150, 150, 150, 0.75)";   //Das ausgewählte Tool/Sapling wird grau hinterlegt.
    }

    function clearImageSelection(): void {
        chooserImages.forEach(chooserImage => {
            chooserImage.style.backgroundColor = "transparent";            //Der Hintergrund wird wieder auf transparent gestellt.
        });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // ===== Handler =====
    function handleCanvasClick(_event: Event): void {
        canvas = <HTMLCanvasElement>document.getElementById("canvas");
        canvas.addEventListener("click", (_event) => { clickCanvas(_event); });
    }

    function handleGameObjectClick(_event: Event): void {
        chooserImagesIds.forEach(id => {
            let clickedGameObject: HTMLElement = <HTMLElement>document.getElementById(id);
            clickedGameObject.addEventListener("click", clickImage);
        });
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Pestezide und Dünger im Shop kaufen


    function handlePesticideButtonClick(_event: Event): void {
        let button: HTMLElement = <HTMLElement>document.getElementById("buyPesticide");     //Den Button "Pestezide kaufen" auswählen.
        button.addEventListener("click", () => {                                            //Event-Listener auf den Button setzen.
            if (player.getMoney() - market.getPesticideCost() < 0) {
                alert("Dein Kapital reicht nicht aus, um Pestiziden-Mittel zu kaufen.");    //Alert Meldung, falls das Kapital beim Kauf des Rohstoffs unter 0 gehen würde + Funktionsende
                return;
            }
            player.setPesticide(player.getPesticide() + 1);                                 //Anzahl des Pestiziden-Bestands nach Kaufe = "+1"
            player.setMoney(player.getMoney() - market.getPesticideCost());                 //Der Preis des Pesziden-Mittels wird vom Kapital des Nutzers abgezogen.
        });
    }

    function handleFertilizerButtonClick(_event: Event): void {                             //Gleiches Spiel wie oben :D
        let button: HTMLElement = <HTMLElement>document.getElementById("buyFertilizer");
        button.addEventListener("click", () => {
            if (player.getMoney() - market.getFertilizerCost() < 0) {
                alert("Dein Kapital reicht nicht aus, um Dünger zu kaufen.");
                return;
            }
            player.setFertilizer(player.getFertilizer() + 1);
            player.setMoney(player.getMoney() - market.getFertilizerCost());
        });
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //Click auf dem Canvas soll eine Funktion auslösen
    function clickCanvas(event: Event): void {
        let mouseX: number = (event as MouseEvent).pageX; 
        let mouseY: number = (event as MouseEvent).pageY;
        mouseX -= 100;                                  
        mouseY -= 100;                                  
        clickedCanvasCell = Helper.getClickedCell(mouseX, mouseY);

        if (selectedImg == undefined) {                         //Sobald der Nutzer auf das Canvas gedrückt hat ohne eine Funktion auszuwählen, kam eine Error-Meldung in der Konsole.
            return;
        } else if (selectedImg.classList[0] === "sapling") {
            plantSapling();
        } else if (selectedImg.classList[0] === "tool") {
            workWithTool();
        }
    }

    function clickImage(event: MouseEvent): void {
        let imgElement: HTMLImageElement = event.currentTarget as HTMLImageElement;
        if (!chooserImages.includes(imgElement)) {
            chooserImages.push(imgElement);
        }

    
        selectSaplingTool(imgElement);
        selectedImg = imgElement;
    }

    window.onload = function (event: Event): void {
        handleCanvasClick(event);
        handleGameObjectClick(event);

        handlePesticideButtonClick(event);
        handleFertilizerButtonClick(event);


        initCanvas();

        player = new Player();
        market = new Market();

        market.updatePrices();

        let url: string = window.location.href; //Die URL der Webseite wird geholt - bsp. `./pages/game.html?currentCapital=50&currentPriceRange=0.4`
        let search: string = url.split("?")[1]; //Nehmen nur den zweiten Teil (alles hinter dem Fragezeichen)
        let vars: string[] = search.split("&"); //Splitten am & und erhalten 2 Strings currentCapital=50//currentPriceRange=0.4
        //console.log(vars);

        let currentCapital: string = vars[0].split("=")[1]; // 50 
        let currentPriceRange: string = vars[1].split("=")[1]; // 0.4

        player.setMoney(parseInt(currentCapital) * 100); //Spieler bekommt in € gezeigt, intern wird aber in Cent gerechnet.
        market.setPriceRange(parseFloat(currentPriceRange));
        console.log("Test2"); //Zum Testen, ob die Seite ordentlich geladen wird.
    };
}
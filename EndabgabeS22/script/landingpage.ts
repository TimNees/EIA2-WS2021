namespace GemuseKarten {
    let currentCapital: string = "50";          //Startwert für CurrentCapital
    let currentPriceRange: string = "0.60";     //Startwert für CurrentPriceRange

    window.onload = function (event: Event): void {
        handleStartCapitalChange(event);
        handlePriceRangeChange(event);
        handleStartGameClick(event);
    };


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //======Die gamePage wird geöffnet und die Werte aus currentCapital und currentPriceRange werden übernommen======//

    function startGame(_event: Event): void {
        window.open(`./pages/game.html?currentCapital=${currentCapital}&currentPriceRange=${currentPriceRange}`); //Dadurch können die Werte in ein anderes Tab übergeben werden. Gefunden: https://developer.mozilla.org/en-US/docs/Web/API/Window/open
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //=====Handler für startGame, startCapitalChange und priceRangeChange=====//

    function handleStartGameClick(_event: Event): void {                                                         
        let startCapitalInput: HTMLInputElement = <HTMLInputElement>document.getElementById("startGame");           
        startCapitalInput.addEventListener("click", startGame);                                   //Event-Listener vom Type "click" auf dem mit der Id "startGame" -> löst Funktion startGame auf.
    }

    function handleStartCapitalChange(_event: Event): void {
        let startCapitalInput: HTMLInputElement = <HTMLInputElement>document.getElementById("startCapitalSlider");
        startCapitalInput.addEventListener("change", changeCapitalSlider);
    }

    function handlePriceRangeChange(_event: Event): void {
        let rangeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("secondSetting");
        rangeInput.addEventListener("change", changeRangeSlider);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    //=====Handler für startGame, startCapitalChange und priceRangeChange=====//
    function changeRangeSlider(event: Event): void {
        currentPriceRange = (event.currentTarget as HTMLInputElement).value;
        let rangeSlider: HTMLSpanElement = <HTMLSpanElement>document.getElementById("demo2");
        if (rangeSlider != null) {
            rangeSlider.innerHTML = currentPriceRange;
        }
    }

    function changeCapitalSlider(event: Event): void {
        currentCapital = (event.currentTarget as HTMLInputElement).value;  //currentCapital wird dem Wert aus dem Regler zugewiesen.
        let startCapital: HTMLSpanElement = <HTMLSpanElement>document.getElementById("startCapital"); //Element mit der ID "startCapital" ansprechen.
        if (startCapital != null) {                                        //Wenn der Wert von startCapital nicht null ist...
            startCapital.innerHTML = currentCapital;                       //...wird der Wert von startCapital wird an currentCapital übergeben und anschließend in window.open eingesetzt.
        }
    }
}












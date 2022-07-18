"use strict";
var GemuseKarten;
(function (GemuseKarten) {
    let currentCapital = "50"; //Startwert für CurrentCapital
    let currentPriceRange = "0.60"; //Startwert für CurrentPriceRange
    window.onload = function (event) {
        handleStartCapitalChange(event);
        handlePriceRangeChange(event);
        handleStartGameClick(event);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //======Die gamePage wird geöffnet und die Werte aus currentCapital und currentPriceRange werden übernommen======//
    function startGame(_event) {
        window.open(`./pages/game.html?currentCapital=${currentCapital}&currentPriceRange=${currentPriceRange}`); //Dadurch können die Werte in ein anderes Tab übergeben werden. Gefunden: https://developer.mozilla.org/en-US/docs/Web/API/Window/open
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //=====Handler für startGame, startCapitalChange und priceRangeChange=====//
    function handleStartGameClick(_event) {
        let startCapitalInput = document.getElementById("startGame");
        startCapitalInput.addEventListener("click", startGame); //Event-Listener vom Type "click" auf dem mit der Id "startGame" -> löst Funktion startGame auf.
    }
    function handleStartCapitalChange(_event) {
        let startCapitalInput = document.getElementById("startCapitalSlider");
        startCapitalInput.addEventListener("change", changeCapitalSlider);
    }
    function handlePriceRangeChange(_event) {
        let rangeInput = document.getElementById("secondSetting");
        rangeInput.addEventListener("change", changeRangeSlider);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //=====Handler für startGame, startCapitalChange und priceRangeChange=====//
    function changeRangeSlider(event) {
        currentPriceRange = event.currentTarget.value;
        let rangeSlider = document.getElementById("demo2");
        if (rangeSlider != null) {
            rangeSlider.innerHTML = currentPriceRange;
        }
    }
    function changeCapitalSlider(event) {
        currentCapital = event.currentTarget.value; //currentCapital wird dem Wert aus dem Regler zugewiesen.
        let startCapital = document.getElementById("startCapital"); //Element mit der ID "startCapital" ansprechen.
        if (startCapital != null) { //Wenn der Wert von startCapital nicht null ist...
            startCapital.innerHTML = currentCapital; //...wird der Wert von startCapital wird an currentCapital übergeben und anschließend in window.open eingesetzt.
        }
    }
})(GemuseKarten || (GemuseKarten = {}));
//# sourceMappingURL=landingpage.js.map
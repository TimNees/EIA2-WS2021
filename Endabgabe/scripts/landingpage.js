"use strict";
var GemuseKarten;
(function (GemuseKarten) {
    let currentCapital = "50";
    let currentPriceRange = "0.60";
    window.onload = function (event) {
        handleStartCapitalChange(event);
        handleStartGameClick(event);
    };
    function startGame(_event) {
        // starte GameSeite mit den beiden Parametern
        /*let url: string = window.location.href;
        let search: string = url.split("?")[1];
        let vars: string[] = search.split("&");
        console.log(vars);*/
        window.open(`./pages/game.html?currentCapital=${currentCapital}&currentPriceRange=${currentPriceRange}`);
    }
    function handleStartGameClick(_event) {
        let startCapitalInput = document.getElementById("startGame");
        startCapitalInput.addEventListener("click", startGame);
    }
    function handleStartCapitalChange(_event) {
        let startCapitalInput = document.getElementById("startCapitalSlider");
        startCapitalInput.addEventListener("change", changeSlider);
    }
    function changeSlider(event) {
        currentCapital = event.currentTarget.value;
        document.getElementById("startCapital").innerHTML = currentCapital;
    }
})(GemuseKarten || (GemuseKarten = {}));
//# sourceMappingURL=landingpage.js.map
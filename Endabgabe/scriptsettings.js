"use strict";
var GemuseKarten;
(function (GemuseKarten) {
    let currentCapital = 50;
    let currentPriceRange = 0.60;
    document.addEventListener("change", setPriceRange);
    document.addEventListener("click", startGame);
    document.addEventListener("change", setCurrentCapital);
    function startGame(_event) {
    }
    function setCurrentCapital(event) {
        let capital = Number(event.currentTarget.activeElement.value);
        console.log(capital);
        currentCapital = capital;
        console.log(currentCapital);
        document.getElementById("demo").innerHTML = currentCapital.toString();
    }
    function setPriceRange(event) {
        let priceRange = Number(event.currentTarget.activeElement.value);
        console.log(priceRange);
        currentPriceRange = priceRange;
        console.log(priceRange);
        document.getElementById("demo2").innerHTML = currentPriceRange.toString();
    }
})(GemuseKarten || (GemuseKarten = {}));
//# sourceMappingURL=scriptsettings.js.map
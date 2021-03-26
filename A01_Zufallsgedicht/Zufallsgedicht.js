"use strict";
//Wochenaufgabe in Zusammenarbeit mit Dino Mujic
//Namespace sinnnvoll benennen
var Zufallsgedicht;
(function (Zufallsgedicht) {
    //Arrys mit Subjekten, Prädikaten und Objekten
    let subjekte = ["Mario Gotze ", "Ronaldo ", "Messi ", "Neymar Jr. ", "Manuel Neuer ", "Kai Havertz "];
    let praedikate = ["schiesst ", "foult ", "trifft ", "wirft ", "grätscht ", "rempelt "];
    let objekte = ["daneben", "den Gegenspieler", "das Tor", "den Einwurf", "den Stürmer um", "den Linienrichter an"];
    //Schleife
    for (let a = 6; a > 0; a--) {
        let x = getVerse(subjekte, praedikate, objekte);
        console.log(x);
    }
    //Funktion 
    function getVerse(_subjekte, _praedikate, _objekte) {
        let value = "";
        let randomNumberSubjekt = Math.floor(Math.random() * Math.floor(_subjekte.length));
        let randomNumberPraedikat = Math.floor(Math.random() * Math.floor(_praedikate.length));
        let randomNumberObjekt = Math.floor(Math.random() * Math.floor(_objekte.length));
        value = _subjekte[randomNumberSubjekt] + _praedikate[randomNumberPraedikat] + _objekte[randomNumberObjekt];
        _subjekte.splice(randomNumberSubjekt, 1);
        _praedikate.splice(randomNumberPraedikat, 1);
        _objekte.splice(randomNumberObjekt, 1);
        return value;
    }
})(Zufallsgedicht || (Zufallsgedicht = {}));
//# sourceMappingURL=Zufallsgedicht.js.map
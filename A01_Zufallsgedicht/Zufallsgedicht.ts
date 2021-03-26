//Wochenaufgabe in Zusammenarbeit mit Dino Mujic
//Namespace sinnnvoll benennen
namespace Zufallsgedicht {


//Arrys mit Subjekten, Prädikaten und Objekten
    let subjekte: string[] = ["Mario Gotze ", "Ronaldo ", "Messi ", "Neymar Jr. ", "Manuel Neuer ", "Kai Havertz "];
    let praedikate: string[] = ["schiesst ", "foult ", "trifft ", "wirft ", "grätscht ", "rempelt "];
    let objekte: string[] = ["daneben", "den Gegenspieler", "das Tor", "den Einwurf", "den Stürmer um", "den Linienrichter an"];
//Schleife
    for (let a: number = 6; a > 0; a--) {
        let x: string = getVerse(subjekte, praedikate, objekte);
        console.log(x);
    }
//Funktion 
    function getVerse(_subjekte: string[], _praedikate: string[], _objekte: string[]): string {
        let value: string = "";

        let randomNumberSubjekt: number = Math.floor(Math.random() * Math.floor(_subjekte.length));
        let randomNumberPraedikat: number = Math.floor(Math.random() * Math.floor(_praedikate.length));
        let randomNumberObjekt: number = Math.floor(Math.random() * Math.floor(_objekte.length));

        value = _subjekte[randomNumberSubjekt] + _praedikate[randomNumberPraedikat] + _objekte[randomNumberObjekt];

        _subjekte.splice(randomNumberSubjekt, 1); 
        _praedikate.splice(randomNumberPraedikat, 1);
        _objekte.splice(randomNumberObjekt, 1);

        return value;
    }
}
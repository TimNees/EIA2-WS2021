
namespace GemuseKarten {


    let currentCapital: number = 50;
    let currentPriceRange: number = 0.60;


    

    document.addEventListener("change", setPriceRange);
    document.addEventListener("click", startGame);
    document.addEventListener("change", setCurrentCapital);
    

    function startGame(_event: Event) { //game.html?capital=100;
    }

    
    function setCurrentCapital(event: Event): void {
        let capital: number = Number(((event.currentTarget as Document).activeElement as HTMLInputElement).value);
        console.log(capital);
        currentCapital = capital;
        console.log(currentCapital);
        document.getElementById("demo").innerHTML = currentCapital.toString();
    }

    function setPriceRange(event: Event): void {
        
        let priceRange: number = Number(((event.currentTarget as Document).activeElement as HTMLInputElement).value);
        console.log(priceRange);
        currentPriceRange = priceRange;
        console.log(priceRange);
        document.getElementById("demo2").innerHTML = currentPriceRange.toString();
    }






}












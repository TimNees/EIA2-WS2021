namespace GemuseKarten {
    let currentCapital: string = "50";
    let currentPriceRange: string = "0.60";

    window.onload = function (event: Event): void {
        handleStartCapitalChange(event);
        handleStartGameClick(event);
    };

    function startGame(_event: Event): void { //game.html?capital=100;
        // starte GameSeite mit den beiden Parametern
        /*let url: string = window.location.href;
        let search: string = url.split("?")[1];
        let vars: string[] = search.split("&");
        console.log(vars);*/
        window.open(`./pages/game.html?currentCapital=${currentCapital}&currentPriceRange=${currentPriceRange}`);
    }

    function handleStartGameClick(_event: Event): void {
        let startCapitalInput: HTMLInputElement = <HTMLInputElement>document.getElementById("startGame");
        startCapitalInput.addEventListener("click", startGame);
    }

    function handleStartCapitalChange(_event: Event): void {
        let startCapitalInput: HTMLInputElement = <HTMLInputElement>document.getElementById("startCapitalSlider");
        startCapitalInput.addEventListener("change", changeSlider);
    }

    function changeSlider(event: Event): void {
        currentCapital = (event.currentTarget as HTMLInputElement).value;
        document.getElementById("startCapital").innerHTML = currentCapital;
    }
}












//in Zusammenarbeit mit Alessia :)

namespace A11_BlumenwieseAdvanced { //Busch und Pflanze habe ich mir etwas bei Mona S. abgeschaut


    window.addEventListener("load", handleLoad);

    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;

    let imageData: ImageData;
    let flowerArray: Flower [] = [];
    let moveables: Moveable [] = [];

    function handleLoad(_event: Event): void {

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas")!;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d")!;
        
        drawBackgroundGrass(0, 0);
        drawBackgroundSky(0, 0, "#88d1CF");

        drawSun(180, 100, "#f7fae1");
        createClouds();
        

        
        window.setInterval(update, 50);

        drawMountain1(0, 350, "#575554", "#000000");
        drawBush1(560, 410, "#D98F8F");
        drawBush2(- 20, 440, "#BF7C63");
        drawBush1(880, 450, "#D98F8F");
        drawBush2( 250, 400, "#BF7C63");
        drawBush1(780, 350, "#D98F8F");

        createFlower();
        drawFlower();
       
        
        drawTreeCrown1(0, 350, "#7a2900", "#7a2900");

        drawNest();

        //backgroud imageData
        imageData = crc2.getImageData(0, 0, canvas.width, canvas.height);
        createBee(10);

        nectarAmount();
        window.setInterval(nectarAmount, 200);
        
}//handleload

    function update(): void {
        //console.log("update");
        crc2.clearRect(0, 0, 1000, 750);
        crc2.putImageData(imageData, 0, 0);

        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();
        }
    }   

    function createBee(_amound: number): void {
        for (let i: number = 0; i < 10; i++) {
            // console.log("create bee");
            let bee: Moveable = new Bee();
            moveables.push(bee);    
        }
    }


    function createClouds(): void {
        for (let i: number = 0; i < 1; i++) {
            let cloud: Moveable = new Cloud(0.5);
            moveables.push(cloud);
           //console.log(cloudArray);                 
        }
    }

    function createFlower(): void {
       //console.log("create flower");
       for (let i: number = 0; i < 10; i++) {
        let flower: Flower = new Flower();
        flowerArray.push(flower);  
    } 
       for (let i: number = 0; i < 10; i++) {
        let flower2: Flower = new Flower();
        flowerArray.push(flower2);  
    }
}
    function drawFlower(): void {
    for (let flower of flowerArray) {
        let randomX: number = Math.floor(Math.random() * 900);
        let randomY: number = Math.floor(Math.random() * 200);
        flower.draw(randomX + 50, randomY + 370);
    }
    for (let flower2 of flowerArray) {
        let randomX: number = Math.floor(Math.random() * 900);
        let randomY: number = Math.floor(Math.random() * 200);
        flower2.draw2(randomX + 50, randomY + 470);
    }
}


//Sky
    function drawBackgroundSky (_x: number, _y: number, _strokeColor: string): void {
        var gradient: CanvasGradient = crc2.createLinearGradient(0, 300, 0, 10);
        gradient.addColorStop(0, "#99AABF");
        gradient.addColorStop(1, "#383D59");
    
        crc2.beginPath();
        crc2.fillStyle = gradient;
    
        crc2.moveTo(_x, _y);
        crc2.lineTo(_x + 1280, _y);
        crc2.lineTo(_x + 1280, _y + 400);
        crc2.lineTo(_x - 1280, _y + 400);
    
        crc2.closePath();
        crc2.fill();
}

//grass
    function drawBackgroundGrass (_x: number, _y: number): void {
        var gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0.5, "#383D59");
        gradient.addColorStop(0.6, "#99AABF");
        
        crc2.beginPath();
        crc2.fillStyle = gradient;

        crc2.moveTo(_x, _y + 400); // Start von 0, 300 aus
        crc2.lineTo(_x + 1280, _y + 400);
        crc2.lineTo(_x + 1280, _y + 900);
        crc2.lineTo(_x - 1280, _y + 900);

        crc2.closePath();
        crc2.fill();
    }

//Sun
    function drawSun (_x: number, _y: number, _fillColor: string): void {
             // Sonne
             crc2.beginPath();
             crc2.fillStyle = _fillColor;
     
             //Sonnenstrahlen
             crc2.arc(150, _y, 100, 0, 2 * Math.PI);
             crc2.closePath();
             crc2.fill();
    }

//Mountains
    function drawMountain1 (_x: number, _y: number, _fillColor: string, _strokeColor: string): void {
        crc2.beginPath();
        crc2.fillStyle = _fillColor;

        //Farbverlauf Berg
        var gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 460);
        gradient.addColorStop(0.5, "#5D7CA6");
        gradient.addColorStop(0.8, "#023059");
        
        //Berg
        crc2.fillStyle = gradient;

        // Funktion berg rechts

        crc2.beginPath();
        crc2.moveTo(1280, 400);
        crc2.quadraticCurveTo(1000, 10, 550, 400);
        crc2.fill();

 
        //berg 
        crc2.beginPath();
        crc2.moveTo(500, 400);
        crc2.quadraticCurveTo(100, 90, -200, 400);
        crc2.moveTo(500, 30);
        crc2.quadraticCurveTo(50, 0, -20, -10);
        crc2.fill();

        // Funktion Berg vorne
        crc2.beginPath();
        crc2.moveTo(1000, 400);
        crc2.quadraticCurveTo(850, 90, 200, 400);
        crc2.fill();
    }

//Busch
    function drawBush1(_x: number, _y: number, _fillColor: string): void {
        crc2.beginPath();
        crc2.fillStyle = _fillColor;

        crc2.arc(_x + 55, _y + 30, 45, 0, 2 * Math.PI);
        crc2.arc(_x + 75, _y + 10, 30, 0, 2 * Math.PI);
        crc2.arc(_x + 120, _y + 40, 34, 0, 2 * Math.PI);
        crc2.arc(_x + 90, _y + 30, 45, 0, 2 * Math.PI);

        crc2.closePath();
        crc2.fill();

        //console.log("Bush");
    }

    function drawBush2(_x: number, _y: number, _fillColor: string): void {
        crc2.beginPath();
        crc2.fillStyle = _fillColor;

        crc2.arc(_x + 20, _y + 30, 28, 0, 2 * Math.PI);
        crc2.arc(_x + 50, _y + 10, 25, 0, 2 * Math.PI);
        crc2.arc(_x + 80, _y + 15, 20, 0, 2 * Math.PI);
        crc2.arc(_x + 55, _y + 30, 25, 0, 2 * Math.PI);

        crc2.closePath();
        crc2.fill();

        //console.log("Bush");
    }

//Baum
    function drawTreeCrown1(_x: number, _y: number, _fillColor: string, _strokeColor: string): void {
        

        crc2.closePath();
        crc2.restore();
        //Stamm
        crc2.beginPath();
        crc2.fillStyle = "#8C6046";

        crc2.fillRect(1000, 335, 25, 110);
        crc2.fillRect(1080, 355, 50, 6);
        crc2.fillRect(1070, 380, 20, 6);
        //Krone
        crc2.beginPath();
        crc2.fillStyle = "#BF214B";
        crc2.arc(980, 255, 60, 0, 2 * Math.PI);
        crc2.arc(1050, 285, 55, 0, 2 * Math.PI);
        crc2.arc(980, 315, 35, 0, 2 * Math.PI);
        crc2.arc(990, 305, 55, 0, 2 * Math.PI);
        crc2.arc(1065, 265, 75, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
      //Baumstamm2
        crc2.beginPath();
        crc2.fillStyle = "#8C6046";
        crc2.fillRect(200, 325, 25, 110);
      
      //Baumkrone
        crc2.beginPath();
        crc2.fillStyle = "#F29F8D";
        crc2.arc(220, 255, 40, 0, 2 * Math.PI);
        crc2.arc(250, 310, 35, 0, 2 * Math.PI);
        crc2.arc(190, 315, 35, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();

      //baumstamm 3
        crc2.beginPath();
        crc2.fillStyle = "#8C6046";

        crc2.fillRect(1080, 335, 25, 110);
      
      //Baumkrone
        crc2.beginPath();
        crc2.fillStyle = "#F29F8D";
        crc2.arc(1100, 255, 60, 0, 2 * Math.PI);
        crc2.arc(1140, 285, 55, 0, 2 * Math.PI);
        crc2.arc(1110, 315, 35, 0, 2 * Math.PI);
        crc2.arc(1065, 305, 55, 0, 2 * Math.PI);
        crc2.arc(1065, 265, 75, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
}




    function drawNest(): void {
        //Nest
        crc2.save();
        crc2.beginPath();
        crc2.ellipse(750, 460, 50, 65, Math.PI / 1, 0, 2 * Math.PI);
        crc2.fillStyle = "#FF9933";
        crc2.strokeStyle = "#996600";
        crc2.lineWidth = 5;
        crc2.stroke();
        crc2.fill();
        crc2.closePath();
        //streifen
        crc2.beginPath();
        crc2.moveTo(710, 420);
        crc2.lineTo(790, 420);
        crc2.moveTo(700, 450);
        crc2.lineTo(800, 450);
        crc2.moveTo(700, 470);
        crc2.lineTo(800, 470);
        crc2.moveTo(710, 500);
        crc2.lineTo(790, 500);
        crc2.strokeStyle = "#996600";
        crc2.lineWidth = 3;
        crc2.stroke();
        crc2.closePath();
        //tür
        crc2.beginPath();
        crc2.arc(750, 470, 15, 0, 2 * Math.PI);
        crc2.fillStyle = "#996600";
        crc2.fill();
        crc2.closePath();
        //türschatten
        crc2.beginPath();
        crc2.arc(750, 470, 10, 0, 2 * Math.PI);
        crc2.fillStyle = "#663300";
        crc2.fill();
        crc2.closePath();



    }
    let i: number = 0;
    function nectarAmount(): void {
        if (i == 0) {
            i = 1;
            let bar: HTMLElement = <HTMLElement> document.getElementById("bar");
            let width: number = 1;
            let percent: number = setInterval(frame, 150);
            function frame(): void {
                if (width >= 100) {
                    clearInterval(percent);
                    i = 100;
                } else {
                    width++;
                    bar.style.width = width + "%";
                    bar.innerHTML = width + "%";
                }
            }
        }
    } 

} //namespaceklammer
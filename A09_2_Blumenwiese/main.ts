//Dino und ich haben uns mit Alessia abgesprochen und sie hat uns beim Code geholfen, da wir uns schwer taten und sie uns ihre hilfe angeboten hatte

namespace BlumenwieseClasses {
    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;
    let letters: string = "";
    let color: string = "";
    let beeArray: Bienen [] = [];
    
    let cloudArray: Cloud [] = [];
    let xCloudArray: number [] = [];
    let yCloudArray: number [] = [];
    let cloudSize: Vector = new Vector (10, 5);


    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("#board");
        let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");
        
        createCloud();
        createCloudxy(20, cloudSize);
        createBees(10);


        function getRandomColor(): string {
            letters = "0123456789ABCDEF";
            color = "#";
            for (let i: number = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
                //console.log(color);
            }
            return color;
        }
        
        function drawBushBig(_x: number, _y: number, _fillColor: string): void {

            crc2.beginPath();
            crc2.fillStyle = _fillColor;
    
            crc2.arc(_x + 55, _y + 30, 45, 0, 2 * Math.PI);
            crc2.arc(_x + 75, _y + 10, 30, 0, 2 * Math.PI);
            crc2.arc(_x + 120, _y + 40, 34, 0, 2 * Math.PI);
            crc2.arc(_x + 90, _y + 30, 45, 0, 2 * Math.PI);
    
            crc2.closePath();
            crc2.fill();
        }
    
        
        function drawBushSmall(_x: number, _y: number, _fillColor: string): void {
    
            crc2.beginPath();
            crc2.fillStyle = _fillColor;
    
            crc2.arc(_x + 20, _y + 30, 28, 0, 2 * Math.PI);
            crc2.arc(_x + 50, _y + 10, 25, 0, 2 * Math.PI);
            crc2.arc(_x + 80, _y + 15, 20, 0, 2 * Math.PI);
            crc2.arc(_x + 55, _y + 30, 25, 0, 2 * Math.PI);
    
            crc2.closePath();
            crc2.fill();
        }

        function drawSky(_x: number, _y: number, _strokeColor: string): void {

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

        function drawField (_x: number, _y: number): void {
            
        var gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0.5, "#088A08");
        gradient.addColorStop(0.6, "#3ADF00");
        
        crc2.beginPath();
        crc2.fillStyle = gradient;

        crc2.moveTo(_x, _y + 400); 
        crc2.lineTo(_x + 1280, _y + 400);
        crc2.lineTo(_x + 1280, _y + 900);
        crc2.lineTo(_x - 1280, _y + 900);

        crc2.closePath();
        crc2.fill();
    }
    
        function drawMoon(_x: number, _y: number, _fillColor: string): void {
             
        crc2.beginPath();
        crc2.fillStyle = _fillColor;

        
        crc2.arc(150, _y, 100, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
    }
    
        
        function drawMountain(_x: number, _y: number, _fillColor: string, _strokeColor: string): void {
            crc2.beginPath();
            crc2.fillStyle = _fillColor;
    
            
            var gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 460);
            gradient.addColorStop(0.5, "#D8D8D8");
            gradient.addColorStop(0.8, "#424242");
            
            
            crc2.fillStyle = gradient;

            

            crc2.beginPath();
            crc2.moveTo(1280, 400);
            crc2.quadraticCurveTo(1000, 10, 550, 400);
            crc2.fill();
    
     
            
            crc2.beginPath();
            crc2.moveTo(500, 400);
            crc2.quadraticCurveTo(100, 90, -200, 400);
            crc2.moveTo(500, 30);
            crc2.quadraticCurveTo(50, 0, -20, -10);
            crc2.fill();

           
            crc2.beginPath();
            crc2.moveTo(1000, 400);
            crc2.quadraticCurveTo(850, 90, 200, 400);
            crc2.fill();
            
    
           
            }
        
        function drawTrees (_x: number, _y: number, _fillColor: string, _strokeColor: string): void {
                
        crc2.beginPath();
        crc2.fillStyle = "#8C6046";

        crc2.fillRect(1000, 335, 25, 110);
        crc2.fillRect(1080, 355, 50, 6);
        crc2.fillRect(1070, 380, 20, 6);

        
        crc2.beginPath();
        crc2.fillStyle = "#BF214B";
        crc2.arc(980, 255, 60, 0, 2 * Math.PI);
        crc2.arc(1050, 285, 55, 0, 2 * Math.PI);
        crc2.arc(980, 315, 35, 0, 2 * Math.PI);
        crc2.arc(990, 305, 55, 0, 2 * Math.PI);
        crc2.arc(1065, 265, 75, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        
        
        crc2.beginPath();
        crc2.fillStyle = "#8C6046";
        crc2.fillRect(200, 325, 25, 110);
        
        
        crc2.beginPath();
        crc2.fillStyle = "#F29F8D";
        crc2.arc(220, 255, 40, 0, 2 * Math.PI);
        crc2.arc(250, 310, 35, 0, 2 * Math.PI);
        crc2.arc(190, 315, 35, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();

        
        crc2.beginPath();
        crc2.fillStyle = "#8C6046";

        crc2.fillRect(1080, 335, 25, 110);
        
        
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

        function createCloudxy (_particleNumber: number, _size: Vector): void {
        for (let i: number = 0; i < _particleNumber; i++) {
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);

            xCloudArray.push(x);
            yCloudArray.push(y);
        }
    }
        function createCloud(): void {
            let xCloud: number = 0;
            let yCloud: number = 150;
            let cloudPosition: Vector = new Vector (xCloud, yCloud);
            let cloudSize: Vector = new Vector (100, 50); 
            let velocityCloud: Vector = new Vector (4, 0);
          
            for (let i: number = 0; i < 20; i++) {
            let cloud: Cloud = new Cloud (cloudPosition, cloudSize, velocityCloud, xCloudArray[i], yCloudArray[i]);
           
            cloud.drawCloud();
            cloudArray.push(cloud);
            }
    
        }

        function createBees(_nBees: number): void {
            console.log("Create Bees");
            

            for (let i: number = 0; i < _nBees; i++) {
                let randomXBee: number = Math.random() * (crc2.canvas.width);
                let randomYBee: number = Math.random() * (crc2.canvas.height);
                let beePosition: Vector = new Vector (randomXBee, randomYBee);
                let beeVelocity: Vector = new Vector ( 20, 0);
                let bee: Bienen = new Bienen(beePosition, beeVelocity);
                beeArray.push(bee);
                
            }
        }
        function drawFlower1(_x: number, _y: number): void {
        
                crc2.beginPath();
    
                crc2.fillStyle = "#556B2F";

                crc2.fillRect(_x - 2, _y + 10, 4, 50); // Dritter Wert = Breite Stiel, vierter Wert = Länge

        
                crc2.moveTo(_x, _y + 50);
                crc2.lineTo(_x + 10, _y + 15);
                crc2.moveTo(_x, _y + 50);
                crc2.lineTo(_x - 10, _y + 20);
                crc2.moveTo(_x, _y + 55);
                crc2.lineTo(_x + 12, _y + 35);

                crc2.stroke();
                crc2.fill();

        
                crc2.beginPath();
                crc2.fillStyle = "#F2AF5C";

                crc2.moveTo(_x, _y);
                crc2.arc(_x, _y - 9, 7, 0, 2 * Math.PI);
                crc2.arc(_x + 6, _y + 6, 7, 0, 2 * Math.PI);
                crc2.arc(_x - 6, _y + 6, 7, 0, 2 * Math.PI);
                crc2.arc(_x - 8, _y - 4, 7, 0, 2 * Math.PI);
                crc2.arc(_x + 8, _y - 4, 7, 0, 2 * Math.PI);
                crc2.fill();
        }


        function drawFlower2(_x: number, _y: number): void {
                 
                crc2.beginPath();
    
                crc2.fillStyle = "#556B2F";

                crc2.fillRect(_x - 2, _y + 10, 4, 50); 

 
                crc2.beginPath();
                crc2.fillStyle = "#F2EDE4";

                crc2.moveTo(_x, _y);
                crc2.arc(_x, _y - 9, 7, 0, 2 * Math.PI);
                crc2.arc(_x + 6, _y + 6, 7, 0, 2 * Math.PI);
                crc2.arc(_x - 6, _y + 6, 7, 0, 2 * Math.PI);
                crc2.arc(_x - 8, _y - 4, 7, 0, 2 * Math.PI);
                crc2.arc(_x + 8, _y - 4, 7, 0, 2 * Math.PI);
                crc2.fill();
    }

        function drawFlower3(_x: number, _y: number): void {
            
                
               
                crc2.beginPath();
                crc2.fillStyle = "#556B2F";

                crc2.fillRect(_x + 9, _y + 28, 3, 40);

       
                crc2.arc(_x + 8, _y + 30, 20, 0, 1.5);

                crc2.fill();

       
                crc2.beginPath();
                crc2.fillStyle = "#FF1493";

                crc2.arc(_x + 10, _y + 20, 10, 0, 1 * Math.PI);
                crc2.moveTo(_x, _y + 22);
                crc2.lineTo(_x, _y + 7);
                crc2.lineTo(_x + 6, _y + 14);
                crc2.lineTo(_x + 10.5, _y + 4);
                crc2.lineTo(_x + 15, _y + 14);
                crc2.lineTo(_x + 20, _y + 7);
                crc2.lineTo(_x + 20, _y + 21);

                crc2.closePath();
                crc2.fill();
            }
        
      
        function update(): void {   
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
       

        crc2.save();
        drawSky(0, 0, "#88d1CF");
        crc2.restore();
        crc2.save();
        getRandomColor();
        crc2.restore();
        crc2.save();
        crc2.restore();
        crc2.save();
        drawField(0, 0);
        crc2.restore();
        crc2.save();
        drawMoon(180, 100, "#f7fae1");
        crc2.restore();

    
        
        drawBushSmall(560, 410, "#D98F8F");
        drawBushBig(- 20, 440, "#BF7C63");

       
       
        crc2.save();
        drawMountain(0, 350, "#575554", "#000000");
        crc2.restore();
        crc2.save();
        drawTrees(0, 350, "#7a2900", "#7a2900");
        crc2.restore();
        crc2.save();
     
        for (let bee of beeArray) {
            bee.move(1 / 30);
            bee.drawBees(0, 0);
            
        }
        for (let i: number = 0; i < 20; i++) {
            cloudArray[i].drawCloud();
            cloudArray[i].move(1 / 50);
        }
        drawFlower1(550, 565);
        drawFlower2(960, 565);
        drawFlower3(900, 600);
        for (var height: number = 450; height < 630; height += 2) {

            var randomFlower: number = Math.floor((Math.random() * 3));
            var width: number = Math.floor((Math.random() * 1100) - 10);

            switch (randomFlower) {

                case 0:
                    drawFlower1(width, height);
                    break;
                case 1:
                    drawFlower2(width, height);
                    break;
                case 2:
                    drawFlower3(width, height);
                    break;
            }
        }

    }   
        window.setInterval(update, 60); 
 } 
}
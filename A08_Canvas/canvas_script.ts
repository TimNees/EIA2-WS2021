//Dino und ich haben uns bei der Aufgabe mit Alessia ausgetauscht :)
    window.addEventListener("load", start);
    
    let crc2: CanvasRenderingContext2D;
    let crc3: CanvasRenderingContext2D;
    let crc4: CanvasRenderingContext2D;

    function start(_event: Event): void {
        
        let canvas: HTMLCanvasElement = document.querySelector("canvas")!;
        crc2 = canvas.getContext("2d")!;
        crc3 = canvas.getContext("2d")!;
        crc4 = canvas.getContext("2d")!;

        circle();
        triangle();
        box();
     }
   
    function circle(): void {
        for (let i: number = 0; i < 20; i++) { 
    
            let red: number = Math.floor(Math.random() * 350);
            let green: number = Math.floor(Math.random() * 200);
            let blue: number = Math.floor(Math.random() * 150);
            
            crc2.beginPath();
            
            crc2.arc(Math.floor (Math.random() * (1000) + 1), Math.floor(Math.random() * (700) + 1), Math.floor(Math.random() * (90) + 1), 0 , 2 * Math.PI);
            crc2.stroke();
            crc2.closePath();
            
            crc2.fillStyle = "rgb(" + red + ", " + green + "," + blue + ")";
            crc2.fill();
            
            }
    }
    
    
    function triangle(): void {
       
        for (let i: number = 0; i < 10; i++) {

            let red: number = Math.floor(Math.random() * 200);
            let green: number = Math.floor(Math.random() * 150 );
            let blue: number = Math.floor(Math.random() * 300 );

            crc3.beginPath();

            crc3.moveTo(Math.floor(Math.random() * (200) + 1), Math.floor(Math.random() * (700) + 1));
            crc3.lineTo(Math.floor(Math.random() * (150) + 1), Math.floor(Math.random() * (700) + 1));
            crc3.lineTo(Math.floor(Math.random() * (300) + 1), Math.floor(Math.random() * (700) + 1));

            crc3.stroke();
            crc3.closePath();
            
            crc3.fillStyle = "rgb(" + red + ", " + green + "," + blue + ")";
            crc3.fill();

        }
    }
    
    function box(): void {

        for (let i: number = 0; i < 8; i++) {

            let red: number = Math.floor(Math.random() * 100);
            let green: number = Math.floor(Math.random() * 100 );
            let blue: number = Math.floor(Math.random() * 100 );

            crc4.beginPath();

            crc4.moveTo(Math.floor(Math.random() * (1000) + 1), Math.floor(Math.random() * (700) + 1));
            crc4.lineTo(Math.floor(Math.random() * (1000) + 1), Math.floor(Math.random() * (700) + 1));
            crc4.lineTo(Math.floor(Math.random() * (1000) + 1), Math.floor(Math.random() * (700) + 1));
            crc4.lineTo(Math.floor(Math.random() * (1000) + 1), Math.floor(Math.random() * (700) + 1));

            crc4.stroke();
            crc4.closePath();
            
            crc4.fillStyle = "rgb(" + red + ", " + green + "," + blue + ")";
            crc4.fill();

        }
     
     }
  
   
}
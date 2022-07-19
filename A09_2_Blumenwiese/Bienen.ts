namespace BlumenwieseClasses {
    export class Bienen {
        position: Vector;
        velocity: Vector;

        constructor(_position: Vector, _velocity: Vector) {
            this.position = new Vector(0, -900);
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 200); 
        }

   drawBees(_x: number, _y: number): void {
       let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("#board");
       let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");
       crc2.save();
       crc2.translate(this.position.x, this.position.y);
       
       crc2.beginPath();
       crc2.fillStyle = "#fdfd96";
       crc2.ellipse(_x , _y , 15, 20, Math.PI / 2, 0, 2 * Math.PI);
       crc2.arc(_x + 20, _y - 5, 10, 0, 2 * Math.PI);
       crc2.fill();
       crc2.closePath();
       //streifen
       crc2.beginPath();
       crc2.fillStyle = "black";
       crc2.ellipse(_x , _y , 15, 10, Math.PI / 2, 0, 1 * Math.PI);
       crc2.fill();
       crc2.closePath();
           //Flügel Biene
       crc2.beginPath();
       crc2.fillStyle = "lightBlue";
       crc2.ellipse(_x - 10, _y - 20, 8, 20, Math.PI / -5, 0, 2 * Math.PI);
       crc2.fill();
       crc2.closePath();
        //Auge Biene
       crc2.beginPath();
       crc2.fillStyle = "black";
       crc2.arc(_x + 24, _y - 6, 2, 0, 2 * Math.PI);
       crc2.fill();
       crc2.closePath();
 
           // Stachel Biene
       crc2.beginPath();
       crc2.fillStyle = "black";
       crc2.moveTo(_x - 20 , _y );
       crc2.lineTo(_x - 20, _y + 6);
       crc2.lineTo(_x - 30, _y + 3);
       crc2.fill();
       crc2.closePath();
       crc2.restore();
       
       
       }

       move(_timeslice: number): void {
       let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("#board");
       let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");
       
       let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
       offset.scale(_timeslice);
       this.position.add(offset);

       if (this.position.x < 0)
       this.position.x += crc2.canvas.width;

       if (this.position.y < 0)
       this.position.y += crc2.canvas.height;

       if (this.position.x > crc2.canvas.width)
       this.position.x -= crc2.canvas.width;

       if (this.position.y > crc2.canvas.height)
       this.position.y -= crc2.canvas.height;

       }
   }
}
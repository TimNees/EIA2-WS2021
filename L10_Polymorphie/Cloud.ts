namespace A10_BlumenwiesePolymorphie {

    export class Cloud extends Moveable {
        position: Vector;
        velocity: Vector;
        size: number;
        x: number;
        y: number;

        constructor(_size: number, _position?: Vector) {
            super(_position);

            if (_position) 
                this.position = _position;
            else
                this.position = new Vector(20, 100); 
                
            this.velocity = new Vector(100, 0); 
            this.size = _size;
        }


        draw(): void {
            
            let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("#board");
            let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");
            let particleNumber: number = 23;
            let particleRadius: number = 30;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, particleRadius);
            crc2.beginPath();
            gradient.addColorStop(0, "white");
            gradient.addColorStop(1, ("white"));
            particle.arc(0, 0, particleRadius, 0, 2 * Math.PI);
            particle.arc(-30, -30, particleRadius, 0,  2 * Math.PI);
            particle.arc(30, 0, particleRadius, 0,  2 * Math.PI);
            particle.arc(60, -30, 30, 0,  2 * Math.PI);
            particle.arc(60, -30, 30, 0,  2 * Math.PI);
            crc2.fillStyle = gradient;
            crc2.fill();
            crc2.closePath();
            
            
            
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = gradient;

            for (let i: number = 0; i < particleNumber; i++) {
                crc2.save();
                crc2.translate(this.x, this.y);
                crc2.fill(particle);
                crc2.restore();
            }

            crc2.restore();
            
        }
    }//classklammer
}//namespaceende
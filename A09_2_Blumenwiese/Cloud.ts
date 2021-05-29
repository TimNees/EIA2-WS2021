namespace BlumenwieseClasses {
    export class Cloud {
        position: Vector;
        velocity: Vector;
        size: Vector;
        x: number;
        y: number;

        constructor(_position: Vector, _size: Vector, _velocity: Vector, _x: number, _y: number) {
            this.position = _position;
            this.velocity = _velocity;
            this.size = _size;
            this.x = _x;
            this.y = _y;
            
        }
        drawCloud(): void {
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
namespace A10_BlumenwiesePolymorphie {

    export class Bee extends Moveable {
        position: Vector;
        velocity: Vector;
        size: number;

//konstruieren der Biene
        constructor (_position?: Vector) { 
            super(_position);
            
            
            //position
            if (_position) 
                this.position = _position; //position, wie deklaiert
            else
                this.position = new Vector(750, 470); //position, wenn kein Vektor angegeben ist
                
            //geschwindigkeit
            this.velocity = new Vector(1000, 0); //Geschwindigkeit
            this.velocity.random(120, 20); //Geschwindigkeit zufällig innerhalb eines Bereichs
        }

        draw(): void {
            //console.log("Bee draw");
            crc2.save();
            crc2.beginPath();
            //körper
            crc2.ellipse(this.position.x , this.position.y , 15, 20, Math.PI / 2, 0, 2 * Math.PI);
            crc2.arc(this.position.x + 20, this.position.y - 5, 10, 0, 2 * Math.PI);
            crc2.fillStyle = "#FFCC33";
            crc2.fill();
            crc2.closePath();
            
            //ssreifen
            crc2.save();
            crc2.beginPath();
            crc2.fillStyle = "black";
            crc2.ellipse(this.position.x , this.position.y, 15, 10, Math.PI / 2, 0, 1 * Math.PI);
            crc2.fill();
            crc2.closePath();

            //flügel
            crc2.beginPath();
            crc2.fillStyle = "lightBlue";
            crc2.ellipse(this.position.x - 10 , this.position.y - 20, 8, 20, Math.PI / -5, 0, 2 * Math.PI);
            crc2.fill();
            crc2.closePath();

             //Auge Biene
            crc2.beginPath();
            crc2.fillStyle = "black";
            crc2.arc(this.position.x + 24, this.position.y - 6, 2, 0, 2 * Math.PI);
            crc2.fill();
            crc2.closePath();

            //fühler oder stachel, liegt im auge des Betrachters
            crc2.beginPath();
            crc2.fillStyle = "black";
            crc2.moveTo(this.position.x - 20 , this.position.y );
            crc2.lineTo(this.position.x - 20, this.position.y + 6);
            crc2.lineTo(this.position.x - 30, this.position.y + 3);
            crc2.fill();
            crc2.closePath();
            crc2.restore();

        }

    }//classklammer


}//namespaceklammer
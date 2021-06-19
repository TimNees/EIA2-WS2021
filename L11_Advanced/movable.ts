namespace A11_BlumenwieseAdvanced {

    export abstract class Moveable {
        protected position: Vector;
        protected velocity: Vector;

//konstruieren der Biene
        constructor(_position?: Vector) { //const. bekommt keinen rückgabewert
            //console.log("Move Constructor");

            //position
            if (_position) 
                this.position = _position; //position, wie deklaiert
            else
                this.position = new Vector(750, 470); //position, wenn kein Vektor angegeben ist

            //geschwindigkeit
            this.velocity = new Vector(1000, 0); //Geschwindigkeit
        }

        public abstract draw(): void;

        public move(_timeslice: number): void { //Velocity+timeslice=weg Geschwindigkeit+Zeit=weg
            
            let offset: Vector = this.velocity.copy(); //offset=weg
            offset.scale(_timeslice); //mit scale muliplizieren = Verschiebung
            this.position.add(offset);

            //damit Objekt innerhalb des Bereichs bleibt
            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.height)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;

                
        }

    }
}
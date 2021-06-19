"use strict";
var A11_BlumenwieseAdvanced;
(function (A11_BlumenwieseAdvanced) {
    class Moveable {
        //konstruieren der Biene
        constructor(_position) {
            //console.log("Move Constructor");
            //position
            if (_position)
                this.position = _position; //position, wie deklaiert
            else
                this.position = new A11_BlumenwieseAdvanced.Vector(750, 470); //position, wenn kein Vektor angegeben ist
            //geschwindigkeit
            this.velocity = new A11_BlumenwieseAdvanced.Vector(1000, 0); //Geschwindigkeit
        }
        move(_timeslice) {
            let offset = this.velocity.copy(); //offset=weg
            offset.scale(_timeslice); //mit scale muliplizieren = Verschiebung
            this.position.add(offset);
            //damit Objekt innerhalb des Bereichs bleibt
            if (this.position.x < 0)
                this.position.x += A11_BlumenwieseAdvanced.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += A11_BlumenwieseAdvanced.crc2.canvas.height;
            if (this.position.x > A11_BlumenwieseAdvanced.crc2.canvas.height)
                this.position.x -= A11_BlumenwieseAdvanced.crc2.canvas.width;
            if (this.position.y > A11_BlumenwieseAdvanced.crc2.canvas.height)
                this.position.y -= A11_BlumenwieseAdvanced.crc2.canvas.height;
        }
    }
    A11_BlumenwieseAdvanced.Moveable = Moveable;
})(A11_BlumenwieseAdvanced || (A11_BlumenwieseAdvanced = {}));
//# sourceMappingURL=movable.js.map
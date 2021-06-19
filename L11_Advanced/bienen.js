"use strict";
var A11_BlumenwieseAdvanced;
(function (A11_BlumenwieseAdvanced) {
    class Bee extends A11_BlumenwieseAdvanced.Moveable {
        //konstruieren der Biene
        constructor(_position) {
            super(_position);
            //position
            if (_position)
                this.position = _position; //position, wie deklaiert
            else
                this.position = new A11_BlumenwieseAdvanced.Vector(750, 470); //position, wenn kein Vektor angegeben ist
            //geschwindigkeit
            this.velocity = new A11_BlumenwieseAdvanced.Vector(1000, 0); //Geschwindigkeit
            this.velocity.random(120, 20); //Geschwindigkeit zufällig innerhalb eines Bereichs
        }
        draw() {
            //console.log("Bee draw");
            A11_BlumenwieseAdvanced.crc2.save();
            A11_BlumenwieseAdvanced.crc2.beginPath();
            //körper
            A11_BlumenwieseAdvanced.crc2.ellipse(this.position.x, this.position.y, 15, 20, Math.PI / 2, 0, 2 * Math.PI);
            A11_BlumenwieseAdvanced.crc2.arc(this.position.x + 20, this.position.y - 5, 10, 0, 2 * Math.PI);
            A11_BlumenwieseAdvanced.crc2.fillStyle = "#FFCC33";
            A11_BlumenwieseAdvanced.crc2.fill();
            A11_BlumenwieseAdvanced.crc2.closePath();
            //ssreifen
            A11_BlumenwieseAdvanced.crc2.save();
            A11_BlumenwieseAdvanced.crc2.beginPath();
            A11_BlumenwieseAdvanced.crc2.fillStyle = "black";
            A11_BlumenwieseAdvanced.crc2.ellipse(this.position.x, this.position.y, 15, 10, Math.PI / 2, 0, 1 * Math.PI);
            A11_BlumenwieseAdvanced.crc2.fill();
            A11_BlumenwieseAdvanced.crc2.closePath();
            //flügel
            A11_BlumenwieseAdvanced.crc2.beginPath();
            A11_BlumenwieseAdvanced.crc2.fillStyle = "lightBlue";
            A11_BlumenwieseAdvanced.crc2.ellipse(this.position.x - 10, this.position.y - 20, 8, 20, Math.PI / -5, 0, 2 * Math.PI);
            A11_BlumenwieseAdvanced.crc2.fill();
            A11_BlumenwieseAdvanced.crc2.closePath();
            //Auge Biene
            A11_BlumenwieseAdvanced.crc2.beginPath();
            A11_BlumenwieseAdvanced.crc2.fillStyle = "black";
            A11_BlumenwieseAdvanced.crc2.arc(this.position.x + 24, this.position.y - 6, 2, 0, 2 * Math.PI);
            A11_BlumenwieseAdvanced.crc2.fill();
            A11_BlumenwieseAdvanced.crc2.closePath();
            //fühler oder stachel, liegt im auge des Betrachters
            A11_BlumenwieseAdvanced.crc2.beginPath();
            A11_BlumenwieseAdvanced.crc2.fillStyle = "black";
            A11_BlumenwieseAdvanced.crc2.moveTo(this.position.x - 20, this.position.y);
            A11_BlumenwieseAdvanced.crc2.lineTo(this.position.x - 20, this.position.y + 6);
            A11_BlumenwieseAdvanced.crc2.lineTo(this.position.x - 30, this.position.y + 3);
            A11_BlumenwieseAdvanced.crc2.fill();
            A11_BlumenwieseAdvanced.crc2.closePath();
            A11_BlumenwieseAdvanced.crc2.restore();
        }
    } //classklammer
    A11_BlumenwieseAdvanced.Bee = Bee;
})(A11_BlumenwieseAdvanced || (A11_BlumenwieseAdvanced = {})); //namespaceklammer
//# sourceMappingURL=bienen.js.map
"use strict";
var L09Blumenwiese;
(function (L09Blumenwiese) {
    class Bee {
        constructor(_size, _position) {
            // console.log("bee constructor");
            if (_position) //kein Vektor angegeben
                this.position = _position;
            else
                this.position = new Vector(45, 325); // position wenn Vektor nicht angegeben ist
            this.velocity = new Vector(50, 0); //start
            this.velocity.random(120, 20); //random. Pixelwerte (min und max)
        }
        move(_timeslice) {
            // console.log("bee move");
            let offset = new Vector(this.velocity.x, this.velocity.y);
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
        draw() {
            //console.log("bee draw");
            crc2.save();
            crc2.beginPath();
            //body
            crc2.arc(this.position.x, this.position.y, 8, 0, 2 * Math.PI);
            crc2.strokeStyle = "yellow";
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.closePath();
            //stripes
            crc2.beginPath();
            crc2.moveTo(this.position.x - 3, this.position.y + 7);
            crc2.lineTo(this.position.x - 3, this.position.y - 7);
            crc2.moveTo(this.position.x, this.position.y + 8);
            crc2.lineTo(this.position.x, this.position.y - 8);
            crc2.moveTo(this.position.x + 3, this.position.y + 7);
            crc2.lineTo(this.position.x + 3, this.position.y - 7);
            crc2.strokeStyle = "black";
            crc2.stroke();
            crc2.lineWidth = 1.5;
            crc2.closePath();
            crc2.restore();
            //wings
            crc2.save();
            crc2.beginPath();
            crc2.arc(this.position.x - 4, this.position.y - 8, 4, 0, 2 * Math.PI);
            crc2.strokeStyle = "lightblue";
            crc2.fillStyle = "lightblue";
            crc2.fill();
            crc2.closePath();
            crc2.stroke();
            crc2.restore();
        }
    } //end bee class
    L09Blumenwiese.Bee = Bee;
})(L09Blumenwiese || (L09Blumenwiese = {})); //namespace end
//# sourceMappingURL=bee.js.map
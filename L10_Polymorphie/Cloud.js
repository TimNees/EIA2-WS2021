"use strict";
var A10_BlumenwiesePolymorphie;
(function (A10_BlumenwiesePolymorphie) {
    class Cloud extends A10_BlumenwiesePolymorphie.Moveable {
        constructor(_size, _position) {
            super(_position);
            if (_position)
                this.position = _position;
            else
                this.position = new A10_BlumenwiesePolymorphie.Vector(20, 100);
            this.velocity = new A10_BlumenwiesePolymorphie.Vector(100, 0);
            this.size = _size;
        }
        draw() {
            let canvas = document.querySelector("#board");
            let crc2 = canvas.getContext("2d");
            let particleNumber = 23;
            let particleRadius = 30;
            let particle = new Path2D();
            let gradient = crc2.createRadialGradient(0, 0, 0, 0, 0, particleRadius);
            crc2.beginPath();
            gradient.addColorStop(0, "white");
            gradient.addColorStop(1, ("white"));
            particle.arc(0, 0, particleRadius, 0, 2 * Math.PI);
            particle.arc(-30, -30, particleRadius, 0, 2 * Math.PI);
            particle.arc(30, 0, particleRadius, 0, 2 * Math.PI);
            particle.arc(60, -30, 30, 0, 2 * Math.PI);
            particle.arc(60, -30, 30, 0, 2 * Math.PI);
            crc2.fillStyle = gradient;
            crc2.fill();
            crc2.closePath();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = gradient;
            for (let i = 0; i < particleNumber; i++) {
                crc2.save();
                crc2.translate(this.x, this.y);
                crc2.fill(particle);
                crc2.restore();
            }
            crc2.restore();
        }
    } //classklammer
    A10_BlumenwiesePolymorphie.Cloud = Cloud;
})(A10_BlumenwiesePolymorphie || (A10_BlumenwiesePolymorphie = {})); //namespaceende
//# sourceMappingURL=Cloud.js.map
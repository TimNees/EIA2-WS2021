"use strict";
var A11_BlumenwieseAdvanced;
(function (A11_BlumenwieseAdvanced) {
    class Flower {
        constructor(_position) {
            //console.log("flower constructor");
        }
        draw(_x, _y) {
            for (let index = 0; index < 7; index++) {
                let reddarkFlower = Math.floor(Math.random() * 300);
                let redlightFlower = Math.floor(Math.random() * 100);
                let redFlower = Math.floor(Math.random() * 200);
                //Stiel
                A11_BlumenwieseAdvanced.crc2.beginPath();
                A11_BlumenwieseAdvanced.crc2.fillStyle = "#0B610B";
                A11_BlumenwieseAdvanced.crc2.fillRect(_x - 2, _y + 10, 4, 40);
                //Blüte
                A11_BlumenwieseAdvanced.crc2.beginPath();
                A11_BlumenwieseAdvanced.crc2.fillStyle = "rgb( " + reddarkFlower + ", " + redlightFlower + ", " + redFlower + ")";
                A11_BlumenwieseAdvanced.crc2.moveTo(_x, _y);
                A11_BlumenwieseAdvanced.crc2.arc(_x, _y - 9, 7, 0, 2 * Math.PI);
                A11_BlumenwieseAdvanced.crc2.arc(_x + 6, _y + 6, 7, 0, 2 * Math.PI);
                A11_BlumenwieseAdvanced.crc2.arc(_x - 6, _y + 6, 7, 0, 2 * Math.PI);
                A11_BlumenwieseAdvanced.crc2.arc(_x - 8, _y - 4, 7, 0, 2 * Math.PI);
                A11_BlumenwieseAdvanced.crc2.arc(_x + 8, _y - 4, 7, 0, 2 * Math.PI);
                A11_BlumenwieseAdvanced.crc2.fill();
                //Punkt 
                A11_BlumenwieseAdvanced.crc2.beginPath();
                A11_BlumenwieseAdvanced.crc2.fillStyle = "#FFBF00";
                A11_BlumenwieseAdvanced.crc2.arc(_x, _y, 3, 0, 2 * Math.PI);
                A11_BlumenwieseAdvanced.crc2.closePath();
                A11_BlumenwieseAdvanced.crc2.fill();
            }
        }
        draw2(_x, _y) {
            for (let index = 0; index < 5; index++) {
                let reddarkFlower = Math.floor(Math.random() * 300);
                let redlightFlower = Math.floor(Math.random() * 100);
                let redFlower = Math.floor(Math.random() * 200);
                //Stiel
                A11_BlumenwieseAdvanced.crc2.beginPath();
                A11_BlumenwieseAdvanced.crc2.fillStyle = "#0B610B";
                A11_BlumenwieseAdvanced.crc2.fillRect(_x - 2, _y + 10, 4, 40);
                //Blüte
                A11_BlumenwieseAdvanced.crc2.beginPath();
                A11_BlumenwieseAdvanced.crc2.fillStyle = "rgb( " + reddarkFlower + ", " + redlightFlower + ", " + redFlower + ")";
                A11_BlumenwieseAdvanced.crc2.moveTo(_x, _y);
                A11_BlumenwieseAdvanced.crc2.arc(_x, _y - 9, 7, 0, 2 * Math.PI);
                A11_BlumenwieseAdvanced.crc2.arc(_x + 6, _y + 6, 7, 0, 2 * Math.PI);
                A11_BlumenwieseAdvanced.crc2.arc(_x - 6, _y + 6, 7, 0, 2 * Math.PI);
                A11_BlumenwieseAdvanced.crc2.arc(_x - 8, _y - 4, 7, 0, 2 * Math.PI);
                A11_BlumenwieseAdvanced.crc2.arc(_x + 8, _y - 4, 7, 0, 2 * Math.PI);
                A11_BlumenwieseAdvanced.crc2.fill();
                //Punkt 
                A11_BlumenwieseAdvanced.crc2.beginPath();
                A11_BlumenwieseAdvanced.crc2.fillStyle = "#FFBF00";
                A11_BlumenwieseAdvanced.crc2.arc(_x, _y, 3, 0, 2 * Math.PI);
                A11_BlumenwieseAdvanced.crc2.closePath();
                A11_BlumenwieseAdvanced.crc2.fill();
            }
        }
    } //end flower 
    A11_BlumenwieseAdvanced.Flower = Flower;
})(A11_BlumenwieseAdvanced || (A11_BlumenwieseAdvanced = {}));
//# sourceMappingURL=Flower.js.map
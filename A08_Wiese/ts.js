"use strict";
//Alessia hat mir und Dino beim entwickeln des Codes und beim verstehen geholfen :)
var Canvas;
(function (Canvas) {
    window.addEventListener("load", handleLoad);
    let crc2;
    let canvas;
    let beeArray = [];
    function handleLoad(_event) {
        canvas = document.getElementsByTagName("canvas")[0];
        crc2 = canvas.getContext("2d");
        drawSky(0, 0, "#88d1CF");
        drawMountainBig(500, 310, "#D8D8D8");
        drawMeadow(0, 0);
        drawSun(560, 120, "#F2CAA7", "#F2CAA7");
        drawTree(750, 300);
        drawBushBig(860, 380, "#BF7C63");
        drawBushSmall(90, 380, "#D98F8F");
        drawBushSmall(190, 380, "#F2D7D0");
        drawBushBig(470, 380, "#BF7C63");
        drawBushSmall(560, 410, "#D98F8F");
        drawBushBig(-20, 440, "#BF7C63");
        drawCloud(160, 120, "#F2EDE4");
        drawCloud(760, 150, "#F2EDE4");
        drawCloud(560, 200, "#F2EDE4");
        drawCloud(360, 40, "#D3EDE5");
        drawBeehome();
        drawPoppy(550, 565);
        drawSunflower(960, 565);
        drawTulip(900, 600);
        createBee();
        window.setInterval(moveBee, 20);
        function createBee() {
            for (let i = 0; i < 10; i++) {
                // console.log("create bee");
                let bee = new Bee(0.8);
                beeArray.push(bee);
            }
        }
        function moveBee() {
            // crc2.clearRect(0, 0, 900, 500);
            // crc2.putImageData(imageData, 0, 0);
            // console.log("movebee");
            for (let bee of beeArray) {
                bee.move(1 / 50); //20 ms = 1/50
                bee.draw();
            }
        }
        for (var height = 450; height < 630; height += 2) {
            var randomFlower = Math.floor((Math.random() * 3));
            var width = Math.floor((Math.random() * 1100) - 10);
            switch (randomFlower) {
                case 0:
                    drawSunflower(width, height);
                    break;
                case 1:
                    drawPoppy(width, height);
                    break;
                case 2:
                    drawTulip(width, height);
                    break;
            }
        }
    }
    function drawMeadow(_x, _y) {
        var gradient = crc2.createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0.5, "#088A08");
        gradient.addColorStop(0.6, "#3ADF00");
        crc2.beginPath();
        crc2.fillStyle = gradient;
        crc2.moveTo(_x, _y + 400);
        crc2.lineTo(_x + 1280, _y + 400);
        crc2.lineTo(_x + 1280, _y + 720);
        crc2.lineTo(_x - 1280, _y + 720);
        crc2.closePath();
        crc2.fill();
    }
    function drawSky(_x, _y, _strokeColor) {
        var gradient = crc2.createLinearGradient(0, 300, 0, 10);
        gradient.addColorStop(0, "#99AABF");
        gradient.addColorStop(1, "#383D59");
        crc2.beginPath();
        crc2.fillStyle = gradient;
        crc2.moveTo(_x, _y);
        crc2.lineTo(_x + 1280, _y);
        crc2.lineTo(_x + 1280, _y + 400);
        crc2.lineTo(_x - 1280, _y + 400);
        crc2.closePath();
        crc2.fill();
    }
    function drawMountainBig(_x, _y, _fillColor) {
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        var gradient = crc2.createLinearGradient(0, 0, 0, 460);
        gradient.addColorStop(0.5, "#D8D8D8");
        gradient.addColorStop(0.8, "#424242");
        crc2.fillStyle = gradient;
        crc2.beginPath();
        crc2.moveTo(500, 500);
        crc2.quadraticCurveTo(100, 10, -200, 400);
        crc2.moveTo(500, 55);
        crc2.quadraticCurveTo(50, 0, -20, -10);
        crc2.fill();
        crc2.beginPath();
        crc2.moveTo(1000, 500);
        crc2.quadraticCurveTo(850, 50, -200, 600);
        crc2.fill();
        crc2.beginPath();
        crc2.moveTo(1280, 400);
        crc2.quadraticCurveTo(1050, 10, 600, 750);
        crc2.fill();
    }
    function drawSun(_x, _y, _strokeColor, _fillColor) {
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.arc(150, _y, 100, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
    }
    function drawTree(_x, _y) {
        //Stamm1
        crc2.beginPath();
        crc2.fillStyle = "#8C6046";
        crc2.fillRect(1000, 335, 25, 110);
        crc2.fillRect(1080, 355, 50, 6);
        crc2.fillRect(1070, 380, 20, 6);
        //Blätter1
        crc2.beginPath();
        crc2.fillStyle = "#04B404";
        crc2.arc(980, 255, 60, 0, 2 * Math.PI);
        crc2.arc(1050, 285, 55, 0, 2 * Math.PI);
        crc2.arc(980, 315, 35, 0, 2 * Math.PI);
        crc2.arc(990, 305, 55, 0, 2 * Math.PI);
        crc2.arc(1065, 265, 75, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        //Stamm2
        crc2.beginPath();
        crc2.fillStyle = "#8C6046";
        crc2.fillRect(200, 325, 25, 110);
        //Blätter2
        crc2.beginPath();
        crc2.fillStyle = "#3ADF00";
        crc2.arc(220, 255, 40, 0, 2 * Math.PI);
        crc2.arc(250, 310, 35, 0, 2 * Math.PI);
        crc2.arc(190, 315, 35, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
        //Stamm3
        crc2.beginPath();
        crc2.fillStyle = "#8C6046";
        crc2.fillRect(1080, 335, 25, 110);
        //Blätter3
        crc2.beginPath();
        crc2.fillStyle = "#3ADF00";
        crc2.arc(1800, 255, 60, 0, 2 * Math.PI);
        crc2.arc(1140, 285, 55, 0, 2 * Math.PI);
        crc2.arc(1110, 315, 35, 0, 2 * Math.PI);
        crc2.arc(1065, 305, 55, 0, 2 * Math.PI);
        crc2.arc(1065, 265, 75, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
    }
    function drawBushBig(_x, _y, _fillColor) {
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.arc(_x + 55, _y + 30, 45, 0, 2 * Math.PI);
        crc2.arc(_x + 75, _y + 10, 30, 0, 2 * Math.PI);
        crc2.arc(_x + 120, _y + 40, 34, 0, 2 * Math.PI);
        crc2.arc(_x + 90, _y + 30, 45, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
    }
    function drawBushSmall(_x, _y, _fillColor) {
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.arc(_x + 20, _y + 30, 28, 0, 2 * Math.PI);
        crc2.arc(_x + 50, _y + 10, 25, 0, 2 * Math.PI);
        crc2.arc(_x + 80, _y + 15, 20, 0, 2 * Math.PI);
        crc2.arc(_x + 55, _y + 30, 25, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
    }
    function drawCloud(_x, _y, _fillColor) {
        crc2.beginPath();
        crc2.fillStyle = _fillColor;
        crc2.arc(_x + 10, _y + 30, 25, 0, 2 * Math.PI);
        crc2.arc(_x + 50, _y + 25, 40, 0, 2 * Math.PI);
        crc2.arc(_x + 90, _y + 20, 35, 0, 2 * Math.PI);
        crc2.arc(_x + 130, _y + 20, 25, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fill();
    }
    function drawPoppy(_x, _y) {
        crc2.beginPath();
        crc2.fillStyle = "#556B2F";
        crc2.fillRect(_x - 2, _y + 10, 4, 50);
        crc2.moveTo(_x, _y + 50);
        crc2.lineTo(_x + 10, _y + 15);
        crc2.moveTo(_x, _y + 50);
        crc2.lineTo(_x - 10, _y + 20);
        crc2.moveTo(_x, _y + 55);
        crc2.lineTo(_x + 12, _y + 35);
        crc2.stroke();
        crc2.fill();
        crc2.beginPath();
        crc2.fillStyle = "#F2AF5C";
        crc2.moveTo(_x, _y);
        crc2.arc(_x, _y - 9, 7, 0, 2 * Math.PI);
        crc2.arc(_x + 6, _y + 6, 7, 0, 2 * Math.PI);
        crc2.arc(_x - 6, _y + 6, 7, 0, 2 * Math.PI);
        crc2.arc(_x - 8, _y - 4, 7, 0, 2 * Math.PI);
        crc2.arc(_x + 8, _y - 4, 7, 0, 2 * Math.PI);
        crc2.fill();
    }
    function drawSunflower(_x, _y) {
        crc2.beginPath();
        crc2.fillStyle = "#556B2F";
        crc2.fillRect(_x - 2, _y + 10, 4, 50);
        crc2.beginPath();
        crc2.fillStyle = "#F2EDE4";
        crc2.moveTo(_x, _y);
        crc2.arc(_x, _y - 9, 7, 0, 2 * Math.PI);
        crc2.arc(_x + 6, _y + 6, 7, 0, 2 * Math.PI);
        crc2.arc(_x - 6, _y + 6, 7, 0, 2 * Math.PI);
        crc2.arc(_x - 8, _y - 4, 7, 0, 2 * Math.PI);
        crc2.arc(_x + 8, _y - 4, 7, 0, 2 * Math.PI);
        crc2.fill();
    }
    function drawTulip(_x, _y) {
        crc2.beginPath();
        crc2.fillStyle = "#556B2F";
        crc2.fillRect(_x + 9, _y + 28, 3, 40);
        crc2.arc(_x + 8, _y + 30, 20, 0, 1.5);
        crc2.fill();
        crc2.beginPath();
        crc2.fillStyle = "#FF1493";
        crc2.arc(_x + 10, _y + 20, 10, 0, 1 * Math.PI);
        crc2.moveTo(_x, _y + 22);
        crc2.lineTo(_x, _y + 7);
        crc2.lineTo(_x + 6, _y + 14);
        crc2.lineTo(_x + 10.5, _y + 4);
        crc2.lineTo(_x + 15, _y + 14);
        crc2.lineTo(_x + 20, _y + 7);
        crc2.lineTo(_x + 20, _y + 21);
        crc2.closePath();
        crc2.fill();
    }
    function drawBeehome() {
        crc2.restore();
        //main house
        crc2.beginPath();
        crc2.arc(50, 300, 50, 0, 2 * Math.PI);
        crc2.fillStyle = "#d3a259";
        crc2.fill();
        crc2.closePath();
        //stripes
        crc2.beginPath();
        crc2.moveTo(5, 320);
        crc2.lineTo(95, 320);
        crc2.moveTo(0, 300);
        crc2.lineTo(100, 300);
        crc2.moveTo(5, 280);
        crc2.lineTo(95, 280);
        crc2.moveTo(22, 260);
        crc2.lineTo(80, 260);
        crc2.strokeStyle = "black";
        crc2.lineWidth = 2;
        crc2.stroke();
        crc2.closePath();
        //entrance
        crc2.beginPath();
        crc2.arc(50, 320, 10, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();
        //Ast
        crc2.beginPath();
        // crc2.moveTo(0, 300);
        crc2.fillStyle = "brown";
        crc2.fillRect(0, 235, 100, 20);
        crc2.closePath();
        crc2.save();
    }
})(Canvas || (Canvas = {}));
//# sourceMappingURL=ts.js.map
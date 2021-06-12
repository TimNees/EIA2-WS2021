"use strict";
//in Zusammenarbeit mit Neele Rauber, Aileen Akin und Tim Nees und mit der Hilfe von Lukas Muschal
var A10_BlumenwiesePolymorphie;
(function (A10_BlumenwiesePolymorphie) {
    window.addEventListener("load", handleLoad);
    let imageData;
    let flowerArray = [];
    let moveables = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        A10_BlumenwiesePolymorphie.crc2 = canvas.getContext("2d");
        drawBackgroundGrass(0, 0);
        drawBackgroundSky(0, 0, "#88d1CF");
        drawSun(180, 100, "#f7fae1");
        createClouds();
        window.setInterval(update, 50);
        drawMountain1(0, 350, "#575554", "#000000");
        drawBush1(560, 410, "#D98F8F");
        drawBush2(-20, 440, "#BF7C63");
        drawBush1(880, 450, "#D98F8F");
        drawBush2(250, 400, "#BF7C63");
        drawBush1(780, 350, "#D98F8F");
        createFlower();
        drawFlower();
        drawTreeCrown1(0, 350, "#7a2900", "#7a2900");
        drawNest();
        //backgroud imageData
        imageData = A10_BlumenwiesePolymorphie.crc2.getImageData(0, 0, canvas.width, canvas.height);
        createBee(10);
    } //handleload
    function update() {
        //console.log("update");
        A10_BlumenwiesePolymorphie.crc2.clearRect(0, 0, 1000, 750);
        A10_BlumenwiesePolymorphie.crc2.putImageData(imageData, 0, 0);
        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();
        }
    }
    function createBee(_amound) {
        for (let i = 0; i < 10; i++) {
            // console.log("create bee");
            let bee = new A10_BlumenwiesePolymorphie.Bee();
            moveables.push(bee);
        }
    }
    function createClouds() {
        for (let i = 0; i < 1; i++) {
            let cloud = new A10_BlumenwiesePolymorphie.Cloud(0.5);
            moveables.push(cloud);
            //console.log(cloudArray);                 
        }
    }
    function createFlower() {
        //console.log("create flower");
        for (let i = 0; i < 10; i++) {
            let flower = new A10_BlumenwiesePolymorphie.Flower();
            flowerArray.push(flower);
        }
        for (let i = 0; i < 10; i++) {
            let flower2 = new A10_BlumenwiesePolymorphie.Flower();
            flowerArray.push(flower2);
        }
    }
    function drawFlower() {
        for (let flower of flowerArray) {
            let randomX = Math.floor(Math.random() * 900);
            let randomY = Math.floor(Math.random() * 200);
            flower.draw(randomX + 50, randomY + 370);
        }
        for (let flower2 of flowerArray) {
            let randomX = Math.floor(Math.random() * 900);
            let randomY = Math.floor(Math.random() * 200);
            flower2.draw2(randomX + 50, randomY + 470);
        }
    }
    //Sky
    function drawBackgroundSky(_x, _y, _strokeColor) {
        var gradient = A10_BlumenwiesePolymorphie.crc2.createLinearGradient(0, 300, 0, 10);
        gradient.addColorStop(0, "#99AABF");
        gradient.addColorStop(1, "#383D59");
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.fillStyle = gradient;
        A10_BlumenwiesePolymorphie.crc2.moveTo(_x, _y);
        A10_BlumenwiesePolymorphie.crc2.lineTo(_x + 1280, _y);
        A10_BlumenwiesePolymorphie.crc2.lineTo(_x + 1280, _y + 400);
        A10_BlumenwiesePolymorphie.crc2.lineTo(_x - 1280, _y + 400);
        A10_BlumenwiesePolymorphie.crc2.closePath();
        A10_BlumenwiesePolymorphie.crc2.fill();
    }
    //grass
    function drawBackgroundGrass(_x, _y) {
        var gradient = A10_BlumenwiesePolymorphie.crc2.createLinearGradient(0, 0, 0, 800);
        gradient.addColorStop(0.5, "#383D59");
        gradient.addColorStop(0.6, "#99AABF");
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.fillStyle = gradient;
        A10_BlumenwiesePolymorphie.crc2.moveTo(_x, _y + 400); // Start von 0, 300 aus
        A10_BlumenwiesePolymorphie.crc2.lineTo(_x + 1280, _y + 400);
        A10_BlumenwiesePolymorphie.crc2.lineTo(_x + 1280, _y + 900);
        A10_BlumenwiesePolymorphie.crc2.lineTo(_x - 1280, _y + 900);
        A10_BlumenwiesePolymorphie.crc2.closePath();
        A10_BlumenwiesePolymorphie.crc2.fill();
    }
    //Sun
    function drawSun(_x, _y, _fillColor) {
        // Sonne
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.fillStyle = _fillColor;
        //Sonnenstrahlen
        A10_BlumenwiesePolymorphie.crc2.arc(150, _y, 100, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.closePath();
        A10_BlumenwiesePolymorphie.crc2.fill();
    }
    //Mountains
    function drawMountain1(_x, _y, _fillColor, _strokeColor) {
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.fillStyle = _fillColor;
        //Farbverlauf Berg
        var gradient = A10_BlumenwiesePolymorphie.crc2.createLinearGradient(0, 0, 0, 460);
        gradient.addColorStop(0.5, "#5D7CA6");
        gradient.addColorStop(0.8, "#023059");
        //Berg
        A10_BlumenwiesePolymorphie.crc2.fillStyle = gradient;
        // Funktion berg rechts
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.moveTo(1280, 400);
        A10_BlumenwiesePolymorphie.crc2.quadraticCurveTo(1000, 10, 550, 400);
        A10_BlumenwiesePolymorphie.crc2.fill();
        //berg 
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.moveTo(500, 400);
        A10_BlumenwiesePolymorphie.crc2.quadraticCurveTo(100, 90, -200, 400);
        A10_BlumenwiesePolymorphie.crc2.moveTo(500, 30);
        A10_BlumenwiesePolymorphie.crc2.quadraticCurveTo(50, 0, -20, -10);
        A10_BlumenwiesePolymorphie.crc2.fill();
        // Funktion Berg vorne
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.moveTo(1000, 400);
        A10_BlumenwiesePolymorphie.crc2.quadraticCurveTo(850, 90, 200, 400);
        A10_BlumenwiesePolymorphie.crc2.fill();
    }
    //Busch
    function drawBush1(_x, _y, _fillColor) {
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.fillStyle = _fillColor;
        A10_BlumenwiesePolymorphie.crc2.arc(_x + 55, _y + 30, 45, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(_x + 75, _y + 10, 30, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(_x + 120, _y + 40, 34, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(_x + 90, _y + 30, 45, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.closePath();
        A10_BlumenwiesePolymorphie.crc2.fill();
        //console.log("Bush");
    }
    function drawBush2(_x, _y, _fillColor) {
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.fillStyle = _fillColor;
        A10_BlumenwiesePolymorphie.crc2.arc(_x + 20, _y + 30, 28, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(_x + 50, _y + 10, 25, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(_x + 80, _y + 15, 20, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(_x + 55, _y + 30, 25, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.closePath();
        A10_BlumenwiesePolymorphie.crc2.fill();
        //console.log("Bush");
    }
    //Baum
    function drawTreeCrown1(_x, _y, _fillColor, _strokeColor) {
        A10_BlumenwiesePolymorphie.crc2.closePath();
        A10_BlumenwiesePolymorphie.crc2.restore();
        //Stamm
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.fillStyle = "#8C6046";
        A10_BlumenwiesePolymorphie.crc2.fillRect(1000, 335, 25, 110);
        A10_BlumenwiesePolymorphie.crc2.fillRect(1080, 355, 50, 6);
        A10_BlumenwiesePolymorphie.crc2.fillRect(1070, 380, 20, 6);
        //Krone
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.fillStyle = "#BF214B";
        A10_BlumenwiesePolymorphie.crc2.arc(980, 255, 60, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(1050, 285, 55, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(980, 315, 35, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(990, 305, 55, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(1065, 265, 75, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.closePath();
        A10_BlumenwiesePolymorphie.crc2.fill();
        //Baumstamm2
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.fillStyle = "#8C6046";
        A10_BlumenwiesePolymorphie.crc2.fillRect(200, 325, 25, 110);
        //Baumkrone
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.fillStyle = "#F29F8D";
        A10_BlumenwiesePolymorphie.crc2.arc(220, 255, 40, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(250, 310, 35, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(190, 315, 35, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.closePath();
        A10_BlumenwiesePolymorphie.crc2.fill();
        //baumstamm 3
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.fillStyle = "#8C6046";
        A10_BlumenwiesePolymorphie.crc2.fillRect(1080, 335, 25, 110);
        //Baumkrone
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.fillStyle = "#F29F8D";
        A10_BlumenwiesePolymorphie.crc2.arc(1100, 255, 60, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(1140, 285, 55, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(1110, 315, 35, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(1065, 305, 55, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.arc(1065, 265, 75, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.closePath();
        A10_BlumenwiesePolymorphie.crc2.fill();
    }
    function drawNest() {
        //Nest
        A10_BlumenwiesePolymorphie.crc2.save();
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.ellipse(750, 460, 50, 65, Math.PI / 1, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.fillStyle = "#FF9933";
        A10_BlumenwiesePolymorphie.crc2.strokeStyle = "#996600";
        A10_BlumenwiesePolymorphie.crc2.lineWidth = 5;
        A10_BlumenwiesePolymorphie.crc2.stroke();
        A10_BlumenwiesePolymorphie.crc2.fill();
        A10_BlumenwiesePolymorphie.crc2.closePath();
        //streifen
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.moveTo(710, 420);
        A10_BlumenwiesePolymorphie.crc2.lineTo(790, 420);
        A10_BlumenwiesePolymorphie.crc2.moveTo(700, 450);
        A10_BlumenwiesePolymorphie.crc2.lineTo(800, 450);
        A10_BlumenwiesePolymorphie.crc2.moveTo(700, 470);
        A10_BlumenwiesePolymorphie.crc2.lineTo(800, 470);
        A10_BlumenwiesePolymorphie.crc2.moveTo(710, 500);
        A10_BlumenwiesePolymorphie.crc2.lineTo(790, 500);
        A10_BlumenwiesePolymorphie.crc2.strokeStyle = "#996600";
        A10_BlumenwiesePolymorphie.crc2.lineWidth = 3;
        A10_BlumenwiesePolymorphie.crc2.stroke();
        A10_BlumenwiesePolymorphie.crc2.closePath();
        //tür
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.arc(750, 470, 15, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.fillStyle = "#996600";
        A10_BlumenwiesePolymorphie.crc2.fill();
        A10_BlumenwiesePolymorphie.crc2.closePath();
        //türschatten
        A10_BlumenwiesePolymorphie.crc2.beginPath();
        A10_BlumenwiesePolymorphie.crc2.arc(750, 470, 10, 0, 2 * Math.PI);
        A10_BlumenwiesePolymorphie.crc2.fillStyle = "#663300";
        A10_BlumenwiesePolymorphie.crc2.fill();
        A10_BlumenwiesePolymorphie.crc2.closePath();
    }
})(A10_BlumenwiesePolymorphie || (A10_BlumenwiesePolymorphie = {})); //namespaceklammer
//# sourceMappingURL=main.js.map
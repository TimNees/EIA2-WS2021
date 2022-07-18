"use strict";
var GemueseGarten;
(function (GemueseGarten) {
    class Fly {
        startPosition;
        endPosition;
        position;
        size;
        speed;
        image;
        constructor(position, size, endPosition, speed, image) {
            this.startPosition = [0, 0];
            this.endPosition = endPosition;
            this.position = position;
            this.size = size;
            this.speed = speed;
            this.image = image;
        }
        getPosition() {
            return this.position;
        }
        setPosition(position) {
            this.position = position;
        }
        getSize() {
            return this.size;
        }
        setSize(size) {
            this.size = size;
        }
        getSpeed() {
            return this.speed;
        }
        setSpeed(speed) {
            this.speed = speed;
        }
        getImage() {
            return this.image;
        }
        setImage(image) {
            this.image = image;
        }
        getStartPosition() {
            return this.startPosition;
        }
        setStartPosition(startPosition) {
            this.startPosition = startPosition;
        }
        getEndPosition() {
            return this.endPosition;
        }
    }
    GemueseGarten.Fly = Fly;
})(GemueseGarten || (GemueseGarten = {}));
//# sourceMappingURL=fly.js.map
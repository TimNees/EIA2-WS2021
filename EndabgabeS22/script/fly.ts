namespace GemueseGarten {
    export class Fly {
        private startPosition: [number, number];
        private endPosition: [number, number];
        private position: [number, number];
        private size: [number, number];
        private speed: number;
        private image: HTMLImageElement;

        constructor(position: [number, number], size: [number, number], endPosition: [number, number], speed: number, image: HTMLImageElement) {
            this.startPosition = [0, 0];
            this.endPosition = endPosition;
            this.position = position;
            this.size = size;
            this.speed = speed;
            this.image = image;

        }

        public getPosition(): [number, number] {
            return this.position;
        }

        public setPosition(position: [number, number]): void {
            this.position = position;
        }

        public getSize(): [number, number] {
            return this.size;
        }

        public setSize(size: [number, number]): void {
            this.size = size;
        }

        public getSpeed(): number {
            return this.speed;
        }

        public setSpeed(speed: number): void {
            this.speed = speed;
        }

        public getImage(): HTMLImageElement {
            return this.image;
        }

        public setImage(image: HTMLImageElement): void {
            this.image = image;
        }

        public getStartPosition(): [number, number] {
            return this.startPosition;
        }

        public setStartPosition(startPosition: [number, number]): void {
            this.startPosition = startPosition;
        }

        public getEndPosition(): [number, number] {
            return this.endPosition;
        }
    }
}
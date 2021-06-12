namespace A10_BlumenwiesePolymorphie {
    export class Vector {
        x: number;
        y: number;

        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }

        //x,y werden mit set besetzt
        set(_x: number, _y: number): void  {
            this.x = _x;
            this.y = _y;
        }

        //skalierung/größe/Änderung um den Faktor
        scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }
        //einen weiteren Vektor auf den bisherigen Vektor addieren
        add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        //zufällige Richtung mit bestimmter Länge
        random(_minLength: number, _maxLength: number): void {
            let length: number = _minLength + Math.random() * (_maxLength - _minLength);
            let direction: number = Math.random() * 2 * Math.PI;

            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
            
        }
        //copy der Position mit gleichem Wert
        copy(): Vector {
            return new Vector(this.x, this.y);
        }
    }

}//namespaceklammer
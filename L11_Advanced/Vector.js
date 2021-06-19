"use strict";
var A11_BlumenwieseAdvanced;
(function (A11_BlumenwieseAdvanced) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        //x,y werden mit set besetzt
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        //skalierung/größe/Änderung um den Faktor
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        //einen weiteren Vektor auf den bisherigen Vektor addieren
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        //zufällige Richtung mit bestimmter Länge
        random(_minLength, _maxLength) {
            let length = _minLength + Math.random() * (_maxLength - _minLength);
            let direction = Math.random() * 2 * Math.PI;
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
        //copy der Position mit gleichem Wert
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    A11_BlumenwieseAdvanced.Vector = Vector;
})(A11_BlumenwieseAdvanced || (A11_BlumenwieseAdvanced = {})); //namespaceklammer
//# sourceMappingURL=Vector.js.map
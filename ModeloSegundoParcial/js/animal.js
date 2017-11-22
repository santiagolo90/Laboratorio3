"use strict";
var ModeloSP;
(function (ModeloSP) {
    var animal = /** @class */ (function () {
        function animal(nombre, edad, patas) {
            this.Nombre = nombre;
            this.Edad = edad;
            this.Patas = patas;
        }
        animal.prototype.toJson = function () {
            return "{\"Nombre\":" + this.Nombre + ",\"Edad\":" + this.Edad + ",\"Patas\":" + this.Patas + "}";
        };
        return animal;
    }());
    ModeloSP.animal = animal;
})(ModeloSP || (ModeloSP = {}));

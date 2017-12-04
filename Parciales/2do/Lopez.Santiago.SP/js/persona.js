"use strict";
var SP;
(function (SP) {
    var persona = /** @class */ (function () {
        function persona(nombre, apellido, edad) {
            this.Nombre = nombre;
            this.Apellido = apellido;
            this.Edad = edad;
        }
        persona.prototype.toJson = function () {
            return "{\"Nombre\":" + this.Nombre + ",\"Edad\":" + this.Edad + ",\"Patas\":" + this.Apellido + "}";
        };
        return persona;
    }());
    SP.persona = persona;
})(SP || (SP = {}));

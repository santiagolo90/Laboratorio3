"use strict";
var ModeloSP;
(function (ModeloSP) {
    var tipoMascota;
    (function (tipoMascota) {
        tipoMascota[tipoMascota["Perro"] = 0] = "Perro";
        tipoMascota[tipoMascota["Gato"] = 1] = "Gato";
        tipoMascota[tipoMascota["Reptil"] = 2] = "Reptil";
        tipoMascota[tipoMascota["Roedor"] = 3] = "Roedor";
        tipoMascota[tipoMascota["Ave"] = 4] = "Ave";
        tipoMascota[tipoMascota["Pez"] = 5] = "Pez";
    })(tipoMascota = ModeloSP.tipoMascota || (ModeloSP.tipoMascota = {}));
})(ModeloSP || (ModeloSP = {}));

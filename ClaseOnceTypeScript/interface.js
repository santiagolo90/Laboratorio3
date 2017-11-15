function enviarMision(xmen) {
    console.log(xmen.nombre);
}
/*
let xmen:IXmen;
xmen.nombre ="Ciclope";
xmen.peleasGanadas= 4;

enviarMision(xmen);
*/
var XMEN2 = /** @class */ (function () {
    function XMEN2() {
    }
    XMEN2.prototype.miMetodo = function () {
        return "Metodo Interface";
    };
    return XMEN2;
}());
var xmen2 = new XMEN2();
console.log(xmen2.miMetodo());

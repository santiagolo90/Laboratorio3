"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ModeloSP;
(function (ModeloSP) {
    var mascota = /** @class */ (function (_super) {
        __extends(mascota, _super);
        function mascota(id, tipo, nombre, edad, patas) {
            var _this = _super.call(this, nombre, edad, patas) || this;
            _this.ID = id;
            _this.Tipo = tipo;
            return _this;
        }
        mascota.prototype.toJson = function () {
            var cadena = _super.prototype.toJson.call(this).replace('}', "");
            var json = cadena + (",\"id\":" + this.ID + ",\"Tipo\":" + this.Tipo.toString() + "}");
            return json;
        };
        return mascota;
    }(ModeloSP.animal));
    ModeloSP.mascota = mascota;
    //let m1:mascota = new mascota(1,tipoMascota.Ave,"Juan",25,4);
    //console.log(m1.toJson());
})(ModeloSP || (ModeloSP = {}));

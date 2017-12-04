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
var SP;
(function (SP) {
    var empleado = /** @class */ (function (_super) {
        __extends(empleado, _super);
        function empleado(id, genero, foto, nombre, apellido, edad) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.ID = id;
            _this.Genero = genero;
            _this.Foto = foto;
            return _this;
        }
        empleado.prototype.toJson = function () {
            var cadena = _super.prototype.toJson.call(this).replace('}', "");
            var json = cadena + (",\"id\":" + this.ID + ",\"Tipo\":" + this.Genero.toString() + ",\"Foto\":" + this.Foto + "}");
            return json;
        };
        return empleado;
    }(SP.persona));
    SP.empleado = empleado;
})(SP || (SP = {}));

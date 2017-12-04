"use strict";
var SP;
(function (SP) {
    var tipoGenero;
    (function (tipoGenero) {
        tipoGenero[tipoGenero["Masculino"] = 0] = "Masculino";
        tipoGenero[tipoGenero["Femenino"] = 1] = "Femenino";
        tipoGenero[tipoGenero["Otros"] = 2] = "Otros";
    })(tipoGenero = SP.tipoGenero || (SP.tipoGenero = {}));
})(SP || (SP = {}));

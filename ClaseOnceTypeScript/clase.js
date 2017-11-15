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
var Avenger = /** @class */ (function () {
    //? es opcional hay que comentar strict en tsconfig.json
    //para no descomentar strict hay que usar los undefined
    function Avenger(nombreReal, peleasGanadas, nombre) {
        this._nombre = nombre;
        this.nombreReal = nombreReal;
        this.peleasGanadas = peleasGanadas;
    }
    Avenger.prototype.mostrar = function () {
        return this._nombre + "," + this.nombreReal + "," + this.peleasGanadas + " ";
    };
    Object.defineProperty(Avenger.prototype, "nombre", {
        get: function () {
            return this._nombre;
        },
        set: function (nombre) {
            this._nombre = nombre;
        },
        enumerable: true,
        configurable: true
    });
    return Avenger;
}());
//extends hereda 
var Xmen = /** @class */ (function (_super) {
    __extends(Xmen, _super);
    //Super() es para heredar el constructor
    function Xmen(nr, pg, n, poder) {
        var _this = _super.call(this, nr, pg, n) || this;
        _this._poder = poder;
        return _this;
    }
    Xmen.prototype.mostrar = function () {
        //aca super funciona como override
        return _super.prototype.mostrar.call(this) + this._poder;
        //return `${this._poder} `;
    };
    return Xmen;
}(Avenger));
//let para declarar variables en tipescript (como var) 
var a1 = new Avenger("Ironman", 10, "Tony");
var a2 = new Avenger("bruce", 2);
console.log(a1.mostrar());
//alert(a1.mostrar());
alert(a2.mostrar());
//llama al set
a1.nombre = "hola";
//llama al get
console.log("Get " + a1.nombre);
//console.log(a1);
var x1 = new Xmen("Logan", 15, "Wolverine", "Garras Cura");
console.log(x1.mostrar());
alert(x1.mostrar());
var array = new Array();
array.push(a1);
array.push(x1);
var Apocalipsis = /** @class */ (function () {
    //cunado agrego public a la variable que le paso en el constructor se crea
    //en esa clase
    //singleton es para instanciar solo una vez esta clase via su get static
    //el constructor tiene que ser private
    function Apocalipsis(nombre) {
        this.nombre = nombre;
    }
    Object.defineProperty(Apocalipsis, "Instance", {
        get: function () {
            if ((!this._instance)) {
                this._instance = new Apocalipsis("HEELL");
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    return Apocalipsis;
}());
//llamo al get
console.log(Apocalipsis.Instance);

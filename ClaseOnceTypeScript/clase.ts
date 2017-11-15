class Avenger{
    private _nombre:string|undefined;
    nombreReal:string;
    peleasGanadas:number;

    //? es opcional hay que comentar strict en tsconfig.json
    //para no descomentar strict hay que usar los undefined
    constructor(nombreReal:string,peleasGanadas:number,nombre?:string){
        this._nombre = nombre;
        this.nombreReal = nombreReal;
        this.peleasGanadas = peleasGanadas;
    }

    mostrar():string{
        return `${this._nombre},${this.nombreReal},${this.peleasGanadas} `;
    }
    get nombre():string|undefined{
        return this._nombre;
    }
    set nombre(nombre:string|undefined){
        this._nombre = nombre;
    }

}
//extends hereda 
class Xmen extends Avenger{
    private _poder:string;

    //Super() es para heredar el constructor
    constructor(nr:string,pg:number,n:string,poder:string){
        super(nr,pg,n);
        this._poder = poder;
        
    }

    mostrar():string{
        //aca super funciona como override
        return super.mostrar() + this._poder;
        //return `${this._poder} `;
    }
    
}

//let para declarar variables en tipescript (como var) 
let a1:Avenger = new Avenger("Ironman",10,"Tony");
let a2:Avenger = new Avenger("bruce",2);

console.log(a1.mostrar());
//alert(a1.mostrar());
alert(a2.mostrar());
//llama al set
a1.nombre="hola";
//llama al get
console.log("Get " + a1.nombre);
//console.log(a1);

let x1:Xmen = new Xmen("Logan",15,"Wolverine","Garras Cura")
console.log(x1.mostrar());
alert(x1.mostrar());


let array = new Array<Avenger>();
array.push(a1);
array.push(x1);


class Apocalipsis{
    private static _instance:Apocalipsis;
    //cunado agrego public a la variable que le paso en el constructor se crea
    //en esa clase
    //singleton es para instanciar solo una vez esta clase via su get static
    //el constructor tiene que ser private
    private constructor(public nombre:string){

    }

    static get Instance():Apocalipsis{
        if((!this._instance)){
            this._instance = new Apocalipsis("HEELL");
        }
        return this._instance;
    }
}
//llamo al get
console.log(Apocalipsis.Instance);
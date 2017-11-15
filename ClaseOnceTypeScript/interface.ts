interface IXmen{
    nombre:string;
    peleasGanadas:number;
    otroAtributo:string;
    miMetodo():string;
}



function enviarMision(xmen:IXmen) {
    console.log(xmen.nombre);
    
}
/*
let xmen:IXmen;
xmen.nombre ="Ciclope";
xmen.peleasGanadas= 4;

enviarMision(xmen);
*/


class XMEN2 implements IXmen{
    miMetodo(): string {
        return "Metodo Interface"
    }
    nombre: string;
    peleasGanadas: number;
    otroAtributo: string;

    
}

let xmen2:XMEN2 = new XMEN2();
console.log(xmen2.miMetodo());
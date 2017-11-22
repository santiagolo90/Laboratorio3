namespace ModeloSP{
    export abstract class animal {

        public Nombre:string;
        public Edad:number;
        public Patas:number;

        constructor(nombre:string,edad:number,patas:number) {
            this.Nombre = nombre;
            this.Edad = edad;
            this.Patas = patas;
            
        }
        
        public toJson():string{
            return `{"Nombre":${this.Nombre},"Edad":${this.Edad},"Patas":${this.Patas}}`;
        }
    }

}

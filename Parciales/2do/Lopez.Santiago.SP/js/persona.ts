namespace SP{
    export abstract class persona {

        public Nombre:string;
        public Apellido:string;
        public Edad:number;
        

        constructor(nombre:string,apellido:string,edad:number) {
            this.Nombre = nombre;
            this.Apellido = apellido;
            this.Edad = edad;
            
            
        }
        
        public toJson():string{
            return `{"Nombre":${this.Nombre},"Edad":${this.Edad},"Patas":${this.Apellido}}`;
        }
    }

}

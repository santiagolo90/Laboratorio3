namespace ModeloSP{

    export class mascota extends animal {
        public ID:number;
        public Tipo:tipoMascota;
        constructor(id:number,tipo:tipoMascota,nombre:string,edad:number,patas:number) {
            super(nombre,edad,patas)
            this.ID=id;
            this.Tipo = tipo;
            
        }

        public toJson():string{
            let cadena = super.toJson().replace('}',"");
            
            let json = cadena +`,"id":${this.ID},"Tipo":${this.Tipo.toString()}}`; 

            return json;
        }
    }

    //let m1:mascota = new mascota(1,tipoMascota.Ave,"Juan",25,4);
    
    //console.log(m1.toJson());
    
}

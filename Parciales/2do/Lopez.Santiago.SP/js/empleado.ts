namespace SP{

    export class empleado extends persona {
        public ID:number;
        public Genero:tipoGenero;
        public Foto:string|null

        constructor(id:number,genero:tipoGenero,foto:string,nombre:string,apellido:string,edad:number) {
            super(nombre,apellido,edad)
            this.ID=id;
            this.Genero = genero;
            this.Foto = foto;
            
        }

        public toJson():string{
            let cadena = super.toJson().replace('}',"");
            
            let json = cadena +`,"id":${this.ID},"Tipo":${this.Genero.toString()},"Foto":${this.Foto}}`; 

            return json;
        }
    }

    
}

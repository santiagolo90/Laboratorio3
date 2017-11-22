$(function () {
    //localStorage.clear();
    MostrarGrilla();
});

$(function () {
    var btnAgregar = $("#btnAgregar")//document.getElementByIdmismos selectors que css . o #
    btnAgregar.click(Agregar)

    var btnFiltro = $("#btnFiltro")//document.getElementByIdmismos selectors que css . o #
    btnFiltro.click(filtrar)
});

//Filtros

function filtrar() {

    let tipoFiltrado = Number($("#cbFilto").val());
    let mascotasFiltradas = [];

    let MascLS: string | null = localStorage.getItem("Mascotas");
    let aux: ModeloSP.mascota[] = MascLS == null ? [] : JSON.parse(MascLS);

    mascotasFiltradas = aux.filter(function (mascota: ModeloSP.mascota) {
        return ModeloSP.tipoMascota[mascota.Tipo] === ModeloSP.tipoMascota[tipoFiltrado];
    });

    let tabla = $("#tabla");
    tabla.html(`
            <thead>
                <tr class="success">
                    <th> ID</th>
                    <th> Nombre</th>
                    <th> Edad</th>
                    <th> Tipo</th>
                    <th> Patas</th>
                    <th> Accion</th>
                </tr>
            </thead>`);
    for (var index = 0; index < mascotasFiltradas.length; index++) {
        //append agrega mas al html
        tabla.append(

            `<tbody id="tCuerpo" class="table table-striped table-bordered table-hover table-condensed">
                    <tr>
                        <td> ${mascotasFiltradas[index].ID}</td>
                        <td>${mascotasFiltradas[index].Nombre}</td>
                        <td>${mascotasFiltradas[index].Edad}</td>
                        <td>${ModeloSP.tipoMascota[mascotasFiltradas[index].Tipo]}</td>
                        <td>${mascotasFiltradas[index].Patas}</td>
                        <td><button id=btnEliminar class="btn btn-danger" onclick=eliminarMascota(${index})>Borrar</button>
                        <input id=btnModificar type=button class="btn btn-warning" value=Modificar onclick=modificarMascota(${index})></td>
                    </tr>
                    </tbody>`

        );



    }
}


//Agregar
function Agregar() {
    let idMascota: number = Number($("#txtID").val());
    let tipoMascota: ModeloSP.tipoMascota = Number($("#cbTipo").val());
    let nombreMascota: string = String($("#txtNombre").val());
    let edadMascota: number = Number($("#txtEdad").val());
    let patasMascota: number = Number($("#txtPatas").val());
    if (idMascota <= 0) {
        //document.getElementById("nombre").className = "error";
        $("#txtID").addClass("error");
        alert("Debe ingresar un ID mayor a 0");
        return;
    }
    if (nombreMascota == "") {
        //document.getElementById("apellido").className = "error";
        $("#txtNombre").addClass("error");
        alert("Debe ingresar un Nombre");
        return;
    }
    if (edadMascota <= 0) {
        //document.getElementById("nombre").className = "error";
        $("#txtEdad").addClass("error");
        alert("Debe ingresar una edad mayor a 0");
        return;
    }
    if (patasMascota <= 0) {
        //document.getElementById("nombre").className = "error";
        $("#txtPatas").addClass("error");
        alert("Debe ingresar una cantidad de patas mayor a 0");
        return;
    }
    else {
        if (confirm("Esta seguro?")) {
            $("#txtID").addClass("sinError");
            $("#txtNombre").addClass("sinError");
            $("#txtEdad").addClass("sinError");
            $("#txtPatas").addClass("sinError");
            let mascotaAux: ModeloSP.mascota = new ModeloSP.mascota(idMascota, tipoMascota, nombreMascota, edadMascota, patasMascota);

            AgregarMascota(mascotaAux);
        }


    }
}

function AgregarMascota(nuevaMascota: ModeloSP.mascota): void {

    let mascotasString: string | null = localStorage.getItem("Mascotas");
    let arrayMascotas;
    if (mascotasString == null) {
        arrayMascotas = [];
    }
    else {
        arrayMascotas = JSON.parse(mascotasString);
    }

    arrayMascotas.push(nuevaMascota);
    console.log(arrayMascotas);

    localStorage.setItem("Mascotas", JSON.stringify(arrayMascotas));



    MostrarGrilla();


    /*
        let mascotasString:string|null = localStorage.getItem("Mascotas");//null porque el primero siempre es null
        let mascotasJson:JSON[] = mascotasString == null ?[]:  JSON.parse(mascotasString);
    
        mascotasJson.push(JSON.parse(nuevaMascota.toJson()));
        console.log(mascotasJson);
        */
    //localStorage.setItem("Mascotas",JSON.parse(mascotasJson));

}

function MostrarGrilla() {

    let MascLS: string | null = localStorage.getItem("Mascotas");
    let aux: ModeloSP.mascota[] = MascLS == null ? [] : JSON.parse(MascLS);


    let tabla = $("#tabla");
    tabla.html(`
    <thead>
        <tr class="success">
            <th> ID</th>
            <th> Nombre</th>
            <th> Edad</th>
            <th> Tipo</th>
            <th> Patas</th>
            <th> Accion</th>
        </tr>
    </thead>`);
    for (var index = 0; index < aux.length; index++) {
        //append agrega mas al html
        tabla.append(

            `<tbody id="tCuerpo" class="table table-striped table-bordered table-hover table-condensed">
            <tr>
                <td> ${aux[index].ID}</td>
                <td>${aux[index].Nombre}</td>
                <td>${aux[index].Edad}</td>
                <td>${ModeloSP.tipoMascota[aux[index].Tipo]}</td>
                <td>${aux[index].Patas}</td>
                <td><button id=btnEliminar class="btn btn-danger" onclick=eliminarMascota(${index})>Borrar</button>
                <input id=btnModificar type=button class="btn btn-warning" value=Modificar onclick=modificarMascota(${index})></td>
            </tr>
            </tbody>`

        );


    }
}


function eliminarMascota(index: number) {
    let MascLS: string | null = localStorage.getItem("Mascotas");
    let aux: ModeloSP.mascota[] = MascLS == null ? [] : JSON.parse(MascLS);
    aux.splice(index, 1);
    localStorage.setItem("Mascotas", JSON.stringify(aux));
    MostrarGrilla();


}
function modificarMascota(index: number) {
    alert("Falta Modificar");

}






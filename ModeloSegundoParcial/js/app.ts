let md: any;
$(function () {
    MostrarGrilla();
    let btnAgregar = $("#btnAgregar")//document.getElementByIdmismos selectors que css . o #
    btnAgregar.click(Agregar)

    let btnLimpiar = $("#btnLimpiar")//document.getElementByIdmismos selectors que css . o #
    btnLimpiar.click(function () {
        limpiarCampos();
        localStorage.clear();
        MostrarGrilla();
    })

    let btnFiltro = $("#btnFiltro")//document.getElementByIdmismos selectors que css . o #
    btnFiltro.click(filtrar)

    let chID = $("#chID")
    chID.click(filtrar);

    let chNombre = $("#chNombre")
    chNombre.click(filtrar);

    let chEdad = $("#chEdad")
    chEdad.click(filtrar);

    let chPatas = $("#chPatas")
    chPatas.click(filtrar);

});

//Filtros


function filtrar() {

    let MascLS: string | null = localStorage.getItem("Mascotas");
    let aux: ModeloSP.mascota[] = MascLS == null ? [] : JSON.parse(MascLS);
    let tipoFiltrado = Number($("#cbFilto").val());

    if (tipoFiltrado != 6) {
        let mascotasFiltradas = [];
        //Filtro Tipo de Mascota
        mascotasFiltradas = aux.filter(function (mascota: ModeloSP.mascota) {
            return ModeloSP.tipoMascota[mascota.Tipo] === ModeloSP.tipoMascota[tipoFiltrado];
        });
        //Premomedio del tipo Filtrado
        let promedioMascotasFiltradas = promedioMascotas(mascotasFiltradas);
        $("#txtProm").val(promedioMascotasFiltradas);
        MostrarGrillaFiltrada(mascotasFiltradas);

    }
    else {

        let promedioTodos = promedioMascotas(aux);
        $("#txtProm").val(promedioTodos);
        MostrarGrillaFiltrada(aux);
    }
}

function promedioMascotas(mascotasFiltradas: ModeloSP.mascota[]) {
    let suma = mascotasFiltradas.reduce(function (previo, actual) {
        return previo + actual.Edad;
    }, 0);
    let cantidad = mascotasFiltradas.reduce(function (actual, siguente) {
        return actual + 1
    }, 0);
    let promedio = (suma / cantidad).toFixed(2);
    return promedio;
}

function ultimoID(mascotasFiltradas:ModeloSP.mascota[]) {
    let cantidad = mascotasFiltradas.reduce(function (actual, siguente) {
        return siguente.ID
    }, 0);
    return cantidad;
}

/*
function idMascotas(mascotasFiltradas: ModeloSP.mascota[]) {
    let listaID = mascotasFiltradas.map(function (elemento) {
        return elemento.ID
    });
    return listaID;
}

function nombresMascotas(mascotasFiltradas: ModeloSP.mascota[]) {
    let listaNombre = mascotasFiltradas.map(function (elemento) {
        return elemento.Nombre
    });
    return listaNombre;
}

function edadMascotas(mascotasFiltradas: ModeloSP.mascota[]) {
    let listaEdad = mascotasFiltradas.map(function (elemento) {
        return elemento.Edad
    });
    return listaEdad;
}

function patasMascotas(mascotasFiltradas: ModeloSP.mascota[]) {
    let listaPatas = mascotasFiltradas.map(function (elemento) {
        return elemento.Nombre
    });
    return listaPatas;
}
*/


//Agregar
function Agregar() {
    let idMascota: number = Number($("#txtID").val());
    let tipoMascota: ModeloSP.tipoMascota = Number($("#cbTipo").val());
    let nombreMascota: string = String($("#txtNombre").val());
    let edadMascota: number = Number($("#txtEdad").val());
    let patasMascota: number = Number($("#txtPatas").val());
    /*
    if (idMascota <= 0) {
        //document.getElementById("nombre").className = "error";
        $("#txtID").addClass("error");
        alert("Debe ingresar un ID mayor a 0");
        return;
    }
    */
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
    if (patasMascota < 0) {
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
    limpiarCampos();


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
    let idMascota: number = Number($("#txtID").val(ultimoID(aux) + 1));




    let tCuerpo = $("#tCuerpo");
    let tCabeza = $("#tCabeza");
    tCabeza.html("");
    tCuerpo.html("");

    tCabeza.append("<tr class='success'>" +
        "<th> ID</th>" +
        "<th> Nombre</th>" +
        "<th> Edad</th>" +
        "<th> Tipo</th>" +
        "<th> Patas</th>" +
        "<th> Accion</th>" +
        "</tr>"
    );
    for (var index = 0; index < aux.length; index++) {
        //append agrega mas al html
        tCuerpo.append(
            `
                    <tr>
                    <td> ${aux[index].ID}</td>
                    <td>${aux[index].Nombre}</td>
                    <td>${aux[index].Edad}</td>
                    <td>${ModeloSP.tipoMascota[aux[index].Tipo]}</td>
                    <td>${aux[index].Patas}</td>
                    <td><button id=btnEliminar class="btn btn-danger" onclick=eliminarMascota(${index})>Borrar</button>
                    <input id=btnModificar type=button class="btn btn-warning" value=Modificar onclick=modificarMascota(${aux[index].ID})></td>
                    </tr>`
        );
    }

    /*
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
        */
}

function MostrarGrillaFiltrada(mascotasFiltradas: ModeloSP.mascota[]) {
    let chID = $("#chID");
    let chNombre = $("#chNombre");
    let chEdad = $("#chEdad");
    let chPatas = $("#chPatas");

    let auxID: string;
    let auxNombre: string;
    let auxEdad: string;
    let auxPatas: string;


    //ID
    if (chID.is(':checked')) {
        auxID = "<th> ID</th>";
    }
    else {
        auxID = "";
    }
    //Nombre
    if (chNombre.is(':checked')) {
        auxNombre = "<th>Nombre</th>";
    }
    else {
        auxNombre = "";
    }
    //EDad
    if (chEdad.is(':checked')) {
        auxEdad = "<th> Edad</th>";
    }
    else {
        auxEdad = "";
    }
    //Patas
    if (chPatas.is(':checked')) {
        auxPatas = "<th> Patas</th>";
    }
    else {
        auxPatas = "";
    }




    //hacer aparte
    let tCuerpo = $("#tCuerpo");
    let tCabeza = $("#tCabeza");
    tCabeza.html("");
    tCuerpo.html("");

    tCabeza.append("<tr class='success'>" +
        auxID +
        auxNombre +
        auxEdad +
        "<th> Tipo</th>" +
        auxPatas +
        "<th> Accion</th>" +
        "</tr>"
    );
    for (var index = 0; index < mascotasFiltradas.length; index++) {
        //ID
        if (chID.is(':checked')) {
            auxID = `<td> ${mascotasFiltradas[index].ID}</td>`;
        }
        else {
            auxID = "";
        }
        if (chNombre.is(':checked')) {
            auxNombre = `<td>${mascotasFiltradas[index].Nombre}</td>`;
        }
        else {
            auxNombre = "";
        }
        //EDad
        if (chEdad.is(':checked')) {
            auxEdad = `<td>${mascotasFiltradas[index].Edad}</td>`;
        }
        else {
            auxEdad = "";
        }
        //Patas
        if (chPatas.is(':checked')) {
            auxPatas = `<td>${mascotasFiltradas[index].Patas}</td>`;
        }
        else {
            auxPatas = "";
        }
        //append agrega mas al html
        tCuerpo.append(
            "<tr>" +
            auxID +
            auxNombre +
            auxEdad +
            `<td>${ModeloSP.tipoMascota[mascotasFiltradas[index].Tipo]}</td>` +
            auxPatas +
            `<td><button id=btnEliminar class="btn btn-danger" onclick=eliminarMascota(${index})>Borrar</button>
                        <input id=btnModificar type=button class="btn btn-warning" value=Modificar onclick=modificarMascota(${mascotasFiltradas[index].ID})></td>
                    </tr>`
        );
    }
}

//Eliminar
function eliminarMascota(index: number) {
    let MascLS: string | null = localStorage.getItem("Mascotas");
    let aux: ModeloSP.mascota[] = MascLS == null ? [] : JSON.parse(MascLS);
    aux.splice(index, 1);
    localStorage.setItem("Mascotas", JSON.stringify(aux));
    MostrarGrilla();


}
//Modificar
function modificarMascota(id: number) {
    let MascLS: string | null = localStorage.getItem("Mascotas");
    let aux: ModeloSP.mascota[] = MascLS == null ? [] : JSON.parse(MascLS);
    let mascotaBuscada:any;
    for (let index = 0; index < aux.length; index++) {
        if (aux[index].ID == id) {
            mascotaBuscada = aux[index];
        }


    }
    
    let idMascota: number = Number($("#txtID").val(mascotaBuscada.ID));
    let tipoMascota: ModeloSP.tipoMascota = Number($("#cbTipo").val(mascotaBuscada.Tipo));
    let nombreMascota: string = String($("#txtNombre").val(mascotaBuscada.Nombre));
    let edadMascota: number = Number($("#txtEdad").val(mascotaBuscada.Edad));
    let patasMascota: number = Number($("#txtPatas").val(mascotaBuscada.Patas));

    let btnAgregar = $("#btnAgregar")
    btnAgregar.attr("value", "Modificar");
    btnAgregar.off("click", Agregar);
    btnAgregar.on("click",md =function () {
            Modificar(mascotaBuscada) 
            });
}

function Modificar(mascotaAux:ModeloSP.mascota) {
    let MascLS: string | null = localStorage.getItem("Mascotas");
    let aux: ModeloSP.mascota[] = MascLS == null ? [] : JSON.parse(MascLS);

    for (let index = 0; index < aux.length; index++) {
        if (aux[index].ID == mascotaAux.ID) {
            console.log(aux[index]);
            aux[index].Tipo= Number($("#cbTipo").val());
            aux[index].Nombre = String($("#txtNombre").val());
            aux[index].Edad = Number($("#txtEdad").val());
            aux[index].Patas = Number($("#txtPatas").val());
            console.log(aux[index]);
            break;
        }
        
    }
    
    let btnAgregar = $("#btnAgregar")
    btnAgregar.attr("value", "Agregar");
    btnAgregar.off("click", md );
    btnAgregar.on("click", Agregar);
    localStorage.setItem("Mascotas", JSON.stringify(aux));
    limpiarCampos();
    MostrarGrilla();
    
}

//Limpiar 
function limpiarCampos() {
    //$("#txtID").val("");
    $("#cbTipo").val("");
    $("#txtNombre").val("");
    $("#txtEdad").val("");
    $("#txtPatas").val("");
}






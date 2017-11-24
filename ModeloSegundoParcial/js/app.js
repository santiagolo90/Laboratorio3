"use strict";
var md;
$(function () {
    MostrarGrilla();
    var btnAgregar = $("#btnAgregar"); //document.getElementByIdmismos selectors que css . o #
    btnAgregar.click(Agregar);
    var btnLimpiar = $("#btnLimpiar"); //document.getElementByIdmismos selectors que css . o #
    btnLimpiar.click(function () {
        limpiarCampos();
        localStorage.clear();
        MostrarGrilla();
    });
    var btnFiltro = $("#btnFiltro"); //document.getElementByIdmismos selectors que css . o #
    btnFiltro.click(filtrar);
    var chID = $("#chID");
    chID.click(filtrar);
    var chNombre = $("#chNombre");
    chNombre.click(filtrar);
    var chEdad = $("#chEdad");
    chEdad.click(filtrar);
    var chPatas = $("#chPatas");
    chPatas.click(filtrar);
});
//Filtros
function filtrar() {
    var MascLS = localStorage.getItem("Mascotas");
    var aux = MascLS == null ? [] : JSON.parse(MascLS);
    var tipoFiltrado = Number($("#cbFilto").val());
    if (tipoFiltrado != 6) {
        var mascotasFiltradas = [];
        //Filtro Tipo de Mascota
        mascotasFiltradas = aux.filter(function (mascota) {
            return ModeloSP.tipoMascota[mascota.Tipo] === ModeloSP.tipoMascota[tipoFiltrado];
        });
        //Premomedio del tipo Filtrado
        var promedioMascotasFiltradas = promedioMascotas(mascotasFiltradas);
        $("#txtProm").val(promedioMascotasFiltradas);
        MostrarGrillaFiltrada(mascotasFiltradas);
    }
    else {
        var promedioTodos = promedioMascotas(aux);
        $("#txtProm").val(promedioTodos);
        MostrarGrillaFiltrada(aux);
    }
}
function promedioMascotas(mascotasFiltradas) {
    var suma = mascotasFiltradas.reduce(function (previo, actual) {
        return previo + actual.Edad;
    }, 0);
    var cantidad = mascotasFiltradas.reduce(function (actual, siguente) {
        return actual + 1;
    }, 0);
    var promedio = (suma / cantidad).toFixed(2);
    return promedio;
}
function ultimoID(mascotasFiltradas) {
    var cantidad = mascotasFiltradas.reduce(function (actual, siguente) {
        return siguente.ID;
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
    var idMascota = Number($("#txtID").val());
    var tipoMascota = Number($("#cbTipo").val());
    var nombreMascota = String($("#txtNombre").val());
    var edadMascota = Number($("#txtEdad").val());
    var patasMascota = Number($("#txtPatas").val());
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
            var mascotaAux = new ModeloSP.mascota(idMascota, tipoMascota, nombreMascota, edadMascota, patasMascota);
            AgregarMascota(mascotaAux);
        }
    }
}
function AgregarMascota(nuevaMascota) {
    var mascotasString = localStorage.getItem("Mascotas");
    var arrayMascotas;
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
    var MascLS = localStorage.getItem("Mascotas");
    var aux = MascLS == null ? [] : JSON.parse(MascLS);
    var idMascota = Number($("#txtID").val(ultimoID(aux) + 1));
    var tCuerpo = $("#tCuerpo");
    var tCabeza = $("#tCabeza");
    tCabeza.html("");
    tCuerpo.html("");
    tCabeza.append("<tr class='success'>" +
        "<th> ID</th>" +
        "<th> Nombre</th>" +
        "<th> Edad</th>" +
        "<th> Tipo</th>" +
        "<th> Patas</th>" +
        "<th> Accion</th>" +
        "</tr>");
    for (var index = 0; index < aux.length; index++) {
        //append agrega mas al html
        tCuerpo.append("\n                    <tr>\n                    <td> " + aux[index].ID + "</td>\n                    <td>" + aux[index].Nombre + "</td>\n                    <td>" + aux[index].Edad + "</td>\n                    <td>" + ModeloSP.tipoMascota[aux[index].Tipo] + "</td>\n                    <td>" + aux[index].Patas + "</td>\n                    <td><button id=btnEliminar class=\"btn btn-danger\" onclick=eliminarMascota(" + index + ")>Borrar</button>\n                    <input id=btnModificar type=button class=\"btn btn-warning\" value=Modificar onclick=modificarMascota(" + aux[index].ID + ")></td>\n                    </tr>");
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
function MostrarGrillaFiltrada(mascotasFiltradas) {
    var chID = $("#chID");
    var chNombre = $("#chNombre");
    var chEdad = $("#chEdad");
    var chPatas = $("#chPatas");
    var auxID;
    var auxNombre;
    var auxEdad;
    var auxPatas;
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
    var tCuerpo = $("#tCuerpo");
    var tCabeza = $("#tCabeza");
    tCabeza.html("");
    tCuerpo.html("");
    tCabeza.append("<tr class='success'>" +
        auxID +
        auxNombre +
        auxEdad +
        "<th> Tipo</th>" +
        auxPatas +
        "<th> Accion</th>" +
        "</tr>");
    for (var index = 0; index < mascotasFiltradas.length; index++) {
        //ID
        if (chID.is(':checked')) {
            auxID = "<td> " + mascotasFiltradas[index].ID + "</td>";
        }
        else {
            auxID = "";
        }
        if (chNombre.is(':checked')) {
            auxNombre = "<td>" + mascotasFiltradas[index].Nombre + "</td>";
        }
        else {
            auxNombre = "";
        }
        //EDad
        if (chEdad.is(':checked')) {
            auxEdad = "<td>" + mascotasFiltradas[index].Edad + "</td>";
        }
        else {
            auxEdad = "";
        }
        //Patas
        if (chPatas.is(':checked')) {
            auxPatas = "<td>" + mascotasFiltradas[index].Patas + "</td>";
        }
        else {
            auxPatas = "";
        }
        //append agrega mas al html
        tCuerpo.append("<tr>" +
            auxID +
            auxNombre +
            auxEdad +
            ("<td>" + ModeloSP.tipoMascota[mascotasFiltradas[index].Tipo] + "</td>") +
            auxPatas +
            ("<td><button id=btnEliminar class=\"btn btn-danger\" onclick=eliminarMascota(" + index + ")>Borrar</button>\n                        <input id=btnModificar type=button class=\"btn btn-warning\" value=Modificar onclick=modificarMascota(" + mascotasFiltradas[index].ID + ")></td>\n                    </tr>"));
    }
}
//Eliminar
function eliminarMascota(index) {
    var MascLS = localStorage.getItem("Mascotas");
    var aux = MascLS == null ? [] : JSON.parse(MascLS);
    aux.splice(index, 1);
    localStorage.setItem("Mascotas", JSON.stringify(aux));
    MostrarGrilla();
}
//Modificar
function modificarMascota(id) {
    var MascLS = localStorage.getItem("Mascotas");
    var aux = MascLS == null ? [] : JSON.parse(MascLS);
    var mascotaBuscada;
    for (var index = 0; index < aux.length; index++) {
        if (aux[index].ID == id) {
            mascotaBuscada = aux[index];
        }
    }
    var idMascota = Number($("#txtID").val(mascotaBuscada.ID));
    var tipoMascota = Number($("#cbTipo").val(mascotaBuscada.Tipo));
    var nombreMascota = String($("#txtNombre").val(mascotaBuscada.Nombre));
    var edadMascota = Number($("#txtEdad").val(mascotaBuscada.Edad));
    var patasMascota = Number($("#txtPatas").val(mascotaBuscada.Patas));
    var btnAgregar = $("#btnAgregar");
    btnAgregar.attr("value", "Modificar");
    btnAgregar.off("click", Agregar);
    btnAgregar.on("click", md = function () {
        Modificar(mascotaBuscada);
    });
}
function Modificar(mascotaAux) {
    var MascLS = localStorage.getItem("Mascotas");
    var aux = MascLS == null ? [] : JSON.parse(MascLS);
    for (var index = 0; index < aux.length; index++) {
        if (aux[index].ID == mascotaAux.ID) {
            console.log(aux[index]);
            aux[index].Tipo = Number($("#cbTipo").val());
            aux[index].Nombre = String($("#txtNombre").val());
            aux[index].Edad = Number($("#txtEdad").val());
            aux[index].Patas = Number($("#txtPatas").val());
            console.log(aux[index]);
            break;
        }
    }
    var btnAgregar = $("#btnAgregar");
    btnAgregar.attr("value", "Agregar");
    btnAgregar.off("click", md);
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

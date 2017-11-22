"use strict";
$(function () {
    //localStorage.clear();
    MostrarGrilla();
});
$(function () {
    var btnAgregar = $("#btnAgregar"); //document.getElementByIdmismos selectors que css . o #
    btnAgregar.click(Agregar);
    var btnFiltro = $("#btnFiltro"); //document.getElementByIdmismos selectors que css . o #
    btnFiltro.click(filtrar);
});
//Filtros
function filtrar() {
    var tipoFiltrado = Number($("#cbFilto").val());
    var mascotasFiltradas = [];
    var MascLS = localStorage.getItem("Mascotas");
    var aux = MascLS == null ? [] : JSON.parse(MascLS);
    mascotasFiltradas = aux.filter(function (mascota) {
        return ModeloSP.tipoMascota[mascota.Tipo] === ModeloSP.tipoMascota[tipoFiltrado];
    });
    var tabla = $("#tabla");
    tabla.html("\n            <thead>\n                <tr class=\"success\">\n                    <th> ID</th>\n                    <th> Nombre</th>\n                    <th> Edad</th>\n                    <th> Tipo</th>\n                    <th> Patas</th>\n                    <th> Accion</th>\n                </tr>\n            </thead>");
    for (var index = 0; index < mascotasFiltradas.length; index++) {
        //append agrega mas al html
        tabla.append("<tbody id=\"tCuerpo\" class=\"table table-striped table-bordered table-hover table-condensed\">\n                    <tr>\n                        <td> " + mascotasFiltradas[index].ID + "</td>\n                        <td>" + mascotasFiltradas[index].Nombre + "</td>\n                        <td>" + mascotasFiltradas[index].Edad + "</td>\n                        <td>" + ModeloSP.tipoMascota[mascotasFiltradas[index].Tipo] + "</td>\n                        <td>" + mascotasFiltradas[index].Patas + "</td>\n                        <td><button id=btnEliminar class=\"btn btn-danger\" onclick=eliminarMascota(" + index + ")>Borrar</button>\n                        <input id=btnModificar type=button class=\"btn btn-warning\" value=Modificar onclick=modificarMascota(" + index + ")></td>\n                    </tr>\n                    </tbody>");
    }
}
//Agregar
function Agregar() {
    var idMascota = Number($("#txtID").val());
    var tipoMascota = Number($("#cbTipo").val());
    var nombreMascota = String($("#txtNombre").val());
    var edadMascota = Number($("#txtEdad").val());
    var patasMascota = Number($("#txtPatas").val());
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
    var tabla = $("#tabla");
    tabla.html("\n    <thead>\n        <tr class=\"success\">\n            <th> ID</th>\n            <th> Nombre</th>\n            <th> Edad</th>\n            <th> Tipo</th>\n            <th> Patas</th>\n            <th> Accion</th>\n        </tr>\n    </thead>");
    for (var index = 0; index < aux.length; index++) {
        //append agrega mas al html
        tabla.append("<tbody id=\"tCuerpo\" class=\"table table-striped table-bordered table-hover table-condensed\">\n            <tr>\n                <td> " + aux[index].ID + "</td>\n                <td>" + aux[index].Nombre + "</td>\n                <td>" + aux[index].Edad + "</td>\n                <td>" + ModeloSP.tipoMascota[aux[index].Tipo] + "</td>\n                <td>" + aux[index].Patas + "</td>\n                <td><button id=btnEliminar class=\"btn btn-danger\" onclick=eliminarMascota(" + index + ")>Borrar</button>\n                <input id=btnModificar type=button class=\"btn btn-warning\" value=Modificar onclick=modificarMascota(" + index + ")></td>\n            </tr>\n            </tbody>");
    }
}
function eliminarMascota(index) {
    var MascLS = localStorage.getItem("Mascotas");
    var aux = MascLS == null ? [] : JSON.parse(MascLS);
    aux.splice(index, 1);
    localStorage.setItem("Mascotas", JSON.stringify(aux));
    MostrarGrilla();
}
function modificarMascota(index) {
    alert("Falta Modificar");
}

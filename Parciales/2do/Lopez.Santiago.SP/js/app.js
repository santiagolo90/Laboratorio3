"use strict";
var md;
var fotoTemporal;
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
    var chApellido = $("#chApellido");
    chApellido.click(filtrar);
    var chEdad = $("#chEdad");
    chEdad.click(filtrar);
    var chFoto = $("#chFoto");
    chFoto.click(filtrar);
    var cbFilto = $("#cbFilto");
    cbFilto.change(filtrar);
    var btnCalcular = $("#btnCalcular"); //document.getElementByIdmismos selectors que css . o #
    btnCalcular.click(function () {
        var valor = Number(cbFilto.val());
        $("#txtProm").val(promedioEmpleados(valor));
    });
    var foto = $("#fileinput");
    foto.click(function () {
    });
});
function readURL(input) {
    console.log(input.files[0].size);
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //$('#falseinput').attr('src', e.target.result);
            //$('#base').val(e.target.result:);
            fotoTemporal = e.target.result;
            actualizarFoto(fotoTemporal);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function actualizarFoto(fotoTemporal) {
    //let f:string|null = localStorage.getItem("imagen");   
    //console.log(fotoTemporal);
    $("#preview").html("<img src=\"" + fotoTemporal + "\" id=\"tableBanner\" width=\"50\" height=\"50\" />").fadeIn(2000);
}
//Filtros
function filtrar() {
    var empleLC = localStorage.getItem("Empleados");
    var aux = empleLC == null ? [] : JSON.parse(empleLC);
    var tipoFiltrado = Number($("#cbFilto").val());
    if (tipoFiltrado != -1) {
        var empleadosFiltrados = [];
        //Filtro Tipo de Mascota
        empleadosFiltrados = aux.filter(function (emp) {
            return SP.tipoGenero[emp.Genero] === SP.tipoGenero[tipoFiltrado];
        });
        //Premomedio del tipo Filtrado
        // let promedioEmpleadosFiltradas = promedioEmpleados(empleadosFiltrados);
        //$("#txtProm").val(promedioEmpleadosFiltradas);
        MostrarGrillaFiltrada(empleadosFiltrados);
    }
    else {
        //let promedioTodos = promedioEmpleados(aux);
        //$("#txtProm").val(promedioTodos);
        MostrarGrillaFiltrada(aux);
    }
}
function promedioEmpleados(valorFilto) {
    var empleLC = localStorage.getItem("Empleados");
    var aux = empleLC == null ? [] : JSON.parse(empleLC);
    var empleadosFiltrados = [];
    for (var index = 0; index < aux.length; index++) {
        if (aux[index].Genero == valorFilto || valorFilto == -1) {
            empleadosFiltrados.push(aux[index]);
        }
    }
    var suma = empleadosFiltrados.reduce(function (previo, actual) {
        return previo + actual.Edad;
    }, 0);
    var cantidad = empleadosFiltrados.reduce(function (actual, siguente) {
        return actual + 1;
    }, 0);
    var promedio = (suma / cantidad).toFixed(2);
    return promedio;
}
function ultimoID(empleadosFiltrados) {
    var cantidad = empleadosFiltrados.reduce(function (actual, siguente) {
        return siguente.ID;
    }, 0);
    return cantidad;
}
function idEmpleados(empleadosFiltrados) {
    var chID = $("#chID");
    var lID;
    return empleadosFiltrados.map(function (elemento) {
        if (chID.is(':checked')) {
            return lID = "<td>" + elemento.ID + "</td>";
        }
        else {
            return lID = "";
        }
    });
}
function nombresEmpleados(empleadosFiltrados) {
    var chNombre = $("#chNombre");
    var lNombre;
    return empleadosFiltrados.map(function (elemento) {
        if (chNombre.is(':checked')) {
            return lNombre = "<td>" + elemento.Nombre + "</td>";
        }
        else {
            return lNombre = "";
        }
    });
}
function apellidosEmpleados(empleadosFiltrados) {
    var chApellido = $("#chApellido");
    var lApellido;
    return empleadosFiltrados.map(function (elemento) {
        if (chApellido.is(':checked')) {
            return lApellido = "<td>" + elemento.Apellido + "</td>";
        }
        else {
            return lApellido = "";
        }
    });
}
function edadEmpleados(empleadosFiltrados) {
    var chEdad = $("#chEdad");
    var lEdad;
    return empleadosFiltrados.map(function (elemento) {
        if (chEdad.is(':checked')) {
            return lEdad = "<td>" + elemento.Edad + "</td>";
        }
        else {
            return lEdad = "";
        }
    });
}
function fotosEmpleados(empleadosFiltrados) {
    var chFoto = $("#chFoto");
    var lFoto;
    return empleadosFiltrados.map(function (elemento) {
        if (chFoto.is(':checked')) {
            return lFoto = "<td><img src=\"" + elemento.Foto + "\" id=\"tableBanner\" width=\"50\" height=\"50\" /></td>";
        }
        else {
            return lFoto = "";
        }
    });
}
//Agregar
function Agregar() {
    $("#preview").html("").fadeToggle(2000);
    var idEmpleado = Number($("#txtID").val());
    var generoEmpleado = Number($("#cbTipo").val());
    var nombreEmpleado = String($("#txtNombre").val());
    var apellidoEmpleado = String($("#txtApellido").val());
    var fotoEmpleado = fotoTemporal;
    var edadEmpleado = Number($("#txtEdad").val());
    if (nombreEmpleado == "") {
        $("#txtNombre").addClass("error");
        alert("Debe ingresar un Nombre");
        return;
    }
    if (apellidoEmpleado == "") {
        $("#txtApellido").addClass("error");
        alert("Debe ingresar un Apellido");
        return;
    }
    if (fotoEmpleado == "") {
        $("#txtApellido").addClass("error");
        alert("Debe ingresar un Apellido");
        return;
    }
    if (edadEmpleado <= 0) {
        $("#txtEdad").addClass("error");
        alert("Debe ingresar una edad mayor a 0");
        return;
    }
    else {
        if (confirm("Esta seguro?")) {
            $("#txtID").addClass("sinError");
            $("#txtNombre").addClass("sinError");
            $("#txtApellido").addClass("sinError");
            $("#txtEdad").addClass("sinError");
            var empleadoAux = new SP.empleado(idEmpleado, generoEmpleado, fotoEmpleado, nombreEmpleado, apellidoEmpleado, edadEmpleado);
            AgregarEmpleado(empleadoAux);
        }
    }
}
function AgregarEmpleado(nuevaEmpleado) {
    var empleadosString = localStorage.getItem("Empleados");
    var arrayEmpleados;
    if (empleadosString == null) {
        arrayEmpleados = [];
    }
    else {
        arrayEmpleados = JSON.parse(empleadosString);
    }
    arrayEmpleados.push(nuevaEmpleado);
    console.log(arrayEmpleados);
    localStorage.setItem("Empleados", JSON.stringify(arrayEmpleados));
    MostrarGrilla();
    limpiarCampos();
}
//Mostrar
function MostrarGrilla() {
    var empleLS = localStorage.getItem("Empleados");
    var aux = empleLS == null ? [] : JSON.parse(empleLS);
    var idEmpleado = Number($("#txtID").val(ultimoID(aux) + 1));
    var tCuerpo = $("#tCuerpo");
    var tCabeza = $("#tCabeza");
    tCabeza.html("");
    tCuerpo.html("");
    tCabeza.append("<tr class='success'>" +
        "<th> ID</th>" +
        "<th> Nombre</th>" +
        "<th> Apellido</th>" +
        "<th> Genero</th>" +
        "<th> Edad</th>" +
        "<th> Foto</th>" +
        "<th> Accion</th>" +
        "</tr>");
    for (var index = 0; index < aux.length; index++) {
        //append agrega mas al html
        tCuerpo.append("\n                    <tr>\n                    <td> " + aux[index].ID + "</td>\n                    <td>" + aux[index].Nombre + "</td>\n                    <td>" + aux[index].Apellido + "</td>\n                    <td>" + SP.tipoGenero[aux[index].Genero] + "</td>\n                    <td>" + aux[index].Edad + "</td>\n                    <td><img src=\"" + aux[index].Foto + "\" id=\"tableBanner width=\"50\" height=\"50\"\" /></td>\n                    <td><button id=btnEliminar class=\"btn btn-danger\" onclick=eliminarMascota(" + index + ")>Borrar</button>\n                    <input id=btnModificar type=button class=\"btn btn-warning\" value=Modificar onclick=modificarMascota(" + aux[index].ID + ")></td>\n                    </tr>");
    }
}
function MostrarGrillaFiltrada(empleadosFiltrados) {
    var chID = $("#chID");
    var chNombre = $("#chNombre");
    var chApellido = $("#chApellido");
    var chEdad = $("#chEdad");
    var chFoto = $("#chFoto");
    var auxID;
    var auxNombre;
    var auxApellido;
    var auxEdad;
    var auxFoto;
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
    //Apellido
    if (chApellido.is(':checked')) {
        auxApellido = "<th> Apellido</th>";
    }
    else {
        auxApellido = "";
    }
    //Edad
    if (chEdad.is(':checked')) {
        auxEdad = "<th> Edad</th>";
    }
    else {
        auxEdad = "";
    }
    if (chFoto.is(':checked')) {
        auxFoto = "<th> Foto</th>";
    }
    else {
        auxFoto = "";
    }
    //hacer aparte
    var tCuerpo = $("#tCuerpo");
    var tCabeza = $("#tCabeza");
    tCabeza.html("");
    tCuerpo.html("");
    tCabeza.append("<tr class='success'>" +
        auxID +
        auxNombre +
        auxApellido +
        "<th> Genero</th>" +
        auxEdad +
        auxFoto +
        "<th> Accion</th>" +
        "</tr>");
    for (var index = 0; index < empleadosFiltrados.length; index++) {
        var mapID = idEmpleados(empleadosFiltrados);
        var mapNombre = nombresEmpleados(empleadosFiltrados);
        var mapApellido = apellidosEmpleados(empleadosFiltrados);
        var mapEdad = edadEmpleados(empleadosFiltrados);
        var mapFotos = fotosEmpleados(empleadosFiltrados);
        //append agrega mas al html
        tCuerpo.append("<tr>" +
            mapID[index] +
            mapNombre[index] +
            mapApellido[index] +
            ("<td>" + SP.tipoGenero[empleadosFiltrados[index].Genero] + "</td>") +
            mapEdad[index] +
            mapFotos[index] +
            ("<td><button id=btnEliminar class=\"btn btn-danger\" onclick=eliminarMascota(" + index + ")>Borrar</button>\n            <input id=btnModificar type=button class=\"btn btn-warning\" value=Modificar onclick=modificarMascota(" + empleadosFiltrados[index].ID + ")></td>\n            </tr>"));
    }
}
//Eliminar
function eliminarMascota(index) {
    var empleLS = localStorage.getItem("Empleados");
    var aux = empleLS == null ? [] : JSON.parse(empleLS);
    aux.splice(index, 1);
    localStorage.setItem("Empleados", JSON.stringify(aux));
    MostrarGrilla();
}
//Modificar
function modificarMascota(id) {
    var empleLS = localStorage.getItem("Empleados");
    var aux = empleLS == null ? [] : JSON.parse(empleLS);
    var empleadoBuscado;
    for (var index = 0; index < aux.length; index++) {
        if (aux[index].ID == id) {
            empleadoBuscado = aux[index];
        }
    }
    var idEmpleado = Number($("#txtID").val(empleadoBuscado.ID));
    var generoEmpleado = Number($("#cbTipo").val(empleadoBuscado.Genero));
    var nombreEmpleado = String($("#txtNombre").val(empleadoBuscado.Nombre));
    var apellidoEmpleado = String($("#txtApellido").val(empleadoBuscado.Apellido));
    var edadEmpleado = Number($("#txtEdad").val(empleadoBuscado.Edad));
    var btnAgregar = $("#btnAgregar");
    btnAgregar.attr("value", "Modificar");
    btnAgregar.off("click", Agregar);
    btnAgregar.on("click", md = function () {
        Modificar(empleadoBuscado);
    });
}
function Modificar(empleadoAux) {
    var empleLS = localStorage.getItem("Empleados");
    var aux = empleLS == null ? [] : JSON.parse(empleLS);
    for (var index = 0; index < aux.length; index++) {
        if (aux[index].ID == empleadoAux.ID) {
            console.log(aux[index]);
            aux[index].Genero = Number($("#cbTipo").val());
            aux[index].Nombre = String($("#txtNombre").val());
            aux[index].Apellido = String($("#txtApellido").val());
            aux[index].Edad = Number($("#txtEdad").val());
            aux[index].Foto = fotoTemporal;
            console.log(aux[index]);
            break;
        }
    }
    var btnAgregar = $("#btnAgregar");
    btnAgregar.attr("value", "Agregar");
    btnAgregar.off("click", md);
    btnAgregar.on("click", Agregar);
    localStorage.setItem("Empleados", JSON.stringify(aux));
    $("#preview").html("").fadeToggle(2000);
    limpiarCampos();
    MostrarGrilla();
}
//Limpiar 
function limpiarCampos() {
    //$("#txtID").val("");
    $("#cbTipo").val("");
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtEdad").val("");
}

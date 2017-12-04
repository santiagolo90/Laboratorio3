var xhr;

//TRAER DATOS
//window.onload = listado();
addEventListener('load', function () {
    listado();

})

function listado() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuesta;
    xhr.open("GET", "http://localhost:3000/traerpersonas", true);
    xhr.send();
}


function gestionarRespuesta() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var MisPeronas = JSON.parse(xhr.responseText);
            console.log (xhr.responseText);
            MostrarGrilla(MisPeronas);
        }
    }
}


function MostrarGrilla(persona) {
    var tCuerpo = document.getElementById("tCuerpo");
    tCuerpo.innerHTML = "";
    for (var index = 0; index < persona.length; index++) {
        tCuerpo.innerHTML = tCuerpo.innerHTML +
        "<tr>"+
            "<td>" + persona[index].nombre + "</td>" +
            "<td>" + persona[index].apellido + "</td>" +
            "<td> <button id=btnBorrar class=boton onclick='eliminarPersona(" + index + ")' >Borrar</button>" +
            "<button id=btnModificar class=boton>Modificar</button></td>"+
            "</tr>";

            
    }
}

//AGREGAR PERSONA
addEventListener('load', function () {
    var btnGuardar = document.getElementById('btnGuardar');
    btnGuardar.addEventListener('click', Agregar)

})

function Agregar() {
    var tCuerpo = document.getElementById("tCuerpo");

    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    if (nombre == "") {
        document.getElementById("nombre").className = "error";
        alert("Debe ingresar un nombre");
        return;
    }
    if (apellido == "") {
        document.getElementById("apellido").className = "error";
        alert("Debe ingresar un apellido");
        return;
    }
    else {
        if (confirm("Esta seguro?")) {
            agregarpersona(nombre, apellido);
        }


    }
}

function agregarpersona(nombre, apellido) {
    var data = "nombre=" + encodeURIComponent(nombre) + "&apellido=" + encodeURIComponent(apellido);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = MostrarPersona;
    xhr.open('POST', 'http://localhost:3000/agregarpersona', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-type", data.length);
    xhr.send(data);
}




function MostrarPersona() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            if(xhr.responseText)
            listado();
        }
    }
}



//ELIMINAR
function Borrar() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var persona = xhr.responseText;
            reload();

        }
    }


}

function eliminarPersona(indice) {
    var data = 'indice=' + encodeURIComponent(indice);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = BorrarPersona;
    xhr.open('POST', 'http://localhost:3000/eliminarpersona', true);
    //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-type", data.length);
    xhr.send(data);
}

function BorrarPersona() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            if(xhr.responseText== "Baja exitosa")
            listado();
        }
    }
}


//MODIFICAR


/*
AYUDA
function modificarPersona(indice) {
//Obtengo nombre desde DOM
//Obtengo el apellido desde el DOM
var persona = { "nombre": nombre, "apellido": apellido };
var data = 'indice=' + encodeURIComponent(indice) + '&persona='
+ encodeURIComponent(JSON.stringify(persona));
xhr = new XMLHttpRequest();
xhr.onreadystatechange = procesarRespuesta;
xhr.open('POST', 'http://localhost:3000/modificarpersona', true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(data);
}
3)Para procesarRespuesta, un esqueleto sería:
function procesarRespuesta() {
if (xhr.readyState == 4) {
if (xhr.status == 200){
//Hacer algo
}
else
alert('Error: ' + xhr.status + ' ' + xhr.statusText);
}
}

*/





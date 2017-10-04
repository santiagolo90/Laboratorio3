//por norma se llama xhr
var xhr;
//TRAER DATOS DEL SERVIDOR
addEventListener('load', function () {
    
    listado();
    
})

function listado() {
    xhr = new XMLHttpRequest();
    //onreadystatechange se lanza cada vez que cambia de valor
    xhr.onreadystatechange = gestionarRespuesta;
    //primer se abre la conexion, get o post, la url y su es asincronco(generalmente True)
    //http:// a la url para chrome
    xhr.open("GET", "http://localhost:3000/traerpersonas", true);
    //envio la peticion
    xhr.send();
    //alert("Hola");
}

function gestionarRespuesta() {
    //cuando vale 4 la respuesta esta completa
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var MisPeronas = JSON.parse(xhr.responseText);
            MostrarGrilla(MisPeronas);
        }
    }
}

function MostrarGrilla(persona) {
    var tCuerpo = document.getElementById("tCuerpo");
    tCuerpo.innerHTML = "";
    for (var index = 0; index < persona.length; index++) {
        tCuerpo.innerHTML = tCuerpo.innerHTML+
        "<tr>"+
            "<td>" + persona[index].nombre + "</td>" +
            "<td>" + persona[index].apellido + "</td>" +
            //"<td><button id=btnBorrar class=boton >Borrar</button>" +
            "<td><input type=button id=btnEliminar Value=Eliminar onclick=borrarPersona("+index+")>"+
            "<button id=btnModificar class=boton>Modificar</button>"+"</td>"+
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
    var datos = "nombre=" + encodeURIComponent(nombre) + "&apellido=" + encodeURIComponent(apellido);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = MostrarPersona;
    xhr.open('POST','http://localhost:3000/agregarpersona',true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-type", datos.length);
    console.log(datos);
    //xhr.send(datos);
    xhr.send(datos);

}


function MostrarPersona() {
    //cuando vale 4 la respuesta esta completa
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            if(xhr.responseText)
            {
                listado();
            }
           
            
        }
    }
}
//BORRAR
function borrarPersona(index) {
    var datos = "indice=" + encodeURIComponent(index);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = Borrar;
    xhr.open('POST','http://localhost:3000/eliminarpersona',true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-type", datos.length);
    //console.log(datos);
    //xhr.send(datos);
    xhr.send(datos);

}

function Borrar() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            if(xhr.responseText== 'Baja exitosa')
            {
                listado();
            }
           
            
        }
    }
}


function isArray(testObject) {	
    return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
}
























/*
function Agregar() {
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
        if(confirm("Esta seguro?")){
        tCuerpo = document.getElementById("tCuerpo");
        tCuerpo.innerHTML = tCuerpo.innerHTML+
            "<td>" + document.getElementById("nombre").value + "</td>" +
            "<td>" + document.getElementById("apellido").value + "</td>" +
           "<td><button id=btnBorrar class=boton>Borrar</button>"+
           "<button id=btnModificar class=boton>Modificar</button></td>";
            
        }
    }

}
*/




/**Funciona
 * 
 function Agregar(){
   var nombre = document.getElementById("nombre").value;
   var apellido = document.getElementById("apellido").value;

   var Guardar = document.getElementById("btnGuardar");
   btnGuardar.addEventListener('click',function(){
   if(nombre ="" || apellido =="")
   {
    document.getElementById("nombre").className = "error";
    document.getElementById("apellido").className = "error";
    alert("Debe ingresar u  nombre y apellido");
    return;
   }
   if (confirm("Esta seguro?")) {
       
   } 
})
}
window.onload = function(){
    //llama a los elementos de los boton por su id
    var Guardar = document.getElementById("btnGuardar");
    //formar de agregar un evento
    btnGuardar.addEventListener('click',function(){
        //llama a los elementos de los txtbox por su id
        
        var nombre = document.getElementById("nombre").value;
        var apellido = document.getElementById("apellido").value;

        var tCuerpo = document.getElementById("tCuerpo");
        
        tCuerpo.innerHTML = tCuerpo.innerHTML +
        "<td>"+ nombre + "</td>" +
        "<td>"+ apellido + "</td>"+
        "<td><a href= >Borrar</a> </td>"
        
        
    })
}
 */



/*
if(confirm("estas seguro?")){

var nombre = document.getElementById("nombre").value;
var apellido = document.getElementById("apellido").value;
var Guardar = document.getElementById("btnGuardar");
btnGuardar.addEventListener('click',function(){
var tCuerpo = document.getElementById("tCuerpo");

tCuerpo.innerHTML = tCuerpo.innerHTML +
"<td>"+ nombre + "</td>" +
"<td>"+ apellido + "</td>"+
"<td><a href= >Borrar</a> </td>"
})
}
*/

window.onload = function(){
Guardar = document.getElementById("btnGuardar");
btnGuardar.addEventListener('click',Agregar)
}

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
            "<td><a href= >Borrar</a> </td>";
        }
    }

}





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

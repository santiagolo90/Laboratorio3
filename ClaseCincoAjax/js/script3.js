//https://preloaders.net/ para gif cargando
//si no pongo nada es lo mismo que poner windows
//windows.addEventListener
addEventListener('load', function () {
//addEventListener('load',()=> { es lo mismo que function()    
var frm = document.getElementById('miFormulario');
frm.addEventListener('submit', enviarDatos);
   
})

function enviarDatos(e) {
    //preventDefault mata u borra toda la lista de invocacion anteriores de ese evento
    //no borra la pagina al tocar submit
    e.preventDefault();
    console.log(e);
    enviarFormulario();
    
}

function enviarFormulario() {
    var nombre = document.getElementById('txtUsario').value;
    var edad = document.getElementById('txtEdad').value;
    //llamada al XMLHttpRequest funcion global de ajax
    xhr =new XMLHttpRequest();
    //onreadystatechange se lanza cada vez que cambia de valor
    xhr.onreadystatechange =gestionarRespuesta;
    //primer se abre la conexion, get o post, la url y su es asincronco(generalmente True)
    //http:// a la url para chrome
    xhr.open('GET','pagina1.php?nombre=' + nombre + "&edad=" + edad,true);
    //envio la peticion
    xhr.send();
    //alert("Hola");

    
}

function gestionarRespuesta() {
    var div = document.getElementById('mensaje');
    //cuando vale 4 la respuesta esta completa
    if (xhr.readyState==4) {
        if(xhr.status == 200)
        {
        //la respuesta viaja como texto
        div.innerHTML = xhr.responseText;
        }
        else{
            //concatena el numero de error status y el texto statusText
            div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
        }
    }
    else{
        div.innerHTML = '<img src="IMG/30.gif" >';
    }
    
}

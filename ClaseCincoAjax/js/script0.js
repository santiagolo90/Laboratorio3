//https://preloaders.net/ para gif cargando
//si no pongo nada es lo mismo que poner windows
//windows.addEventListener
addEventListener('load', function () {
//addEventListener('load',()=> { es lo mismo que function()    
    var btnleer = document.getElementById('btnLeer');
    btnleer.addEventListener('click', enviar);
})

//por norma se llama xhr
var xhr;

function enviar() {
    //llamada al XMLHttpRequest funcion global de ajax
    xhr =new XMLHttpRequest();
    //onreadystatechange se lanza cada vez que cambia de valor
    xhr.onreadystatechange =gestionarRespuesta;
    //primer se abre la conexion, get o post, la url y su es asincronco(generalmente True)
    xhr.open('GET','prueba.txt',true)
    //envio la peticion
    xhr.send();
    alert("Hola");
}

function gestionarRespuesta() {
    var div = document.getElementById('contenedor');
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
        div.innerHTML = '<img src="IMG/25.gif" >';
    }
    
}
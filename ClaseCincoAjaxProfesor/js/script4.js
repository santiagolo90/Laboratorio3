addEventListener('load',inicializarEventos,false);

function inicializarEventos()
{
 // var ref=document.getElementById('miFormulario');
  //ref.addEventListener('submit',enviarDatos,false);
  var btnEnviar = document.getElementById('btnEnviar');
  btnEnviar.addEventListener('click', enviarFormulario);
}

/*
function enviarDatos(e)
{
  e.preventDefault();
  enviarFormulario();
}*/

var xhr;
var tiempo;

function enviarFormulario() {

    var nombre = document.getElementById('txtUsuario').value;
    var edad = document.getElementById('txtEdad').value;
    datos = "nombre=" + nombre + "&edad=" + edad;

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = procesarRespuesta;
    xhr.open('POST', 'pagina3.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-type", datos.length);
    //xhr.setRequestHeader("Connection", "close");
    xhr.send(datos);
    tiempo = setTimeout("timeOut()", 5000);

}

function procesarRespuesta() {

    var div = document.getElementById('mensaje');

    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            div.innerHTML = xhr.responseText;
        }
        else {
            alert(xhr.statusText);
        }
    }
    else {
        div.innerHTML= '<img src="img/126.gif">';
    }
}

function timeOut(){
    var div = document.getElementById('mensaje');
    xhr.abort();

    div.innerHTML = "Intente mas tarde...";

    
}

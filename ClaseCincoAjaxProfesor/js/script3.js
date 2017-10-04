addEventListener('load',inicializarEventos,false);

function inicializarEventos()
{
  var ref=document.getElementById('miFormulario');
  ref.addEventListener('submit',enviarDatos,false);
}

function enviarDatos(e)
{
  e.preventDefault();
  enviarFormulario();
}

var xhr;

function enviarFormulario() {

    var nombre = document.getElementById('txtUsuario').value;
    var edad = document.getElementById('txtEdad').value;

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = procesarRespuesta;
    xhr.open('GET', 'pagina1.php?nombre=' + nombre + '&edad=' + edad, true);
    xhr.send();

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

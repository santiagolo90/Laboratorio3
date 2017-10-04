var xhr;


function enviar() {

    var nombre = document.getElementById('txtUsuario').value;
    var edad = document.getElementById('txtEdad').value;

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = procesarRespuesta;
    xhr.open('GET', 'pagina19.php?nombre=' + nombre + '&edad=' + edad, true);
    xhr.send();

}

function procesarRespuesta() {

    var div = document.getElementById('mensaje');

    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            div.innerHTML = xhr.responseText;
        }
        else {
            alert(xhr.status + ' '  +xhr.statusText);
        }
    }
    else {
        div.innerHTML= '<img src="img/126.gif">';
    }
}
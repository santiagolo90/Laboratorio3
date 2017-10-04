addEventListener('load', function(){
    var boton = document.getElementById('btnLeer');
    boton.addEventListener('click', enviar);
});

var xhr;

function enviar() {   
    

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = procesarRespuesta;
    xhr.open('GET', 'prueba.txt', true);
    xhr.send();

}

function procesarRespuesta() {

    var div = document.getElementById('contenedor');

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
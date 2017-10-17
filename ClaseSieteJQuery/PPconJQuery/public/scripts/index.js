xhr = new XMLHttpRequest();
//TRAER DATOS
//$(document).ready(listado);
$(function(){
    
    listado();
});

function listado() {
    var funcionAjax = $.ajax(
        {
            url: "http://localhost:3000/traerpersonas",
            type: 'get',
            dataType: 'json',
            //success: xhr.responseText,
            async: true,
        })
        .then(function (retorno) {
            console.log(xhr);
            MostrarGrilla(retorno);
        }).catch(function (retorno) {
            console.log(retorno);
            $("#error").html("Error : " +retorno.statusText +"/"+ retorno.status+"<br>"+retorno.responseText);	
        });
}

function MostrarGrilla(persona) {
    var tCuerpo = document.getElementById("tCuerpo");
    tCuerpo.innerHTML = "";
    for (var index = 0; index < persona.length; index++) {
        tCuerpo.innerHTML = tCuerpo.innerHTML +
            "<tr>" +
            "<td>" + persona[index].nombre + "</td>" +
            "<td>" + persona[index].apellido + "</td>" +
            "<td> <button id=btnBorrar class=boton onclick='eliminarPersona(" + index + ")' >Borrar</button>" +
            "<input id=btnModificar type=button value=Modificar onclick=Modificar("+index+")></td></tr>"+
            "</tr>";


    }
}
/*
    lo que quiero que se ejecute antes de la llamada
    beforcesend: Function(){}
    //lo que quiero que hace cuando paso la llamada
    sucecess; function(x)//lleva el respondtext
    //funcion que se ejecurta  cuando hay un error
    error:function(refenrecia a la llamada, statustext 400 404,codigoerror(not found))
    //funcion que se ejecuta siempre entre success y error, se ejecuta siempre
    complete: function();
    //url a donde le vamos a pegar
    url 
    //post o get
    type
    //le paso las variables en json o $("#MiFormulario").serialize
    data
    //timeout en milisegundos, cuando termino el tiempo de espera
    timeout:
    //El tipo de datos que espero que me devuelta el servidor( por defecto es texto) puede ser json
    dataType:'Json' //si pongo json en el success se parcea a json
    $.ajax({
                data:  parametros,
                url:   'ejemplo_ajax_proceso.php',
                type:  'post',
                beforeSend: function () {
                        $("#resultado").html("Procesando, espere por favor...");
                },
                success:  function (response) {
                        $("#resultado").html(response);
                }
        });
*/


/*
function listado() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuesta;
    xhr.open("GET", "http://localhost:3000/traerpersonas", true);
    xhr.send();
}


function gestionarRespuesta(obj) {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            var MisPeronas = JSON.parse(xhr.responseText);
            console.log (xhr.responseText);
            MostrarGrilla(MisPeronas);
        }
    }
}
*/



//AGREGAR PERSONA
$(function () {


    var btnGuardar = $("#btnGuardar")//document.getElementByIdmismos selectors que css . o #

    btnGuardar.click(Agregar)
});


/*
addEventListener('load', function () {
var btnGuardar = document.getElementById('btnGuardar');
btnGuardar.addEventListener('click', Agregar)

})
*/
function Agregar() {
    //var tCuerpo = document.getElementById("tCuerpo");
    var tCuerpo = $("#tCuerpo");

    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    //var nombre = document.getElementById("nombre").value;
    //var apellido = document.getElementById("apellido").value;
    if (nombre == "") {
        //document.getElementById("nombre").className = "error";
        $("#nombre").addClass("error");
        alert("Debe ingresar un nombre");
        return;
    }
    if (apellido == "") {
        //document.getElementById("apellido").className = "error";
        $("#apellido").addClass("error");
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
    /*
    var data = "nombre=" + encodeURIComponent(nombre) + "&apellido=" + encodeURIComponent(apellido);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = MostrarPersona;
    xhr.open('POST', 'http://localhost:3000/agregarpersona', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-type", data.length);
    xhr.send(data);
*/
    var funcionAjax = $.ajax({
        url: 'http://localhost:3000/agregarpersona',
        type: "post",
        data: "nombre=" + encodeURIComponent(nombre) + "&apellido=" + encodeURIComponent(apellido),
        async: true,
    }).then(function (retorno) {
        console.log(retorno);
        $("#ok").html(retorno);
        listado();

    }).catch(function (retorno) {
        console.log(retorno);
        $("#error").html("Error : " +retorno.statusText +"/"+ retorno.status+"<br>"+retorno.responseText);	
    });


}



//ELIMINAR

function eliminarPersona(indice) {
    /*
    var data = 'indice=' + encodeURIComponent(indice);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = BorrarPersona;
    xhr.open('POST', 'http://localhost:3000/eliminarpersona', true);
    //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Content-type", data.length);
    xhr.send(data);
*/
    var funcionAjax = $.ajax({
        url: 'http://localhost:3000/eliminarpersona',
        type: "post",
        data: 'indice=' + encodeURIComponent(indice),
        async: true,
    }).then(function (retorno) {
        if (retorno == "Baja exitosa")
        $("#ok").html(retorno);
        listado();

    }).catch(function (retorno) {
        $("#error").html("Error : " +retorno.statusText +"/"+ retorno.status+"<br>"+retorno.responseText);	
    });
}

/*
function BorrarPersona() {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            if (xhr.responseText == "Baja exitosa")
                listado();
        }
    }
}
*/


//MODIFICAR
function Modificar(indice) {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = Aux; //carga los campos de texto de nombre y apellido con la persona
    xhr.open("GET","http://localhost:3000/traerpersona?indice="+indice, true);
    xhr.send();
    //
    //
    //
    //
    //
}
function Aux() {
    var formu = document.getElementById('formu'); 
    var n =document.getElementById('nombre'); 
    var a =document.getElementById('apellido'); 

    if(xhr.readyState == 4)
    {
        if(xhr.status == 200)
        {
           var persona = JSON.parse(xhr.response);
           n.value = persona.nombre;
           a.value = persona.apellido;
        }
    }
}


function modificarPersona(indice) {
    //Obtengo nombre desde DOM
    //Obtengo el apellido desde el DOM
    var persona = { "nombre": nombre, "apellido": apellido };
    var data = 'indice=' + encodeURIComponent(indice) + '&persona='
    + encodeURIComponent(JSON.stringify(persona));
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = BorrarPersona;
    xhr.open('POST', 'http://localhost:3000/modificarpersona', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
    console.log(data)

    }

    function BorrarPersona() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText)
                    alert(responseText);
            }
        }
    }

    

    



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

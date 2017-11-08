var xhr;
var arrayPersonas = null;
var indiceMod;

$(document).ready(function(){
  traerPersonas();
  $('#btnEnviar').animate({'left': '0px','opacity':'1'},{
      duration: 'slow',
      easing: 'swing'
    });
    var visitas_local = localStorage.getItem("numero_visitas_local");
    var visitas_local = localStorage.numero_visitas_local;
    if(visitas_local !=null){
      //localStorage.setItem("numero_visitas_local",parseInt(visitas_local)+1);
      localStorage.numero_visitas_local = parseInt(visitas_local)+1;
    }else{
      //localStorage.setItem("numero_visitas_local",1);
      localStorage.numero_visitas_local=1;
    }

    var visitas_session = sessionStorage.getItem("numero_visitas_session");
    if(visitas_session !=null){
      sessionStorage.setItem("numero_visitas_session",parseInt(visitas_session)+1);
    }else{
      sessionStorage.setItem("numero_visitas_session",1);
    }

    if(localStorage.usuarioPreferido!=null){
      var usuarioPreferido = JSON.parse(localStorage.usuarioPreferido);
      if(usuarioPreferido !=null){
        $("#nombre").val(usuarioPreferido.nombre);
        $("#apellido").val(usuarioPreferido.apellido);
      }
    }
   
    
});

function agregar() {
  var txtNombre = $('#nombre');
  var txtApellido = $('#apellido');

  var nombre = txtNombre.val();
  var apellido = txtApellido.val();
  if (nombre == ""){
    txtNombre.addClass("error");
    alert("Debe ingresar un nombre");
  }
  else if (apellido == ""){
    txtApellido.addClass("error");
    alert("Debe ingresar un apellido");
  }
  else if (confirm("¿Esta seguro que desea agregar una persona?") == true) {   
        txtNombre.removeClass("error");
        txtApellido.removeClass("error");  
        enviarDatos(nombre, apellido);
  }

  var objetoUsuario = {
    "nombre":nombre,
    "apellido":apellido
  }

  localStorage.usuarioPreferido = JSON.stringify(objetoUsuario);
}

function enviarDatos(nombre, apellido) {

 /* var data = 'nombre=' + encodeURIComponent(nombre) + '&apellido=' + encodeURIComponent(apellido);
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = procesarRespuesta;
  xhr.open('POST', 'http://localhost:3000/agregarpersona', true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);*/
  $.ajax('http://localhost:3000/agregarpersona',{
    success:procesarRespuesta,
    data:{
      'nombre':nombre,
      'apellido':apellido
    },
    crossDomain: true,
    type:'POST',
    dataType:'text',
    beforeSend: function(){
      $('#tCuerpo').html('<img src="images/spin.gif">')
    },
    error: function (xhr, ajaxOptions, thrownError){
      alert(xhr.statusText);
      alert(thrownError);
    }   
  })
}

function procesarRespuesta() {

/*  var spinner = document.getElementById('tCuerpo');

  if (xhr.readyState == 4) {
    if (xhr.status == 200)    */  
      traerPersonas();
/*    else
      alert('Error: ' + xhr.status + ' ' + xhr.statusText);
  }
  else {
    spinner.innerHTML = '<img src="images/spin.gif">';
  }*/
}

function traerPersonas() {
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = procesarPersonas;
  xhr.open('GET', 'http://localhost:3000/traerpersonas', true);
  xhr.send();
}

function procesarPersonas() {

  var spinner = document.getElementById('tCuerpo');

  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      arrayPersonas = JSON.parse(xhr.responseText);

      refrescarLista(arrayPersonas);
    }
    else
      alert('Error: ' + hxr.statusText + ' ' + xhr.statusText);
  }
  else {

    spinner.innerHTML = '<img src="images/spin.gif">';
  }

}

function refrescarLista(array) {

  var tCuerpo = document.getElementById("tCuerpo");
  tCuerpo.innerHTML = "";

  for (var i = 0; i < array.length; i++) {

    tCuerpo.innerHTML = tCuerpo.innerHTML +
      "<td>" + array[i].nombre + "</td>" +
      "<td>" + array[i].apellido + "</td>" +
      "<td><button class='btn btn-danger'  onclick='eliminarPersona(" + i + ")' >Borrar</button>" +
      "<button class='btn btn-warning' onclick='traerPersona(" + i + ")' >Modificar</button></td>";

  }

}

function eliminarPersona(indice) {
  var data = 'indice=' + encodeURIComponent(indice);
  /*xhr = new XMLHttpRequest();
  xhr.onreadystatechange = procesarRespuesta;
  xhr.open('POST', 'http://localhost:3000/eliminarpersona', true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);*/

  $.ajax('http://localhost:3000/eliminarpersona',{
    success:procesarRespuesta,
    data:data,
    crossDomain: true,
    type:'POST',
    dataType:'text',
    beforeSend: function(){
      $('#tCuerpo').html('<img src="images/spin.gif">')
    },
    error: function (xhr, ajaxOptions, thrownError){
      alert(xhr.statusText);
      alert(thrownError);
    }   
  })
}

function modificarPersona(indice) {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var persona = { "nombre": nombre, "apellido": apellido };
  var data = 'indice=' + encodeURIComponent(indice) + '&persona=' 
  + encodeURIComponent(JSON.stringify(persona));
  /*xhr = new XMLHttpRequest();
  xhr.onreadystatechange = procesarRespuesta2;
  xhr.open('POST', 'http://localhost:3000/modificarpersona', true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);*/
  $.ajax('http://localhost:3000/modificarpersona',{
    success:procesarRespuesta2,
    data:data,
    crossDomain: true,
    type:'POST',
    dataType:'text',
    beforeSend: function(){
      $('#tCuerpo').html('<img src="images/spin.gif">')
    },
    error: function (xhr, ajaxOptions, thrownError){
      alert(xhr.statusText);
      alert(thrownError);
    }   
  })
}

function procesarRespuesta2() {

  var spinner = document.getElementById('tCuerpo');

  if (xhr.readyState == 4) {
    if (xhr.status == 200){
     
      traerPersonas();
      var boton = document.getElementById('btnEnviar');
      boton.setAttribute('value', 'Guardar');
      
      boton.setAttribute('onclick', 'agregar()');
      document.getElementById('nombre').value = "";
      document.getElementById('apellido').value = "";
    }
    else
      alert('Error: ' + xhr.status + ' ' + xhr.statusText);
  }
  else {
    spinner.innerHTML = '<img src="images/spin.gif">';
  }
}

function traerPersona(indice) {

  indiceMod = indice;  
  xhr = new XMLHttpRequest();
  xhr.onreadystatechange = procesarPersona;
  xhr.open('GET', 'http://localhost:3000/traerpersona?indice=' + indice, true);
  xhr.send();

}

function procesarPersona() {

  var txtNombre = document.getElementById('nombre');
  var txtApellido = document.getElementById('apellido');
  var boton = document.getElementById('btnEnviar');
  var spinner = document.getElementById('tCuerpo');

  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      var unaPersona = JSON.parse(xhr.responseText);
      //alert(xhr.responseText);
      txtNombre.value = unaPersona.nombre;
      txtApellido.value = unaPersona.apellido;

      boton.setAttribute('value', 'Modificar');
      
      boton.setAttribute('onclick', 'modificarPersona(' + indiceMod + ')');

    }
    else
      alert('Error: ' + hxr.statusText + ' ' + xhr.statusText);
  }
  else {

    //spinner.innerHTML = '<img src="images/spin.gif">';

  }

}


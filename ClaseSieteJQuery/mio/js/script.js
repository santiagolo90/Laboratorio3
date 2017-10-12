//carga la web
$(function(){

    $("#nombre").val("jose");//asigno algo a la caja de texto
    var boton =$("#boton1")//document.getElementByIdmismos selectors que css . o #

    boton.click(manejadorBoton)
});

function manejadorBoton() {
    
    alert($("#nombre").val());//para referenciar a la caja de texto .vall accedo al valor del obejto

}

//PArte 2
$(function(){
    
        var avengers =$("imagenes img");//crea un array de las imagenes que tengo en esa carpeta (imagenes es un id)
        avengers.hide();//tipo un foreach las desaparece las imagenes

        avengers.fadein(10000);//hace que muestre a las imagenes de apoco en milisegundos
        avengers.fadeOut(10000);//hace que desaparece a las imagenes de apoco en milisegundos
    });
    
//parte4
/*
.html(<p> </p>) le paso codigo html con etiquetas y esto remplaza el codigo html que tiene por defecto(por ejemplo si tiene un h2 lo remplaza con el parrafo)
.text()// hace lo mismo que el html pero no gestiona las etiquetas, lo trata como texto
.append("nuevo")// concatena lo que agrego con lo que tenia despues
.prepend("antes") //lo agrega antes de lo que habia
.after("duespues")// lo coloca afuera de lo que trae si es un div lo agrega fuera del div
.beforce()// lo mismo que after pero antes del div


*/

//Parte 5
/*

each es como un foreach, recorrer el array 


*/

//Parte6
/*
$.ajax() remplaza todos
$.get()
$.post()
$.getJson()
$.ajax(
    //lo que quiero que se ejecute antes de la llamada
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

)
*/


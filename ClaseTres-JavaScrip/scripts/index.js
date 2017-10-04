//paso una funcion al final como parametros(callback)
//en el if pregunto si es una funcion y le paso mi resultado para hacer lo que quiera.
/*
function Suma(a,b,callback){
    var resultado =parseInt(a)+parseInt(b);
    if(typeof(callback)==="function")
    {
        callback(resultado);
    }
}
//ejecuta de entrada
window.onload = function(){
    //llama a los elementos de los boton por su id
    var btnSumar = document.getElementById("btnSumar");
    //formar de agregar un evento
    btnSumar.addEventListener('click',function(){
        //llama a los elementos de los txtbox por su id
        var txtA = document.getElementById("txtA").value;
        var txtB = document.getElementById("txtB").value;
        alert("HOLA");
        
        Suma(txtA,txtB,function(res){

            alert("La suma es "+ res);
        })
    })
}
*/

//Funciones constructor

var Auto = function(nafta){
    //var la hace privada
    var _nafta = nafta; 

    this.setNafta = function(value){
        _nafta += value;
    }

    this.getNafta = function(){
        return _nafta;
    }
}

var auto1 = new Auto(100);
auto1.setNafta(50);
alert(auto1.getNafta());

var auto2 ={
// los : es el =
//es n json
    nafta:100,
    puertas: 5,
    patente: "AAA123"
}
//document.getElementsByTagName("p")//te trae todos los parrafos, en un for
//document.getElementsByClassName("clase")//le pasamos el nombre de la clase
//firschild va al primer elemento
//midiv.innerHTML =<p class= "azul">+texto</>


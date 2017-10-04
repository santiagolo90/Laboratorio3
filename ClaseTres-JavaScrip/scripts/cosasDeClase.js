// evento alerta
//alert("soy un script");
var a=1;//variable number
alert(a);
a= "HOLA";//string
alert(a);
a = true //boolean
alert(a);
a=function()//funcion anonima
{
    alert("Soy una funcion");
}
//function miFuncion (a,b)//Funcion
//{
//    var resultado = a+b;
//    return resultado;
//}
var _variable;
var $Mivariable //no puede inicar en numero los nombres de variables

var miArray =["Entero",1,"mes"];
if(typeof(miArray[0])=== "string"){
    alert("Soy un stringggg")
}
(function(){
    alert ("funcion auto invocada");
})();//funcion auto invocada

var inc =(function(){
    var counter =0
    return function(){return counter++;}
})();//contador web


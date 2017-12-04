let md: any;
let fotoTemporal: any;
$(function () {
    MostrarGrilla();

    let btnAgregar = $("#btnAgregar")//document.getElementByIdmismos selectors que css . o #
    btnAgregar.click(Agregar)

    let btnLimpiar = $("#btnLimpiar")//document.getElementByIdmismos selectors que css . o #
    btnLimpiar.click(function () {
        limpiarCampos();
        localStorage.clear();
        MostrarGrilla();
    })

    let btnFiltro = $("#btnFiltro")//document.getElementByIdmismos selectors que css . o #
    btnFiltro.click(filtrar)

    let chID = $("#chID")
    chID.click(filtrar);

    let chNombre = $("#chNombre")
    chNombre.click(filtrar);

    let chApellido = $("#chApellido")
    chApellido.click(filtrar);

    let chEdad = $("#chEdad")
    chEdad.click(filtrar);

    let chFoto = $("#chFoto")
    chFoto.click(filtrar);

    let cbFilto = $("#cbFilto")
    cbFilto.change(filtrar);

    let btnCalcular = $("#btnCalcular")//document.getElementByIdmismos selectors que css . o #
    btnCalcular.click(function () {
        let valor: number = Number(cbFilto.val());
        $("#txtProm").val(promedioEmpleados(valor));
    })


    let foto = $("#fileinput")
    foto.click(function () {
        
        
    })


});

function readURL(input:any) {
    console.log(input.files[0].size);
  
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //$('#falseinput').attr('src', e.target.result);
            //$('#base').val(e.target.result:);
            fotoTemporal = e.target.result;
            actualizarFoto(fotoTemporal);
        };
        reader.readAsDataURL(input.files[0]);
    }
   
    
}

function actualizarFoto(fotoTemporal:any) {
    //let f:string|null = localStorage.getItem("imagen");   
    //console.log(fotoTemporal);
    
    $("#preview").html(`<img src="${fotoTemporal}" id="tableBanner" width="50" height="50" />`).fadeIn(2000);
}
//Filtros


function filtrar() {

    let empleLC: string | null = localStorage.getItem("Empleados");
    let aux: SP.empleado[] = empleLC == null ? [] : JSON.parse(empleLC);
    let tipoFiltrado = Number($("#cbFilto").val());

    if (tipoFiltrado != -1) {
        let empleadosFiltrados = [];
        //Filtro Tipo de Mascota
        empleadosFiltrados = aux.filter(function (emp: SP.empleado) {
            return SP.tipoGenero[emp.Genero] === SP.tipoGenero[tipoFiltrado];
        });
        //Premomedio del tipo Filtrado
       // let promedioEmpleadosFiltradas = promedioEmpleados(empleadosFiltrados);
        //$("#txtProm").val(promedioEmpleadosFiltradas);

        MostrarGrillaFiltrada(empleadosFiltrados);      

    }
    else {

        //let promedioTodos = promedioEmpleados(aux);
        //$("#txtProm").val(promedioTodos);
        MostrarGrillaFiltrada(aux);
    }
}

function promedioEmpleados(valorFilto:number) {
    let empleLC: string | null = localStorage.getItem("Empleados");
    let aux: SP.empleado[] = empleLC == null ? [] : JSON.parse(empleLC);
    let empleadosFiltrados =[]
    for (let index = 0; index < aux.length; index++) {
        if (aux[index].Genero == valorFilto || valorFilto == -1) {
            empleadosFiltrados.push(aux[index]);
        }
        
    }
    let suma = empleadosFiltrados.reduce(function (previo, actual) {
        return previo + actual.Edad;
    }, 0);
    let cantidad = empleadosFiltrados.reduce(function (actual, siguente) {
        return actual + 1
    }, 0);
    let promedio = (suma / cantidad).toFixed(2);
    return promedio;
}


function ultimoID(empleadosFiltrados:SP.empleado[]) {
    let cantidad = empleadosFiltrados.reduce(function (actual, siguente) {
        return siguente.ID
    }, 0);
    return cantidad;
}

function idEmpleados(empleadosFiltrados: SP.empleado[]) {
    let chID = $("#chID");
    let lID: string;


    return empleadosFiltrados.map(function (elemento) {
        if (chID.is(':checked')) {
            return lID = `<td>${elemento.ID}</td>`;
        }
        else {
           return lID = "";
        }
    });
}

function nombresEmpleados(empleadosFiltrados: SP.empleado[]) {
    let chNombre = $("#chNombre");

    let lNombre: string;

    return empleadosFiltrados.map(function (elemento) {
        if (chNombre.is(':checked')) {
            return lNombre = `<td>${elemento.Nombre}</td>`;
        }
        else {
           return lNombre = "";
        }
    });
}

function apellidosEmpleados(empleadosFiltrados: SP.empleado[]) {
    let chApellido = $("#chApellido");

    let lApellido: string;

    return empleadosFiltrados.map(function (elemento) {
        if (chApellido.is(':checked')) {
            return lApellido = `<td>${elemento.Apellido}</td>`;
        }
        else {
           return lApellido = "";
        }
    });
}

function edadEmpleados(empleadosFiltrados: SP.empleado[]) {
    let chEdad = $("#chEdad");

    let lEdad: string;

    return empleadosFiltrados.map(function (elemento) {
        if (chEdad.is(':checked')) {
            return lEdad = `<td>${elemento.Edad}</td>`;
        }
        else {
           return lEdad = "";
        }
    });
}

function fotosEmpleados(empleadosFiltrados: SP.empleado[]) {
    let chFoto = $("#chFoto");

    let lFoto: string;

    return empleadosFiltrados.map(function (elemento) {
        if (chFoto.is(':checked')) {
            return lFoto = `<td><img src="${elemento.Foto}" id="tableBanner" width="50" height="50" /></td>`;
        }
        else {
           return lFoto = "";
        }
    });
}


//Agregar
function Agregar() {
    $("#preview").html("").fadeToggle(2000);
    
    let idEmpleado: number = Number($("#txtID").val());
    let generoEmpleado: SP.tipoGenero = Number($("#cbTipo").val());
    let nombreEmpleado: string = String($("#txtNombre").val());
    let apellidoEmpleado: string = String($("#txtApellido").val());
    let fotoEmpleado: string = fotoTemporal;
    let edadEmpleado: number = Number($("#txtEdad").val());

    if (nombreEmpleado == "") {
        $("#txtNombre").addClass("error");
        alert("Debe ingresar un Nombre");
        return;
    }
    if (apellidoEmpleado == "") {
        $("#txtApellido").addClass("error");
        alert("Debe ingresar un Apellido");
        return;
    }
    if (fotoEmpleado == "") {
        $("#txtApellido").addClass("error");
        alert("Debe ingresar un Apellido");
        return;
    }
    if (edadEmpleado <= 0) {
        $("#txtEdad").addClass("error");
        alert("Debe ingresar una edad mayor a 0");
        return;
    }
    else {
        if (confirm("Esta seguro?")) {
            $("#txtID").addClass("sinError");
            $("#txtNombre").addClass("sinError");
            $("#txtApellido").addClass("sinError");
            $("#txtEdad").addClass("sinError");
            let empleadoAux: SP.empleado = new SP.empleado(idEmpleado,generoEmpleado,fotoEmpleado,nombreEmpleado,apellidoEmpleado,edadEmpleado);
            AgregarEmpleado(empleadoAux);
        }


    }
}

function AgregarEmpleado(nuevaEmpleado: SP.empleado): void {

    let empleadosString: string | null = localStorage.getItem("Empleados");
    let arrayEmpleados;
    if (empleadosString == null) {
        arrayEmpleados = [];
    }
    else {
        arrayEmpleados = JSON.parse(empleadosString);
    }

    arrayEmpleados.push(nuevaEmpleado);
    console.log(arrayEmpleados);

    localStorage.setItem("Empleados", JSON.stringify(arrayEmpleados));

    MostrarGrilla();
    limpiarCampos();

}

//Mostrar
function MostrarGrilla() {

    let empleLS: string | null = localStorage.getItem("Empleados");
    let aux: SP.empleado[] = empleLS == null ? [] : JSON.parse(empleLS);
    let idEmpleado: number = Number($("#txtID").val(ultimoID(aux) + 1));

    let tCuerpo = $("#tCuerpo");
    let tCabeza = $("#tCabeza");
    tCabeza.html("");
    tCuerpo.html("");

    tCabeza.append("<tr class='success'>" +
        "<th> ID</th>" +
        "<th> Nombre</th>" +
        "<th> Apellido</th>" +
        "<th> Genero</th>" +
        "<th> Edad</th>" +
        "<th> Foto</th>" +
        "<th> Accion</th>" +
        "</tr>"
    );
    for (var index = 0; index < aux.length; index++) {
        //append agrega mas al html
        tCuerpo.append(
            `
                    <tr>
                    <td> ${aux[index].ID}</td>
                    <td>${aux[index].Nombre}</td>
                    <td>${aux[index].Apellido}</td>
                    <td>${SP.tipoGenero[aux[index].Genero]}</td>
                    <td>${aux[index].Edad}</td>
                    <td><img src="${aux[index].Foto}" id="tableBanner width="50" height="50"" /></td>
                    <td><button id=btnEliminar class="btn btn-danger" onclick=eliminarMascota(${index})>Borrar</button>
                    <input id=btnModificar type=button class="btn btn-warning" value=Modificar onclick=modificarMascota(${aux[index].ID})></td>
                    </tr>`
        );
    }

  
}
function MostrarGrillaFiltrada(empleadosFiltrados: SP.empleado[]) {
    let chID = $("#chID");
    let chNombre = $("#chNombre");
    let chApellido = $("#chApellido");
    let chEdad = $("#chEdad");
    let chFoto = $("#chFoto");
    

    let auxID: string;
    let auxNombre: string;
    let auxApellido: string;
    let auxEdad: string;
    let auxFoto: string;



    //ID
    if (chID.is(':checked')) {
        auxID = "<th> ID</th>";
    }
    else {
        auxID = "";
    }
    //Nombre
    if (chNombre.is(':checked')) {
        auxNombre = "<th>Nombre</th>";
    }
    else {
        auxNombre = "";
    }
    //Apellido
    if (chApellido.is(':checked')) {
        auxApellido = "<th> Apellido</th>";
    }
    else {
        auxApellido = "";
    }
    //Edad
    if (chEdad.is(':checked')) {
        auxEdad = "<th> Edad</th>";
    }
    else {
        auxEdad = "";
    }
    if (chFoto.is(':checked')) {
        auxFoto = "<th> Foto</th>";
    }
    else {
        auxFoto = "";
    }

    //hacer aparte
    let tCuerpo = $("#tCuerpo");
    let tCabeza = $("#tCabeza");
    tCabeza.html("");
    tCuerpo.html("");

    tCabeza.append("<tr class='success'>" +
        auxID +
        auxNombre +
        auxApellido +
        "<th> Genero</th>" +
        auxEdad +
        auxFoto+
        "<th> Accion</th>" +
        "</tr>"
    );
    for (var index = 0; index < empleadosFiltrados.length; index++) {
        let mapID = idEmpleados(empleadosFiltrados);
        let mapNombre = nombresEmpleados(empleadosFiltrados);
        let mapApellido = apellidosEmpleados(empleadosFiltrados);
        let mapEdad = edadEmpleados(empleadosFiltrados);
        let mapFotos = fotosEmpleados(empleadosFiltrados);
        //append agrega mas al html
        tCuerpo.append(
            "<tr>" +
            mapID[index] +
            mapNombre[index] +
            mapApellido[index] +
            `<td>${SP.tipoGenero[empleadosFiltrados[index].Genero]}</td>` +
            mapEdad[index] +
            mapFotos[index] +
            `<td><button id=btnEliminar class="btn btn-danger" onclick=eliminarMascota(${index})>Borrar</button>
            <input id=btnModificar type=button class="btn btn-warning" value=Modificar onclick=modificarMascota(${empleadosFiltrados[index].ID})></td>
            </tr>`
        );
    }
}

//Eliminar
function eliminarMascota(index: number) {
    let empleLS: string | null = localStorage.getItem("Empleados");
    let aux: SP.empleado[] = empleLS == null ? [] : JSON.parse(empleLS);
    aux.splice(index, 1);
    localStorage.setItem("Empleados", JSON.stringify(aux));
    MostrarGrilla();


}

//Modificar
function modificarMascota(id: number) {
    let empleLS: string | null = localStorage.getItem("Empleados");
    let aux: SP.empleado[] = empleLS == null ? [] : JSON.parse(empleLS);
    let empleadoBuscado:any;
    for (let index = 0; index < aux.length; index++) {
        if (aux[index].ID == id) {
            empleadoBuscado = aux[index];
        }


    }
    
    let idEmpleado: number = Number($("#txtID").val(empleadoBuscado.ID));
    let generoEmpleado: SP.tipoGenero = Number($("#cbTipo").val(empleadoBuscado.Genero));
    let nombreEmpleado: string = String($("#txtNombre").val(empleadoBuscado.Nombre));
    let apellidoEmpleado: string = String($("#txtApellido").val(empleadoBuscado.Apellido));
    let edadEmpleado: number = Number($("#txtEdad").val(empleadoBuscado.Edad));



    let btnAgregar = $("#btnAgregar")
    btnAgregar.attr("value", "Modificar");
    btnAgregar.off("click", Agregar);
    btnAgregar.on("click",md =function () {
            Modificar(empleadoBuscado) 
            });
}

function Modificar(empleadoAux:SP.empleado) {
    let empleLS: string | null = localStorage.getItem("Empleados");
    let aux: SP.empleado[] = empleLS == null ? [] : JSON.parse(empleLS);

    for (let index = 0; index < aux.length; index++) {
        if (aux[index].ID == empleadoAux.ID) {
            console.log(aux[index]);
            aux[index].Genero= Number($("#cbTipo").val());
            aux[index].Nombre = String($("#txtNombre").val());
            aux[index].Apellido = String($("#txtApellido").val());
            aux[index].Edad = Number($("#txtEdad").val());
            aux[index].Foto = fotoTemporal;
            console.log(aux[index]);
            break;
        }
        
    }
    
    let btnAgregar = $("#btnAgregar")
    btnAgregar.attr("value", "Agregar");
    btnAgregar.off("click", md );
    btnAgregar.on("click", Agregar);
    localStorage.setItem("Empleados", JSON.stringify(aux));
    $("#preview").html("").fadeToggle(2000);
    limpiarCampos();
    MostrarGrilla();
    
}

//Limpiar 
function limpiarCampos() {
    //$("#txtID").val("");
    $("#cbTipo").val("");
    $("#txtNombre").val("");
    $("#txtApellido").val("");
    $("#txtEdad").val("");
}


//console.log(data);

/*
    realizar las operaciones usando los metodos map,  reduce y filter y combinaciones entre ellos
  */


var soluciones = {};

// Retornar un array con los nombres de los usuarios femeninos

soluciones.usuariosFemeninos = function (usuarios) {
    return usuarios.filter(function (user) {
        return user.genero === 'Female';
    }).map(function (user) {
        return user.nombre;
    });
}


console.log(soluciones.usuariosFemeninos(data));

// Retornar un array de strings (el email de los usuarios de sexo masculino)

soluciones.mailsVarones = function (usuarios) {
    return usuarios.filter(function (user) {
        return user.genero === 'Male';
    }).map(function (user) {
        return {
            "email": user.email,
            "Genero": user.genero
        };
    });
}

console.log(soluciones.mailsVarones(data));

// Retornar un array de objetos que solo contengan las claves nombre, email y edad, de todos los usuarios mayores que 'edad'

/*
soluciones.usuariosMayores = function(usuarios, edad){
    return usuarios
    .filter(function(user){
        return user.edad > edad;
    })
    .map(function(user){
        
        x ={}
        x.nombre= user.nombre,
        x.email= user.email,
        x.edad= user.edad
        return x;

    });
}
*/

soluciones.usuariosMayores = function (usuarios, edad) {
    return usuarios.filter(function (user) {
        return user.edad > 17;
    })
        .map(function (user) {
            return {
                "Nombre": user.nombre,
                "email": user.email,
                "Edad": user.edad
            };
        });

}

console.log(soluciones.usuariosMayores(data, 40));

// Retornar un objeto que contenga solo el nombre y la edad del usuario mas grande.

soluciones.usuarioMasGrande = function (usuarios) {
    return usuarios.reduce(function (actual, siguente) {
            if (actual.edad > siguente.edad) {
                return {
                    nombre: actual.nombre,
                    edad: actual.edad
                }

            }
            else {
                return {
                    nombre: siguente.nombre,
                    edad: siguente.edad
                }
            }

        });

}

console.log(soluciones.usuarioMasGrande(data));

// Retornar el promedio de edad de los usuarios (number)

soluciones.promedio = function (usuarios) {
    var acumEdad = usuarios.reduce(function(actual,siguente){
        return actual + siguente.edad;

    },0);

    var cantidad = usuarios.reduce(function(actual,siguente){
        return actual + 1

    },0);


    return (acumEdad / cantidad).toFixed(2);
}

console.log("Promedio edad usuarios " + soluciones.promedio(data));

// Retornar el promedio de edad de los usuarios hombres (number)

soluciones.promedioVarones = function (usuarios) {
    var acumEdad = usuarios.filter(function (user) {
        return user.genero === 'Male';
    }).reduce(function(actual,siguente){
        return actual + siguente.edad;

    },0);

    var cantidadHombres = usuarios.reduce(function(actual,siguente){
        if(siguente.genero === "Male"){
            return actual + 1
        }
        else
        return actual;

    },0);

    return (acumEdad / cantidadHombres).toFixed(2);
}

console.log("Promedio edad Varones " + soluciones.promedioVarones(data));

// Retornar el promedio de edad de los usuarios mujeres (number)

soluciones.promedioMujeres = function (usuarios) {
    var acumEdad = usuarios.filter(function (user) {
        return user.genero === 'Female';
    }).reduce(function(actual,siguente){
        return actual + siguente.edad;

    },0)

    var cantidadMujeres = usuarios.reduce(function(actual,siguente){
        if(siguente.genero === "Female"){
            return actual + 1
        }
        else
        return actual;

    },0);

    return (acumEdad / cantidadMujeres).toFixed(2);

}

console.log("Promedio edad Mujeres " + soluciones.promedioMujeres(data));
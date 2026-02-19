var assignatura;
var botonAnadir= document.getElementById("botonAnadir");
var nuevaAssignatura;
var arrayAssignaturas = ["Llenguatges","Sistemes","Programació","Interficies","Entornos","Empresas"];
var fecha;
var botonBorrar = document.getElementById("botonBorrar");
var botonBuscar = document.getElementById("botonBuscar");

function addAssignatura(){
    nuevaAssignatura = prompt("Introduce una nueva asignatura").toLocaleLowerCase();
    fecha=new Date();
    console.log(nuevaAssignatura+" "+fecha);

    arrayAssignaturas[arrayAssignaturas.length] = nuevaAssignatura;
}

function deleteAssignatura(){
    assignatura = prompt("Que assignatura quieres borrar").toLocaleLowerCase();

    arrayAssignaturas.forEach(arrayAssignaturas => {
        if(assignatura == arrayAssignaturas.toLocaleLowerCase()){
            console.log("Assignatura encontrada")
        }
        else{
            console.log("Assignatura no encontrada")
        }

    });
}
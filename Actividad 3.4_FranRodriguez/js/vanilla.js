var assignaturaDam1 = ["Llenguatges","Sistemes","Programació"];
var assignaturaDam2 = ["Interficies","Entornos","Empresas"];
var arrayAssignaturas= assignaturaDam1.concat(assignaturaDam2);//combina los arrays

function addAssignatura(){
    var assignatura = prompt("Introduce una nueva asignatura").toLocaleLowerCase();
    if (assignatura){ //si el usuario deja vacio el prompt no hace nada
    var fecha=new Date();
    console.log("Se ha añadido la siguiente assignatura: "+assignatura+" "+fecha);
    arrayAssignaturas.push(assignatura);
    }
}

function borrarAssignatura(){
    var assignatura = prompt("Que assignatura quieres borrar").toLocaleLowerCase();
    var encontrada = false;
    var nuevoArrayAssignaturas=[];

    arrayAssignaturas.forEach(a => {
        if(assignatura == a.toLocaleLowerCase()){
            encontrada=true;
        }
        else{
            nuevoArrayAssignaturas.push(a);
        }
    });

    arrayAssignaturas = nuevoArrayAssignaturas;

    if(encontrada){
        console.log("Se ha borrado la siguiente assignatura: "+assignatura);
    }
    else{
        console.log("No se ha borrado ninguna assignatura, assignatura no encontrada");
    }
}

function buscarAssignatura(){
    var assignatura = prompt("Que assignatura quieres buscar?").toLocaleLowerCase();
    var encontrada = false;

    arrayAssignaturas.forEach(a => {
        if(assignatura == a.toLocaleLowerCase()){
            encontrada=true;
        }
    });

    if(encontrada){
        console.log("Assignatura encontrada");
    }
    else{
        console.log("No se ha encontrado ninguna assignatura");
    }
}
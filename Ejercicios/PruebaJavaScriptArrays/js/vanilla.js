var nuevaAssignatura= prompt("Introduce una nueva asignatura");

var DAM1año = ["Llenguatges","Sistemes","Programació,"+nuevaAssignatura+","];
var DAM2año = ["Sistemes de gestió","Interficies","Programació Multimedia"];
var DAM = [DAM1año+DAM2año];

DAM2año[1]="";

console.log(DAM1año);
console.log(DAM2año);
console.log(DAM);
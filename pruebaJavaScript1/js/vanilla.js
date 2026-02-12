//41663903R
//Francisco Javier Rodriguez 
// 10-02-26

var examen1=0,examen2=0,examen3=0;
var suma=0,media=0;
examen1=Number(prompt("Nota del examen1"));
examen2=Number(prompt("Nota del examen2"));
examen3=Number(prompt("Nota del examen3"));

suma = examen1+examen2+examen3;
media = suma/3;

if (media>=9){
    console.log("Excelente");
}
else if(media>=7){
    console.log("Notable");
}
else if (media>=5){
    console.log("Aprobado");
}
else{
    console.log("Suspendido");
}

console.log(media);
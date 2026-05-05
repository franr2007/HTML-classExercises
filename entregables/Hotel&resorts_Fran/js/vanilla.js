function validarContraseña(event){
    event.preventDefault();
    let user=document.getElementById('email').value;
    let password= document.getElementById('password').value;
    if(user==""){
        document.getElementById('errorLogin').textContent = 'Rellena el campo del email';
    }
    else if(password==""){
        document.getElementById('errorLogin').textContent = 'Rellena el campo de la contraseña';
    }
    else if(password.length < 6){
        document.getElementById('errorLogin').textContent = 'La contraseña tiene que ser mayor que 6 caracteres';
    }
    else if(password.length > 12){
        document.getElementById('errorLogin').textContent = 'La contraseña tiene que ser menor que 12 caracteres';
    }
    else if (!comprobarMayusculas(password)){
        document.getElementById('errorLogin').textContent = 'La contraseña tiene que tener almenos una letra en mayuscula';
    }
    else if (!comprobarMinuscula(password)){
        document.getElementById('errorLogin').textContent = 'La contraseña tiene que tener almenos una letra en minuscula';
    }
    else if (!comprobarNum(password)){
        document.getElementById('errorLogin').textContent = 'La contraseña tiene que tener almenos un numero';
    }
    else{
        sessionStorage.setItem('usuario', user);
        window.location.href = 'index.html';
    }
}

function comprobarMayusculas(password){
    for(let i=0; i< password.length;i++){
        if(password[i]>= 'A' && password[i]<='Z'){
            return true;
        }
    }
    return false;
}

function comprobarMinuscula(password){
    for(let i=0; i< password.length;i++){
        if(password[i]>= 'a' && password[i]<='z'){
            return true;
        }
    }
    return false;
}

function comprobarNum(password){
    for(let i=0; i< password.length;i++){
        if(password[i]>= '0' && password[i]<='9'){
            return true;
        }
    }
    return false;
}

window.onload = function(){
    if(sessionStorage.getItem('usuario') != null){
        document.getElementById('btnLogin').textContent = '🙍‍♂️CERRAR SESION';
    }
}

function cerrarSesion(){
    sessionStorage.removeItem('usuario');
    document.getElementById('btnLogin').textContent = '🙍‍♂️INICIAR SESION';
}


fetch('data/hoteles.json')
  .then(response => response.json())
  .then(jsonData => {
    cargarHoteles(jsonData.playa,   'hoteles_playa');
    cargarHoteles(jsonData.montaña, 'hoteles_montaña');
    cargarHoteles(jsonData.urbanos, 'hoteles_urbanos');
  })
  .catch(error => {
    console.error("Error carregant el json:", error);
});
  

function cargarHoteles(listaHoteles) {

    hoteles.forEach(hotel => {
        
        const article= document.createElement('article'); // crea un article en el html
        article.classList.add('producto'); //mete la classe producto en el article

        //dentro del article añade el hotel
        article.innerHTML = `
        <h3>${hotel.nombre}</h3>
        <img src="${hotel.imagen} alt="${hotel.nombre}" ">
        <p>${hotel.descripcion}</p>
        <span>${hotel.precio} €/noche</span>
        `;

    });

    
}
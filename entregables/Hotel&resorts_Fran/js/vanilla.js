const menu = document.querySelector(".menu");

menu.innerHTML = `
    <img src="img/icons/icon.png" class="icono">
    <a class="btnMenu" href="index.html">✨INICIO</a>
    <a class="btnMenu" href="hoteles.html">🏩HOTELES</a>
    <a class="btnMenu" id="btnLogin" href="login.html">🙍‍♂️INICIAR SESION</a>
    <a href="favoritos.html"><img src="img/icons/estrella.png" alt="Carrito"></a>
`;

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
        localStorage.setItem('usuario', user);
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
    if(localStorage.getItem('usuario') != null){
        document.getElementById('btnLogin').textContent = '🙍‍♂️CERRAR SESION';
    }
}

function cerrarSesion(){
    localStorage.removeItem('usuario');
    document.getElementById('btnLogin').textContent = '🙍‍♂️INICIAR SESION';
}

const contenedorSection= document.getElementById('seccionHoteles');

if(contenedorSection){
fetch('../json/hoteles.json')
  .then(response => response.json())
  .then(jsonData => {
    cargarHoteles(jsonData.playa, 'hoteles_playa');
    cargarHoteles(jsonData.montaña, 'hoteles_montaña');
    cargarHoteles(jsonData.urbano, 'hoteles_urbano');
  })
  .catch(error => {
    console.error("Error cargando el json:", error);
});
}
  

function cargarHoteles(listaHoteles, direccion) {

    const contenedor = document.getElementById(direccion);

    listaHoteles.forEach(hotel => {
        
        const contenido= document.createElement('article'); // crea un article en el html
        contenido.classList.add('hotel'); //mete la classe hotel en el article
        

        //dentro del article añade el hotel
        contenido.innerHTML = `
        <h3>${hotel.nombre}</h3>
        <img src="${hotel.foto}" alt="${hotel.nombre}">
        <p>${hotel.descripcion}</p>
        <span>${hotel.precio} €/noche</span>
        `;

        const botonFav = document.createElement('button');
        botonFav.innerText = "Añadir a favoritos";
        botonFav.style.cursor = 'pointer';

        botonFav.onclick = function(e){
            botonFavorito(e, hotel);
        }

        contenido.onclick = function() {
            window.location.href = `product.html?nombre=${encodeURIComponent(hotel.nombre)}`;
        };

        contenido.appendChild(botonFav);

        contenedor.appendChild(contenido);
    });
}

const url = new URLSearchParams(window.location.search);
const nombreBuscado = url.get('nombre');

if (nombreBuscado) {
    fetch('/json/hoteles.json')
        .then(res => res.json())
        .then(datos => {

            const todos = datos.playa.concat(datos.montaña, datos.urbano);

            let h = null;

            for (let i = 0; i < todos.length; i++) {
                if (todos[i].nombre === nombreBuscado) {
                    h = todos[i];
                break;
                }
            }

            if (h) {
                document.getElementById('nombre_hotel').innerText = h.nombre;
                document.getElementById('imagen').src = h.foto;
                document.getElementById('descripcion_hotel').innerText = h.descripcion;
                document.getElementById('precio_hotel').innerText = h.precio + "€/noche";

                document.getElementById('btnfav').onclick = function(e){
                    botonFavorito(e, h);
                };
            }
        })
        .catch(err => console.error("error al cargar el json:", err));
}

function botonFavorito(e, hotel){
    e.stopPropagation();

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    let existe = false;

    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i] === hotel.nombre) {
            existe = true;
        break;
        }
    }

    if (!existe) {
        favoritos.push(hotel.nombre);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        alert(hotel.nombre + " añadido a favoritos");
    }
    else {
        alert("Este hotel ya está en tus favoritos");
    }
            
            // Aquí iría tu lógica de guardar en LocalStorage, etc.
}
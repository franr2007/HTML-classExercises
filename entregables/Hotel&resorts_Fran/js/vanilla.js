// Selecciona la clase menu del HTML y le mete todo el contenido html
const menu = document.querySelector(".menu");

//contenido html:
menu.innerHTML = `
    <img src="img/icons/icon.png" class="icono">
    <select>
        <option value="es">ES</option>
        <option value="en">EN</option>
    </select>
    <a class="btnMenu" href="index.html">INICIO</a>
    <a class="btnMenu" href="hoteles.html">HOTELES</a>
    <a class="btnMenu" id="btnLogin" href="login.html">INICIAR SESION</a>
    <a class="btnMenu" id="btnLogin" href="conocenos.html">CONOCENOS</a>
    <a href="favoritos.html"><img src="img/icons/estrella.png" alt="Carrito"></a>
`;

//validacion formulario

//se ejecuta al pusar el boton 'iniciar sesion'
//el parametro de la funcion 'event' es la accion de cuando le das al boton
function validarContraseña(event){
    event.preventDefault(); //para la accion del boton para validar primero

    // Recoge los datos de email y password
    let user = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    //validacion
    if(user == ""){
        document.getElementById('errorLogin').textContent = 'Rellena el campo del email';
    }
    else if(password == ""){
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
        // Si todo esta bien, guarda en localstorage el email como usuario
        localStorage.setItem('usuario', user);
        window.location.href = 'index.html'; //y redirige al inicio
    }
}

//funcion que comprueba las mayusculas
function comprobarMayusculas(password){
    //bucle que recorre toda la contraseña caracter por caracter
    for(let i = 0; i < password.length; i++){
        //condicion que comprueba si tiene mayuscula
        if(password[i] >= 'A' && password[i] <= 'Z'){//valor lexicografico
            return true;
        }
    }
    return false;
}

//igual que el anterior pero con las minusculas
function comprobarMinuscula(password){
    for(let i = 0; i < password.length; i++){
        if(password[i] >= 'a' && password[i] <= 'z'){
            return true;
        }
    }
    return false;
}

//igual que las anteriores pero con numeros
function comprobarNum(password){
    for(let i = 0; i < password.length; i++){
        if(password[i] >= '0' && password[i] <= '9'){
            return true;
        }
    }
    return false;
}

//iniciar sesion

//window.onload lo que hace es que se ejecuta cuando la página termina de cargar completamente
window.onload = function(){
    //reoje el boton de iniciar sesion
    const btnLogin = document.getElementById('btnLogin');

    //si hay un usuario en localStorage, cambia el contenido del boton a cerrar sesion
    if(localStorage.getItem('usuario') != null){
        btnLogin.textContent = 'CERRAR SESION';
        btnLogin.onclick = function(e){
            e.preventDefault(); //esto evita que no vaya al la pagina iniciar sesion
            cerrarSesion();
        };
    }
}

//funcion que elimina el usuario guardado en localstorage
//y cambia el contenido del btn a iniciar sesion
function cerrarSesion(){
    localStorage.removeItem('usuario');//lo elimina de local storage
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.textContent = 'INICIAR SESION';
    btnLogin.href = 'login.html';
}

//cargar hoteles

//comprueba si existe seccionHoteles
//si no existe significa que no esta en la pagina hoteles, entonces no es necesario hacer nada
const contenedorSection = document.getElementById('seccionHoteles');

//si existe el section de hoteles
if(contenedorSection){
    //recoje los datos del json de los hoteles
    fetch('../json/hoteles.json')
        .then(res => res.json()) //el resultado se convierte en un objeto js
        .then(jsonData => {
            //llama a la funcion cargarHoteles por cada seccion
            //y le pasa el array correspondiente y el id del contenedor donde se situaran
            cargarHoteles(jsonData.playa,   'hoteles_playa');
            cargarHoteles(jsonData.montaña, 'hoteles_montaña');
            cargarHoteles(jsonData.urbano,  'hoteles_urbano');
        })
        .catch(error => {
            console.error("Error cargando el json:", error); //si falla al cargar el json, muestra un error
        });
}

//recibe el array del json y el id del contenedor
function cargarHoteles(listaHoteles, id) {
    const contenedor = document.getElementById(id);

    //recorre la lista por cada hotel
    listaHoteles.forEach(hotel => {

        //crea un article y le añade la clase hotel
        const contenido = document.createElement('article');
        contenido.classList.add('hotel');

        //rellena el article con los datos del hotel con sus respectivos elementos
        contenido.innerHTML = `
            <h3>${hotel.nombre}</h3>
            <img src="${hotel.foto}" alt="${hotel.nombre}">
            <p>${hotel.descripcion}</p>
            <span>${hotel.precio} €/noche</span>
        `;

        //aqui se crea el boton de favoritos por separado para añadirle la accion que tendra
        const botonFav = document.createElement('button');
        botonFav.innerText = "Añadir a favoritos ⭐";
        botonFav.style.cursor = 'pointer';

        //al hacer click en el boton llama a la funcion botonFavorito
        botonFav.onclick = function(e){
            //se le pasa la funcion del evento y el hotel en concreto
            botonFavorito(e, hotel);
        };

        //al hacer click en el article llevara a la pagina product.html con el hotel seleccionado
        contenido.onclick = function() {
            //con ?nombre se usa como get
            //y recogemos el nomrbre del hotel para ir a esa pagina pero con la info del hotel
            //encodeURIComponent convierte el nombre a un formato válido para la URL
            window.location.href = `product.html?nombre=${encodeURIComponent(hotel.nombre)}`;
        };

        contenido.appendChild(botonFav);    //se mete el boton de favoritos en el contenido del article
        contenedor.appendChild(contenido);  //y el article se mete en la seccion adecuada
    });
}

//cargar hotel en product.html

//se crea una url que lea la ubicacion actual
const url = new URLSearchParams(window.location.search);
const nombreBuscado = url.get('nombre'); //y de la url se recoje el nombre

//si nombreBuscado tiene un nombre
if (nombreBuscado) {
    //carga el json
    fetch('/json/hoteles.json')
        .then(res => res.json())//del resultado hace un objeto js
        .then(datos => {

            //esta variable coje todos los datos y los junta
            const todos = datos.playa.concat(datos.montaña, datos.urbano);

            let hotel = null;

            //recorre todos los hoteles hasta encontrar el que tenga el mismo nombre
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].nombre === nombreBuscado) {
                    hotel = todos[i]; //se guarda
                    break; //para el bucle cuando lo encuentra
                }
            }

            //si se encuentra el hotel
            if (hotel) {
                //rellena los elementos con los datos del hotel
                document.getElementById('nombre_hotel').innerText = hotel.nombre;
                document.getElementById('imagen').src = hotel.foto;
                document.getElementById('descripcion_hotel').innerText = hotel.descripcion;
                document.getElementById('precio_hotel').innerText = hotel.precio + "€/noche";

                //aqui tambien se le asigna la función de favoritos al botón de product.html
                document.getElementById('btnfav').onclick = function(e){
                    botonFavorito(e, hotel);
                };

                //rellena el article de ventajas con los datos del json
                const contenedorVentajas = document.getElementById('ventajas');

                //si existe el contenedorVentajas
                if (contenedorVentajas) {
                    //recorremos las ventajas del json, se crea un parrafo y se le añade el texto
                    //Object.values() convierte el objeto ventajas en un array de sus valores
                    Object.values(hotel.ventajas).forEach(ventaja => {
                        const p = document.createElement('p');
                        p.textContent = ventaja;
                        contenedorVentajas.appendChild(p);//cada parrafo se añade al contenedor
                    });
                }
            }
        })
        .catch(err => console.error("error al cargar el json:", err)); //si hay un error al cargar el json se muestra un mensaje
}

//favoritos

//funcion que añade a favoritos el hotel
function botonFavorito(e, hotel){
    e.stopPropagation(); //para la accion del evento para validar

    //recoge los favoritos guardados en localStorage a un array.
    // Si no hay ninguno, crea un array vacío.
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    let existe = false;

    //bucle que recorre favoritos y busca si el hotel ya esta en favoritos
    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i] === hotel.nombre) {
            existe = true;
            break;
        }
    }

    //si no existe
    if (!existe) {
        favoritos.push(hotel.nombre); //añade el nombre al array
        localStorage.setItem('favoritos', JSON.stringify(favoritos)); //guarda el array actualizado en favoritos
        alert(hotel.nombre + " añadido a favoritos");
    } else {
        //si ya existe muestra una alerta de que ya esta en favoritos
        alert("Este hotel ya está en tus favoritos");
    }
}

//cargar favoritos

//comprueba si existe la seccion de favoritos
const sectionFav = document.getElementById('sectionfav');

//si existe llama a la fucnion cargar favoritos
if (sectionFav) {
    cargarFavoritos();
}

//esta funcion carga los hoteles que estan en el array de favoritos de localstorage
function cargarFavoritos() {

    //lee el array de favoritos del localStorage
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    //si no hay ningun hotel en favoritos
    if (favoritos.length == 0) {
        //crea un parrafo con la siguiente info:
        sectionFav.innerHTML = '<p>No tienes hoteles favoritos guardados.</p>';
        return;
    }

    //si hay un hotel, carga el json
    fetch('/json/hoteles.json')
        .then(res => res.json())//recoje el resultado en un objeto js
        .then(datos => {

            //coje todos los hoteles y los junta
            const todos = datos.playa.concat(datos.montaña, datos.urbano);

            //recorre favoritos por cada nombre que tenga
            favoritos.forEach(nombreHotel => {
                let hotel = null;

                //este bucle busca entre todos los hoteles
                for (let i = 0; i < todos.length; i++) {
                    //si el nombre del favoritos coincide con el nombre del hotel que buscamos
                    if (todos[i].nombre == nombreHotel) {
                        hotel = todos[i]; //le assignamos el hotel
                        break;
                    }
                }

                if (!hotel) return; //si no lo encuentra, es decir que ha sido eliminado el json, lo salta.

                //crea y rellena el article de cada hotel en favoritos
                const article = document.createElement('article');
                article.classList.add('articlefav');

                article.innerHTML = `
                    <img src="${hotel.foto}" alt="${hotel.nombre}">
                    <p>${hotel.nombre}</p>
                    <span>${hotel.precio}€</span>
                    <button class="btnEliminarFav">Eliminar de favoritos ❌</button>
                `;

                //al pulsar eliminar borra el hotel del localStorage y elimina el article
                article.querySelector('.btnEliminarFav').onclick = function () {
                    //recoje el array de favoritos
                    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                    let nuevoFavoritos = [];

                    //bucle que recorre el array de favoritos
                    for (let i = 0; i < favoritos.length; i++) {
                        //compara los nombres del hotel y añade todos los que no tengan el nombre buscado
                        if (favoritos[i] !== hotel.nombre) {
                            nuevoFavoritos.push(favoritos[i]);//añade los demas hoteles no eliminados
                        }
                    }

                    favoritos = nuevoFavoritos; //el favoritos copia el nuevo favoritos

                    localStorage.setItem('favoritos', JSON.stringify(favoritos));//guarda el array favoritos en texto, en favoritos
                    article.remove(); //elimina el article
                };

                sectionFav.appendChild(article);//mete el article en la seccion favoritos
            });
        })
        .catch(err => console.error("Error cargando favoritos:", err)); //muestra un mensaje si hay un error
}
// Selecciona el elemento <menu class="menu"> del HTML y le inyecta el contenido del menú de navegación
const menu = document.querySelector(".menu");

menu.innerHTML = `
    <img src="img/icons/icon.png" class="icono">
    <a class="btnMenu" href="index.html">INICIO</a>
    <a class="btnMenu" href="hoteles.html">HOTELES</a>
    <a class="btnMenu" id="btnLogin" href="login.html">INICIAR SESION</a>
    <a class="btnMenu" id="btnLogin" href="conocenos.html">CONOCENOS</a>
    <a href="favoritos.html"><img src="img/icons/estrella.png" alt="Carrito"></a>
`;

// ─── VALIDACIÓN DEL FORMULARIO DE LOGIN ──────────────────────────────────────

// Se ejecuta cuando el usuario pulsa "Enviar" en el formulario de login
// El parámetro "event" representa el evento de envío del formulario
function validarContraseña(event){
    event.preventDefault(); // Cancela el envío real del formulario para validar primero

    // Recoge los valores escritos en los campos email y password
    let user = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Comprueba cada condición en orden y muestra el error correspondiente
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
        // Si todo es correcto: guarda el email en localStorage y redirige al inicio
        localStorage.setItem('usuario', user);
        window.location.href = 'index.html';
    }
}

// Recorre la contraseña carácter a carácter buscando una mayúscula
// Devuelve true si encuentra una, false si no
function comprobarMayusculas(password){
    for(let i = 0; i < password.length; i++){
        if(password[i] >= 'A' && password[i] <= 'Z'){
            return true;
        }
    }
    return false;
}

// Igual que la anterior pero busca una minúscula
function comprobarMinuscula(password){
    for(let i = 0; i < password.length; i++){
        if(password[i] >= 'a' && password[i] <= 'z'){
            return true;
        }
    }
    return false;
}

// Igual que las anteriores pero busca un dígito numérico
function comprobarNum(password){
    for(let i = 0; i < password.length; i++){
        if(password[i] >= '0' && password[i] <= '9'){
            return true;
        }
    }
    return false;
}

// ─── SESIÓN DE USUARIO ───────────────────────────────────────────────────────

// Se ejecuta cuando la página termina de cargar completamente
window.onload = function(){
    const btnLogin = document.getElementById('btnLogin');
    if (!btnLogin) return; // Si el botón no existe en esta página, no hace nada

    // Si hay un usuario guardado en localStorage, cambia el botón a "CERRAR SESION"
    if(localStorage.getItem('usuario') != null){
        btnLogin.textContent = 'CERRAR SESION';
        btnLogin.href = '#'; // Desactiva la navegación del enlace
        btnLogin.onclick = function(e){
            e.preventDefault(); // Evita que el href # haga scroll arriba
            cerrarSesion();
        };
    }
}

// Elimina el usuario del localStorage y restaura el botón a su estado original
function cerrarSesion(){
    localStorage.removeItem('usuario');
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.textContent = 'INICIAR SESION';
    btnLogin.href = 'login.html';
    btnLogin.onclick = null; // Elimina el evento de cerrar sesión que se había asignado
}

// ─── CARGA DE HOTELES EN hoteles.html ────────────────────────────────────────

// Comprueba si existe el contenedor de hoteles (solo existe en hoteles.html)
// Si no existe, este bloque se salta completamente
const contenedorSection = document.getElementById('seccionHoteles');

if(contenedorSection){
    // Hace una petición al archivo JSON que contiene todos los hoteles
    fetch('../json/hoteles.json')
        .then(response => response.json()) // Convierte la respuesta a objeto JavaScript
        .then(jsonData => {
            // Llama a cargarHoteles para cada categoría, pasando el array y el id del contenedor
            cargarHoteles(jsonData.playa,   'hoteles_playa');
            cargarHoteles(jsonData.montaña, 'hoteles_montaña');
            cargarHoteles(jsonData.urbano,  'hoteles_urbano');
        })
        .catch(error => {
            console.error("Error cargando el json:", error); // Muestra el error en consola si falla
        });
}

// Recibe un array de hoteles y el id del contenedor donde pintarlos
function cargarHoteles(listaHoteles, direccion) {
    const contenedor = document.getElementById(direccion);

    // Recorre cada hotel del array
    listaHoteles.forEach(hotel => {

        // Crea un <article> y le añade la clase "hotel"
        const contenido = document.createElement('article');
        contenido.classList.add('hotel');

        // Rellena el article con los datos del hotel usando template literals (${})
        contenido.innerHTML = `
            <h3>${hotel.nombre}</h3>
            <img src="${hotel.foto}" alt="${hotel.nombre}">
            <p>${hotel.descripcion}</p>
            <span>${hotel.precio} €/noche</span>
        `;

        // Crea el botón de favoritos por separado (para poder asignarle el evento sin conflicto)
        const botonFav = document.createElement('button');
        botonFav.innerText = "Añadir a favoritos ⭐";
        botonFav.style.cursor = 'pointer';

        // Al hacer clic en el botón llama a botonFavorito pasando el evento y el hotel
        botonFav.onclick = function(e){
            botonFavorito(e, hotel);
        };

        // Al hacer clic en el article (la tarjeta entera) navega a la página del hotel
        // encodeURIComponent convierte el nombre a un formato válido para la URL
        contenido.onclick = function() {
            window.location.href = `product.html?nombre=${encodeURIComponent(hotel.nombre)}`;
        };

        contenido.appendChild(botonFav);    // Mete el botón dentro del article
        contenedor.appendChild(contenido);  // Mete el article dentro del contenedor del HTML
    });
}

// ─── CARGA DEL HOTEL EN product.html ─────────────────────────────────────────

// Lee los parámetros de la URL actual (ej: product.html?nombre=HOTEL CALA D'OR)
const url = new URLSearchParams(window.location.search);
const nombreBuscado = url.get('nombre'); // Extrae el valor del parámetro "nombre"

// Solo se ejecuta si hay un parámetro "nombre" en la URL (es decir, si estamos en product.html)
if (nombreBuscado) {
    fetch('/json/hoteles.json')
        .then(res => res.json())
        .then(datos => {

            // Une los tres arrays en uno solo para poder buscar en todos a la vez
            const todos = datos.playa.concat(datos.montaña, datos.urbano);

            let h = null;

            // Recorre todos los hoteles hasta encontrar el que coincide con el nombre de la URL
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].nombre === nombreBuscado) {
                    h = todos[i];
                    break; // Para el bucle en cuanto lo encuentra
                }
            }

            if (h) {
                // Rellena los elementos del HTML con los datos del hotel encontrado
                document.getElementById('nombre_hotel').innerText = h.nombre;
                document.getElementById('imagen').src = h.foto;
                document.getElementById('descripcion_hotel').innerText = h.descripcion;
                document.getElementById('precio_hotel').innerText = h.precio + "€/noche";

                // Asigna la función de favoritos al botón de esta página
                document.getElementById('btnfav').onclick = function(e){
                    botonFavorito(e, h);
                };

                // Rellena el article de ventajas con los datos del JSON
                const contenedorVentajas = document.getElementById('ventajas');
                if (contenedorVentajas && h.ventajas) {
                    // Object.values() convierte el objeto ventajas en un array de sus valores
                    Object.values(h.ventajas).forEach(ventaja => {
                        const p = document.createElement('p');
                        p.textContent = ventaja; // Cada valor del objeto se convierte en un <p>
                        contenedorVentajas.appendChild(p);
                    });
                }
            }
        })
        .catch(err => console.error("error al cargar el json:", err));
}

// ─── FAVORITOS ────────────────────────────────────────────────────────────────

// Añade o avisa de que ya existe un hotel en favoritos
function botonFavorito(e, hotel){
    e.stopPropagation(); // Evita que el clic se propague al article y navegue a product.html

    // Lee el array de favoritos guardado, o crea uno vacío si no existe
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    let existe = false;

    // Busca si el hotel ya está en favoritos comparando por nombre
    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i] === hotel.nombre) {
            existe = true;
            break;
        }
    }

    if (!existe) {
        favoritos.push(hotel.nombre); // Añade el nombre al array
        localStorage.setItem('favoritos', JSON.stringify(favoritos)); // Guarda el array actualizado
        alert(hotel.nombre + " añadido a favoritos");
    } else {
        alert("Este hotel ya está en tus favoritos");
    }
}

// ─── CARGA DE FAVORITOS EN favoritos.html ────────────────────────────────────

// Comprueba si existe el contenedor de favoritos (solo existe en favoritos.html)
const sectionFav = document.getElementById('sectionfav');

if (sectionFav) {
    cargarFavoritos(); // Si existe, llama a la función que pinta los favoritos
}

function cargarFavoritos() {
    // Lee el array de favoritos del localStorage
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    // Si no hay ninguno, muestra un mensaje y para
    if (favoritos.length === 0) {
        sectionFav.innerHTML = '<p>No tienes hoteles favoritos guardados.</p>';
        return;
    }

    fetch('/json/hoteles.json')
        .then(res => res.json())
        .then(datos => {
            const todos = datos.playa.concat(datos.montaña, datos.urbano);

            // Por cada nombre guardado en favoritos, busca el hotel completo en el JSON
            favoritos.forEach(nombreFav => {
                // find() devuelve el primer elemento que cumple la condición, o undefined
                const hotel = todos.find(h => h.nombre === nombreFav);
                if (!hotel) return; // Si no lo encuentra (fue borrado del JSON), lo salta

                // Crea y rellena el article de cada hotel favorito
                const article = document.createElement('article');
                article.classList.add('articlefav');

                article.innerHTML = `
                    <img src="${hotel.foto}" alt="${hotel.nombre}">
                    <p>${hotel.nombre}</p>
                    <span>${hotel.precio}€</span>
                    <button class="btnEliminarFav">Eliminar de favoritos ❌</button>
                `;

                // Al pulsar eliminar: borra el hotel del localStorage y elimina el article del DOM
                article.querySelector('.btnEliminarFav').onclick = function () {
                    let favs = JSON.parse(localStorage.getItem('favoritos')) || [];
                    favs = favs.filter(f => f !== hotel.nombre); // filter() devuelve un nuevo array sin ese hotel
                    localStorage.setItem('favoritos', JSON.stringify(favs));
                    article.remove(); // Elimina el article visualmente sin recargar la página
                };

                sectionFav.appendChild(article);
            });
        })
        .catch(err => console.error("Error cargando favoritos:", err));
}
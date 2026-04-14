function validarContraseña(event){
    event.preventDefault();
    let correo=document.getElementById('email').value;
    let password= document.getElementById('password').value;
    if(correo==""){
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
        sessionStorage.setItem('usuario', correo);
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
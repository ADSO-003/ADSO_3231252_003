function cambiarPassword() {

    let actual = document.getElementById('actual').value;
    let nueva = document.getElementById('nueva').value;
    let confirmar = document.getElementById('confirmar').value;

    // Validar campos vacíos
    if (actual === '' || nueva === '' || confirmar === '') {
        abrirModal('Campos incompletos',
            'Debe llenar todos los campos', 'error');
        return;
    }

    // Validar que las contraseñas coincidan
    if (nueva !== confirmar) {
        abrirModal('Error',
            'Las contraseñas no coinciden', 'error');
        return;
    }

    // Validar longitud mínima (CA-03)
    if (nueva.length < 6) {
        abrirModal('Contraseña débil',
            'La contraseña debe tener mínimo 6 caracteres', 'error');
        return;
    }

    abrirModal('Contraseña actualizada',
        'La contraseña fue cambiada correctamente.');
}

function abrirModal(titulo, mensaje, tipo = 'exito') {
    let modal = document.getElementById('modal');
    document.getElementById('modal-titulo').innerText = titulo;
    document.getElementById('modal-texto').innerText = mensaje;
    let icono = document.getElementById('modal-icono');
    if (tipo === 'error') {
        icono.innerText = '✖';
        icono.style.color = '#C62828';
    } else {
        icono.innerText = '✔';
        icono.style.color = '#42A362';
    }
    modal.style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}

function guardarPerfil() {
    let nombre = document.getElementById('nombre').value;
    let telefono = document.getElementById('telefono').value;
    if (nombre === '' || telefono === '') {
        abrirModal('Campo vacío',
            'Debe completar todos los campos', 'error');
        return;
    }
    abrirModal('Perfil actualizado',
        'Los cambios fueron guardados correctamente.');
}


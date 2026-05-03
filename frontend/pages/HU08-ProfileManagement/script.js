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


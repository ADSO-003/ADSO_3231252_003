// Contenedor de alertas
const toastContainer = document.getElementById('toast-container');

// Función para mostrar alertas estilo toast (como en la imagen)
function mostrarAlerta(mensaje, tipo = 'error') {
    if (!toastContainer) return;
    
    // Crear el elemento de la alerta
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Icono según el tipo de alerta
    let icono = '⚠️';
    if (tipo === 'success') icono = '✅';
    if (tipo === 'info') icono = 'ℹ️';
    
    // Estructura interna
    toast.innerHTML = `
        <span style="margin-right: 12px; font-size: 18px;">${icono}</span>
        <span style="flex: 1;">${mensaje}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-cerrar después de 4 segundos
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            if (toast.remove) toast.remove();
        }, 300);
    }, 4000);
}

// Función para limpiar alertas existentes (opcional)
function limpiarAlertas() {
    if (!toastContainer) return;
    const toasts = toastContainer.querySelectorAll('.toast');
    toasts.forEach(toast => toast.remove());
}

// Función principal de validación
function validarFormulario(event) {
    event.preventDefault();
    
    // Obtener todos los campos
    const tipoDoc = document.querySelector('.campo:nth-child(1) input');
    const numDoc = document.querySelector('.campo:nth-child(2) input');
    const nombreCompleto = document.querySelector('.campo:nth-child(3) input');
    const correo = document.querySelector('.campo:nth-child(4) input');
    const password = document.querySelector('.campo:nth-child(5) input');
    const confirmPassword = document.querySelector('.campo:nth-child(6) input');
    const telefono = document.querySelector('.campo:nth-child(7) input');
    
    // Array para almacenar los errores
    let errores = [];
    
    // 1. Validar Tipo de documento
    if (!tipoDoc.value.trim()) {
        errores.push("⚠️ Por favor, ingrese su tipo de documento");
    } else if (tipoDoc.value.trim().length < 2) {
        errores.push("⚠️ El tipo de documento debe tener al menos 2 caracteres");
    }
    
    // 2. Validar Número de documento
    if (!numDoc.value.trim()) {
        errores.push("⚠️ Por favor, ingrese su número de documento");
    } else if (numDoc.value.trim().length < 5) {
        errores.push("⚠️ El número de documento debe tener al menos 5 dígitos");
    } else if (numDoc.value.trim().length > 15) {
        errores.push("⚠️ El número de documento no puede tener más de 15 dígitos");
    }
    
    // 3. Validar Nombre completo
    if (!nombreCompleto.value.trim()) {
        errores.push("⚠️ Por favor, ingrese su nombre completo");
    } else if (nombreCompleto.value.trim().split(' ').length < 2) {
        errores.push("⚠️ Por favor, ingrese su nombre y apellido completo");
    } else if (nombreCompleto.value.trim().length < 5) {
        errores.push("⚠️ El nombre completo debe tener al menos 5 caracteres");
    }
    
    // 4. Validar Correo electrónico (como en la imagen de WhatsApp)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo.value.trim()) {
        errores.push("📧 Por favor, ingrese su correo electrónico");
    } else if (!emailRegex.test(correo.value.trim())) {
        errores.push("📧 Por favor, ingrese un correo electrónico válido (ejemplo: usuario@gmail.com)");
    }
    
    // 5. Validar Contraseña
    if (!password.value.trim()) {
        errores.push("🔒 Por favor, ingrese una contraseña");
    } else if (password.value.trim().length < 8) {
        errores.push("🔒 La contraseña debe tener al menos 6 caracteres");
    } else if (password.value.trim().length > 20) {
        errores.push("🔒 La contraseña no puede tener más de 20 caracteres");
    }
    
    // 6. Validar Confirmar contraseña
    if (!confirmPassword.value.trim()) {
        errores.push("🔒 Por favor, confirme su contraseña");
    } else if (password.value.trim() !== confirmPassword.value.trim()) {
        errores.push("🔒 Las contraseñas no coinciden");
    }
    
    // 7. Validar Teléfono
    if (!telefono.value.trim()) {
        errores.push("📱 Por favor, ingrese su número de teléfono");
    } else if (telefono.value.trim().length < 10) {
        errores.push("📱 El número de teléfono debe tener al menos 10 dígitos");
    } else if (telefono.value.trim().length > 10) {
        errores.push("📱 El número de teléfono no puede tener más de 10 dígitos");
    }
    
    // Mostrar errores si existen
    if (errores.length > 0) {
        // Mostrar el primer error (o todos si quieres)
        errores.forEach(error => {
            mostrarAlerta(error, 'error');
        });
        
        // Opcional: Resaltar el primer campo con error
        const primerCampoInvalido = encontrarPrimerCampoInvalido();
        if (primerCampoInvalido) {
            primerCampoInvalido.focus();
            primerCampoInvalido.style.borderColor = '#d93025';
            primerCampoInvalido.style.backgroundColor = '#fff8f8';
            
            // Restaurar color después de 2 segundos
            setTimeout(() => {
                primerCampoInvalido.style.borderColor = '#000000';
                primerCampoInvalido.style.backgroundColor = 'white';
            }, 2000);
        }
    } else {
        // Todos los campos son válidos
        mostrarAlerta("✅ ¡Registro exitoso! Redirigiendo...", 'success');
        setTimeout(() => {
        window.location.href = "homeuser.html";
    }, 2000);
        
        // Aquí puedes enviar el formulario o hacer la redirección
        console.log("Formulario válido. Datos:", {
            tipoDocumento: tipoDoc.value,
            numeroDocumento: numDoc.value,
            nombreCompleto: nombreCompleto.value,
            correo: correo.value,
            password: password.value,
            telefono: telefono.value
        });
        
        // Descomentar para enviar el formulario realmente
        // event.target.submit();
        
        // Opcional: Limpiar el formulario después del éxito
        // event.target.reset();
    }
}

// Función auxiliar para encontrar el primer campo inválido
function encontrarPrimerCampoInvalido() {
    const campos = document.querySelectorAll('.campo input');
    for (let campo of campos) {
        if (campo.value.trim() === '') {
            return campo;
        }
        // Validaciones específicas
        if (campo.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (campo.value.trim() && !emailRegex.test(campo.value.trim())) {
                return campo;
            }
        }
        if (campo.type === 'password' && campo.placeholder.includes('Confirmar')) {
            const password = document.querySelector('.campo:nth-child(5) input');
            if (password && campo.value !== password.value) {
                return campo;
            }
        }
    }
    return null;
}

// Función para validación en tiempo real (mientras el usuario escribe)
function setupValidacionTiempoReal() {
    const inputs = document.querySelectorAll('.campo input');
    
    inputs.forEach(input => {
        // Cuando el usuario empieza a escribir, quitar el estilo de error
        input.addEventListener('input', function() {
            this.style.borderColor = '#000000';
            this.style.backgroundColor = 'white';
        });
        
        // Validación al perder el foco (blur)
        input.addEventListener('blur', function() {
            // Si el campo está vacío, no mostrar alerta aún para no ser molesto
            // pero sí resaltar si es obligatorio y está vacío
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff9800'; // Naranja suave para advertir
            } else {
                this.style.borderColor = '#4caf50'; // Verde cuando está lleno
            }
        });
        
        // Restaurar color al hacer focus
        input.addEventListener('focus', function() {
            this.style.borderColor = '#0d1f2d';
        });
    });
}

// Función para validar el correo en tiempo real (como en la imagen)
function setupValidacionCorreo() {
    const correoInput = document.querySelector('.campo:nth-child(4) input');
    if (correoInput) {
        correoInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value.trim() !== '' && !emailRegex.test(this.value.trim())) {
                mostrarAlerta("📧 Por favor, ingrese un correo electrónico válido", 'error');
                this.style.borderColor = '#d93025';
            } else if (this.value.trim() !== '') {
                this.style.borderColor = '#4caf50';
            }
        });
    }
}

// Función para validar que las contraseñas coincidan en tiempo real
function setupValidacionPassword() {
    const password = document.querySelector('.campo:nth-child(5) input');
    const confirmPassword = document.querySelector('.campo:nth-child(6) input');
    
    if (password && confirmPassword) {
        const validarCoincidencia = () => {
            if (confirmPassword.value.trim() !== '' && password.value !== confirmPassword.value) {
                confirmPassword.style.borderColor = '#d93025';
            } else if (confirmPassword.value.trim() !== '') {
                confirmPassword.style.borderColor = '#4caf50';
            }
        };
        
        password.addEventListener('input', validarCoincidencia);
        confirmPassword.addEventListener('input', validarCoincidencia);
        confirmPassword.addEventListener('blur', function() {
            if (this.value.trim() !== '' && password.value !== this.value) {
                mostrarAlerta("🔒 Las contraseñas no coinciden", 'error');
            }
        });
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('form');
    
    if (formulario) {
        formulario.addEventListener('submit', validarFormulario);
        setupValidacionTiempoReal();
        setupValidacionCorreo();
        setupValidacionPassword();
    } else {
        console.error("No se encontró el formulario");
    }
});

// Prevenir envío accidental con Enter si hay errores
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
        const formulario = document.querySelector('form');
        if (formulario && document.activeElement.tagName === 'INPUT') {
            event.preventDefault();
            validarFormulario(new Event('submit'));
        }
    }
});
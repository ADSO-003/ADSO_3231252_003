// 🔵 AC-1: CONFIGURACIÓN
const CONFIG = {
    dominiosPermitidos: ["gmail.com", "hotmail.com", "outlook.com"],
    passwords: [],
    modoLibre: false
};

// 🔵 AC-1: DOM
const form = document.getElementById("loginForm");
const adminBtn = document.querySelector(".admin-btn");

// 🔵 AC-4,7,8: ALERTAS 
function mostrarToast(mensaje, tipo = "error") { 
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");

    toast.classList.add("toast", tipo);

    const iconos = {
        error: "⚠️",
        success: "✔️",
        warning: "⚠️"
    };

    toast.innerHTML = `
        <span>${iconos[tipo]}</span>
        <span>${mensaje}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// 🔵 AC-3: BOTÓN ADMIN
adminBtn.addEventListener("click", () => {
    window.location.href = "HU005.html";
});

// 🔵 AC-6: VALIDAR CORREO
function correoValido(correo) {
    const partes = correo.split("@");
    if (partes.length !== 2) return false;
    return CONFIG.dominiosPermitidos.includes(partes[1]);
}

// 🔵 AC-8: VALIDAR CONTRASEÑA
function passwordValida(password) {

    if (CONFIG.modoLibre) return true;

    if (CONFIG.passwords.length === 0) return true;

    return CONFIG.passwords.includes(password);
}

// 🔵 ENVÍO
form.addEventListener("submit", function(e) {

    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    // 🔵 AC-4: CAMPOS VACÍOS
    if (!correo || !password) {
        mostrarToast("Los campos deben estar completos");
        return;
    }

    // 🔵 VALIDACIÓN EXTRA
    if (!correoValido(correo)) {
        mostrarToast("Correo no válido");
        return;
    }

    // 🔵 AC-7: USUARIO NO EXISTE (simulado)
    if (!correo.includes("@")) {
        mostrarToast("Usuario no registrado");
        return;
    }

    // 🔵 AC-8: CONTRASEÑA INCORRECTA
    if (!passwordValida(password)) {
        mostrarToast("Contraseña incorrecta");
        return;
    }

    // 🔵 AC-6 y AC-10: LOGIN EXITOSO
    mostrarToast("Inicio de sesión exitoso", "success");

    // 🔵 AC-6: MANTENER SESIÓN (simulado)
    localStorage.setItem("usuarioLogueado", "true");

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1500);
});

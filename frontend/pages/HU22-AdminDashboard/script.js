

document.getElementById("btnUsuarios").addEventListener("click", () => {
    window.location.href = '../HU23-UserManagement/index.html'; 
});


document.getElementById("btnAtras").addEventListener("click", () => {
    window.location.href = '../HU04-HomepageAdmin/index.html';
});


document.getElementById("btnSalir").addEventListener("click", () => {
    window.location.href = '../HU04-HomepageAdmin/index.html';
});

const datos = {
    hoy: {
        reservas: 189,
        ingresos: 350000,
        zonas: 4,
        usuarios: 120
    },
    semana: {
        reservas: 820,
        ingresos: 1200000,
        zonas: 4,
        usuarios: 300
    },
    mes: {
        reservas: 3200,
        ingresos: 4800000,
        zonas: 4,
        usuarios: 950
    }
};

function cargarDatos(periodo) {
    const info = datos[periodo];

    document.querySelectorAll(".derecha h4")[0].textContent = info.reservas;
    document.querySelectorAll(".derecha h4")[1].textContent = "$" + info.ingresos;
    document.querySelectorAll(".derecha h4")[2].textContent = info.zonas;
    document.querySelectorAll(".derecha h4")[3].textContent = info.usuarios;
}

function verificarSistema() {
    let estado = Math.random();

    if (estado < 0.2) {
        mostrarAlerta("⚠️ El sistema está fallando");
    } else {
        mostrarAlerta("✅ Sistema funcionando con normalidad");
    }
} 

function verificarZonas() {
    const barras = document.querySelectorAll(".progreso2");
    const nombres = document.querySelectorAll(".nombre2");

    barras.forEach((barra, i) => {
        let ancho = parseInt(barra.style.width);

        if (ancho >= 90) {
            mostrarAlerta("⚠️ Zona " + nombres[i].textContent + " llena");
        }
    });
}

window.onload = () => {
    cargarDatos("hoy");
    verificarSistema();
    verificarZonas();
};

function mostrarAlerta(mensaje){
    const contenedor = document.getElementById("contenedor-alertas");

    const alerta = document.createElement("div");
    alerta.classList.add("alerta");

    alerta.innerHTML = `
        <i>⚠️</i>
        <i>⚠️</i>
        <span>${mensaje}</span>
    `;

    contenedor.appendChild(alerta);

    setTimeout(()=>{
        alerta.remove();
    }, 4000);
}
let zonas = [
    {
        nombre: "Zona Sur", direccion: "Cra 14 #20-30", precio: 1500,
        disponibilidad: "Las 24/hr", cupos: 12
    },
    {
        nombre: "Zona El Centro", direccion: "Cl 22 #15-45", precio: 2000,
        disponibilidad: "De 5 AM - A 11 PM", cupos: 3
    },
    {
        nombre: "Zona San Mateo", direccion: "Av. Simón Bolívar #8-10", precio: 1200,
        disponibilidad: "De 8 AM - A 12 PM", cupos: 0
    },
        {
        nombre: "Zona Villa Olímpica", direccion: "Av. Principal #33-11", precio: 2200,
        disponibilidad: "Las 24/hr", cupos: 15
    },
    {
        nombre: "Zona La Pradera", direccion: "Cra 10 #12-45", precio: 1700,
        disponibilidad: "De 7 AM - A 9 PM", cupos: 5
    }

];

const lista = document.getElementById("listaZonas");
const mensaje = document.getElementById("mensajeNoResultados");

function mostrarZonas(datos) {
    lista.innerHTML = "";
    if (datos.length === 0) {
        mensaje.style.display = "block";
        return;
    }
    mensaje.style.display = "none";
    datos.forEach(z => {
        let boton = "";
        if (z.cupos === 0) {
            boton = `
                <button class="btn-rojo">
                    Sin cupos
                </button>`;
        } else {
            boton = `
                <button class="btn-verde"
                        onclick="irReserva('${z.nombre}')">
                    Reservar (${z.cupos} Cupos)
                </button>`;
        }

        let tarjeta = `
            <div class="zona">
                <div class="info">
                    <h3>${z.nombre}</h3>
                    <p>
                        ${z.direccion} - $${z.precio}/hr
                    </p>
                </div>
                <div class="disponibilidad">
                    <p>Disponibilidad:</p>
                    <p>${z.disponibilidad}</p>
                </div>
                ${boton}
            </div>`;
        lista.innerHTML += tarjeta;
    });
}

const buscador = document.getElementById("buscador");

buscador.addEventListener("keyup", () => {
    let texto = buscador.value.toLowerCase();
    let filtradas = zonas.filter(z =>
        z.nombre.toLowerCase().includes(texto)
    );
    mostrarZonas(filtradas);
});

function filtrarConCupos() {
    mostrarZonas(zonas.filter(z => z.cupos > 0));
}

function mostrarTodas() {
    mostrarZonas(zonas);
}
function irReserva(nombre) {
    window.location.href =
        '../HU14-SelectSlot/index.html?zona=' +
        encodeURIComponent(nombre);
}

document.getElementById('logoutLink')
    ?.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('parkea_token');
        localStorage.removeItem('parkea_user_id');
        window.location.href = '../HU02-Homepage/index.html';
    });

document.getElementById('logoutLinkMob')
    ?.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('parkea_token');
        localStorage.removeItem('parkea_user_id');
        window.location.href = '../HU02-Homepage/index.html';
    });




mostrarZonas(zonas);


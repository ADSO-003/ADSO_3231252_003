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
    // ... resto de zonas
];

const lista = document.getElementById("listaZonas");
const mensaje = document.getElementById("mensajeNoResultados");

function mostrarZonas(datos) {
    lista.innerHTML = "";
    datos.forEach(z => {
        lista.innerHTML += `<div class="zona">
        <div class="info"><h3>${z.nombre}</h3>
        <p>${z.direccion} - $${z.precio}/hr</p></div>
        <div class="disponibilidad">
        <p>Disponibilidad:</p><p>${z.disponibilidad}</p></div>
    </div>`;
    });
}

mostrarZonas(zonas);


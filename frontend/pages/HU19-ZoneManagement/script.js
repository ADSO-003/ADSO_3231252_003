let zonas = [
  { id: 1, nombre: "Zona sur",    direccion: "Cll 4 # 13-36", capacidad: 40, cuposLibres: 12, tarifa: 5500,  estado: "activa"    },
  { id: 2, nombre: "Zona norte",  direccion: "Cll 6 # 13-36", capacidad: 40, cuposLibres: 2,  tarifa: 5000,  estado: "activa"    },
  { id: 3, nombre: "Zona centro", direccion: "Cll 8 # 13-36", capacidad: 40, cuposLibres: 18, tarifa: 2500,  estado: "cancelada" },
];

document.querySelectorAll(".btn-editar").forEach(function(btn, index) {
  btn.addEventListener("click", function() {
    localStorage.setItem("zonaEditar", JSON.stringify(zonas[index]));
    window.location.href = "editzone.html";
  });
});

document.querySelectorAll(".btn-des").forEach(function(btn, index) {
  btn.addEventListener("click", function() {
    const zona = zonas[index];
    if (zona.estado === "cancelada") {
      mostrarToast('"' + zona.nombre + '" ya está desactivada', "warning");
      return;
    }
    if (!confirm('¿Deseas desactivar "' + zona.nombre + '"?')) return;
    zonas[index].estado = "cancelada";
    const spanEstado = document.querySelectorAll(".fila")[index].querySelector(".estado");
    spanEstado.textContent = "Cancelada";
    spanEstado.classList.remove("activa");
    spanEstado.classList.add("cancelada");
    mostrarToast('"' + zona.nombre + '" ha sido desactivada', "warning");
  });
});
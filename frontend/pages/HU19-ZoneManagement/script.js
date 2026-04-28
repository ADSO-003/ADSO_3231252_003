let zonas = [
  { id: 1, nombre: "Zona sur",    direccion: "Cll 4 # 13-36", capacidad: 40, cuposLibres: 12, tarifa: 5500,  estado: "activa"    },
  { id: 2, nombre: "Zona norte",  direccion: "Cll 6 # 13-36", capacidad: 40, cuposLibres: 2,  tarifa: 5000,  estado: "activa"    },
  { id: 3, nombre: "Zona centro", direccion: "Cll 8 # 13-36", capacidad: 40, cuposLibres: 18, tarifa: 2500,  estado: "cancelada" },
];

function crearToastContainer() {
  let tc = document.getElementById("toast-container");
  if (!tc) {
    tc = document.createElement("div");
    tc.id = "toast-container";
    tc.style.cssText = "position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;max-width:340px;";
    document.body.appendChild(tc);
  }
  return tc;
}

function mostrarToast(mensaje, tipo) {
  tipo = tipo || "error";
  const tc = crearToastContainer();
  const toast = document.createElement("div");
  const color = tipo === "success" ? "#22c55e" : tipo === "warning" ? "#f59e0b" : "#d93025";
  const icono = tipo === "success" ? "✅" : "⚠️";
  toast.style.cssText = "background:#fff;color:#333;padding:14px 18px;border-radius:8px;box-shadow:0 4px 15px rgba(0,0,0,0.15);display:flex;align-items:center;gap:12px;font-size:14px;font-weight:500;border-left:5px solid " + color + ";animation:toastIn 0.3s ease forwards;font-family:Arial,sans-serif;";
  toast.innerHTML = '<span style="font-size:18px">' + icono + '</span><span>' + mensaje + '</span>';
  tc.appendChild(toast);
  setTimeout(function() {
    toast.style.transition = "opacity 0.3s,transform 0.3s";
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    setTimeout(function() { toast.remove(); }, 300);
  }, 3500);
}

const s = document.createElement("style");
s.textContent = "@keyframes toastIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}";
document.head.appendChild(s);

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
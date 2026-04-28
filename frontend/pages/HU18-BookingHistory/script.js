
const reservas = [
  { id:"13fd456v", zona:"Zona Sur",    fecha:"Mar 14, 2026", horaInicio:"7:00 am", horaFin:"8:00 am",  total:"$1,500", placa:"DEF-456", estado:"pagada" },
  { id:"13rty56v", zona:"Zona Norte",  fecha:"Mar 24, 2026", horaInicio:"7:00 am", horaFin:"11:00 am", total:"$6,000", placa:"ABC-123", estado:"pagada" },
  { id:"145t456v", zona:"Zona Centro", fecha:"Mar 04, 2026", horaInicio:"7:00 am", horaFin:"9:30 am",  total:"$5,500", placa:"ESO-116", estado:"activa" }
];


const container     = document.querySelector(".container");
const botonesF      = document.querySelectorAll(".filtros button");
const alertaOverlay = document.getElementById("alertaOverlay");
const alertaMensaje = document.getElementById("alertaMensaje");
const btnSi         = document.getElementById("btnSi");

let filtroActual      = "todas";
let reservaCancelando = null;


function abrirAlerta(reserva) {
  reservaCancelando = reserva;
  alertaMensaje.textContent = `¿Cancelar la reserva de ${reserva.zona} (${reserva.fecha})?`;
  alertaOverlay.classList.add("visible");
}

function cerrarAlerta() {
  reservaCancelando = null;
  alertaOverlay.classList.remove("visible");
}

btnSi.addEventListener("click", () => {
  if (!reservaCancelando) return;
  reservaCancelando.estado = "cancelada";
  cerrarAlerta();
  render();
});

alertaOverlay.addEventListener("click", function(e) {
  if (e.target === this) cerrarAlerta();
});

function render() {
  document.querySelectorAll(".card").forEach(c => c.remove());
  const prevVacio = document.getElementById("sin-resultados");
  if (prevVacio) prevVacio.remove();

  const filtradas = filtroActual === "todas"
    ? reservas
    : reservas.filter(r => r.estado === filtroActual);

  if (filtradas.length === 0) {
    const msg = document.createElement("p");
    msg.id = "sin-resultados";
    msg.style.cssText = "color:#999;text-align:center;padding:40px 0;font-size:15px;";
    msg.textContent = "No hay reservas en esta categoría.";
    container.appendChild(msg);
    return;
  }

  filtradas.forEach(r => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = r.id;

    const esCancelada = r.estado === "cancelada";
    const pagoTexto   = esCancelada ? "❌ Pago: Cancelado" : "✅ Pago: Completado";

   

    if (esCancelada) {
      card.style.opacity = "0.65";
      card.querySelector(".cancelar").style.cssText = "background:#999;cursor:not-allowed;";
    }

    card.querySelector(".cancelar").addEventListener("click", function() {
      if (esCancelada) return;
      abrirAlerta(r);
    });

    container.appendChild(card);
  });
}
document.getElementById('logoutLink')?.addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('parkea_token');
  localStorage.removeItem('parkea_user_id');
  window.location.href = '../HU02-Homepage/index.html';
});

document.getElementById('logoutLinkMob')?.addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('parkea_token');
  localStorage.removeItem('parkea_user_id');
  window.location.href = '../HU02-Homepage/index.html';
});


botonesF.forEach(btn => {
  btn.addEventListener("click", () => {
    botonesF.forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");
    const texto = btn.textContent.trim().toLowerCase();
    filtroActual = texto === "todas"      ? "todas"
                 : texto === "activas"    ? "activa"
                 : texto === "pagadas"    ? "pagada"
                 : texto === "canceladas" ? "cancelada"
                 : "todas";
    render();
  });
});


render();
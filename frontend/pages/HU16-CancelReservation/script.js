function abrirModal() {
    document.getElementById("modalConfirmacion").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modalConfirmacion").style.display = "none";
}
function cancelarReserva() {
    cerrarModal();
    // Aquí iría la llamada al backend para liberar el cupo:
    // fetch("/api/reservas/PRK-2024-003/cancelar", { method: "POST" })
    // Por ahora simulamos la cancelación exitosa:
    mostrarExito();
}
function mostrarExito() {
    let modal = document.createElement("div");
    modal.className = "modal";
    modal.style.display = "flex";
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icono">✔</div>
            <h3>Reserva cancelada</h3>
            <p>La reserva fue cancelada exitosamente.</p>
            <button class="btn-modal"
                onclick="location.href='../HU18-BookingHistory/index.html'">
                OK
            </button>
        </div>`,
        document.body.appendChild(modal);
}

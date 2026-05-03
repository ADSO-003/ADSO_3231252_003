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

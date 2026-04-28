
document.getElementById("btnAtras").addEventListener("click", () => {
    window.location.href = '../HU22-AdminDashboard/index.html';
});

document.getElementById("btnSalir").addEventListener("click", () => {
    window.location.href = '../HU04-HomepageAdmin/index.html';
});

function actualizarContadores(){
    let filas = document.querySelectorAll("tbody tr");

    let total = filas.length;
    let activos = 0;
    let inactivos = 0;
    let admins = 0;

    filas.forEach(fila=>{
        let estado = fila.querySelector(".estado").textContent;
        let rol = fila.querySelector(".rol").textContent;

        if(estado === "Activo") activos++;
        else inactivos++;

        if(rol.includes("Admin")) admins++;
    });

    totalEl.textContent = total;
    activosEl.textContent = activos;
    inactivosEl.textContent = inactivos;
    adminsEl.textContent = admins;
}
document.querySelectorAll(".activarBtn").forEach(btn=>{
    btn.addEventListener("click", ()=>{

        let fila = btn.closest("tr");

        if(fila.classList.contains("superAdmin")){
            alert("No puedes modificar al super admin");
            mostrarAlerta("Acción bloqueada", "error");
            return;
        }
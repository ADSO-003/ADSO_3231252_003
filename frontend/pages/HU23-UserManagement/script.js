const log = document.getElementById("log");

function agregarLog(texto){
    const li = document.createElement("li");
    li.textContent = texto;
    log.prepend(li);
}

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

function mostrarAlerta(msg,tipo){
    let cont = document.getElementById("contenedorAlertas");

    let div = document.createElement("div");
    div.className = "alertaToast "+tipo;
    div.textContent = msg;

    cont.appendChild(div);

    setTimeout(()=>div.remove(),3000);

document.querySelectorAll(".activarBtn").forEach(btn => {
    btn.addEventListener("click", () => {

        let fila = btn.closest("tr");

        if (fila.classList.contains("superAdmin")) {
            alert("No puedes modificar al super admin");
            mostrarAlerta("Acción bloqueada", "error");
            return;
        }

    });
});


document.querySelectorAll(".rolBtn").forEach(btn=>{
    btn.addEventListener("click", ()=>{

        let fila = btn.closest("tr");

        if(fila.classList.contains("superAdmin")){

            alert("No puedes modificar al super admin");
            mostrarAlerta("Intento bloqueado", "error");

            return;
        }

        let rol = fila.querySelector(".rol");
        let nombre = fila.children[0].textContent;

        if(rol.textContent === "Ciudadano"){
            rol.textContent = "Admin";
            btn.textContent = "Quitar Admin";
            btn.classList.replace("verde","rojo");
            agregarLog(nombre+" ahora es Admin");
        }else{
            rol.textContent = "Ciudadano";
            btn.textContent = "Hacer Admin";
            btn.classList.replace("rojo","verde");
            agregarLog(nombre+" ya no es Admin");
        }

        actualizarContadores();
    });
});

actualizarContadores();

const perfil = document.querySelector(".perfil");
const menu = document.querySelector(".avatar-menu");

perfil.addEventListener("click", () => {
    menu.classList.toggle("activo");
});

document.addEventListener("click", (e) => {
    if (!perfil.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove("activo");
    }
});

/* CONSTANTES */
const COLOR_HEX = {
    rojo: '#C62828', azul: '#1565C0', verde: '#2E7D32',
    negro: '#111111', blanco: '#FFFFFF', amarillo: '#F9A825',
    gris: '#888888', plateado: '#B0BEC5', naranja: '#E65100', cafe: '#795548'
};
const TYPE_LABEL = { automovil: 'Automóvil', motocicleta: 'Motocicleta', camion: 'Camión' };
const PAGE_SIZE = 4;

let allVehicles = [];
let renderedCount = 0;
let scrollObserver = null;

/* ÍCONOS POR TIPO */
function typeIcon(type) {
    if (type === 'motocicleta') 
        return `<img class="icon-type" src="../../assets/icons/motocicleta.png" alt="icono de motocicleta">`;

    if (type === 'camion') 
        return `<img class="icon-type" src="../../assets/icons/camion.png" alt="icono de camión">`;

    return `<img class="icon-type" src="../../assets/icons/automovil.png" alt="icono de automóvil">`;
}

/* Asigna un id único a cualquier vehículo que no lo tenga */
function sanitizeIds(vehicles) {
    let maxId = 0;
    // Encontrar el id numérico más alto ya existente
    vehicles.forEach(v => {
        const n = parseInt(v.id, 10);
        if (!isNaN(n) && n > maxId) maxId = n;
    });
    // Asignar ids a los que no tengan (o tengan undefined/null/vacío)
    vehicles.forEach(v => {
        if (v.id === undefined || v.id === null || v.id === '') {
            maxId++;
            v.id = maxId;
        }
    });
    return vehicles;
}

/* Garantizar que solo 1 vehículo sea default*/
function sanitizeDefault(vehicles) {
    const defaultOnes = vehicles.filter(v => v.isDefault === true);
    if (defaultOnes.length === 1) return vehicles; // ya está bien

    // Más de uno marcado como default → quitar todos y marcar solo el primero
    // (o ninguno → marcar el primero si hay vehículos)
    vehicles.forEach(v => { v.isDefault = false; });
    if (vehicles.length > 0) vehicles[0].isDefault = true;
    return vehicles;
}

/* CARGAR VEHÍCULOS */
async function loadVehicles() {
    showLoading(true);
    try {
        await new Promise(r => setTimeout(r, 500));

        const stored = localStorage.getItem('parkea_vehicles');
        allVehicles = stored ? JSON.parse(stored) : getMock();

        // FIX: sanear ids y defaults ANTES de cualquier operación
        allVehicles = sanitizeIds(allVehicles);
        allVehicles = sanitizeDefault(allVehicles);

        // Si vino de getMock, persistir ya saneado
        if (!stored) {
            save();
        } else {
            // Persistir también si los datos tenían ids corruptos
            save();
        }

        // Ordenar por fecha descendente
        allVehicles.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        showLoading(false);

        if (allVehicles.length === 0) {
            showEmpty(true);
            return;
        }

        updateSubtitle();
        renderBatch();
        document.getElementById('pageFooter').style.display = 'flex';
        document.getElementById('mobileBackBar').style.display = 'block';
        setupInfiniteScroll();

    } catch (err) {
        showLoading(false);
        showToast('Error al cargar vehículos.');
    }
}
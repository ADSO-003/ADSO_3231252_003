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

function showLoading(on) {
    document.getElementById('loadingState').style.display = on ? 'flex' : 'none';
}
function showEmpty(on) {
    document.getElementById('emptyState').style.display = on ? 'flex' : 'none';
}

/* CONSTRUIR TARJETA DE VEHÍCULO */
function buildCard(v) {
    const li = document.createElement('li');
    // Usar siempre String(v.id) como identificador único del DOM
    const vid = String(v.id);
    li.dataset.id = vid;
    li.className = 'vehicle-card' + (v.isDefault ? ' is-default' : '');

    const hex = COLOR_HEX[v.color] || '#AAAAAA';
    const borderStyle = v.color === 'blanco' ? 'border-color:#999;' : '';

    li.innerHTML = `
    <div class="vc-left">
        <div class="vc-plate">${v.plate || '—'}</div>
        <div class="vc-color-row">
        <span class="vc-color-label">Color</span>
        <div class="color-dot" style="background:${hex};${borderStyle}"></div>
        </div>
    </div>

    <div class="vc-divider" aria-hidden="true"></div>

    <div class="vc-info">
        <div class="vc-name">${v.brand || ''} ${v.model || ''}</div>
        <div class="vc-meta">
        <span>${TYPE_LABEL[v.type] || v.type || '—'}</span>
        ${typeIcon(v.type)}
        ${v.isDefault
            ? `<span aria-hidden="true"> · </span><span class="vc-default-badge">Por defecto</span>`
            : ''}
        </div>
    </div>

    <button class="btn-star"
            data-id="${vid}"
            aria-label="${v.isDefault ? 'Vehículo por defecto' : 'Marcar como vehículo por defecto'}"
            aria-pressed="${v.isDefault}">
        ${v.isDefault
            ? '<span aria-hidden="true">⭐</span>'
            : '<span class="star-empty" aria-hidden="true">☆</span>'}
    </button>

    <div class="vc-action-divider" aria-hidden="true"></div>

    <div class="vc-actions">
        <button class="btn-action btn-delete"
                data-id="${vid}"
                aria-label="Eliminar vehículo ${v.plate}">
        Eliminar
        </button>
        <button class="btn-action btn-edit"
                data-id="${vid}"
                aria-label="Editar vehículo ${v.plate}">
        Editar
        </button>
    </div>
    `;

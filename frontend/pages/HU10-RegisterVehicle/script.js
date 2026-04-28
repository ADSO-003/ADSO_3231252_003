/* ESTADO DEL FORMULARIO */
let selectedType = 'automovil';
let selectedColor = '';

/* PLACAS EXISTENTES — para CA-04 y CA-05 */
// CA-04: misma cuenta
const SAME_ACCOUNT_PLATES = ['XYZ 45H', 'DEF 789', 'WXY 734'];
// CA-05: otras cuentas
const OTHER_ACCOUNT_PLATES = ['ABC 124', 'JKL 999', 'PQR 100'];

/*  Validación de formato de placa colombiana en tiempo real */
// Auto: ABC 123 · Moto: ABC 12A
const PLATE_FORMAT = /^[A-Z]{3}\s?(\d{3}|\d{2}[A-Z])$/;

/* Elementos placa  */
const ePlate = document.getElementById('plate');
const ePlateOk = document.getElementById('plate-ok');
const ePlateErr = document.getElementById('plate-err-icon');
const ePlateMsg = document.getElementById('plate-msg');



ePlate.addEventListener('input', () => {
    // Forzar mayúsculas y solo caracteres válidos
    ePlate.value = ePlate.value
        .toUpperCase()
        .replace(/[^A-Z0-9\s]/g, '');

    const val = ePlate.value.trim();
    clearPlateState();
    if (!val) return;

    /* Duplicado en misma cuenta */
    if (SAME_ACCOUNT_PLATES.includes(val)) {
        return setPlateError('Esta placa ya está registrada en tu cuenta.');
    }


    /* Duplicado en otra cuenta */
    if (OTHER_ACCOUNT_PLATES.includes(val)) {
        return setPlateError(
            'Esta placa ya está asociada a otra cuenta. ' +
            'Verifica el número e inténtalo de nuevo.'
        );
    }

    // Mostrar error de formato solo cuando hay suficientes chars
    if (val.length >= 6 && !PLATE_FORMAT.test(val)) {
        return setPlateError(
            'Formato inválido. Auto: 3 letras + 3 dígitos. ' +
            'Moto: 3 letras + 2 dígitos + 1 letra.'
        );
    }

    if (PLATE_FORMAT.test(val)) {
        ePlate.classList.add('ok');
        ePlateOk.classList.add('show');
    }
});

function clearPlateState() {
    ePlate.classList.remove('ok', 'error');
    ePlateOk.classList.remove('show');
    ePlateErr.classList.remove('show');
    ePlateMsg.style.display = 'none';
    ePlateMsg.textContent = '';
}

function setPlateError(msg) {
    ePlate.classList.add('error');
    ePlateErr.classList.add('show');
    ePlateMsg.textContent = msg;
    ePlateMsg.style.display = 'block';
}

/* Selector de tipo de vehículo como grid de tarjetas */
document.querySelectorAll('.type-card').forEach(card => {
    card.addEventListener('click', () => selectType(card));
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectType(card);
        }
    });
});

function selectType(card) {
    document.querySelectorAll('.type-card').forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-checked', 'false');
    });
    card.classList.add('active');
    card.setAttribute('aria-checked', 'true');
    selectedType = card.dataset.type;
    document.getElementById('type-msg').style.display = 'none';
}

/* SELECTOR DE COLOR */
const eTrigger = document.getElementById('colorTrigger');
const eDropdown = document.getElementById('colorDropdown');
const eDot = document.getElementById('colorDot');
const ePh = document.getElementById('colorPh');
const eColorMsg = document.getElementById('color-msg');

eTrigger.addEventListener('click', toggleDropdown);
eTrigger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(); }
    if (e.key === 'Escape') closeDropdown();
});

function toggleDropdown() {
    const isOpen = eDropdown.classList.toggle('open');
    eTrigger.setAttribute('aria-expanded', isOpen);
}
function closeDropdown() {
    eDropdown.classList.remove('open');
    eTrigger.setAttribute('aria-expanded', 'false');
}

document.querySelectorAll('.color-option').forEach(opt => {
    opt.addEventListener('click', () => pickColor(opt));
    opt.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickColor(opt); }
    });
});

function pickColor(opt) {
    selectedColor = opt.dataset.val;
    eDot.style.background = opt.dataset.hex;
    eDot.style.borderColor = opt.dataset.hex === '#FFFFFF' ? '#999' : opt.dataset.hex;
    eDot.style.display = 'block';
    ePh.textContent = opt.textContent.trim();
    ePh.classList.remove('color-placeholder');
    eTrigger.classList.add('ok');
    eTrigger.classList.remove('error');
    eColorMsg.style.display = 'none';
    closeDropdown();
}

// Cerrar dropdown al hacer clic fuera
document.addEventListener('click', e => {
    if (!e.target.closest('.color-wrap')) closeDropdown();
});

/* ── Validación en tiempo real para marca y modelo ─ */
['brand', 'model'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => {
        const msgEl = document.getElementById(id + '-msg');
        if (el.value.trim()) {
            el.classList.add('ok'); el.classList.remove('error');
            msgEl.style.display = 'none';
        }
    });
});



/* Validación de campos vacíos al enviar — bordes rojos + mensajes */
document.getElementById('vehicleForm').addEventListener('submit', e => {
    e.preventDefault();
    let allOk = true;

    /* Placa */
    const plateVal = ePlate.value.trim();
    if (!plateVal) {
        setPlateError('Este campo es obligatorio.');
        allOk = false;
    } else if (!PLATE_FORMAT.test(plateVal)) {
        setPlateError(
            'Formato inválido. Auto: 3 letras + 3 dígitos. ' +
            'Moto: 3 letras + 2 dígitos + 1 letra.'
        );
        allOk = false;
    } else if (SAME_ACCOUNT_PLATES.includes(plateVal)) {
        setPlateError('Esta placa ya está registrada en tu cuenta.');
        allOk = false;
    } else if (OTHER_ACCOUNT_PLATES.includes(plateVal)) {
        setPlateError('Esta placa ya está asociada a otra cuenta.');
        allOk = false;
    }

    /* Tipo */
    if (!selectedType) {
        document.getElementById('type-msg').style.display = 'block';
        allOk = false;
    }

    /* Marca */
    const eBrand = document.getElementById('brand');
    const eBrandMsg = document.getElementById('brand-msg');
    if (!eBrand.value.trim()) {
        eBrand.classList.add('error'); eBrand.classList.remove('ok');
        eBrandMsg.style.display = 'block';
        allOk = false;
    } else {
        eBrand.classList.add('ok'); eBrand.classList.remove('error');
        eBrandMsg.style.display = 'none';
    }

    /* Modelo */
    const eModel = document.getElementById('model');
    const eModelMsg = document.getElementById('model-msg');
    if (!eModel.value.trim()) {
        eModel.classList.add('error'); eModel.classList.remove('ok');
        eModelMsg.style.display = 'block';
        allOk = false;
    } else {
        eModel.classList.add('ok'); eModel.classList.remove('error');
        eModelMsg.style.display = 'none';
    }

    /* Color */
    if (!selectedColor) {
        eTrigger.classList.add('error'); eTrigger.classList.remove('ok');
        eColorMsg.style.display = 'block';
        allOk = false;
    }

    if (!allOk) return;




    /* Vincular vehículo al ID del usuario autenticado */
    // const vehicle = {
    //     userId: localStorage.getItem('parkea_user_id') || 'demo-user-001',
    //     plate: plateVal,
    //     type: selectedType,
    //     brand: document.getElementById('brand').value.trim(),
    //     model: document.getElementById('model').value.trim(),
    //     color: selectedColor,
    //     description: document.getElementById('description').value.trim(),
    //     createdAt: new Date().toISOString()
    // };

    // // Guardar en localStorage (simulación de base de datos)
    // const saved = JSON.parse(localStorage.getItem('parkea_vehicles') || '[]');
    // saved.unshift(vehicle);
    // localStorage.setItem('parkea_vehicles', JSON.stringify(saved));

    /* Toast de éxito + redirección a la lista de vehículos */
    document.getElementById('toast').classList.add('show');

    setTimeout(() => {
        window.location.href = '../HU11-ViewVehicles/index.html';
    }, 1600);
});
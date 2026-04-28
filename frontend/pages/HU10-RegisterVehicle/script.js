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
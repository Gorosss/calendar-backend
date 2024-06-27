/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

router.use( validarJWT );


router.get('/', getEventos );

router.post(
    '/',
    [
        check('title','No title').not().isEmpty(),
        check('start','Start date').custom( isDate ),
        check('end','End date').custom( isDate ),
        validarCampos
    ],
    crearEvento 
);

router.put(
    '/:id', 
    [
        check('title','No title').not().isEmpty(),
        check('start','Start date').custom( isDate ),
        check('end','End date').custom( isDate ),
        validarCampos
    ],
    actualizarEvento 
);

router.delete('/:id', eliminarEvento );

module.exports = router;
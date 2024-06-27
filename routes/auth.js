/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();



router.post(
    '/new', 
    [ // middlewares
        check('name', 'No name').not().isEmpty(),
        check('email', 'No email').isEmail(),
        check('password', 'Pass must be 6 characters lenght').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario 
);

router.post(
    '/',
    [
        check('email', 'No email').isEmail(),
        check('password', 'Pass must be 6 characters length').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario 
);


router.get('/renew', validarJWT ,revalidarToken );




module.exports = router;
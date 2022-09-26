const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const types = require('./types')
const pokemons = require('./pokemons')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/types', types)
router.use('/pokemons', pokemons)

module.exports = router;
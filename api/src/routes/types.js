const { Router } = require('express');
const router = Router();
const { Type } = require('../db')

// busco en la db los tipos de pokemones 

router.get('/', async (req, res) => {
    return Type.findAll().then((data) => {
        res.send(data)
    });

});

module.exports = router;
const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const router = Router();
const { getPokes, idSearch } = require('../controllers/pokemon');

// muestra todos los pokemones o los busca por nombre

router.get('/', async (req, res) => {

    const { name } = req.query;
    const getPoke = await getPokes();

    try {
        if (name) {
            const resultFind = getPoke.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()));
            if (resultFind.length === 0) {
                return res.status(404).send({ message: 'pokemons were found' });
            }
            return res.send(resultFind);
        } else {

            return res.status(200).json(getPoke)
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

// busca los pokemones por id 

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const idDetails = await idSearch(id);
    try {
        if (!idDetails) {
            return res.status(404).send("no pokemon found with this id")
        }
        res.status(200).json(idDetails);
    } catch (error) {
        console.log(error)
    }
});

// recibe del front datos para poder crear un nuevo pokemon

router.post('/', async (req, res) => {
    const { name, hp, attack, defense, speed, height, weight, types, img } = req.body;
    try {
        let newPoke = await Pokemon.create({
            name: name.toLowerCase(),
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img,

        })
        let typesDb = await Type.findAll({
            where: { name: types }
        })
        newPoke.addType(typesDb)
        return res.status(201).json(newPoke)
    } catch (error) {
        res.status(404).send(error)
    }   
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
      const pokemon = await Pokemon.findByPk(id);
      if (pokemon !== null) {
        await pokemon.destroy();
        res.status(200).json("Pokemon deleted correctly");
      }
    } catch (error) {
      return res.status(404).json(error);
    }
  });

module.exports = router
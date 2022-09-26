const axios = require("axios");
const { Pokemon, Type } = require('../db');

// busco todos los pokemones en la api 
const getApi = async () => {
    try {
        let pokeSaver = [];
        const urlPoke = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=12') 
        let pokeData = urlPoke.data.results.map( p => axios.get(p.url))
        const urlPoke2 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=12&limit=28')
        let pokeData2 = urlPoke2.data.results.map( p => axios.get(p.url))

        let allPokes = pokeData.concat(pokeData2)
        
        let pokeResults = await axios.all(allPokes).then( poke => {
            poke.map( p => {
                pokeSaver.push({
                    id: p.data.id,
                    name: p.data.name,
                    types: p.data.types.map( pt => pt.type),
                    img: p.data.sprites.other.home.front_default,
                    attack: p.data.stats[1].base_stat,
                    db: false
                })
            })
            return pokeSaver;
        })
        return pokeResults
    } catch (error) {
        console.log(error)
    }
};

// busco todos los pokemones en la db

const getDb = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name']
        }
    })
}

// concateno la buqueda en la api y la db de todos los pokemones 

const getPokes = async () => {
    let api = await getApi();
    let db = await getDb();
    let pokes = await db.concat(api)
    return pokes;
};

//  busco los pokemones por id en la api

const idSearchApi = async (id) => {
    try {
        const pokeId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const details = await pokeId.data;
        return {
            id: details.id,
            name: details.name,
            hp: details.stats[0].base_stat,
            attack: details.stats[1].base_stat,
            defense: details.stats[2].base_stat,
            speed: details.stats[5].base_stat,
            height: details.height,
            weight: details.weight,
            types: details.types.map(pt => pt.type),
            img: details.sprites.other.home.front_default,
        };
    } catch (error) {
        console.log(error);
    };
};

// busco los pokemones por id en la db

const idSearchDB = async (id) => {
    try {
        const pokeIdDb = await Pokemon.findByPk(id, {
            include: {
                model: Type,
                attributes: ["name"],
            }
        });
        return pokeIdDb;
    } catch (error) {
        console.log(error);
    };
};

// concateno la busqueda en la api y la db de los pokemones por id

const idSearch = async (id) => {
    let api = idSearchApi(id);
    let db = idSearchDB(id);

    const [apiPoke, dbPoke] = await axios.all([api, db])
    return apiPoke || dbPoke;
};

// se exportan las variables para ser utilizadas en otras carpetas

module.exports = {
    getPokes,
    idSearch
};
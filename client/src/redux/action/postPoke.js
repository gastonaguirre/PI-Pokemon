import axios from 'axios';

export function postPoke(payload) {
    return async function (dispatch) {
        const pokemonCreated = await axios.post("/pokemons", payload)
        return pokemonCreated
    }
}
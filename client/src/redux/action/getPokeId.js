import axios from 'axios';

export default function getPokeId(id) {
    return async function (dispatch){
            var result = await axios.get(`/pokemons/${id}`); 
            return dispatch({ 
                 type: 'GET_POKE_ID', 
                 payload: result.data
            }) 

    }
}
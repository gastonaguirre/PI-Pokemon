

  import axios from 'axios';

export default function deletePoke(id) {
    return async function (dispatch){
            var result = await axios.delete(`/pokemons/${id}`); 
            return dispatch({ 
                 type: 'DELETE_RECIPE', 
                 payload: result.data
            }) 

    }
}
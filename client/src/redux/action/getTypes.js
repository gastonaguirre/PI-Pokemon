import axios from 'axios';

export function getTypes(){
    return async (dispatch) => {
        var types = await axios.get('/types')
        return dispatch({
            type: "GET_TYPES",
            payload: types.data
        })
    }
}
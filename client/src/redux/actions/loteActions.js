import {GET_ALL_LOTES} from '../constants/index'
import axios from 'axios'
export function getAllLotes (empresaId) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/lote/empresa/${empresaId}`)
            .then(data => data.json())
            .then(data => {
                dispatch({
                    type: GET_ALL_LOTES,
                    payload: data
                })
            })
    }
}

export function crearLoteDB (data) {

        return axios.post(`http://localhost:3001/lote/create`, data)
        .then(response => response)
        .catch(e => console.log(e))

}
export function borrarLote (id) {

    return axios.delete(`http://localhost:3001/lote/delete/${id}`)
    .then(response => response)
    .catch(e => console.log(e))

}
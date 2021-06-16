import axios from "axios";
import {firestone} from '../../'
import {
  REGISTER_USER_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_LOGOUT_ERROR,
  GET_USER,
  LOADING_USER,
  BEARER
} from "../constants";

const { REACT_APP_API } = process.env;



export const register = (body) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      "http://localhost:3001/auth/register",
      body,
      config
    );
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
    alert("Registro exitoso");
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
	localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_USER_ERROR,
      payload: error,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      "http://localhost:3001/auth/login",
      { email, password },
      config,
	  
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_ERROR,
      payload: error,
    });
  }
};

export const logout = () => {
  localStorage.removeItem("userInfo");
  document.location.href = "/index";
  return {
    type: USER_LOGOUT,
  };
//   try {
//   const { data } = await axios.get('http://localhost:3001/auth/logout')
//   dispatch({
//     type: USER_LOGOUT,
//     payload: data
//   })
//   document.location.href = "/index";
// } catch(error) {
//   dispatch({
//     type: USER_LOGOUT_ERROR,
//     payload: error

//   })
// }
};
// export function getUserById(id){
// 	return function(dispatch){
// 		return fetch(`http://localhost:3001/user/${id}`)
//         .then(response => response.json())
// 		.then(json => {
// 			dispatch({ 
//                 type: GET_USER_ID, 
//                 payload: data
//             })
// 		})
// 	}
// }

export const getUser = () => {
  return function(dispatch) {
    dispatch({type: LOADING_USER})
    return axios.get(`http://localhost:3001/auth/myProfile` , BEARER())
    .then(async userInfo => {
      if (userInfo.data.jwt) localStorage.setItem('jwt', JSON.stringify(userInfo.data.jwt));
      delete userInfo.data.jwt
        dispatch({ 
          type: GET_USER,
          payload:userInfo.data
        })
        // const cart = firestone.collection("cart");
        // try {
				// 	const query = await cart.where(firebase.firestore.FieldPath.documentId(),
				// 		'==',
				// 		user.data.id.toString()).get();
				// 	const firebaseCart = query.docs[0]?.data();
				// 	const localStorageCart = JSON.parse(localStorage.getItem('cart'))
				// 	if (Object.keys(localStorageCart).length === 0) {
				// 		if (firebaseCart) {
				// 			localStorage.setItem('cart', JSON.stringify(firebaseCart));
				// 		}
				// 	} else {
				// 		cart.doc(user.data.id.toString()).set(localStorageCart)
				// 	}
				// 	dispatch(setCart());
				// } catch (err) { console.log(err) }
			
      })
  }
}
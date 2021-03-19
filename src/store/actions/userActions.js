import axios from "axios";

//refactor import to * as types
import { USER_LOADING, 
  LOGIN_USER_ERROR, 
  LOGIN_USER_SUCCESS , 
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  } from "../types/userTypes";

const baseUrl = "http://localhost:8080/";

const header = {
  headers:{
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'ACCEPT': 'application/json',
}}


/**********Register actions */

export const registerUserAction = (user) => {
  return async (dispatch) => {
    const url = `${baseUrl}register`    
    const jsonUser = JSON.stringify(user)

    dispatch(registerUserLoading())
    
    try {
      const response = await axios.post(url, jsonUser, header);
      console.log(response);
      dispatch(registerUserSuccess(response.data));
    } catch (error) {
      let message = error.response !== undefined ?  error.response.data.message : "some error occured, please try again later";
      dispatch(registerUserError(message));
    }
  }
}

export const registerUserLoading = () => {
  return {
    type: USER_LOADING
  }
}
export const registerUserSuccess = (user) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user.userName
  }
}

export const registerUserError =(errorMsg)=>{
  return{
    type: REGISTER_USER_ERROR,
    payload: errorMsg
  }
}


/**********login actions *******************/

export const loginUserAction = user => {
  return async (dispatch) => {
    // dispatch(loginUserSuccess("some user", "some token "))

    dispatch(loginUserLoading())

    const url = `${baseUrl}login`
    const jsonUser = JSON.stringify(user)

    try{
      const response = await axios.post(url, jsonUser,header)
      const jwtToken = response.data.jwtToken
      localStorage.setItem("token", JSON.stringify(jwtToken))
      dispatch(loginUserSuccess(user.userName, jwtToken))

    }catch(error){
      console.log(error)
     let message = error.response.data !== undefined ? error.response.data.message : 'some error occured, please try again!';
      dispatch(loginUserError(message));
    }

  }
}


export const loginUserLoading = () => {
  return{
    type: USER_LOADING
  }
}

export const loginUserSuccess = (username, jwtToken ) => {
  return{
    type: LOGIN_USER_SUCCESS,
    payload: {userName: username, jwtToken: jwtToken}
  }
}

export const loginUserError = (msg) => {
  return{
    type: LOGIN_USER_ERROR,
    payload: msg
  }
}


export const logoutAction = () => {
  localStorage.removeItem('token')
  return {
    type: LOGOUT_USER
  }
}




/**********Geolocation actions */

// const googleGeo = (latitude, longitude) => {
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
//   console.log(`$url for google: ${url}`)
//   return axios.get(url).then(response =>{
//     console.log(response)
//   }).catch(error => {
//     console.log(error)
//   })
// }

// const success= (pos) => {
//   console.log(`longitude ${pos.coords.longitude}`)
//   console.log(`latitude ${pos.coords.latitude}`)
//   googleGeo(pos.coords.latitude, pos.coords.longitude)
// }
// const error = () => {
//   return (dispatch) => {
//     dispatch(setGeolocation(['us']))
//   }

// }
// const retrieveGeolocation = () => {

// navigator.geolocation.getCurrentPosition(success, error)
  
// }


// export const getGeolocation = () => {
//   const location = retrieveGeolocation() 
//   console.log(location)
//   return dispatch => {
//     dispatch(setGeolocation(location))
//   }
// }

// export const setGeolocation = location => {
//   return {
//     type: SET_GEOLOCATION,
//     payload: location

//   }
// }


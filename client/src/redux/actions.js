import axios from 'axios';
import { FILTER_BY_WEIGHT, GET_DOGS, GET_DOG_BY_NAME,GET_DOG_BY_ID, GET_TEMPERAMENTS, RESET_DOG, SET_PAGE_NUMBER, SET_ACTIVE_LI, FILTER_DOG_BY_TEMPERAMENT, FILTER_CREATED_DOG, FILTER_ALPHABETICALLY, ADD_DOG} from "./actions-types";
const dogEndpoint = 'http://localhost:3001/dogs';
const temperamentEndpoint = 'http://localhost:3001/temperaments';


export const getDogs = () => {
    return async (dispatch) =>{
        try {
            const { data } = await axios.get(dogEndpoint);
        
            dispatch({
                type: GET_DOGS,
                payload: data
            })
        } catch (error) {
            console.log(error.message)
        }
    }; 
};


export const getDogByID = (id) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`${dogEndpoint}/search/${id}`);
  
        dispatch({
          type: GET_DOG_BY_ID,
          payload: data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };


export const resetDog = () => {
    return { type: RESET_DOG }
}



export const getDogsByName = (payload) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${dogEndpoint}/search?name=${payload}`)
      
      dispatch({
        type: GET_DOG_BY_NAME,
        payload: data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const setNumberPage = ( payload ) => {
  return { type: SET_PAGE_NUMBER, payload }
}


export const setActiveLi = (payload) => {
  return { type:SET_ACTIVE_LI, payload }
}



export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(temperamentEndpoint);

      dispatch({
        type: GET_TEMPERAMENTS,
        payload: data
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}


export const filterDogsByTemperaments = (payload) => {
  return { type: FILTER_DOG_BY_TEMPERAMENT, payload }
}


export const filterCreatedDog = (payload) => {
  return { type:FILTER_CREATED_DOG, payload }
}


export const filterAlphabetically = (payload) => {

  return { type:FILTER_ALPHABETICALLY, payload }
}

export const filterByWeight = (payload) => {
    return { type: FILTER_BY_WEIGHT, payload}
}
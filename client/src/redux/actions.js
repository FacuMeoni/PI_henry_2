import axios from 'axios';
import { GET_DOGS, GET_DOG_BY_NAME,GET_DOG_BY_ID, GET_TEMPERAMENTS, RESET_DOG } from "./actions-types";
const dogEndpoint = 'http://localhost:3001/dogs';

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
    console.log('Resetting dog state');
    return { type: RESET_DOG }
}



export const getDogsByName = (name) => {
  return async (dispatch) => {
    try {
      
    } catch (error) {
      
    }
  }
}




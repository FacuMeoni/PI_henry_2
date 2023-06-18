import { GET_DOGS,  GET_DOG_BY_ID, RESET_DOG } from "./actions-types";

const initalState = {
    allDogs : [],
    dog: {}
}



const reducer = (state = initalState, { type, payload } ) => {
    switch(type){
        case GET_DOGS:
            return{
                ...state,
                allDogs: payload
            }

        case GET_DOG_BY_ID:
            return {
                ...state,
                dog: payload
            }
        case RESET_DOG:
            return{
                ...state,
                dog: {}
            }
        default:
            return { ...state }
    }
}


export default reducer;
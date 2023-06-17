import { GET_DOGS } from "./actions-types";

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
        default:
            return { ...state }
    }
}


export default reducer;
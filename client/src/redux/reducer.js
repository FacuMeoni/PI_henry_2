import { GET_DOGS,  GET_DOG_BY_ID, RESET_DOG, GET_DOG_BY_NAME, SET_PAGE_NUMBER, SET_ACTIVE_LI } from "./actions-types";

const initalState = {
    activeLi: parseInt(localStorage.getItem("activeLi")) || 1,
    pageNumber: parseInt(localStorage.getItem("")) || 1,
    allDogs: [],
    dog: {}
}



const reducer = (state = initalState, { type, payload } ) => {
    switch(type){
        case SET_ACTIVE_LI:
            return {
                ...state,
               activeLi: payload
            }
        case SET_PAGE_NUMBER:
            return{
                ...state,
                pageNumber: payload
            }
        case GET_DOGS:
            return{
                ...state,
                allDogs: payload
            }
        case GET_DOG_BY_NAME :
            return {
                ...state,
                allDogs: [payload]
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
import { GET_DOGS,  GET_DOG_BY_ID, RESET_DOG, GET_DOG_BY_NAME, SET_PAGE_NUMBER, SET_ACTIVE_LI, GET_TEMPERAMENTS, FILTER_DOG_BY_TEMPERAMENT, FILTER_CREATED_DOG,  FILTER_ALPHABETICALLY } from "./actions-types";

const initalState = {
    activeLi: parseInt(localStorage.getItem("activeLi")) || 1,
    pageNumber: 1,
    allDogs: [], //render
    dogs:[], // filtered
    dog: {},
    allTemperaments: []
}



const reducer = (state = initalState, { type, payload } ) => {
    switch(type){
        case FILTER_ALPHABETICALLY:
            let sortedArr = [...state.allDogs];
            if (payload === 'a') {
              sortedArr.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              });
            } else if (payload === 'z') {
              sortedArr.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
              });
            }
            return {
                ...state,
                allDogs: sortedArr
            }
        case FILTER_CREATED_DOG:
            const filterDogs = payload === 'created' ? state.dogs.filter(dog => dog.createAtDB) : state.dogs.filter(dog => !dog.createAtDb)
            return{
                    ...state,
                    allDogs: payload === 'all' ? state.dogs : filterDogs
            }
    
        case FILTER_DOG_BY_TEMPERAMENT:
            const temperamenstFiltered = payload === 'all' ? state.dogs : state.dogs.filter((dog) => dog.Temperaments && dog.Temperaments.some((temp) => temp && temp.name === payload));
            return{
                ...state,
                allDogs: temperamenstFiltered,
            }
        case GET_TEMPERAMENTS :
            return{
                ...state,
                allTemperaments: payload
            }
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
                allDogs: payload,
                dogs : payload
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
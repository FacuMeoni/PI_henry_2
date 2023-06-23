import { GET_DOGS,  GET_DOG_BY_ID, RESET_DOG, GET_DOG_BY_NAME, SET_PAGE_NUMBER, SET_ACTIVE_LI, GET_TEMPERAMENTS, FILTER_DOG_BY_TEMPERAMENT, FILTER_CREATED_DOG,  FILTER_ALPHABETICALLY, FILTER_BY_WEIGHT } from "./actions-types";

const initalState = {
    activeLi: 1,
    pageNumber: 1,
    allDogs: [], //render
    dogs:[], // filtered
    dog: {},
    allTemperaments: []
}



const reducer = (state = initalState, { type, payload } ) => {
    switch(type){
        case FILTER_BY_WEIGHT:
            let sortedArr2 = [...state.dogs];
                sortedArr2.sort((a, b) => {
                    const aWeightMin = parseInt(a.weight?.metric?.split('-')[0]); // first value of min Weigth
                    const aWeightMax = parseInt(a.weight?.metric?.split('-')[1]) // second value of min Weight
                    const bWeightMin = parseInt(b.weight?.metric?.split('-')[0]); // first value of max Weight
                    const bWeightMax = parseInt(b.weight?.metric?.split('-')[1]); // first value of max weight
                    
                    if (payload === 'min') {
                        if (aWeightMin !== bWeightMin) return aWeightMin - bWeightMin;
                        return aWeightMax - bWeightMax;
                    } else if (payload === 'max') {
                        if (aWeightMax !== bWeightMax) return bWeightMax - aWeightMax;
                        return aWeightMin - bWeightMin;
                    }
                    return 0;
                });
            return {
                ...state,
                dogs: sortedArr2
            }
        case FILTER_ALPHABETICALLY:
            let sortedArr = [...state.dogs];
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
                dogs: sortedArr
            }
        case FILTER_CREATED_DOG:
            const filterDogs = payload === 'created' ? state.allDogs.filter(dog => dog.createAtDB) : state.allDogs.filter(dog => !dog.createAtDb)
            return{
                    ...state,
                    dogs: payload === 'all' ? state.allDogs : filterDogs
            }   
    
        case FILTER_DOG_BY_TEMPERAMENT:
            const temperamenstFiltered = payload === 'all' ? state.allDogs : state.allDogs.filter((dog) => dog.Temperaments && dog.Temperaments.some((temp) => temp && temp.name === payload));
            return{
                ...state,
                dogs: temperamenstFiltered,
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
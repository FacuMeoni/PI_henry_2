const initalState = {
    allDogs : []
}



const reducer = (state = initalState, { type, payload } ) => {
    switch(type){
        default:
            return { ...state }
    }
}


export default reducer;
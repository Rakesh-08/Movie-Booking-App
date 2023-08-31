
import { combineReducers } from "redux"

let initState = {
   
    allMovies:[]
}

let movieReducer = (state = initState, action) => {

    switch (action.type) {
        case "SET_MOVIESLIST":
            let result = { ...state, allMovies: action.payload }
            return result;
        default:
            return state;
    
    }
}

let rootReducer = combineReducers({
    moviesList:movieReducer
})

export { rootReducer };









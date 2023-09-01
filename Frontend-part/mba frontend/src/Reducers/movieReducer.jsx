
import { combineReducers } from "redux"

let initState = {
   
    allMovies: [],
    moviesByLanguage:[]
}

let movieReducer = (state = initState, action) => {

    switch (action.type) {
      case "SET_MOVIESLIST":
        let result = { ...state, allMovies: action.payload };
        return result;
      case "movies":
            let temp = { ...state, moviesByLanguage: action.payload };
        return temp;

      default:
        return state;
    }
}

let rootReducer = combineReducers({
    moviesList:movieReducer
})

export { rootReducer };









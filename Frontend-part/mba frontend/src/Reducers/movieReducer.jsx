
import { combineReducers } from "redux"

let initState = {
   
    allMovies: [],
  moviesByLanguage: [],
  bookingInfo:{}
}

let movieReducer = (state = initState, action) => {

    switch (action.type) {
      case "SET_MOVIESLIST":
        let result = { ...state, allMovies: action.payload };
        return result;
      case "movies":
        let temp = { ...state, moviesByLanguage: action.payload };
        
        return temp;
      case "booking":
         let booking = { ...state, bookingInfo: action.payload };
        
        return booking;
      default:
        return state;
    }
}

let rootReducer = combineReducers({
    moviesList:movieReducer
})

export { rootReducer };









import axios from "axios";
import apiUrl from "./apiUtils";


const getAllMovies =async () => {
    return await axios.get(apiUrl.Base_url+ apiUrl.fetchMovies)
}

let getMoviesInTheatreOwned = async (theatreId) => {
  return await axios.get(
    apiUrl.Base_url + apiUrl.fetchMoviesInTheatreOwned,
    apiUrl.apiHeader
  );
};



export {getAllMovies,getMoviesInTheatreOwned}
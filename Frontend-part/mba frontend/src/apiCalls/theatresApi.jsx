import axios from "axios";
import apiUrl from "./apiUtils";

let getAllTheatresCall = async () => {
  return await axios.get(
    apiUrl.Base_url + apiUrl.fetchTheatres,
    apiUrl.apiHeader
  );
};

let getTheatresOwned = async (ownerId) => {
  return await axios.get(
    apiUrl.Base_url + apiUrl.fetchTheatres+`?ownerId=${ownerId}`,
    apiUrl.apiHeader
  );
};

let getMoviesInTheatre = async (theatreId) => {
  
  return await axios.get(apiUrl.Base_url + apiUrl.fetchMoviesInTheatre +  `${theatreId}/movies`,apiUrl.apiHeader);
}

export { getAllTheatresCall,getMoviesInTheatre,getTheatresOwned };

import axios from "axios";
import apiUrl from "./apiUtils";

let getAllTheatresCall = async () => {
  return await axios.get(
    apiUrl.Base_url + apiUrl.fetchTheatres,
    apiUrl.apiHeader
  );
};

let getTheatresOwned = async (ownerId) => {
  let temp = await apiUrl.apiHeader;

  return await axios.get(
    apiUrl.Base_url + apiUrl.fetchTheatres+`?ownerId=${ownerId}`,
    temp
  );
};

let fetchSeatsInTheatre = async () => {
  return await axios.get()
}



export { getAllTheatresCall,getTheatresOwned };

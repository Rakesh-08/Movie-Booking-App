import axios from "axios";
import apiUrl from "./apiUtils";

let getAllTheatresCall = async () => {
  let temp = await apiUrl.apiHeader;

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




export { getAllTheatresCall,getTheatresOwned };

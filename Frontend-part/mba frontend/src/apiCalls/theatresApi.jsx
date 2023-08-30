import axios from "axios";
import apiUrl from "./apiUtils";

let getAllTheatresCall = async () => {
  return await axios.get(
    apiUrl.Base_url + apiUrl.fetchTheatres,
    apiUrl.apiHeader
  );
};

export { getAllTheatresCall };

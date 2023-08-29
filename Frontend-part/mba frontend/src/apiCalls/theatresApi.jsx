import axios from "axios";
import apiUrl from "./apiUtils";

let getAllTheatresCall = async () => {
  return await axios.get(
    "http://localhost:9898" + apiUrl.fetchTheatres,
    apiUrl.apiHeader
  );
};

export { getAllTheatresCall };

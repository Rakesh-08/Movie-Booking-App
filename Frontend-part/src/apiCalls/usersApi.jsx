import axios from "axios";
import apiUrl from "./apiUtils";

let getAllUsersCall = async () => {
  return await axios.get(
    apiUrl.Base_url + apiUrl.fetchUsers,
    apiUrl.apiHeader
  );
};

export { getAllUsersCall };

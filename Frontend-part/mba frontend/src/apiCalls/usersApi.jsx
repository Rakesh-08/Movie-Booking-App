import axios from "axios";
import apiUrl from "./apiUtils";

let getAllUsersCall = async () => {
  return await axios.get(
    "http://localhost:9898" + apiUrl.fetchUsers,
    apiUrl.apiHeader
  );
};

export { getAllUsersCall };

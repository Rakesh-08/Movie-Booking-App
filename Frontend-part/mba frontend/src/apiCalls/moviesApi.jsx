import axios from "axios";
import apiUrl from "./apiUtils";


const getAllMovies =async () => {
    return await axios.get(apiUrl.Base_url+ apiUrl.fetchMovies)
}




export {getAllMovies}
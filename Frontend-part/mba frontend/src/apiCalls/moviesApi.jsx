import axios from "axios";
import apiUrl from "./apiUtils";


const getAllMovies =async () => {
    return await axios.get("http://localhost:9898"+ apiUrl.fetchMovies)
}




export {getAllMovies}
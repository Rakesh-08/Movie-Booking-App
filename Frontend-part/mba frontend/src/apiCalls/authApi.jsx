import axios from "axios";
import apiUrl from "./apiUtils";



let signUpCall = async (obj) => {
    return await axios.post(apiUrl.Base_url+apiUrl.signupApi,obj)
}

let signInCall = async (obj) => {
  return await axios.post(
    apiUrl.Base_url + apiUrl.signinApi,
    obj
  );
};

// let api_key = "bdb2602947a8e431c32afa49a0c8330d";
// let img_url = "https://imgage.tmdb.org/t/p/w500";
// let genres_list_http="https://api.themoviedb.org/3/genre/movie/list?"
// let movie_genres_http = "https://api.themoviedb.org/3/discover/movie?"

// function fetchMoviesListByGenres(id, name) {
  
//   fetch(movie_genres_http + new URLSearchParams({ api_key: api_key , with_genres: id,
//     page: Math.floor(Math.random() * 3) + 1}))
//      .then(res => res.json())
//      .then(data =>console.log("data")  )
          
// }

// fetch(genres_list_http + new URLSearchParams({ api_key: api_key }))
//   .then(res => res.json())
//   .then(data => {
//     data.genres.forEach(item =>
//         fetchMoviesListByGenres(item.id,item.name))
//   })

export {signUpCall,signInCall}
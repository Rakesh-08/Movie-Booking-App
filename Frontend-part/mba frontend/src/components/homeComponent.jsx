import { getAllMovies } from "../apiCalls/moviesApi";
import MoviesCrousal from "./Crousal";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";

export default function HomeComponent() {

    let [moviesList, setMoviesList] = useState([]);
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAllMovies();
    }, [])
   
    
    let fetchAllMovies = () => {
     getAllMovies().then((response) => {
            setMoviesList(response.data)
            setLoading(false)
            }
        ).catch((err) => {console.log(err);});
    }
    
    if (loading) {
        return <h1 className="vh-100 d-flex align-items-center justify-content-center">Please wait. Fetching all the movies ...........</h1>
    }
    return (
      <div>
        <Navbar movies={moviesList.map((movie) => movie.name)} />
        <MoviesCrousal style={{ boxShadow: "inset -1em -1em  1em grey" }} />

        <div>
          {/* <div>
            <p>Recently viewed</p>
          </div>
          <div>
            <p>Bollywood</p>
          </div>
          <div>
            <p> South Cinema</p>
          </div>{" "}
          <div>
            <p>Hollywood</p>
          </div>
          <div>
            <p>For Kids</p>
          </div> */}

          <div className="m-5">
            <p className="fs-4 lead p-4">Recommended</p>
            <div className="mx-5" style={{ display: "flex", flexWrap: "wrap" }}>
              {moviesList.map((movie) => (
                <MovieCard key={movie._id} MovieInfo={{ ...movie }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}
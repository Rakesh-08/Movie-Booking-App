import { getAllMovies } from "../apiCalls/moviesApi";
import MoviesCrousal from "./Crousal";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Footer from "./footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate }from "react-router-dom"


export default function HomeComponent() {
  let [loading, setLoading] = useState(true)
  
  let NavigateTo = useNavigate();

  useEffect(() => { 
        
    if (localStorage.getItem("moveisList") === undefined) {
      fetchAllMovies();
      
    }
       setLoading(false)
     
  }, [])
  

  // let moviesList=useSelector(state=>state.moviesList.allMovies);
  let moviesList = JSON.parse(localStorage.getItem("moviesList"));
  let dispatch = useDispatch();

  

    
    let fetchAllMovies = () => {
      getAllMovies().then((response) => {

        localStorage.setItem("moviesList", JSON.stringify(response.data))
     
       dispatch({type:"SET_MOVIESLIST",
         payload: response.data
       })
            setLoading(false)
            }
        ).catch((err) => {console.log(err);});
    }
    
  let onMovieSelect = (e) => {
    let temp = moviesList?.find(movie => movie.name == e)
    localStorage.setItem("selectedMovie", JSON.stringify(temp));
    NavigateTo("/movies/Details")
   }
    
    return (
      <div>
        <Navbar movies={moviesList?.map((movie) => movie.name)} onMovieSelect={onMovieSelect} />
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

          <div className="m-5 ">
            <p className="fs-4 lead p-4">Recommended</p>

            {loading ? (
              <>
                <h1 className="vh-100 d-flex align-items-center justify-content-center">
                  Please wait. Fetching all the movies ...........
                </h1>
              </>
            ) : (
              <div
                className="mx-3 "
                style={{ display:"flex" , flexWrap:"wrap",justifyContent:"center"}}
              >
                {moviesList?.map((movie) => (
                  <MovieCard key={movie._id} MovieInfo={{ ...movie }} />
                ))}
              </div>
            )}
          </div>
        </div>
        <Footer/>
      </div>
    );
}
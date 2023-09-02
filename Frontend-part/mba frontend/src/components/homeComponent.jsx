import { getAllMovies } from "../apiCalls/moviesApi";
import MoviesCrousal from "./Crousal";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Footer from "./footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import trailers from "/public/constants";



export default function HomeComponent() {
  let [loading, setLoading] = useState(true)
 
  
  let NavigateTo = useNavigate();

  useEffect(() => {
       
    if (JSON.parse(localStorage.getItem("moviesList")) == null) {
      fetchAllMovies();
      console.log("fetching");
    } else {
      setLoading(false);
      console.log("cahed ");
    }
      
     
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
    
    if (temp == undefined) {
      return alert(
        `Sorry! ${e} Movie not found`)
      }
    localStorage.setItem("selectedMovie", JSON.stringify(temp));
    NavigateTo("/movies/Details")
   }
    
    return (
      <div>
        <Navbar
          movies={moviesList}
          onMovieSelect={onMovieSelect}
        />
        <MoviesCrousal />

        <div>
          <div className="m-5 p-3 ">
            {loading ? (
              <>
                <h1 className="vh-100 d-flex align-items-center justify-content-center">
                  Please wait. Fetching all the movies ...........
                </h1>
              </>
            ) : (
              <>
                <MovieListByLanguage
                  heading="Bollywood"
                  moviesList={moviesList.filter(
                    (movie) => movie.language === "Hindi"
                  )}
                  dispatch={dispatch}
                  NavigateTo={NavigateTo}
                />
                <MovieListByLanguage
                  heading="South cinema"
                  moviesList={moviesList.filter(
                    (movie) => movie.language === "Telgu"
                  )}
                  dispatch={dispatch}
                  NavigateTo={NavigateTo}
                />
                <MovieListByLanguage
                  heading="Hollywood"
                  moviesList={moviesList.filter(
                    (movie) => movie.language === "English"
                  )}
                  dispatch={dispatch}
                  NavigateTo={NavigateTo}
                />
                <MovieListByLanguage
                  heading="For Kids"
                  moviesList={moviesList.filter(
                    (movie) => movie.language === "cartoon"
                  )}
                  dispatch={dispatch}
                  NavigateTo={NavigateTo}
                />
                <MovieListByLanguage
                  heading="Recomended"
                  moviesList={moviesList}
                  dispatch={dispatch}
                  NavigateTo={NavigateTo}
                />
              </>
            )}
          </div>
        </div>

        <div className="m-4 ">
          <p className="mx-3">Upcoming Movie Trailers </p>
          
          <div className="d-flex align-items-center justify-content-center flex-wrap p-3  ">
          {trailers.map((url,i) => 
            <div key={i} className="p-1 moviecard">
              <iframe
                width="70%"
                height="180"
                src={url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share  "
                allowFullScreen={true}
              ></iframe>
            </div>
          )}</div>
        </div>

       
        <Footer />
      </div>
    );
}

let MovieListByLanguage = ({ heading, moviesList, dispatch, NavigateTo }) => {
  
  return (
    <div className="m-2 ">
      <h5 className="fs-4 lead ">{heading}</h5>
      <div className=" d-flex justify-content-end ">
         <button
        onClick={() => {
          dispatch({
            type: "movies",
            payload: moviesList,
          });
          NavigateTo("/Movies");
        }}
        className="  fs-6 btn border-0 text-white   authToggle"
      >
        see all
      </button>
      </div>
     
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {moviesList?.slice(0, 4).map((movie) => (
          <MovieCard key={movie._id} MovieInfo={{ ...movie }} />
        ))}
      </div>
    </div>
  );
}



import { getAllMovies } from "../apiCalls/moviesApi";
import MoviesCrousal from "../components/Crousal";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Footer from "../components/footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import trailers from "/public/constants";



export default function HomeComponent() {
  let [loading, setLoading] = useState(true);
 
  let NavigateTo = useNavigate();
  let dispatch = useDispatch();
  //  let moviesList=useSelector(state=>state.moviesList.allMovies);

  let moviesList = localStorage.getItem("moviesList") ? JSON.parse(localStorage.getItem("moviesList")) : [];

  useEffect(() => {
    
     
    if (localStorage.getItem("fetched")==1) {
      console.log("cached");
      setLoading(false);
      
    } else {
      console.log("fetching")
      fetchAllMovies();
      }  
  }, [])

    
    let fetchAllMovies = () => {
      getAllMovies().then((response) => {
   
        localStorage.setItem("fetched", 1)
        localStorage.setItem("moviesList", JSON.stringify(response.data));
     
      //  dispatch({type:"SET_MOVIESLIST",
      //    payload: response.data
      //  })
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
          <div className="m-2 p-1">
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
            <div key={i} className=" m-2 hovereffect ">
              <iframe
                width="100%"
                height="200"
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
    <div className="my-3 ">
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



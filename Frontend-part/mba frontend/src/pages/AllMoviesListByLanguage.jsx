
import MovieCard from "../components/MovieCard"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function AllMoviesListByLang() {

    let moviesList = useSelector((state) => state.moviesList.moviesByLanguage);
    let NavigateTo = useNavigate();
    
    return (
      <div className="m-2">
        <button onClick={()=>NavigateTo("/")} className="m-3 btn btn border-0 text-white">⬅ Back</button>

        <div
          style={{
            display: "flex",
                    flexWrap: "wrap",
            marginLeft: "5%",
            justifyContent: "center"
          }}
        >
          {moviesList?.map((movie) => (
            <MovieCard key={movie._id} MovieInfo={{ ...movie }} />
          ))}
        </div>
      </div>
    );
}
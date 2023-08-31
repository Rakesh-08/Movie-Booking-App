
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MovieCard({MovieInfo}) {
  let dispatch = useDispatch();
  let NavigateTo = useNavigate();
    return (
      <div
        onClick={() => {
           localStorage.setItem("selectedMovie",JSON.stringify(MovieInfo))
          NavigateTo("/Movies/Details")
        }}
        style={{ width: "18rem", height: "44vh" }}
        className="card moviecard m-3  bg-secondary "
      >
        <img
          src={MovieInfo.posterURL}
          className="card-img-top h-50"
          alt="poster"
        ></img>
        <div style={{ lineHeight: "0.6" }} className="p-2 ">
          <h6 className="card-title text-white  fs-6 my-3   ">
            {MovieInfo.name}
            <p>({MovieInfo.releaseDate.slice(0, 4)})</p>
          </h6>
          <p>
            {" "}
            {Array(Math.floor(MovieInfo.imdbRating.slice(0, 1) / 2))
              .fill()
              .map((i, index) => (
                <span key={index}>⭐</span>
              ))}
          </p>

          <p>
            
            <span className="bold  fst-italic mx-1">
              {MovieInfo.language}
            </span>
          </p>
          <p>
          
            <span className="bold fst-italic mx-1">
              {MovieInfo.movieLength}
            </span>
          </p>
          
        </div>
      </div>
    );
}







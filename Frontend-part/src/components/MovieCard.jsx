
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MovieCard({MovieInfo}) {
  let dispatch = useDispatch();
  let NavigateTo = useNavigate();


    return (
      <div
        onClick={() => {
          localStorage.setItem("selectedMovie", JSON.stringify(MovieInfo));
          NavigateTo("/Movie/Details");
        }}
        style={{
          width: "20vw",
          height: "33vh",
        }}
        className="card moviecard m-2  bg-secondary "
      >
        <img
          src={MovieInfo.posterURL}
          style={{ height: "75%" }}
          className="card-img-top "
          alt="poster"
        ></img>
        <div style={{ lineHeight: "0.4" }} className="mx-2 ">
          <h6 className="card-title cardFont text-white  fs-6   ">
            <p className="mb-0">({MovieInfo.releaseDate.slice(0, 4)})</p>
          </h6>
          <p >
            {" "}
            {Array(Math.floor(MovieInfo.imdbRating.slice(0, 1) / 2))
              .fill()
              .map((i, index) => (
                <span className=" text-warning fs-4 cardFont" key={index}>
                  ★
                </span>
              ))}
          </p>
        </div>
      </div>
    );
}







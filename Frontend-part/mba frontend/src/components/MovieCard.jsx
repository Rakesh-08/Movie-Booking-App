

export default function MovieCard({MovieInfo}) {
    
    return (
      <div
        style={{ width: "18rem", height: "52vh" }}
        className="card moviecard m-3 bg-secondary "
      >
        <img
          src={MovieInfo.posterURL}
          class="card-img-top h-50"
          alt="poster"
        ></img>
        <div style={{ lineHeight: "0.6" }} className="p-2 ">
          <h6 className="card-title text-warning lead fs-5 my-3   ">
            {MovieInfo.name}
          </h6>
          <p>
            language :{" "}
            <span className="text-light fst-italic mx-1">
              {MovieInfo.language}
            </span>
          </p>
          <p>
            duration :{" "}
            <span className="text-light fst-italic mx-1">
              {MovieInfo.movieLength}
            </span>
          </p>
          <p>
            genre :{" "}
            <span className="text-light fst-italic mx-1">
              {MovieInfo.genre.join(",")}
            </span>
          </p>
          <p>
            rating :{" "}
            {Array(Math.floor(MovieInfo.imdbRating.slice(0, 1) / 2))
              .fill()
              .map((i, index) => (
                <span key={index}>⭐</span>
              ))}
          </p>

                <div className=" d-flex justify-content-end ">
                    <p onClick={()=>{}} className="authToggle">See details ➔</p></div>
        </div>
      </div>
    );
}







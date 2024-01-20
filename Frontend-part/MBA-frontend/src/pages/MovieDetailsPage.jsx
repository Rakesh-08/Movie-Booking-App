import { useNavigate } from "react-router-dom"

export default function MovieDetails() {
  let Movie = JSON.parse(localStorage.getItem("selectedMovie"));

  let NavigateTo = useNavigate();
  
  let toBookingPage = () => {
    
    if (localStorage.getItem("mba_token")) {
           NavigateTo("/Movie/booking")
    } else {
      alert("You need to login first to book tickets");
      NavigateTo("/login")
      
    }
     
  }

   
    return (
      <div>
        <div className="m-2 p-2">
          <iframe
            width="100%"
            height="490"
            src={Movie.trailerURL.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share  "
            allowFullScreen={true}
          ></iframe>
        </div>
        <div className="m-2 p-2">

          <h4 className="text-warning m-3">{Movie.name}
            <p className="fst-italic fs-6 mx-4 m-2 text-white">-{Movie.summary}</p>
          </h4>
            
        </div>

        <div className="pt-5 castDetails  d-flex  justify-content-center m-4">
          <div className=" p-4   text-center ">
            <img
              
              style={{ width: "50%", height: "23vh" }}
              src={Movie.posterURL}
              alt="Movie"
            />
            <div>
                <button onClick={()=>alert(`${Movie.name} added to your watch list`)} className="btn  btn-outline-warning m-5">
              {" "}
              ❤️ Add To WatchList
            </button>
            </div>
          
          </div>
          <div
            style={{ backgroundColor: "rgb(63, 62, 62)",height:"17rem" }}
            className=" rounded lh-1 p-4 authBox"
          > 
              <div >
                <p>
                  cast:{" "}
                  <span className="movieDetails">{Movie.cast.join(",")}</span>
                </p>
                <p>
                  Directed by:{" "}
                  <span className="movieDetails">{Movie.director}</span>
                </p>
                <p>
                  Release date:{" "}
                  <span className="movieDetails">
                    {Movie.releaseDate.slice(0, 10)}
                  </span>
                </p>
                <p>
                  Genre:{" "}
                  <span className="movieDetails">{Movie.genre.join(",")}</span>
                </p>
                <p className="">
                  duration:{" "}
                  <span className="movieDetails"> {Movie.movieLength}</span>
                </p>
                <p>
                  language:{" "}
                  <span className="movieDetails">{Movie.language}</span>
                </p>
                <p>
                  rating:{" "}
                  <span className="movieDetails">{Movie.imdbRating}</span>
                </p>
              </div>
        
          </div>
        </div>

        <div className="d-flex text-center justify-content-center m-4 p-2">
          <div>
            
            {Movie.releaseStatus === "RELEASED" ?
              <>
                <p>Wanted to watch in Theatre ?</p>
                <input onClick={toBookingPage} type="button" className="btn btn-lg btn-outline-info w-100" value="Book Tickets" />
              </>
               : <><h4>... coming soon in theatres</h4></>}
          </div>
          
        </div>
      </div>
    );
}
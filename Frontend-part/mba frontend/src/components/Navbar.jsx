import SearchIcon from "@mui/icons-material/Search";
import SuggestionInputSearch from "suggestion-react-input-search"

export default function Navbar(props) {
  return (
    <div className="d-flex shadow bg-secondary justify-content-around">
      <div className="m-1">
        <img
          style={{
            height: "8vh",
            borderRadius: "50%",
          }}
          src="https://static.vecteezy.com/system/resources/previews/004/296/744/original/movie-camera-with-film-roll-vector.jpg"
          alt="logo"
        />
        <p className="fst-italic  fs-6 bold">Filmy Duniyah</p>
      </div>
      <div className="m-2 pt-2 w-50 d-flex position-relative ">
        <SuggestionInputSearch
          onSubmitFunction={props.onMovieSelect}
          recentSearches={props.movies}
          placeholder="Search for a movie....."
           />
        <button  style={{ position: "absolute", right: "2em", top: "0.6em" ,border:"0",background:"transparent" }}>
          {" "}
          <SearchIcon />
        </button>
      </div>
      <div>
        <p>{localStorage.getItem("Name")}</p>
        {localStorage.getItem("mba_token") ? (<>
          <span> Hi {localStorage.getItem("Name")}</span>
          <button className="btn btn-outline-danger">Logout</button>
        </>
        ) : (<>
            <button className="btn btn-primary">Login</button>
          </>
        )}
      </div>
    </div>
  );
}

import SearchIcon from "@mui/icons-material/Search";
import SuggestionInputSearch from "suggestion-react-input-search";
import {useNavigate} from "react-router-dom"

export default function Navbar(props) {
  let NavigateTo = useNavigate()
  let LogoutFn = () => {
    
    let confirm = window.confirm('Are you sure you want to log out?')
    
    if (confirm) {
      localStorage.clear();
      alert("Log out successfully")
    }
  }
  return (
    <div style={{height:"10vh"}} className="d-flex shadow bg-secondary justify-content-around mb-1">
      <div className="m-1">
        <img
          style={{
            height: "5vh",
            borderRadius: "50%",
          }}
          src="https://static.vecteezy.com/system/resources/previews/004/296/744/original/movie-camera-with-film-roll-vector.jpg"
          alt="logo"
        />
        <p className="fst-italic  fs-6 bold">Filmy Duniyah</p>
      </div>
      <div className="m-2 p-2 w-50 d-flex position-relative ">
        <SuggestionInputSearch
          inputClass="searchBar"
          onSubmitFunction={props.onMovieSelect}
          recentSearches={props.movies}
          placeholder="   Search for a movie....."
           />
        <button  style={{ position: "absolute", right: "5%", top: "0.6em" ,border:"0",background:"transparent" }}>
          {" "}
          <SearchIcon />
        </button>
      </div>
      <div>
        <p>{localStorage.getItem("Name")}</p>
        {localStorage.getItem("mba_token") ? (<>
          <span> Hi {localStorage.getItem("Name")}</span>
          <button onClick={LogoutFn} className="btn btn-outline-danger">Logout</button>
        </>
        ) : (<>
            <button onClick={()=>{NavigateTo("/Login")}} className="btn btn-info">Login</button>
          </>
        )}
      </div>
    </div>
  );
}

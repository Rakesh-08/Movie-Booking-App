import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Container, Offcanvas } from "react-bootstrap"; 

export default function Navbar(props) {
  let NavigateTo = useNavigate()
  let [search, setSearch] = useState()
  const [show, setShow] = useState(false);
  const closeSidebar = () => setShow(false);
  const showSidebar = () => setShow(true);  

  let LogoutFn = () => {
    
    let confirm = window.confirm('Are you sure you want to log out?')
    
    if (confirm) {
      localStorage.clear();
        NavigateTo("/login")
    }
  }
  return (
    <div
      style={{ height: "10vh" }}
      className="d-flex shadow bg-secondary justify-content-around mb-1"
    >
      <div className="m-1">
        <img
          style={{
            height: "5vh",
            borderRadius: "50%",
          }}
          src="https://static.vecteezy.com/system/resources/previews/004/296/744/original/movie-camera-with-film-roll-vector.jpg"
          alt="logo"
        />
        <p className="fst-italic logo  fs-6 bold">Filmy Duniyah</p>
      </div>
      <div className="m-2 p-2 w-50 d-flex  ">
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="searchBar"
            placeholder="Search the movie"
          />

          <div
            style={{ position: "absolute", zIndex: "888" }}
            className="bg-light text-dark "
          >
            {props.movies
              .filter((movie) => {
                if (!search) {
                  return false;
                }
                return movie.name.includes(search);
              })
              .map((movie) => (
                <p
                  onClick={() => props.onMovieSelect(movie.name)}
                  key={movie._id}
                >
                  {movie.name}
                </p>
              ))}
          </div>
        </div>
        {/* <button
          style={{
            position: "absolute",
            right: "5%",
            top: "0.6em",
            border: "0",
            background: "transparent",
          }}
        >
          {" "}
          <SearchIcon />
        </button> */}
      </div>
      <div className="navSidebar ">
        {localStorage.getItem("mba_token") ? (
          <div className="my-3 ">
            <span className="mx-3"> Hi {localStorage.getItem("Name")}</span>
            <button
              onClick={() => NavigateTo(`/${localStorage.getItem("userType")}`)}
              className="border-0 mx-2 bg-secondary text-info"
            >
              {localStorage.getItem("userType")}
            </button>

            <button onClick={LogoutFn} className="btn mx-2 btn-outline-danger">
              Logout
            </button>
          </div>
        ) : (
          <div className="my-3">
            <span className="mx-3"> Hi User</span>
            <button
              onClick={() => {
                NavigateTo("/Login");
              }}
              className="btn btn-outline-primary"
            >
              Login
            </button>
          </div>
        )}
      </div>
      <div className="sidebar">
        <Container className="p-2 m-1">
          <Button variant="secondary" onClick={showSidebar}>
            ☰
          </Button>
          <Offcanvas className="offcanvas " placement="end" show={show} onHide={closeSidebar}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Side Navbar</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {localStorage.getItem("mba_token") ? (
                <div className="my-3  ">
                  <div className="m-2"> Hi {localStorage.getItem("Name")}</div>
                  <div
                    onClick={() =>
                      NavigateTo(`/${localStorage.getItem("userType")}`)
                    }
                    className="m-2 hovereffect text-info"
                  >
                    {localStorage.getItem("userType")}
                  </div>

                  <button
                    onClick={LogoutFn}
                    className="btn my-2 btn-outline-danger"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="my-3">
                  <div className="m-2"> Hi User</div>
                  <button
                    onClick={() => {
                      NavigateTo("/Login");
                    }}
                    className="btn btn-outline-primary"
                  >
                    Login
                  </button>
                </div>
              )}
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </div>
    </div>
  );
}

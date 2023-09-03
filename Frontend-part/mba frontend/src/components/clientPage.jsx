import { useNavigate } from "react-router-dom";
import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getMoviesInTheatre, getTheatresOwned } from "../apiCalls/theatresApi";


export default function ClientPage() {
  let [theatres, setTheatres] = useState([]);
  let [movies, setMovies] = useState([])
  let NavigateTo = useNavigate();

  useEffect(() => {
    init()
  }, []);
  
  let init = async () => {
    await getTheatres();
    await getMovies();
  }

  let getTheatres = () => {
    let id = localStorage.getItem("_id")
    getTheatresOwned(id).then((response) => {
      console.log(response)
    }).catch(err => console.log(err));
  }

  let getMovies = () => {
    console.log(theatres)
    
    theatres.map(theatre => {
      getMoviesInTheatre(theatre._id).then((response) => {
        console.log(response)
      }).catch(err => console.log(err));
    })
  }


  let moviesColumn = [
    { title: "", field: "" },
    { title: "", field: "" },
    { title: "", field: "" },
    { title: "", field: "" },
    { title: "", field: "" },
    { title: "", field: "" },
    { title: "", field: "" },
  ];

 
  

    return (
      <div className="vh-100">
        <div className=" mx-4 p-2 ">
          <p
            onClick={() => NavigateTo("/")}
            className="text-uppercase display-6 p-2 text-primary fst-italic w-25 moviecard "
          >
            Filmy Duniyah
          </p>

          <div>
            <MaterialTable
              title="Movies running in your theatres"
              column={moviesColumn}
              data={movies}
            />
            
          </div>
         
           
          </div>
        </div>
      
    );
}
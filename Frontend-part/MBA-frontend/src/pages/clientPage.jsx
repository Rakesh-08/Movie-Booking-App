import { useNavigate } from "react-router-dom";
import MaterialTable from "@material-table/core";
import { useState,useEffect } from "react";
import { getTheatresOwned } from "../apiCalls/theatresApi";
import { getMoviesInTheatreOwned } from "../apiCalls/moviesApi";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

export default function ClientPage() {
  let [theatres, setTheatres] = useState([]);
  let [movies, setMovies] = useState([])
  let NavigateTo = useNavigate();

  useEffect(() => {
    init()
  }, []);
  
  let init = async () => {
    await getTheatres(); 
    getMovies();
  }

  let getTheatres = () => {

    let id = localStorage.getItem("_id")

    getTheatresOwned(id)
      .then((response) => {
        if (response.data.length > 1) {
           setTheatres(response.data)
        } else {
           setTheatres([response.data])
        }
     
      console.log(response.data)
      }).
      catch(err => console.log(err));
  }

  let getMovies = () => {
     
      getMoviesInTheatreOwned().then((response) => {
        console.log(response)
          setMovies(response.data)
      }).catch(err => console.log(err));
    }

  let moviesColumn = [
    {
    
      title: "Poster",
      field:"posterURL",
      render: (rowData) => (
        <img src={rowData.posterURL} style={{ width: 70, borderRadius: "5%" }} />
      ),
    },
    { title: "Name", field: "name" },
    { title: "Language", field: "language" },
    {
      title: "Released", field: "releaseDate", render: (rowDate) => {
        return rowDate.releaseDate.slice(0,10)
    } },
    { title: "Director", field: "director" },
    { title: "Rating", field: "imdbRating" },
    { title: "Duration", field: "movieLength" },
  ];


    return (
      <div className="vh-100">
        <div className=" mx-4 p-2 d-flex justify-content-between align-items-center ">
          <p
            onClick={() => NavigateTo("/")}
            className="text-uppercase display-6 p-2 text-primary fst-italic w-25 moviecard "
          >
            Filmy Duniyah
          </p>
          <p className="mx-2 text-secondary">Client: <span className="text-light text-uppercase">{localStorage.getItem("Name")}</span> </p>
        </div>
        <div>
          <div className="m-2 p-2">
            <h5 className="m-2 lead">Your Theatres</h5>
            <div className="d-flex flex-wrap justify-content-center">
            {theatres.map((theatre) => (
              <div className="bg-danger m-3 rounded p-3 " key={theatre._id}>
                <div>
                  <h6 className="text-warning">
                    {theatre.name}
                    <p className="text-light">
                      {theatre.city} {theatre.pincode}
                    </p>
                  </h6>
                  <h6 className="lead fst-italic fs-6">
                    {theatre.description}
                  </h6>
                  <p>Running since : {theatre.createdAt.slice(0, 10)}</p>
                  <p>Theatre Charges- &#8377;{theatre.basePrice}</p>
                </div>
              </div>
            ))}
            </div>
          </div>

          <div className="p-3 mx-5">
            <MaterialTable
              title="Movies running in your theatres"
              columns={moviesColumn}
              data={movies}
              options={{
                exportMenu: [
                  {
                    label: "Export as PDF",
                    exportFunc: (cols, datas) =>
                      ExportPdf(cols, datas, "Movies Record"),
                  },
                  {
                    label: "Export as ExcelFile",
                    exportFunc: (cols, datas) =>
                      ExportCsv(cols, datas, "Movies Record"),
                  },
                ],
                headerStyle: {
                  backgroundColor: "#01579b",
                  color: "#FFF",
                },
              }}
            />
          </div>
        </div>
      </div>
    );
}
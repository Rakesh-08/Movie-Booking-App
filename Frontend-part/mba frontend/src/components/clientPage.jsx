import { useNavigate } from "react-router-dom";
import MaterialTable from "@material-table/core";
import { useState } from "react";


export default function ClientPage() {
    let [theatres,setTheatres]= useState([])

    let NavigateTo=useNavigate();
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
              column={theatreColumns}
              data={theatres}
            />
            
          </div>
         
           
          </div>
        </div>
      
    );
}
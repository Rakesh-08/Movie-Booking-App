import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import { getAllUsersCall } from "../apiCalls/usersApi";
import { getAllTheatresCall } from "../apiCalls/theatresApi";

export default function AdminPage() {
    let [users, setUsers] = useState([]);
    let [theatres, setTheatres] = useState([]);
    let [tableToggle, setTableToggle] = useState(true)

    useEffect(() => {
        getUsers();
        getTheatres();
    },[])
    
    let getUsers = () => {
       
        getAllUsersCall().then((response) => {
            setUsers(response.data)
           
        }).catch(err=>console.log(err))
    }
    
    let getTheatres = () => {
        getAllTheatresCall().then((response) => {
            setTheatres(response.data)
            
        }).catch(err=>console.log(err))
    }

    let userColumns = [
      { title: "ID", field: "_id" },
      { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "User Id", field: "userId" },
      { title: "User Type", field: "userType" },
      { title: "Address", field: "address" },
     
      
    ];
    
    let theatreColumns = [
      { title: "ID", field: "_id" },
      { title: "Theatre", field: "name" },
      { title: "City", field: "city" },
      { title: "Pincode", field: "pincode" },
      { title: "Owner Id", field: "ownerId" },
      { title: "Description", field: "description" },
    
    ];
    

    return (
      <div className="vh-100 p-2 ">
        <div className="d-flex bg-success border-bottom justify-content-between">
          <p className="text-uppercase display-6 p-2 mx-2">Filmy Duniyah</p>
          <div className="mx-5 ">
            <button
              onClick={() => setTableToggle(true)}
              className={`btn text-warning m-2 p-1 ${
                tableToggle && "border-bottom "
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setTableToggle(false)}
              className={`btn text-warning m-2 p-1 ${
                !tableToggle && "border-bottom "
              }`}
            >
              Theatres
            </button>
          </div>
        </div>
        
            <div>
                {tableToggle ? <div>
                    <MaterialTable
                        columns={userColumns}
                        data={users}
                    >

                    </MaterialTable>
                </div> :
                    <div>
                        <MaterialTable
                            columns={theatreColumns}
                            data={theatres}
                        >

                        </MaterialTable>
                </div>}

            </div>
      </div>
    );
}
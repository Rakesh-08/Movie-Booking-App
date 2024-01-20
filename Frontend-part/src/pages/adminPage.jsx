import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import MaterialTable from "@material-table/core";
import { getAllUsersCall } from "../apiCalls/usersApi";
import { getAllTheatresCall } from "../apiCalls/theatresApi";
import EmailIcon from "@mui/icons-material/Email";
import { ExportCsv, ExportPdf } from "@material-table/exporters";




export default function AdminPage() {
    let [users, setUsers] = useState([]);
    let [theatres, setTheatres] = useState([]);
  let [tableToggle, setTableToggle] = useState(true)
  
  let NavigateTo = useNavigate();

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
          <p
            onClick={() => NavigateTo("/")}
            className="text-uppercase display-6 p-2 mx-2 moviecard"
          >
            Filmy Duniyah
          </p>
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
        <div className="text-center m-3">
          <h4>Welcome Admin!</h4>
          <p>Take a look on users and theatres associated with your app</p>
        </div>
        <div className="p-4">
          {tableToggle ? (
            <div>
              <MaterialTable
                title="List of Users"
                columns={userColumns}
                data={users}
                onRowClick={() => {}}
                actions={[
                  {
                    icon: EmailIcon,
                    tooltip: "Send Email",
                    onClick: () => {},
                  },
                ]}
                options={{
                  actionsColumnIndex: -1,
                  exportMenu: [
                    {
                      label: "Export as PDF",
                      exportFunc: (cols, datas) =>
                        ExportPdf(cols, datas, "Users Record"),
                    },
                    {
                      label: "Export as ExcelFile",
                      exportFunc: (cols, datas) =>
                        ExportCsv(cols, datas, "Users Record"),
                    },
                  ],
                }}
              />
            </div>
          ) : (
            <div>
              <MaterialTable
                title="List of Theatres"
                columns={theatreColumns}
                data={theatres}
                options={{
                  exportButton: true,
                  exportMenu: [
                    {
                      label: "Export as PDF",
                      exportFunc: (cols, datas) =>
                        ExportPdf(cols, datas, "Theatres Record"),
                    },
                    {
                      label: "Export as ExcelFile",
                      exportFunc: (cols, datas) =>
                        ExportCsv(cols, datas, "Theatres Record"),
                    },
                  ],
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
}
import { useNavigate } from "react-router-dom";
import {useEffect} from "react"


export default function ErrorPage() {

    let NavigateTo = useNavigate();

    useEffect(() => { 
        if (!localStorage.getItem("firstLoad")) {
            localStorage.setItem("firstLoad",1)
        } else {
            localStorage.removeItem("firstLoad");
            NavigateTo("/Login")
        }
       
    }, [])
    
    
    
    return (
      <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
        <div>
          <img
            style={{width:"35em"}}
            src="https://ninjasites.com/images/blog/customized-404-error-page-benefits.png!lg"
            alt="errorPic"
          />
        </div>
            <div className="m-4 border p-4 rounded-4 shadow">
          
                {localStorage.getItem("ErrCode")} : <span>{localStorage.getItem("ErrMsg")}</span>
          
        </div>
      </div>
    );
}









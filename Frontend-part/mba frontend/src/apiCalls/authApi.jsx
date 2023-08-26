import axios from "axios";
import apiUrl from "./apiUtils";



let signUpCall = async (obj) => {
    return await axios.post(apiUrl.Base_url+apiUrl.signupApi,obj)
}

let signInCall = async (obj) => {
  return await axios.post(
    apiUrl.Base_url + apiUrl.signinApi,
    obj
  );
};

export {signUpCall,signInCall}
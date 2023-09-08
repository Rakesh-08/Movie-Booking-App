import axios from "axios";
import apiUrl from "./apiUtils";


let fetchSeatsInTheatre = async (obj) => {
  return await axios.post(apiUrl.Base_url+apiUrl.fetchSeatingPlan,obj,apiUrl.apiHeader);
};

let postBooking = async (obj) => {
    return await axios.post(apiUrl.Base_url + apiUrl.postBookingApi,obj,apiUrl.apiHeader);

}


export {fetchSeatsInTheatre,postBooking}
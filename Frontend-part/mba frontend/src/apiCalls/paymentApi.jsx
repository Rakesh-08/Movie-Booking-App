import axios from "axios"
import apiUrl from "./apiUtils";

let createPayment = async(obj) => {
    return await axios.post(apiUrl.Base_url + apiUrl.postPaymentApi, obj, apiUrl.apiHeader)
}

export {createPayment}

let apiHeader = {
    headers: {
        "x-access-token":localStorage.getItem("mba_token")
    }
}

let apiUrl = {
  Base_url: "https://mba-app.onrender.com",
  apiHeader: apiHeader,
  signupApi: "/movieBooking/api/v1/auth/signup",
  signinApi: "/movieBooking/api/v1/auth/signin",
  fetchMovies: "/movieBooking/api/v1/movies",
};

export default apiUrl;
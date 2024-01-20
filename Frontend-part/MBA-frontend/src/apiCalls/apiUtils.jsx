
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
  fetchUsers: "/movieBooking/api/v1/users",
  fetchTheatres: "/movieBooking/api/v1/theatres",
  fetchMoviesInTheatreOwned: "/movieBooking/api/v1/moviesInTheatre",
  fetchSeatingPlan: "/movieBooking/api/v1/seats",
  postBookingApi: "/movieBooking/api/v1/booking",
  postPaymentApi:"/movieBooking/api/v1/booking/payment"
};

export default apiUrl;
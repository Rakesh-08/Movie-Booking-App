import { useNavigate } from "react-router-dom";
import { getAllTheatresCall } from "../apiCalls/theatresApi";
import { useState, useEffect } from "react";

let seats=new Array(56).fill().map((_,index)=>index+1);
let OccupiedSeats=new Array(10).map((_)=> Math.floor(Math.random()*56 ))

export default function BookingPage() {
 
  let [theatres, setTheatres] = useState([]);
  let [bookingInfo, setBookingInfo] = useState({
    theatre:"",timing:""
  });
 let [showSeats,setShowSeats]=useState(false)

  let NavigateTo = useNavigate();
  let MovieSelected = JSON.parse(localStorage.getItem('selectedMovie'));

  
  useEffect(() => {
    getTheatres();
  }, []);

  let fetchSeats = () => {
    if (!bookingInfo.theatre || !bookingInfo.timing) {
      return alert("Please first select the theatre and timing to check seats availability")
    }
    setShowSeats(true)
  }


   let getTheatres = () => {
     getAllTheatresCall()
       .then((response) => {
         setTheatres(response.data);
       })
       .catch((err) => console.log(err));
   };
    return (
      <div
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/floral-ornamental-abstract-background_52683-30016.jpg)",
          backgroundSize: "cover",
        }}
        className="min-vh-100"
      >
        <div className="mx-4 border-bottom d-flex align-items-center justify-content-between">
          <p
            onClick={() => NavigateTo("/")}
            className="text-uppercase display-6 p-2 text-warning  fst-italic hovereffect w-25  "
          >
            Filmy Duniyah
          </p>
          <p className="fs-3">Booking Page</p>
        </div>

        <div className="d-flex flex-wrap   p-2 justify-content-around m-3">
          <div className="text-center m-2">
            <p> Selected Movie :</p>
            <img
              style={{ width: "14vh" }}
              src={MovieSelected.posterURL}
              alt="movie"
            />
          </div>
          <div className="m-2">
            <label>Theatres - </label>

            <select
              value={bookingInfo.theatre}
              onChange={(e) => {
                if (e.target.value == "Select") {
                  e.target.value = "";
                }
                setBookingInfo({ ...bookingInfo, theatre: e.target.value });
              }}
              className="m-2"
            >
              <option value="Select">Select</option>
              {theatres.map((tht) => (
                <option value={tht.name} key={tht._id}>
                  {tht.name}
                </option>
              ))}
            </select>

            <p className="my-4">
              Selected Theatre :{" "}
              <span className="fst-italic text-info">
                {bookingInfo.theatre}
              </span>{" "}
            </p>
          </div>
          <div className="m-2">
            <label> Show-Timings -</label>

            <select
              value={bookingInfo.timing}
              onChange={(e) => {
                if (e.target.value == "Select") {
                  e.target.value = "";
                }
                setBookingInfo({ ...bookingInfo, timing: e.target.value });
              }}
              className="m-1"
            >
              <option value="Select">Select</option>
              <option value="9:00 A.M-12:00 A.M">9:00 A.M-12:00 A.M</option>
              <option value="12:00 A.M-3:00 P.M">12:00 A.M-3:00 P.M</option>
              <option value="3:00 A.M-6:00 P.M">3:00 A.M-6:00 P.M</option>
              <option value="6:00 P.M-9:00 P.M">6:00 P.M-9:00 P.M</option>
            </select>

            <p className="my-4">
              {" "}
              Selected Slot :{" "}
              <span className="fst-italic text-info">{bookingInfo.timing}</span>
            </p>
          </div>
          <div className="d-flex align-items-end">
            <button onClick={fetchSeats} className="btn btn-success">
              check Seats
            </button>
          </div>
        </div>
   
        {showSeats && <>
          <div className="m-2 p-2 d-flex justify-content-evenly align-items-center">
          <div>
            <SeatLabel color="white" label="Available" value="46" />
            <SeatLabel color="danger" label="Occupied" value="10" />
            <SeatLabel color="primary" label="Selected" value="0" />
           
          </div>
          <div>
            <p className="text-center fs-5 m-2">Select Tickets:</p>
            <div className="cinema">
              {seats.map((seat, i) => (
                <button className="m-1" key={i}>
                  {seat}
                </button>
              ))}
            </div>
          </div>
        </div>
        </>}
      
      </div>
    );
}

let SeatLabel = ({color,label,value}) => {
  return (
    <div className="m-3">
      
      <button className={`btn btn-sm bg-${color}`}></button>
      <div>
          {label} <span>{value}</span>
      </div> 

    </div>
  )
}
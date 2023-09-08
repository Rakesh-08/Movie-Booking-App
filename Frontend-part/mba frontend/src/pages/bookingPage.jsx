import { useNavigate } from "react-router-dom";
import { getAllTheatresCall } from "../apiCalls/theatresApi";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchSeatsInTheatre, postBooking } from "../apiCalls/booking";



let cinema = new Array(56).fill().map((_, index) => index + 1);
let discount= 0;
let OccupiedSeats=new Array(10).fill().map((_)=> Math.floor(Math.random()*56 ))

export default function BookingPage() {
 
  let [theatres, setTheatres] = useState([]);
  let [bookingInfo, setBookingInfo] = useState({
    theatre:"",timing:""
  });
  let [showSeats, setShowSeats] = useState(false);
  let [seats, setSeats] = useState({ available: 56 - (OccupiedSeats.length), occupied: OccupiedSeats, selected: [] });
  

  let NavigateTo = useNavigate();
  let dispatch= useDispatch();
  let MovieSelected = JSON.parse(localStorage.getItem('selectedMovie'));

   
  useEffect(() => {
    if (!localStorage.getItem('mba_token')) {
        NavigateTo("/login")
    } else {
       getTheatres();
    }
   

  }, []);


  let proceedPayment = () => {

    dispatch({
      type: "booking",
      payload: {
        movie: MovieSelected.name,
        theatre: bookingInfo.theatre,
        timing: bookingInfo.timing,
        totalTickets: seats.selected.length,
        seats: seats.selected.join(","),
        pricePerTicket: MovieSelected.price,
        theatreCharges: theatres.find((tht) => tht.name == bookingInfo.theatre)
          .basePrice,
        discount: discount
      }
    });

    let temp = {
      movieId: MovieSelected._id,
      theatreId: theatres.find((item) => item.name == bookingInfo.theatre)._id,
      NoOfTickets:seats.selected.length
    };

    postBooking(temp).then((response) => {
      console.log(response);
    }).catch(err=>console.log(err))

    NavigateTo("/payment")
  }

  let seatClick = (seatNo) => {
  

    if (seats.occupied.includes(seatNo)) {
      return;
    }

    if (seats.selected.includes(seatNo)) {
      let temp = seats.selected.filter(seat => seat != seatNo);
      setSeats({
        ...seats, selected: temp, available:seats.available + 1
      })
      return;
    }

    let temp = seats.selected;
    temp.push(seatNo);
   
     setSeats({
       ...seats,
       selected: temp,
       available: seats.available -1,
     });
    
  }

  let fetchSeats = () => {
    if (!bookingInfo.theatre || !bookingInfo.timing) {
      return alert("Please first select the theatre and timing to check seats availability")
    };

    let temp = {
      theatreId: theatres.find(item => item.name == bookingInfo.theatre)._id,
      shift:bookingInfo.timing
    }

    fetchSeatsInTheatre(temp).then((response) => {
      console.log(response.data)
    }).catch(err => console.log(err))
    
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

        <div className="d-flex flex-wrap text-center   p-2 justify-content-around m-3">
          <div className=" m-2">
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
                setShowSeats(false)
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
                setShowSeats(false);
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

        {showSeats && (
          <>
            <div className="m-2 p-2 d-flex justify-content-evenly align-items-center responsive">
              <div>
                <SeatLabel
                  color="secondary"
                  label="Available"
                  
                />
                <SeatLabel
                  color="danger"
                  label="Occupied"
                
                />
                <SeatLabel
                  color="primary"
                  label="Selected"
                 
                />
              </div>
              <div>
                <p className=" text-center fs-5 m-2">Select Tickets:</p>
                <div className="cinema mt-3">
                  {cinema.map((seat, i) => (
                    <button
                      onClick={() => seatClick(seat)}
                      style={{width:"20px",height:"20px"}}
                      className={`m-1  ${
                        seats.occupied.includes(seat)
                          ? "bg-danger"
                          : seats.selected.includes(seat)
                          ? "bg-primary rounded-3"
                          : "bg-secondary"
                      } `}
                      key={i}
                    >
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {seats.selected.length > 0 && (
              <div className=" p-4 text-center">
                <p className="p-1 text-warning fst-italic">You have selected <span className="text-light">{seats.selected.length}</span> tickets at a price of Rs. <span className="text-light">{MovieSelected.price}</span> each</p>
                <div>
                  
                  <button
                    onClick={proceedPayment}
                    className="btn m-1 btn-outline-primary"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    );
}

let SeatLabel = ({color,label}) => {
  return (
    <div className="m-3">
      
      <button className={`btn btn-sm bg-${color}`}></button>
      <div>
          {label} 
      </div> 

    </div>
  )
}
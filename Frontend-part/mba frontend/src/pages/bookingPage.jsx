import { useNavigate } from "react-router-dom";
import { getAllTheatresCall } from "../apiCalls/theatresApi";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

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
  let [showPreview,setShowPreview]=useState(false)

  let NavigateTo = useNavigate();
  let MovieSelected = JSON.parse(localStorage.getItem('selectedMovie'));

   
  useEffect(() => {
    getTheatres();
  }, []);

  let totalPrice =
    MovieSelected.price * seats.selected.length +
    theatres.find((tht) => tht.name == bookingInfo.theatre)?.basePrice- discount


  let proceedPayment = () => {
     alert("Link any payment gateway for payment and complete customer payment request")
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

        {showSeats && (
          <>
            <div className="m-2 p-2 d-flex justify-content-evenly align-items-center responsive">
              <div>
                <SeatLabel
                  color="white"
                  label="Available"
                  value={seats.available}
                />
                <SeatLabel
                  color="danger"
                  label="Occupied"
                  value={seats.occupied.length}
                />
                <SeatLabel
                  color="primary"
                  label="Selected"
                  value={seats.selected.length}
                />
              </div>
              <div>
                <p className=" fs-5 m-2">Select Tickets:</p>
                <div className="cinema">
                  {cinema.map((seat, i) => (
                    <button
                      onClick={() => seatClick(seat)}
                      className={`m-1 ${
                        seats.occupied.includes(seat)
                          ? "bg-danger"
                          : seats.selected.includes(seat)
                          ? "bg-primary"
                          : "bg-light"
                      } `}
                      key={i}
                    >
                      {seat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {seats.selected.length > 0 && (
              <div className="mx-5 p-4">
                <p className="p-1 text-warning fst-italic">{`You have selected ${seats.selected.length} tickets at a price of Rs. ${MovieSelected.price} each`}</p>
                <div>
                  <button
                    onClick={() => setShowPreview(true)}
                    className="btn btn-info btn-sm m-1"
                  >
                    Preview of Booking
                  </button>
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

        {showPreview && (
          <div>
            <Modal
              show={showPreview}
              onHide={() => setShowPreview(false)}
              centered
              size="sm"
              backdrop="static"
            >
              {" "}
              <Modal.Header className="text-dark fs-5">
                Booking Preview
              </Modal.Header>
              <Modal.Body className="p-2 text-dark d-flex flex-column align-items-center">
                <div className="m-2 p-2">
                  <p>
                    Movie:{" "}
                    <span className="text-secondary">{MovieSelected.name}</span>
                  </p>
                  <p>
                    Theatre:{" "}
                    <span className="text-secondary">
                      {bookingInfo.theatre}
                    </span>
                  </p>
                  <p>
                    Timing:{" "}
                    <span className="text-secondary">{bookingInfo.timing}</span>
                  </p>
                  <p>
                    Total tickets:{" "}
                    <span className="text-secondary">
                      {seats.selected.length}
                    </span>
                  </p>
                  <p>
                    Seats:{" "}
                    <span className="text-secondary">
                      {seats.selected.join(",")}
                    </span>
                  </p>
                  <p>
                    Price per ticket{" "}
                    <span className="text-secondary">
                      {" "}
                      &#8377; {MovieSelected.price}
                    </span>
                  </p>
                  <p>
                    Theatre Charges :{" "}
                    <span className="text-secondary">
                      {" "}
                      &#8377;{" "}
                      {
                        theatres.find((tht) => tht.name == bookingInfo.theatre)
                          .basePrice
                      }
                    </span>
                  </p>
                  <p>
                    Discount :{" "}
                    <span className="text-secondary"> &#8377; {discount}</span>
                  </p>
                  <div className="m-2  border-top p-1">
                    <p className="lead">
                      Total amount
                      <span className="mx-3"> &#8377;{totalPrice}</span>
                    </p>
                    <p>{`(${
                      MovieSelected.price} * ${seats.selected.length} +
                      ${theatres.find((tht) => tht.name == bookingInfo.theatre)
                        .basePrice} -
                      ${discount})
                    `}</p>
                  </div>

                  <div>
                    <button
                      onClick={() => setShowPreview(false)}
                      className="btn btn-sm m-1 btn-secondary"
                    >
                      back
                    </button>
                    <button
                      onClick={proceedPayment}
                      className="btn btn-sm m-1 btn-primary"
                    >
                      proceed to payment
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        )}
      </div>
    );
}

let SeatLabel = ({color,label,value}) => {
  return (
    <div className="m-3">
      
      <button className={`btn btn-sm bg-${color}`}></button>
      <div>
          {label} <span className="mx-2">{value}</span>
      </div> 

    </div>
  )
}
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPayment } from "../apiCalls/paymentApi";


export default function PaymentPage() {

  let [showPreview, setShowPreview] = useState(false);
  let [showPaymentStatus, setShowPaymentStatus] = useState(false);
  let [flag, setFlag] = useState(false);
  let [showSpinner, setShowSpinner] = useState(false);
    let NavigateTo = useNavigate();
  let booking = useSelector(state => state.moviesList.bookingInfo);

  useEffect(() => {
        
    if (!localStorage.getItem("mba_token")) {
       NavigateTo("/login")
    }
 },[])

  let totalPrice = booking.pricePerTicket * booking.totalTickets + booking.theatreCharges - booking.discount;

  let makePaymentFn = () => {
    
    setShowSpinner(true);
    let temp = {
      bookingId: booking.bookingId,
      selectedSeats:booking.seats
    }

    createPayment(temp).then(response => {
      console.log(response)
      setShowSpinner(false);
      setFlag(true);
      setShowPaymentStatus(true)
    }).catch(err => {
      console.log(err)
      setShowSpinner(false);
      setShowPaymentStatus(true);
    });

   

  }
  
  
    return (
      <div className="vh-100">
        <div className="mx-4 border-bottom d-flex align-items-center justify-content-between">
          <p
            onClick={() => NavigateTo("/")}
            className="text-uppercase display-6 p-2 text-warning  fst-italic hovereffect w-25  "
          >
            Filmy Duniyah
          </p>
          <p className="fs-3">Payment Gateway</p>
        </div>
        <div className="h-50 d-flex justify-content-center align-items-center">
          <p style={{ fontSize: "50vh" }}>&#8377;</p>
        </div>

        <div className="text-center">
          {showSpinner && (
            <div className="mt-2 fs-2 spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
        <div className="text-center my-5">
          <button
            onClick={() => setShowPreview(true)}
            className="btn btn-info btn-sm m-3"
          >
            Booking preview
          </button>
          <button
            onClick={makePaymentFn}
            className="btn btn-lg btn-outline-warning m-3"
          >
            make payment
          </button>
        </div>
        <div>
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
                      <span className="text-secondary">{booking.movie}</span>
                    </p>
                    <p>
                      Theatre:{" "}
                      <span className="text-secondary">{booking.theatre}</span>
                    </p>
                    <p>
                      Timing:{" "}
                      <span className="text-secondary">{booking.timing}</span>
                    </p>
                    <p>
                      Total tickets:{" "}
                      <span className="text-secondary">
                        {booking.totalTickets}
                      </span>
                    </p>
                    <p>
                      Seats:{" "}
                      <span className="text-secondary">{booking.seats.join(",")}</span>
                    </p>
                    <p>
                      Price per ticket{" "}
                      <span className="text-secondary">
                        {" "}
                        &#8377; {booking.pricePerTicket}
                      </span>
                    </p>
                    <p>
                      Theatre Charges :{" "}
                      <span className="text-secondary">
                        {" "}
                        &#8377; {booking.theatreCharges}
                      </span>
                    </p>
                    <p>
                      Discount :{" "}
                      <span className="text-secondary">
                        {" "}
                        &#8377; {booking.discount}
                      </span>
                    </p>
                    <div className="m-2  border-top p-1">
                      <p className="lead">
                        Total amount
                        <span className="mx-3"> &#8377;{totalPrice}</span>
                      </p>
                      <p>{`(${booking.pricePerTicket} * ${booking.totalTickets} +
                      ${booking.theatreCharges} -
                      ${booking.discount})
                    `}</p>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={() => setShowPreview(false)}
                        className="btn btn  m-1 btn-secondary"
                      >
                        back
                      </button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          )}

          <Modal
            show={showPaymentStatus}
            onHide={() => setShowPaymentStatus(false)}
            centered
            size="sm"
            backdrop="static"
          >
            <Modal.Body>
              <div className="text-dark text-center p-2">
                <div>
                  <h5>
                    {flag
                      ? "Payment Successfull✅"
                      : "Session Timeout! payment failed"}
                  </h5>
                  <p className="text-muted">
                    {" "}
                    {flag
                      ? "please check email for booking details"
                      : "please try again with new booking"}
                  </p>
                </div>

                <button
                  className=" btn btn-outline-success px-3"
                  onClick={() => setShowPaymentStatus(false)}
                >
                  Ok
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
}
        
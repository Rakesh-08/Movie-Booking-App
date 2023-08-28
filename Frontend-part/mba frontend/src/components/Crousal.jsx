export default function MoviesCrousal() {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg"
            className="d-block w-100"
            alt="openheimer"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.news18.com/ibnlive/uploads/2020/07/1604654831_ganpath-first-look.jpg?impolicy=website&width=0&height=0"
            className="d-block w-100"
            alt="salaar"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://media5.bollywoodhungama.in/wp-content/uploads/2022/06/Jawan.jpe"
            className="d-block w-100"
            alt="Jawaan"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.thedirect.com/media/photos/posd1_1.jpg"
            className="d-block w-100"
            alt="greyman"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.news18.com/ibnlive/uploads/2020/07/1604654831_ganpath-first-look.jpg?impolicy=website&width=0&height=0"
            className="d-block w-100"
            alt="ganpath"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
   
  );
  
}

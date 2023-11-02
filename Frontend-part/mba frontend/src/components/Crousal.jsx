

import Carousel from "react-bootstrap/Carousel";

function MoviesCrousal() {
  return (
    <Carousel   style={{ boxShadow: "0em 2em 3em grey " }}>
      <Carousel.Item>
        <img
          style={{
            width: "100%",
            height: "70vh",
          }}
          className="d-block  slidingwindow "
          src="https://rukminim1.flixcart.com/image/850/1000/jn3hocw0/poster/g/x/h/medium-hollywood-movie-wall-poster-pirates-of-the-caribbean-dead-original-imaf9utzqnengk9c.jpeg?q=90"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "70vh", width: "100%" }}
          className="d-block slidingwindow"
          src="https://images.news18.com/ibnlive/uploads/2020/07/1604654831_ganpath-first-look.jpg?impolicy=website&width=0&height=0"
          alt="Ganpath_poster"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "70vh", width: "100%" }}
          className="d-block  slidingwindow"
          src="https://dgcs.gos.pk/blogs/wp-content/uploads/2023/02/18059e5332.jpg"
          alt="Pathaan_Poster"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "70vh", width: "100%" }}
          className="d-block  slidingwindow"
          src="https://webneel.net/file/images/11-16/8-xmen-movie-poster-design.jpg"
          alt="X-men_Poster"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "70vh", width: "100%" }}
          className="d-block  slidingwindow"
          src="https://webneel.net/file/images/11-16/10-enders-game-movie-poster-designs.jpg"
          alt="Enders Game_Poster"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default MoviesCrousal;



import Carousel from "react-bootstrap/Carousel";

function MoviesCrousal() {
  return (
    <Carousel style={{boxShadow:" 1em 2em 2em grey"}}>
      <Carousel.Item>
        <img
          style={{
            height: "70vh", width: "100%"  }}
          className="d-block "
          src="https://scontent.fdel50-1.fna.fbcdn.net/v/t39.30808-6/340085116_979816962913240_5033591519339597379_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_ohc=CLtnTFP_uEUAX-XUYCl&_nc_ht=scontent.fdel50-1.fna&oh=00_AfCoCgN0bGYBvogZmOeMbuZUBlREafGXuVJSgpox1C5pmQ&oe=64F1CA92"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "70vh", width: "100%" }}
          className="d-block"
          src="https://images.news18.com/ibnlive/uploads/2020/07/1604654831_ganpath-first-look.jpg?impolicy=website&width=0&height=0"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "70vh", width: "100%" }}
          className="d-block "
          src="https://dgcs.gos.pk/blogs/wp-content/uploads/2023/02/18059e5332.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "70vh", width: "100%" }}
          className="d-block "
          src="https://webneel.net/file/images/11-16/8-xmen-movie-poster-design.jpg"
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "70vh", width: "100%" }}
          className="d-block "
          src="https://webneel.net/file/images/11-16/10-enders-game-movie-poster-designs.jpg"
          alt="Fifth slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default MoviesCrousal;

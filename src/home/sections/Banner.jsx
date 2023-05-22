
import { Link } from 'react-router-dom'
// import { home } from "../../assets"

function Banner() {
  return (
      <section className="home" id="home">
      <h3 data-speed="-2" className="home-parallax">
        Rent a vehicule
      </h3>

      <img
        data-speed="5"
        className="home-parallax"
        // src={home}
        alt=""
      />

      <Link className="btn" to="/exploreRentvehicules">
        vehicule Showcase
      </Link>
    </section>
  )
}

export default Banner
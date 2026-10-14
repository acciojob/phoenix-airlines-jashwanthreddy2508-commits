import { Link } from "react-router-dom";

function Home() {
return ( 
  <div>
    <nav>
      <h1>Flight Booking App</h1>
    </nav>

  <h2>Welcome to Flight Booking App</h2>

  <Link to="/flightsearch">
    <button>Search Flights Here</button>
  </Link>
</div>


);
}

export default Home;

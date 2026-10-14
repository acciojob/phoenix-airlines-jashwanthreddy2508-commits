import { useState } from "react";
import { Link } from "react-router-dom";
import "./Flightsearch.css";

const demoFlights = [
  { airline: "Air India", departure: "08:00 AM", arrival: "12:00 PM", price: 245 },
  { airline: "IndiGo", departure: "01:30 PM", arrival: "05:45 PM", price: 210 },
  { airline: "Emirates", departure: "07:00 PM", arrival: "11:10 PM", price: 320 },
];

const destinations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Dubai", "London", "New York", "Singapore"];

function getToday() {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

function Flightsearch() {
  const [search, setSearch] = useState([]);
  const [inputs, setInputs] = useState({
    source: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    tripType: "oneway",
  });
  const [error, setError] = useState("");
  const today = getToday();

  function handleSearch(event) {
    event.preventDefault();
    if (
      !inputs.source ||
      !inputs.destination ||
      !inputs.departureDate ||
      (inputs.tripType === "roundtrip" && !inputs.returnDate)
    ) {
      setError("Please complete all required flight details.");
      return;
    }

    if (inputs.source === inputs.destination) {
      setError("Source and destination must be different.");
      return;
    }

    if (inputs.departureDate < today || (inputs.returnDate && inputs.returnDate < inputs.departureDate)) {
      setError("Choose a departure date from today onward and a return date on or after departure.");
      return;
    }

    setError("");
    setSearch(
      demoFlights.map((flight) => ({
        ...flight,
        ...inputs,
      })),
    );
  }

  function updateInput(field, value) {
    setInputs((currentInputs) => ({ ...currentInputs, [field]: value }));
    setError("");
  }

  return (
    <main className="flight-search-page">
      <header className="flight-search-heading">
        <span className="flight-search-eyebrow">YOUR NEXT JOURNEY STARTS HERE</span>
        <h1>Find your flight</h1>
        <p>Search routes and compare flight options for your trip.</p>
      </header>

      <form className="flight-search-form" aria-label="Flight search" onSubmit={handleSearch}>
        <fieldset className="flight-trip-types">
          <legend className="flight-trip-legend">Trip type</legend>
          <label className="flight-trip-option">
            <input
              type="radio"
              name="tripType"
              value="oneway"
              checked={inputs.tripType === "oneway"}
              onChange={(event) => updateInput("tripType", event.target.value)}
            />
            One way
          </label>
          <label className="flight-trip-option">
            <input
              type="radio"
              name="tripType"
              value="roundtrip"
              checked={inputs.tripType === "roundtrip"}
              onChange={(event) => updateInput("tripType", event.target.value)}
            />
            Round trip
          </label>
        </fieldset>

        <div className="flight-search-fields">
          <div className="flight-field">
            <label htmlFor="source">Source</label>
            <select
              id="source"
              name="source"
              required
              value={inputs.source}
              onChange={(event) => updateInput("source", event.target.value)}
            >
              <option value="">Select source</option>
              {destinations.map((destination) => (
                <option value={destination} key={destination}>{destination}</option>
              ))}
            </select>
          </div>

          <div className="flight-field">
            <label htmlFor="destination">Destination</label>
            <select
              id="destination"
              name="destination"
              required
              value={inputs.destination}
              onChange={(event) => updateInput("destination", event.target.value)}
            >
              <option value="">Select destination</option>
              {destinations.map((destination) => (
                <option value={destination} key={destination}>{destination}</option>
              ))}
            </select>
          </div>

          <div className="flight-field">
            <label htmlFor="departureDate">Departure Date</label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              min={today}
              required
              value={inputs.departureDate}
              onChange={(event) => updateInput("departureDate", event.target.value)}
            />
          </div>

          {inputs.tripType === "roundtrip" && (
            <div className="flight-field">
              <label htmlFor="returnDate">Return Date</label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                min={inputs.departureDate || today}
                required
                value={inputs.returnDate}
                onChange={(event) => updateInput("returnDate", event.target.value)}
              />
            </div>
          )}

          <button className="flight-search-button" type="submit">
            Search Flights
          </button>
        </div>
        {error && <p className="flight-search-error" role="alert">{error}</p>}
      </form>

      {search.length > 0 && (
        <section className="flight-results" aria-live="polite">
          <div className="flight-results-heading">
            <div>
              <span className="flight-search-eyebrow">AVAILABLE OPTIONS</span>
              <h2>
                {search[0].source} <span aria-hidden="true">→</span> {search[0].destination}
              </h2>
              <p>Departure date: {search[0].departureDate}</p>
              {search[0].tripType === "roundtrip" && <p>Return date: {search[0].returnDate}</p>}
            </div>
            <span className="flight-result-count">{search.length} flights</span>
          </div>
          <p className="flight-demo-note">
            Demo flight results — availability and prices are examples.
          </p>
          {search.map((flight) => (
            <article className="flight-result-card" key={flight.airline}>
              <div className="flight-airline">
                <span className="flight-airline-mark" aria-hidden="true">
                  {flight.airline.slice(0, 1)}
                </span>
                <h3>{flight.airline}</h3>
              </div>
              <div className="flight-times">
                <strong>{flight.departure}</strong>
                <span className="flight-route-line" aria-hidden="true">
                  <span />
                </span>
                <strong>{flight.arrival}</strong>
              </div>
              <div className="flight-fare">
                <span>{flight.tripType === "roundtrip" ? "Round trip" : "One way"}</span>
                <strong>${flight.price}</strong>
              </div>
              <Link className="flight-book-button" to="/flightbooking">
                Book
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Flightsearch;

import { Link } from "react-router-dom";
import "./Flightbooking.css";

function Flightbooking() {
  return (
    <main className="flight-booking-page">
      <header className="flight-booking-heading">
        <span className="flight-booking-eyebrow">PHOENIX AIRLINES</span>
        <h1>Complete your booking</h1>
        <p>Enter your contact details to continue with your journey.</p>
      </header>

      <section className="flight-booking-card" aria-label="Passenger details">
        <div className="flight-booking-card-heading">
          <span className="flight-booking-step">01</span>
          <div>
            <h2>Passenger details</h2>
            <p>All fields are required</p>
          </div>
        </div>

        <div className="flight-booking-fields">
          <label className="flight-booking-field" htmlFor="passenger-name">
            <span>Full name</span>
            <input
              id="passenger-name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
            />
          </label>
          <label className="flight-booking-field" htmlFor="passenger-email">
            <span>Email address</span>
            <input
              id="passenger-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <label className="flight-booking-field" htmlFor="passenger-phone">
            <span>Phone number</span>
            <input
              id="passenger-phone"
              type="tel"
              placeholder="+1 555 123 4567"
              autoComplete="tel"
            />
          </label>
        </div>

        <Link className="flight-booking-submit" to="/confirmation">
          Continue to confirmation <span aria-hidden="true">→</span>
        </Link>
        <p className="flight-booking-secure">
          <span aria-hidden="true">▣</span> Your details are only used for this booking.
        </p>
      </section>
    </main>
  );
}

export default Flightbooking;
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Flightbooking.css";

function Flightbooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const flight = location.state?.flight;
  const [passenger, setPassenger] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");

  function updatePassenger(field, value) {
    setPassenger((currentPassenger) => ({ ...currentPassenger, [field]: value }));
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const details = {
      name: passenger.name.trim(),
      email: passenger.email.trim(),
      phone: passenger.phone.trim(),
    };

    if (!flight) {
      setError("Please choose a flight before continuing with your booking.");
      return;
    }

    if (details.name.length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const phoneDigits = details.phone.replace(/\D/g, "");
    if (
      !/^\+?[0-9][0-9\s()-]*$/.test(details.phone) ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      setError("Please enter a valid phone number with 7 to 15 digits.");
      return;
    }

    navigate("/confirmation", { state: { booking: { flight, passenger: details } } });
  }

  return (
    <main className="flight-booking-page">
      <header className="flight-booking-heading">
        <span className="flight-booking-eyebrow">PHOENIX AIRLINES</span>
        <h1>Complete your booking</h1>
        <p>Enter your contact details to continue with your journey.</p>
      </header>

      <section className="flight-booking-card" aria-label="Passenger details">
        {flight && (
          <div className="flight-booking-flight" aria-label="Selected flight">
            <h2>Your flight</h2>
            <p><strong>{flight.source} to {flight.destination}</strong> · {flight.airline}</p>
            <p>{flight.departureDate}{flight.returnDate ? ` — ${flight.returnDate}` : ""} · ${flight.price}</p>
          </div>
        )}

        <div className="flight-booking-card-heading">
          <span className="flight-booking-step">01</span>
          <div>
            <h2>Passenger details</h2>
            <p>All fields are required</p>
          </div>
        </div>

        <form noValidate onSubmit={handleSubmit}>
          <div className="flight-booking-fields">
            <label className="flight-booking-field" htmlFor="passenger-name">
              <span>Full name</span>
              <input
                id="passenger-name"
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={100}
                placeholder="Enter your full name"
                autoComplete="name"
                value={passenger.name}
                onChange={(event) => updatePassenger("name", event.target.value)}
              />
            </label>
            <label className="flight-booking-field" htmlFor="passenger-email">
              <span>Email address</span>
              <input
                id="passenger-email"
                name="email"
                type="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                autoComplete="email"
                value={passenger.email}
                onChange={(event) => updatePassenger("email", event.target.value)}
              />
            </label>
            <label className="flight-booking-field" htmlFor="passenger-phone">
              <span>Phone number</span>
              <input
                id="passenger-phone"
                name="phone"
                type="tel"
                required
                maxLength={20}
                pattern="\+?[0-9][0-9 ()-]*"
                title="Enter a valid phone number with 7 to 15 digits."
                placeholder="+1 555 123 4567"
                autoComplete="tel"
                value={passenger.phone}
                onChange={(event) => updatePassenger("phone", event.target.value)}
              />
            </label>
          </div>

          {error && <p className="flight-booking-error" role="alert">{error}</p>}
          <button className="flight-booking-submit" type="submit">
            Continue to confirmation <span aria-hidden="true">→</span>
          </button>
        </form>
        <p className="flight-booking-secure">
          <span aria-hidden="true">▣</span> Your details are only used for this booking.
        </p>
      </section>
    </main>
  );
}

export default Flightbooking;

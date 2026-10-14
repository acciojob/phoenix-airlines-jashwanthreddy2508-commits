import { useLocation, useNavigate } from "react-router-dom";
import "./Confirmation.css";

function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;

  return (
    <main className="confirmation-page">
      <section className="confirmation-card" aria-live="polite">
        <span className="confirmation-icon" aria-hidden="true">{booking ? "✓" : "i"}</span>
        <span className="confirmation-eyebrow">PHOENIX AIRLINES</span>
        <h1>{booking ? "Booking confirmed" : "No booking details found"}</h1>
        <p className="confirmation-intro">
          {booking
            ? "Your passenger and flight details are ready for your journey."
            : "Please search for a flight and complete the passenger form to confirm a booking."}
        </p>

        {booking && (
          <div className="confirmation-details">
            <h2>Booking details</h2>
            {booking.flight && (
              <dl>
                <div><dt>Flight</dt><dd>{booking.flight.airline}</dd></div>
                <div><dt>Route</dt><dd>{booking.flight.source} to {booking.flight.destination}</dd></div>
                <div><dt>Departure</dt><dd>{booking.flight.departureDate}</dd></div>
                {booking.flight.returnDate && (
                  <div><dt>Return</dt><dd>{booking.flight.returnDate}</dd></div>
                )}
                <div><dt>Fare</dt><dd>${booking.flight.price}</dd></div>
              </dl>
            )}
            <h2>Passenger</h2>
            <dl>
              <div><dt>Name</dt><dd>{booking.passenger.name}</dd></div>
              <div><dt>Email</dt><dd>{booking.passenger.email}</dd></div>
              <div><dt>Phone</dt><dd>{booking.passenger.phone}</dd></div>
            </dl>
          </div>
        )}

        <button className="confirmation-button" type="button" onClick={() => navigate("/flight-search")}>
          Search flights
        </button>
      </section>
    </main>
  );
}

export default Confirmation;

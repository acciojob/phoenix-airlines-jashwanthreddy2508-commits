import "./App.css";
import "./phoenix.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Flightsearch from "./Flightsearch";
import Flightbooking from "./Flightbooking";
import Confirmation from "./Confirmation";

const App = () => {
  return (
    <div className="phoenix-app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flight-search" element={<Flightsearch />} />
          <Route path="/flightsearch" element={<Flightsearch />} />
          <Route path="/flight-booking" element={<Flightbooking />} />
          <Route path="/flightbooking" element={<Flightbooking />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

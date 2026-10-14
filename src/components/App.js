
import React from "react";
import './../styles/App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";

const App = () => {
  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
  <Route path="/flightsearch" element={ <Flightsearch/> } />
  <Route path="/flightbooking" element={ <Flightbooking/> } />
  <Route path="/confirmation" element={ <Confirmation/> } />
        {/* Do not remove the main div */}
  </Routes>
  </BrowserRouter>
    </div>
  )
}

export default App

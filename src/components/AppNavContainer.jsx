import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import ChooseTrips from "./trips/ChooseTrips";
import TripPackingList from "./trips/TripPackingList";
import { CreateNewTripForm } from "./trips/CreateNewTripForm";
import Weather from "./weather/Weather";
import Map from "./maps/Map";
import AppLayout from "./AppLayout";

function AppNavContainer() {
  // przenzwić komponent
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route path="choose-trip" element={<ChooseTrips />} />
          <Route path="choose-trip/new-trip" element={<CreateNewTripForm />} />
          <Route path=":id" element={<TripPackingList />} />
          <Route path="weather" element={<Weather />} />
          <Route path="map" element={<Map />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppNavContainer;

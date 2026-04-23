import { Routes, Route } from "react-router-dom";
import RoomList from "../pages/RoomList";
import ReservationList from "../pages/ReservationList";
import ReservationForm from "../pages/ReservationForm";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import RoomDetails from "../pages/RoomDetails";

export default function AppRoutes() {
  return (
    <Routes>

      {/* FIX: add rooms route */}
      <Route path="/" element={<RoomList />} />
      <Route path="/room/:id" element={<RoomDetails />} />
      <Route path="/rooms" element={<RoomList />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/reservations"
        element={
          <PrivateRoute>
            <ReservationList />
          </PrivateRoute>
        }
      />

      <Route
        path="/book"
        element={
          <PrivateRoute>
            <ReservationForm />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
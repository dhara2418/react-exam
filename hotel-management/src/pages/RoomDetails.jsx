import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Check karein ki ye actions aapke slices mein isi naam se hain
import { fetchRooms } from "../features/roomSlice"; 
import { makeReservation } from "../features/reservationSlice";
import { useEffect } from "react";

export default function RoomDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Check path: .items use karein agar slice mein wahi naam hai
  const room = useSelector((state) =>
    state.rooms.items.find((r) => r.id === id) // Number() hata diya
  );

  const bookRoom = async () => {
    try {
      // Reservation create karna (Firebase logic)
      await dispatch(
        makeReservation({
          roomId: room.id,
          type: room.type,
          price: room.price,
          status: "Confirmed",
          createdAt: new Date().toISOString(),
        })
      );

      alert("Room Booked Successfully! ✨");
      navigate("/reservations");
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  if (!room) return (
    <div className="flex justify-center items-center h-screen font-bold text-indigo-600 animate-bounce">
      Loading Room Details...
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
        {/* Left: Image Section */}
        <div className="md:w-1/2">
          <img 
            src={room.image || "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"} 
            alt={room.type} 
            className="h-full w-full object-cover min-h-[400px]"
          />
        </div>

        {/* Right: Info Section */}
        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4 block">
            Premium Experience
          </span>
          <h1 className="text-5xl font-black text-slate-900 mb-6">{room.type}</h1>
          
          <div className="space-y-4 mb-10">
            <p className="text-slate-500 text-lg leading-relaxed">
              Enjoy world-class amenities, high-speed Wi-Fi, and a breathtaking view. 
              Perfect for travelers seeking comfort and luxury.
            </p>
            <div className="text-4xl font-black text-slate-900">
              ₹{room.price} <span className="text-lg text-slate-400 font-medium">/ night</span>
            </div>
          </div>

          <button
            disabled={room.status === "Booked"}
            onClick={bookRoom}
            className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-2xl ${
              room.status === "Booked" 
              ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
              : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02] shadow-indigo-200"
            }`}
          >
            {room.status === "Booked" ? "Room Occupied" : "Book This Room"}
          </button>
          
          <p className="mt-6 text-center text-slate-400 text-sm font-medium">
            Free cancellation up to 24 hours before check-in.
          </p>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeReservation } from '../features/reservationSlice';
import { useNavigate, useParams } from 'react-router-dom';

const ReservationForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ checkIn: '', checkOut: '', guests: 1 });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(makeReservation({ ...formData, roomId: id }));
    alert("Booking Successful! 🎉");
    navigate('/reservations');
  };

  return (
    <div className="max-w-xl mx-auto my-20 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
      <h2 className="text-3xl font-black mb-8 text-slate-900">Book Your Stay</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Check-In Date</label>
          <input type="date" required className="w-full p-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" 
            onChange={(e) => setFormData({...formData, checkIn: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Check-Out Date</label>
          <input type="date" required className="w-full p-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setFormData({...formData, checkOut: e.target.value})} />
        </div>
        <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition shadow-2xl shadow-indigo-200">
          Confirm Reservation
        </button>
      </form>
    </div>
  );
};
export default ReservationForm;
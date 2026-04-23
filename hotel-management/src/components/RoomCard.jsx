import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
      <div className="relative">
        <img src={room.image} alt={room.name} className="h-48 w-full object-cover" />
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white ${room.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}`}>
          {room.status}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
        <p className="text-sm text-gray-500 mt-1">Type: {room.type}</p>
        <p className="text-xs text-gray-400 mt-2 font-medium">Features: {room.features}</p>
        
        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <span className="text-2xl font-bold text-blue-600">${room.price}<span className="text-sm text-gray-400 font-normal">/night</span></span>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
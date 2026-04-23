import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../features/roomSlice';
import RoomCard from '../components/RoomCard';

const RoomList = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.rooms);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('none');

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const filteredItems = items
    .filter(item => filter === 'All' || item.type === filter)
    .sort((a, b) => {
      if (sort === 'low') return a.price - b.price;
      if (sort === 'high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-2">Find Your Stay.</h1>
            <p className="text-gray-500 font-medium">Select from our luxury suites and premium rooms.</p>
          </div>
          
          <div className="flex gap-3">
            <select onChange={(e) => setFilter(e.target.value)} className="bg-white border-none shadow-sm rounded-2xl px-5 py-3 focus:ring-2 ring-blue-500">
              <option value="All">All Types</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Executive">Executive</option>
              <option value="Suite">Luxury Suite</option>
            </select>
            <select onChange={(e) => setSort(e.target.value)} className="bg-white border-none shadow-sm rounded-2xl px-5 py-3 focus:ring-2 ring-blue-500">
              <option value="none">Sort Price</option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>
        </div>

        {status === 'loading' ? (
          <div className="flex justify-center py-20 font-bold text-blue-600 animate-pulse">Loading Rooms...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems.map(room => <RoomCard key={room.id} room={room} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomList;
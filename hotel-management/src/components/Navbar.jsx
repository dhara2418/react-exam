import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-slate-200 px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tight">LUXE<span className="text-slate-900">STAY</span></Link>
      <div className="flex items-center gap-8 font-semibold text-slate-600">
        <Link to="/" className="hover:text-indigo-600 transition">Rooms</Link>
        {user && <Link to="/reservations" className="hover:text-indigo-600 transition">My Bookings</Link>}
        {user ? (
          <button onClick={() => auth.signOut()} className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm hover:bg-indigo-600 transition shadow-lg">Sign Out</button>
        ) : (
          <Link to="/login" className="bg-indigo-600 text-white px-8 py-2.5 rounded-full text-sm shadow-xl shadow-indigo-200">Sign In</Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
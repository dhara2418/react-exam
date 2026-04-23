import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  return user ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
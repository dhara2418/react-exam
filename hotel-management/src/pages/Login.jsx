import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account Created! 🎉");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
        <h2 className="text-4xl font-black text-center mb-8 text-slate-900">
          {isRegistering ? "Join Us" : "Welcome Back"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="email" placeholder="Email Address" 
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-xl shadow-indigo-100">
            {isRegistering ? "Create Account" : "Sign In"}
          </button>
        </form>
        <p className="mt-8 text-center text-slate-500 font-medium">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="ml-2 text-indigo-600 font-bold hover:underline"
          >
            {isRegistering ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
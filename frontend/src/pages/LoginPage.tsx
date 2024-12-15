import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { SiteHeader } from '@/components/site-header';
import { NavBar } from '@/components/nav-bar';
import { api } from '../context/AuthContext';

interface LoginCredentials {
  username: string; // email
  password: string;
}

function LoginPage() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/login', credentials);

      if (response.data.status === 'success') {
        await login({
          token: response.data.token,
          user: response.data.user
        });
        toast.success('Logged in successfully!');
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen max-w-6xl mx-auto p-6 space-y-4">
      <SiteHeader />
      
      <NavBar />
      
      <div className=" flex items-center justify-center   ">
        <form 
          onSubmit={handleSubmit}
          className="bg-black/50 p-8 rounded-lg border border-neon-green space-y-4 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-neon-green text-center mb-6">
            Login
          </h2>

          <div className="space-y-2">
            <input
              type="email"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 bg-black/30 border border-neon-green/50 rounded text-neon-green placeholder-neon-green/50 focus:outline-none focus:border-neon-green"
              required
            />
          </div>

          <div className="space-y-2">
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 bg-black/30 border border-neon-green/50 rounded text-neon-green placeholder-neon-green/50 focus:outline-none focus:border-neon-green"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-neon-green/20 text-neon-green border border-neon-green rounded hover:bg-neon-green/30 transition-all duration-300 font-bold"
          >
            Login
          </button>

          <p className="text-center text-neon-green/70 mt-4">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="text-neon-green hover:text-neon-yellow transition-colors"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;


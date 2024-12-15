import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: 'https://nine0-s-blog-api.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

interface User {
  firstname: string;
  lastname: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: { token: string; user: User }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Try to get user from localStorage on initial load
    const token = localStorage.getItem("token");
    if (!token) return null;
    
    // Set token in axios headers
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return null; // Will be updated by useEffect
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await api.get("/user/profile");
        
        if (response.data.status === "success") {
          setUser(response.data.data.user);
        } else {
          // If response is not successful, clear everything
          localStorage.removeItem("token");
          delete api.defaults.headers.common['Authorization'];
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // On error, clear everything
        localStorage.removeItem("token");
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  const login = async (userData: { token: string; user: User }) => {
    try {
      localStorage.setItem("token", userData.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      setUser(userData.user);
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common['Authorization'];
    toast.success("Logged out successfully");
  };

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook with type safety
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
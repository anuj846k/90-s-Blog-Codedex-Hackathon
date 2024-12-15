import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { SiteHeader } from "@/components/site-header";
import { NavBar } from "@/components/nav-bar";
import { api } from '../context/AuthContext';

interface SignUpFormData {
  firstname: string;
  lastname: string;
  username: string; // This will be the email
  password: string;
}

export default function SignUpPage() {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstname: "",
    lastname: "",
    username: "", // email
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make signup request to backend
      const response = await api.post(
        "/user/signup",
        formData
      );

      if (response.data.status === "success") {
        // Log the user in automatically after successful signup
        await login({
          token: response.data.token,
          user: response.data.data.user,
        });

        toast.success("Account created successfully!");
        navigate("/"); // Redirect to home page
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Failed to create account");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen max-w-6xl mx-auto p-4 space-y-4">
      <SiteHeader />

      <NavBar />
      <div className=" flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-black/50 p-8 rounded-lg border border-neon-green space-y-4 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-neon-green text-center mb-6">
            Create Account
          </h2>

          <div className="space-y-2">
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 bg-black/30 border border-neon-green/50 rounded text-neon-green placeholder-neon-green/50 focus:outline-none focus:border-neon-green"
              required
            />
          </div>

          <div className="space-y-2">
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 bg-black/30 border border-neon-green/50 rounded text-neon-green placeholder-neon-green/50 focus:outline-none focus:border-neon-green"
              required
            />
          </div>

          <div className="space-y-2">
            <input
              type="email"
              name="username"
              value={formData.username}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 bg-black/30 border border-neon-green/50 rounded text-neon-green placeholder-neon-green/50 focus:outline-none focus:border-neon-green"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-neon-green/20 text-neon-green border border-neon-green rounded hover:bg-neon-green/30 transition-all duration-300 font-bold"
          >
            Sign Up
          </button>

          <p className="text-center text-neon-green/70 mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-neon-green hover:text-neon-yellow transition-colors"
            >
              Log In
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}

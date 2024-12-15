"use client";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, ChevronDown, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function NavBar() {
  const pathname = useLocation();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const commonNavItems = [{ href: "/", label: "Home" }];

  const authNavItems = user
    ? [
        { href: "/publish-post", label: "Publish Blog" },
        { href: "/all-blogs", label: "Blogs" },

      ]
    : [
        { href: "/login", label: "Login" },
        { href: "/signup", label: "Sign Up" },
        { href: "/all-blogs", label: "Blogs" },
      ];

  const navItems = [...commonNavItems, ...authNavItems];

  return (
    <nav className="bg-black/80 text-green-400 border-4 border-green-600 p-3  font-['VT323'] rounded-lg shadow-[0_0_10px_rgba(0,255,0,0.7)]">
      <div className="flex justify-center items-center">
        <ul className="hidden md:flex justify-center space-x-4 sm:space-x-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`
                  px-4 py-2 
                  text-xl font-bold 
                  uppercase 
                  border-2 
                  transition-all 
                  duration-200 
                  ${
                    pathname.pathname === item.href
                      ? "bg-green-600 text-black border-green-400 shadow-[0_0_5px_rgba(0,255,0,0.7)]"
                      : "bg-black text-green-400 border-green-600 hover:bg-green-800 hover:border-green-400"
                  }
                  transform 
                  active:translate-y-1 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-green-400
                `}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Profile Dropdown */}
        <div className="hidden md:block" ref={dropdownRef}>
          {user && (
            <div className="relative ml-7">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-1 bg-green-600/20 text-green-400 border-2 border-green-600 rounded hover:bg-green-600/30"
              >
                <User className="h-4 w-4" />
                <span>{user.firstname}</span>
                <ChevronDown
                  className={`h-4 w-4 transform transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/90 border-2 border-green-600 rounded-lg shadow-lg z-50">
                  <div className="py-1">
                    <Link
                      to="/all-blogs"
                      className="block px-4 py-2 text-green-400 hover:bg-green-600/20"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Blogs
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-green-400 hover:bg-green-600/20"
                    >
                      <div className="flex items-center space-x-2">
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-green-400 hover:text-green-300"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block px-4 py-2 text-green-400 hover:bg-green-600/20 rounded"
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-green-400 hover:bg-green-600/20 rounded"
            >
              <div className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </div>
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpaceBackground from "./components/SpaceBackground";
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import {PostPage} from "./pages/PostPage";
import SamplePage from "./pages/SamplePostPage";

import { BlogPosts } from "./pages/All-blogs";
import PublishPosts from './pages/PublishPosts';

const App: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <SpaceBackground />
      <div className="relative z-10">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/publish-post" element={<PublishPosts />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/all-blogs" element={<BlogPosts />} />
            <Route path="/sample-post/:id" element={<SamplePage/>} />
            <Route path="*" element={<h5>Not Found</h5>} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;


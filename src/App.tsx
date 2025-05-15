import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import LoginPage from "@/pages/login";
import ProfilePage from "@/pages/profile";
import EditProfilePage from "@/pages/edit-profile";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}

export default App;

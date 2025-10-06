import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Rules from "./pages/Rules";
import Join from "./pages/Join";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Maps from "./pages/Maps";
import Feedback from "./pages/Feedback";
import Chatbot from "./pages/Chatbot";
import ManagerDashboard from "./pages/ManagerDashboard";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/join" element={<Join />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Member Routes - Protected in production */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/premium" element={<Premium />} />
          
          {/* Manager-Only Route - Should be protected by auth */}
          <Route path="/manager" element={<ManagerDashboard />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

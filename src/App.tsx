
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeWrapper from "@/components/customization/ThemeWrapper";
import ThemeCustomizer from "@/components/customization/ThemeCustomizer";
import LayoutCustomizer from "@/components/customization/LayoutCustomizer";

import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Report from "./pages/Report";
import Track from "./pages/Track";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import MapView from "./pages/MapView";
import Contact from "./pages/Contact";
import Customize from "./pages/Customize";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemeWrapper>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="report" element={<Report />} />
                  <Route path="track" element={<Track />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="map" element={<MapView />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="about" element={<About />} />
                  <Route path="customize" element={<Customize />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <ThemeCustomizer />
            <LayoutCustomizer />
          </TooltipProvider>
        </ThemeWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;

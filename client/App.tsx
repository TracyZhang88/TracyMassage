import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import AdminAppointments from "./pages/AdminAppointments";
import Gallery from "./pages/Gallery";
import Employment from "./pages/Employment";
import Price from "./pages/Price";
import Layout from "./components/site/Layout";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointments" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/employment" element={<Employment />} />
            <Route path="/price" element={<Price />} />
            <Route path="/admin/appointments" element={<AdminAppointments />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

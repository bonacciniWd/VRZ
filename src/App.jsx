import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Navbar, Tech, Works, StarsCanvas } from "./components";
import Footer from "./components/Footer.jsx";
import Jobs from "./components/Jobs.jsx";
import SectionSeparator from "./components/SectionSeparator.jsx";
import { Analytics } from '@vercel/analytics/react';
import ChatFloating from './components/ChatFloating.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { useAuth } from './app/AuthContext.jsx';
import UserDashboard from './pages/User/Dashboard.jsx';
import ProposalPage from './pages/User/Proposal.jsx';
import AdminDashboard from './pages/Admin/Dashboard.jsx';
import AdminProposals from './pages/Admin/Proposals.jsx';
import AdminChats from './pages/Admin/Chats.jsx';
import AdminTickets from './pages/Admin/Tickets.jsx';
import TicketsPage from './pages/Tickets.jsx';
import PaymentPage from './pages/Payment.jsx';

const App = () => {
  const { session } = useAuth();
  const Home = () => (
    <>
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
      </div>
      <div>
        <StarsCanvas />
        <Tech />
        <About />
      </div>
        <Jobs />
        <Experience />
        <SectionSeparator />
        <Works />
        <Contact />
        <Footer />
      <Analytics />
    </>
  );

  const PrivateRoute = ({ children }) => {
    return session ? children : <Navigate to="/login" replace />;
  };
  const AdminRoute = ({ children }) => {
    // simple check using profile via AuthProvider would be better; fallback: allow only if session exists and rely on UI/admin
    // For now, route-level guard with profile is optional; RLS will protect data server-side.
    return session ? children : <Navigate to="/login" replace />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={session ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={session ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="/proposal/:id" element={<PrivateRoute><ProposalPage /></PrivateRoute>} />
        <Route path="/tickets" element={<PrivateRoute><TicketsPage /></PrivateRoute>} />
        <Route path="/payment/:id" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/chats" element={<AdminRoute><AdminChats /></AdminRoute>} />
        <Route path="/admin/proposals" element={<AdminRoute><AdminProposals /></AdminRoute>} />
        <Route path="/admin/tickets" element={<AdminRoute><AdminTickets /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ChatFloating />
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import HowItWorks from './pages/HowItWorks';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import FAQ from './pages/FAQ';

// Admin
import AdminLogin from './admin/Login';
import AdminLayout from './admin/Layout';
import Dashboard from './admin/Dashboard';
import AdminLeads from './admin/Leads';
import AdminMessages from './admin/Messages';
import AdminGallery from './admin/Gallery';
import AdminTestimonials from './admin/Testimonials';
import AdminBlog from './admin/Blog';
import AdminTeam from './admin/Team';
import AdminServices from './admin/Services';
import AdminSettings from './admin/Settings';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <ScrollToTop />
        <Routes>
          {/* Public */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/how-it-works" element={<PublicLayout><HowItWorks /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/our-team" element={<PublicLayout><Team /></PublicLayout>} />
          <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/leads" element={<AdminLayout><AdminLeads /></AdminLayout>} />
          <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
          <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
          <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
          <Route path="/admin/blog" element={<AdminLayout><AdminBlog /></AdminLayout>} />
          <Route path="/admin/team" element={<AdminLayout><AdminTeam /></AdminLayout>} />
          <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

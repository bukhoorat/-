import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SiteDataProvider } from './context/SiteDataContext.jsx'
import { MusicProvider } from './context/MusicContext.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AnnouncementBar from './components/AnnouncementBar.jsx'
import MusicEntry from './components/MusicEntry.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import Home from './pages/Home.jsx'
import Collection from './pages/Collection.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import OurStory from './pages/OurStory.jsx'
import Contact from './pages/Contact.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

function ScrollToHash() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
        <SiteDataProvider>
        <MusicProvider>
          <MusicEntry />
          <ScrollToTop />
          <ScrollToHash />
          <div className="app">
            <AnnouncementBar />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <MusicPlayer />
        </MusicProvider>
        </SiteDataProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}

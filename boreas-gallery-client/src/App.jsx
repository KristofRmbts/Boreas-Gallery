import './App.css'
import { Routes, Route } from "react-router-dom"

// Pages
import HomePage from './pages/HomePage'
import ExhibitionsPage from './pages/ExhibitionsPage'
import ArtistsPage from './pages/ArtistsPage'
import ShopPage from './pages/shop/ShopPage'
import ItemDetailsPage from './pages/shop/ItemDetailsPage'
import AboutPage from './pages/AboutPage'
import TakePartPage from './pages/TakePartPage'
import ContactPage from './pages/ContactPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

// Components
// import IsPrivate from "./components/IsPrivate"
import IsAnon from "./components/IsAnon"
import Header from './components/Header'
import Footer from './components/Footer'
import NoRightClick from './components/NoRightClick'

import AdminPage from './pages/admin/AdminPage'

function App() {

  return (
    <div className='App'>
      <NoRightClick />
      <div className='app-height-container'>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exhibitions" element={<ExhibitionsPage />} />
          <Route path="/artists" element={<ArtistsPage />} />

          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:itemId" element={<ItemDetailsPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/takepart" element={<TakePartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon> } /> 
          <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } />

          <Route path="/admin" element={ <AdminPage /> } />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App

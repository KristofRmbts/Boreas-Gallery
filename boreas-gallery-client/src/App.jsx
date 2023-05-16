import './App.css'
import { Routes, Route } from "react-router-dom"

// Pages
import HomePage from './pages/HomePage'
import ExhibitionsPage from './pages/exhibitions/ExhibitionsPage'
import ArtistsPage from './pages/ArtistsPage'
import ShopPage from './pages/shop/ShopPage'
import ItemDetailsPage from './pages/shop/ItemDetailsPage'
import EditItemPage from './pages/shop/EditItemPage'
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
import IsPrivate from './components/IsPrivate'

function App() {

  return (
    <div className='App'>
      <NoRightClick />
      <div className='app-height-container'>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exhibitions" element={<ExhibitionsPage />} />
          {/* <Route path="/exhibitions/:exhibitionId" element={<ExhibitionsPage />} />
          <Route path="/exhibitions/:exhibitionId/edit" element={<ExhibitionsPage />} /> */}

          <Route path="/artists" element={<ArtistsPage />} />

          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:itemId" element={<ItemDetailsPage />} />
          <Route exact path="/shop/:itemId/edit" element={ <EditItemPage />} /> 

          <Route path="/about" element={<AboutPage />} />
          <Route path="/takepart" element={<TakePartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon> } /> 
          <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } />

          <Route path="/admin" element={ <IsPrivate><AdminPage /></IsPrivate> } />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App

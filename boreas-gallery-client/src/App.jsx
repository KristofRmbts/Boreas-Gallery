import './App.css'
import { Routes, Route } from "react-router-dom"

// Pages
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

// Components
// import IsPrivate from "./components/IsPrivate"
import IsAnon from "./components/IsAnon"
import Header from './components/Header'
import Footer from './components/Footer'
import NoRightClick from './components/NoRightClick'

function App() {

  return (
    <div className='App'>
      <NoRightClick />
      <div className='app-height-container'>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />                    
          <Route path="/signup" element={ <IsAnon> <SignupPage /> </IsAnon> } /> 
          <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon> } />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App

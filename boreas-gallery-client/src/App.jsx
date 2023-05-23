import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";

import ExhibitionsPage from "./pages/ExhibitionsPage";
import PreviousExhibitionsPage from "./pages/PreviousExhibitions";
import AddExhibitionPage from "./pages/AddExhibitionPage";
import EditExhibitionPage from "./pages/EditExhibitionPage";
import ExhibitionDetailPage from "./pages/ExhibitionDetailPage";

import ArtistsPage from "./pages/ArtistsPage";
import AddArtistPage from "./pages/AddArtistPage";
import EditArtistPage from "./pages/EditArtistPage";
import ArtistDetailsPage from "./pages/ArtistDetailsPage";

import ShopPage from "./pages/ShopPage";
import AddItemPage from "./pages/AddItemPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import EditItemPage from "./pages/EditItemPage";

import AboutPage from "./pages/AboutPage";
import TakePartPage from "./pages/TakePartPage";

import AdminPage from "./pages/AdminPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

// Components
import IsAnon from "./components/IsAnon";
import IsAdmin from "./components/IsAdmin";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NoRightClick from "./components/NoRightClick";

function App() {
  return (
    <div className="App">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"></link>
      <NoRightClick />
      <div className="app-height-container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exhibitions" element={<ExhibitionsPage />} />
          <Route
            path="/exhibitions/:exhibitionId"
            element={<ExhibitionDetailPage />}
          />
          <Route
            path="/exhibitions/previous"
            element={<PreviousExhibitionsPage />}
          />
          <Route
            path="/exhibitions/add"
            element={
              <IsAdmin>
                <AddExhibitionPage />
              </IsAdmin>
            }
          />
          <Route
            path="/exhibitions/:exhibitionId/edit"
            element={
              <IsAdmin>
                <EditExhibitionPage />
              </IsAdmin>
            }
          />

          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/artists/:artistId" element={<ArtistDetailsPage />} />
          <Route
            path="/artists/add"
            element={
              <IsAdmin>
                <AddArtistPage />
              </IsAdmin>
            }
          />
          <Route
            path="/artists/:artistId/edit"
            element={
              <IsAdmin>
                <EditArtistPage />
              </IsAdmin>
            }
          />

          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:itemId" element={<ItemDetailsPage />} />
          <Route
            path="/shop/add"
            element={
              <IsAdmin>
                <AddItemPage />
              </IsAdmin>
            }
          />
          <Route
            exact
            path="/shop/:itemId/edit"
            element={
              <IsAdmin>
                <EditItemPage />
              </IsAdmin>
            }
          />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/takepart" element={<TakePartPage />} />

          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignupPage />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <LoginPage />
              </IsAnon>
            }
          />

          <Route
            path="/admin"
            element={
              <IsAdmin>
                <AdminPage />
              </IsAdmin>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

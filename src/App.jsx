import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";

// Admin Components
import Admin from "./pages/Admin";

// User Components
import User from "./pages/User";
import CardDetails from "./components/user/CardDetails";
import Cart from "./components/user/Cart";
import Checkout from "./components/user/Checkout";

// Common Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes basename="/printingPress">
              {/* Admin Routes */}
              <Route path="/admin/*" element={<Admin />} />

              {/* User Routes */}
              <Route path="/" element={<User />} />
              <Route path="/card/:id" element={<CardDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

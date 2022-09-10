import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/bundle";

import React from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useStateValue } from "./context/StateProvider";

import { Header, Footer, PrivateRoute, CartContainer, ProductModal, ScrollTop } from "./components";
import { Home, Menu, Checkout, Order, NotFound, Contact, ProductDetail, SignIn, SignUp, Management } from "./pages";

function App() {
  const [{ cartShow, modalShow }, dispatch] = useStateValue();

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col">
        <Header/>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route
            path="manage/*"
            element={
              <PrivateRoute>
                <Management />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {cartShow && <CartContainer />}
        {modalShow && <ProductModal />}
        <Footer />
        <ScrollTop />
      </div>
    </AnimatePresence>
  );
}

export default App;

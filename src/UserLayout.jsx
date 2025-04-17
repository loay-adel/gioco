import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Error from "./components/pages/error";

import LanguageSelection from "./components/pages/LanguageSelection";
import Home from "./components/pages/Home";
import Table from "./components/pages/Table";
import Cart from "./components/pages/Cart";

const UserLayout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<LanguageSelection />} />
        <Route path="home" element={<Home />} />
        <Route path="table" element={<Table />} />
        <Route path="cart" element={<Cart />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default UserLayout;

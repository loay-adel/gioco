import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Error from "./components/pages/error";

import LanguageSelection from "./components/pages/LanguageSelection";
import Home from "./components/pages/Home";
import Table from "./components/pages/Table";
import Cart from "./components/pages/Cart";
import AdminLogin from "./components/pages/AdminLogin";
const UserLayout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<LanguageSelection />} />
        <Route path="home" element={<Home />} />
        <Route path="table" element={<Table />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
        <Route path="signin" element={<AdminLogin />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default UserLayout;

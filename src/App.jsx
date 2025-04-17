import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </CartProvider>
  );
}

export default App;

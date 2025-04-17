// import { Route, Routes } from "react-router-dom";
// import Dashboard from "./components/pages/admin-view/Dashboard";
// import AddCategory from "./components/pages/admin-view/AddCategory";

// const AdminLayout = () => {
//   return (
//     <Routes>
//       <Route element={<Dashboard />} />
//       <Route index element={<AddCategory />}></Route>

//       {/* <Route path="/admin" element={loggedUser.role == 'admin'?<Dashboard/>:<Home/>}/> */}
//     </Routes>
//   );
// };

// export default AdminLayout;
// import { Route, Routes } from "react-router-dom";
// import Dashboard from "./components/pages/admin-view/Dashboard";
// import AddCategory from "./components/pages/admin-view/AddCategory";

// const AdminLayout = () => {
//   return (
//     <Routes>
//       <Route element={<Dashboard />} />
//       <Route index element={<AddCategory />}></Route>

//       {/* <Route path="/admin" element={loggedUser.role == 'admin'?<Dashboard/>:<Home/>}/> */}
//     </Routes>
//   );
// };

// export default AdminLayout;
import { Routes, Route, Outlet } from "react-router-dom";
import AdminView from "./components/pages/admin-view/AdminView";
import CategoriesPanel from "./components/pages/admin-view/CategoriesPanel";
import MenuItemsPanel from "./components/pages/admin-view/MenuItemsPanel";
import OrdersPanel from "./components/pages/admin-view/OrdersPanel";

const AdminLayout = () => {
  return (
    <Routes>
      <Route element={<AdminView />}>
        <Route index element={<CategoriesPanel />} /> {/* Default admin view */}
        <Route path="categories" element={<CategoriesPanel />} />
        <Route path="menu-items" element={<MenuItemsPanel />} />
        <Route path="orders" element={<OrdersPanel />} />
      </Route>
    </Routes>
  );
};

export default AdminLayout;

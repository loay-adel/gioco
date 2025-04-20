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
import MenuItemPanel from "./components/pages/admin-view/MenuItemsPanel";
import OrdersPanel from "./components/pages/admin-view/OrdersPanel";
import Dashboard from "./components/pages/admin-view/Dashboard";
const AdminLayout = () => {
  return (
    <Routes>
      <Route element={<AdminView />}>
        <Route index element={<Dashboard />}></Route>
        <Route path="menu" element={<MenuItemPanel />} />
        <Route path="orders" element={<OrdersPanel />} />
      </Route>
    </Routes>
  );
};

export default AdminLayout;

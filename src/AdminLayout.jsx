import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/admin-view/Dashboard";

const AdminLayout = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      {/* <Route path="/admin" element={loggedUser.role == 'admin'?<Dashboard/>:<Home/>}/> */}
    </Routes>
  );
};

export default AdminLayout;

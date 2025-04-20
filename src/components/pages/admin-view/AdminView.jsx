import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiList,
  FiTag,
  FiShoppingCart,
  FiLogOut,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function AdminView() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem("adminSession");
    if (!session) {
      Swal.fire({
        icon: "error",
        title: "Unauthorized",
        text: "You must be signed in as admin to access this page.",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/signin", { replace: true });
      });
    }
  }, [navigate]);

  function signout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign me out",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminSession");
        navigate("/");
      }
    });
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: FiGrid },
    { name: "Menu Items", href: "/admin/menu", icon: FiList },
    { name: "Orders", href: "/admin/orders", icon: FiShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="ltr">
      {/* Sidebar */}
      <div className="fixed inset-y-0 z-10 flex w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Restaurant Admin</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
            onClick={signout}
          >
            <FiLogOut className="mr-3 h-5 w-5" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

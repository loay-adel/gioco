import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiList,
  FiTag,
  FiShoppingCart,
  FiSettings,
  FiLogOut,
  FiPlus,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

export default function AdminView() {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: FiGrid },
    { name: "Menu Items", href: "/admin/menu", icon: FiList },
    { name: "Categories", href: "/admin/categories", icon: FiTag },
    { name: "Orders", href: "/admin/orders", icon: FiShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100">
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

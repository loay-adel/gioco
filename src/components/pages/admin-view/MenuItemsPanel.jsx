import { useState, useEffect } from "react";
import { api } from "../../../api/api";
import { Spinner } from "@material-tailwind/react";
import MenuItemForm from "./MenuItemForm"; // Add this import

export default function MenuItemsPanel() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [itemsRes, catsRes] = await Promise.all([
        api.get("/menu-items"),
        api.get("/categories"),
      ]);
      setMenuItems(itemsRes.data);
      setCategories(catsRes.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-md">
        {error}{" "}
        <button onClick={fetchData} className="text-blue-500 ml-2">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Menu Items</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-medium mb-2">Add New Menu Item</h3>
        <MenuItemForm categories={categories} onSuccess={fetchData} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {menuItems.map((item) => (
              <tr key={item.id}>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">${item.price.toFixed(2)}</td>
                <td className="py-3 px-4">{item.category?.name}</td>
                <td className="py-3 px-4 space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { api } from "../../../api/api";

import { FaPencil, FaCircleXmark } from "react-icons/fa6";
import { FaTrash, FaCheck } from "react-icons/fa";

export default function OrdersPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      fetchOrders(); // Refresh the list
    } catch (err) {
      setError(`Failed to update order: ${err.message}`);
    }
  };

  // Delete order
  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await api.delete(`/orders/${orderId}`);
      fetchOrders(); // Refresh the list
    } catch (err) {
      setError(`Failed to delete order: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center py-8">Loading orders...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Table #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {order.tableNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <ul className="list-disc pl-5">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.quantity}x {item.name || `Item ID: ${item.id}`}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "preparing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "ready"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {order.status !== "delivered" && (
                      <button
                        onClick={() => updateStatus(order.id, "delivered")}
                        className="text-green-600 hover:text-green-900"
                        title="Mark as delivered"
                      >
                        <FaCheck className="h-5 w-5" />
                      </button>
                    )}
                    {order.status !== "cancelled" && (
                      <button
                        onClick={() => updateStatus(order.id, "cancelled")}
                        className="text-red-600 hover:text-red-900"
                        title="Cancel order"
                      >
                        <FaCircleXmark className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="text-gray-600 hover:text-gray-900"
                      title="Delete order"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

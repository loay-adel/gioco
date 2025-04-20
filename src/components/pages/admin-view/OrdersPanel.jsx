import { useState } from "react";
import { FaTrash, FaCheck, FaSync } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useCart } from "../../../context/CartContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function OrdersPanel() {
  const { orders, updateOrderStatus, setOrders } = useCart();
  const [refreshing, setRefreshing] = useState(false);

  const getNextStatusOptions = (currentStatus) => {
    switch (currentStatus) {
      case "pending":
        return [
          { value: "preparing", label: "Mark as Preparing" },
          { value: "ready_to_pickup", label: "Mark as Ready to Pickup" },
          { value: "cancelled", label: "Cancel Order" },
        ];
      case "preparing":
        return [
          { value: "ready_to_pickup", label: "Mark as Ready to Pickup" },
          { value: "cancelled", label: "Cancel Order" },
        ];
      case "ready_to_pickup":
        return [
          { value: "done", label: "Mark as Done (Order Taken)" },
          { value: "cancelled", label: "Cancel Order" },
        ];
      case "done":
        return []; // No further actions for completed orders
      default:
        return [];
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#f3f4f6",
    });

    if (!result.isConfirmed) return;

    try {
      setRefreshing(true);
      const response = await fetch(
        `http://localhost:8080/api/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete order");
      }

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );

      await MySwal.fire("Deleted!", "Your order has been deleted.", "success");
    } catch (error) {
      await MySwal.fire(
        "Error!",
        error.message || "Failed to delete order",
        "error"
      );
    } finally {
      setRefreshing(false);
    }
  };

  const calculateTotal = (products) => {
    return products.reduce((sum, product) => sum + product.price, 0);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    const result = await MySwal.fire({
      title: "Confirm Status Update",
      text: `Are you sure you want to mark order #${orderId} as ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      background: "#f3f4f6",
    });

    if (!result.isConfirmed) return;

    try {
      setRefreshing(true);
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order #${orderId} status updated to ${newStatus}`);
    } catch (err) {
      toast.error(`Failed to update order status: ${err.message}`);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Orders</h2>
        <button
          onClick={() => window.location.reload()}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-400"
        >
          <FaSync className={`${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
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
                  Date/Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {order.tableNumber || "Takeaway"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {calculateTotal(order.products)?.toFixed(2)} ر.ي
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc pl-5">
                      {order.products.map((product, index) => (
                        <li key={index}>
                          {product.name} - {product.price.toFixed(2)} ر.ي
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
                          : order.status === "ready_to_pickup"
                          ? "bg-green-100 text-green-800"
                          : order.status === "done"
                          ? "bg-purple-100 text-purple-800"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {getNextStatusOptions(order.status).map((option) => (
                        <button
                          key={option.value}
                          onClick={() =>
                            handleStatusUpdate(order.id, option.value)
                          }
                          className={`${
                            option.value === "cancelled"
                              ? "text-red-600 hover:text-red-900"
                              : "text-green-600 hover:text-green-900"
                          }`}
                          title={option.label}
                        >
                          {option.value === "cancelled" ? (
                            <FaCircleXmark className="h-5 w-5" />
                          ) : (
                            <FaCheck className="h-5 w-5" />
                          )}
                        </button>
                      ))}
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
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
      )}
    </div>
  );
}

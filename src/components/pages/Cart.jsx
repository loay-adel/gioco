import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
    tableNum,
    settableNum,
    language,
    orders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
  } = useCart();

  const { t } = useTranslation();

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    if (pathParts.includes("add") && pathParts.length === 4) {
      const itemId = parseInt(pathParts[3]);
      const newItem = {
        id: itemId,
        name: `Item ${itemId}`,
        price: 15,
        quantity: 1,
      };
      addToCart(newItem);
      navigate("/cart");
    }
  }, [location, addToCart, navigate]);

  const handleRemoveItem = async (itemId, itemName) => {
    const result = await MySwal.fire({
      title: t("remove_item_confirm"),
      text: t("remove_item_message", { item: itemName }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("remove"),
      cancelButtonText: t("cancel"),
      background: "#f3f4f6",
      customClass: {
        container: language === "ar" ? "swal-rtl" : "",
        title: language === "ar" ? "text-right" : "",
        htmlContainer: language === "ar" ? "text-right" : "",
        confirmButton: language === "ar" ? "mr-auto" : "",
      },
    });

    if (result.isConfirmed) {
      removeFromCart(itemId);
      await MySwal.fire({
        title: t("removed"),
        text: t("item_removed"),
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#f3f4f6",
      });
    }
  };

  const handleOrder = async () => {
    let tableNumber = tableNum;

    if (!tableNumber) {
      const { value, isConfirmed } = await MySwal.fire({
        title: t("enter_table_prompt"),
        input: "text",
        inputPlaceholder: t("table_number_placeholder"),
        inputValidator: (value) => {
          if (!value && value !== "Takeaway") {
            return t("table_number_required");
          }
        },
        showCancelButton: true,
        confirmButtonText: t("confirm"),
        cancelButtonText: t("cancel"),
        background: "#f3f4f6",
        customClass: {
          container: language === "ar" ? "swal-rtl" : "",
          title: language === "ar" ? "text-right" : "",
          htmlContainer: language === "ar" ? "text-right" : "",
          confirmButton: language === "ar" ? "mr-auto" : "",
        },
      });

      if (!isConfirmed) return;
      tableNumber = value || "Takeaway";
      settableNum(tableNumber);
    }

    try {
      const orderData = {
        customerName: "Guest",
        tableNumber: tableNumber,
        status: "pending",
        productIds: cart.map((item) => item.id),
      };

      const newOrder = await createOrder(orderData);
      clearCart();

      await MySwal.fire({
        title: t("order_success_title"),
        text: t("order_created", { id: newOrder.id }),
        icon: "success",
        confirmButtonText: t("ok"),
        background: "#f3f4f6",
        customClass: {
          container: language === "ar" ? "swal-rtl" : "",
          title: language === "ar" ? "text-right" : "",
          htmlContainer: language === "ar" ? "text-right" : "",
          confirmButton: language === "ar" ? "mr-auto" : "",
        },
      });

      navigate("/home");
    } catch (error) {
      await MySwal.fire({
        title: t("order_error_title"),
        text: error.message || t("order_error_message"),
        icon: "error",
        confirmButtonText: t("ok"),
        background: "#f3f4f6",
        customClass: {
          container: language === "ar" ? "swal-rtl" : "",
          title: language === "ar" ? "text-right" : "",
          htmlContainer: language === "ar" ? "text-right" : "",
          confirmButton: language === "ar" ? "mr-auto" : "",
        },
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 p-4"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">{t("cart")}</h1>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">{t("empty_cart")}</p>
            <Button onClick={() => navigate("/home")}>{t("go_back")}</Button>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.quantity}`}
                  className="py-4 flex flex-col sm:flex-row justify-between items-center gap-4"
                >
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-blue-600">
                      {item.price.toFixed(2)} {t("sar")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.quantity - 1);
                          } else {
                            handleRemoveItem(item.id, item.name);
                          }
                        }}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-red-500 hover:text-red-700"
                      aria-label={t("remove_item")}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>{t("total")}:</span>
                <span>
                  {totalPrice.toFixed(2)} {t("sar")}
                </span>
              </div>
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                onClick={handleOrder}
              >
                {t("confirm_order")}
              </button>
              <Button
                className="w-full bg-red-500 text-white py-3 mt-2 rounded-lg hover:bg-red-700 transition"
                onClick={() => navigate("/home")}
              >
                {t("continue_shopping")}
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Orders Section */}
      {orders.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">{t("previous_orders")}</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">
                      {t("order")} #{order.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.orderDate).toLocaleString()}
                    </p>
                    <p className="mt-1">
                      {t("table")}: {order.tableNumber || t("takeaway")}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "preparing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "ready"
                        ? "bg-green-100 text-green-800"
                        : order.status === "delivered"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="font-medium">{t("items")}:</h4>
                  <ul className="list-disc pl-5 mt-1">
                    {order.products?.map((product, index) => (
                      <li key={index} className="text-sm">
                        {product.name} - {product.price.toFixed(2)} {t("sar")}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <p className="font-medium">
                    {t("total")}:{" "}
                    {order.products
                      ?.reduce((sum, product) => sum + product.price, 0)
                      .toFixed(2)}{" "}
                    {t("sar")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

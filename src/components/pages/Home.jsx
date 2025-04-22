import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [showCart, setShowCart] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    tableNum,
    orders,
    language: cartLanguage,
  } = useCart();

  // Sync language between cart context and i18n
  // useEffect(() => {
  //   if (cartLanguage && i18n.language !== cartLanguage) {
  //     i18n.changeLanguage(cartLanguage);
  //   }
  // }, [cartLanguage, i18n]);

  // Categories data
  const categories = [
    { id: "ice cream", name: t("ice_cream"), icon: "icecream logo.png" },
    { id: "drinks", name: t("drinks"), icon: "drinks.png" },
    { id: "food", name: t("food"), icon: "food logo.png" },
    { id: "all", name: t("all"), icon: "clipboard.png" },
  ];

  // Fetch menu items from API based on language
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const lang = i18n.language;

        const response = await fetch(
          `http://localhost:8080/api/products/lang/${lang}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        // Fallback to default items if API fails
        setMenuItems(
          Array.from({ length: 14 }, (_, i) => ({
            id: i + 1,
            name: t(`food_item_${i + 1}`),
            price: i === 10 || i === 11 ? 12 : i === 12 ? 8 : i === 13 ? 6 : 15,
            image: "/placeholder.jpg",
            category: "food",
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [i18n.language, t]);

  // Filter menu items based on active tab
  const filteredItems = menuItems.filter(
    (item) => activeTab === "all" || item.category === activeTab
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pt-2 bg-gray-50 pb-20"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Table Number Display */}
      <div className="flex justify-center items-center mx-auto my-5 min-w-72 max-w-sm h-12 bg-primaryBackground text-primaryText border-2 border-primaryBorder">
        <span className="pl-2">{t("your_table_number")} :</span>
        <span className="mx-2 p-2 rounded text-primaryGreen">
          {tableNum ? (
            <span>
              {t("table")} {tableNum}
            </span>
          ) : (
            <span className="text-primaryRED">{t("chooseTable")}</span>
          )}
        </span>
      </div>
      {/* order Statue */}
      <div className="flex justify-center items-center">
        {orders.length === 0 ? (
          <span></span>
        ) : (
          <ul className="bg-white p-4 rounded-lg shadow-md max-w-md w-full">
            {orders.map((order) => (
              <li key={order.id} className="mb-4 p-3 border-b last:border-b-0">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Order #{order.id}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "preparing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "ready_to_pickup"
                        ? "bg-green-100 text-green-800"
                        : order.status === "done"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {t(order.status.replace(/_/g, " "))}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Table: {order.tableNumber || "Takeaway"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto p-4 space-x-4 justify-center">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`flex flex-col items-center min-w-[100px] p-2 rounded-xl cursor-pointer ${
              activeTab === category.id ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
              <img
                src={category.icon}
                alt={category.name}
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-sm text-center">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-primaryBlue-900 rounded-xl p-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img
                src={item.imageUrl || "/placeholder.jpg"}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between flex-col">
              <span className="text-lg font-medium text-white block">
                {item.name}
              </span>

              <div className="flex items-center flex-row justify-between w-full">
                <span className="text-white">
                  {item.price} {t("sar")}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className=" bg-white p-2 rounded-lg hover:bg-primaryBlue-100 transition"
                  aria-label={t("add_to_cart")}
                >
                  🛒
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-10 hover:bg-blue-700 transition"
          aria-label={t("view_cart")}
        >
          🛒
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            {totalItems}
          </span>
        </button>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-end">
          <div
            className={`bg-white w-full max-w-md h-full overflow-y-auto ${
              i18n.language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {/* Cart Header */}
            <div className="p-4 border-b sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{t("cart")}</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label={t("close_cart")}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Cart Content */}
            <div className="p-4">
              {cart.length === 0 ? (
                <p className="text-center py-8 text-gray-500">
                  {t("empty_cart")}
                </p>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b pb-4"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-blue-600">
                            {item.price} {t("sar")} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                            aria-label={t("decrease_quantity")}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                            aria-label={t("increase_quantity")}
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 ml-2 hover:text-red-700"
                            aria-label={t("remove_item")}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="mt-6 border-t pt-4">
                    <span>{t("tax")}:15%</span>
                    <div className="flex justify-between font-bold text-lg mb-4">
                      <span>{t("total")}:</span>
                      <span>
                        {(totalPrice * 15) / 100 + totalPrice} {t("sar")}
                      </span>
                    </div>
                    <button
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                      onClick={() => navigate("/cart")}
                    >
                      {t("confirm_order")}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

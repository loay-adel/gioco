import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

const Home = () => {
  const [activeTab, setActiveTab] = useState("all");

  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const [newTableNum, setnewTableNum] = useState("");
  const { tableNum, settableNum } = useCart();

  const handleChange = () => {
    if (!newTableNum.trim()) {
      alert("Please enter a valid table number");
      return;
    }
    settableNum(newTableNum);
    setnewTableNum("");
  };
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  const categories = [
    { id: "ice cream", name: "icecream", icon: "icecream logo.png" },
    { id: "drinks", name: "drinks", icon: "drinks.png" },
    { id: "food", name: "food", icon: "food logo.png" },
    { id: "all", name: "ALL", icon: "clipboard.png" },
  ];

  const menuItems = [
    {
      id: 1,
      name: "بيتزا دجاج باربكيو",
      price: 15,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 2,
      name: "بيتزا دجاج رانش",
      price: 15,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 3,
      name: "بيتزا خضار",
      price: 15,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 4,
      name: "بيتزا مارجريتا",
      price: 15,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 5,
      name: "بيتزا بيباروني",
      price: 15,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 6,
      name: "بيتزا مكس باربكيو ورانش",
      price: 15,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 7,
      name: "بيتزا مكس خضار وبيباروني",
      price: 15,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 8,
      name: "عش البلبل",
      price: 15,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 9,
      name: "وجبة تشيز برجر دجاج كرسبي",
      price: 15,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 10,
      name: "وجبة تورتيلا ستربس دجاج جبن",
      price: 15,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 11,
      name: "وجبة اطفال تشيز برجر",
      price: 12,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 12,
      name: "وجبة اطفال نقت",
      price: 12,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 13,
      name: "بطاطس بالجبن",
      price: 8,
      image: "/placeholder.jpg",
      category: "food",
    },
    {
      id: 14,
      name: "بطاطس",
      price: 6,
      image: "/placeholder.jpg",
      category: "food",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Floating Cart Button */}
      <button
        onClick={() => setShowCart(!showCart)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg z-10"
      >
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
      <div className="w-full bg-red-400">
        your table number is :{tableNum}
        <div>
          <input
            type="text"
            value={newTableNum}
            placeholder={`Current: ${tableNum || "Not set"}`}
            onChange={(e) => setnewTableNum(e.target.value)}
            className="border p-2 rounded"
            onKeyPress={(e) => e.key === "Enter" && handleChange()}
          />

          <button
            onClick={handleChange}
            disabled={!newTableNum.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            {tableNum ? "Change Table" : "Set Table"}
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto p-4 space-x-4 justify-center">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`flex flex-col items-center min-w-[100px] p-2 rounded-xl cursor-pointer
            ${
              activeTab === category.id ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
              <span className="text-2xl">
                <img src={category.icon} alt="" />
              </span>
            </div>
            <span className="text-sm text-center">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {menuItems
          .filter((item) => activeTab === "all" || item.category === activeTab)
          .map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-md">
              <div className="w-full h-32 bg-yellow-400 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xl">karend</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">{item.name}</span>
                <div className="flex items-center">
                  <span className="text-blue-600 ml-1 pr-2">&#65020;</span>
                  <span className="text-blue-600">{item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="ml-2 bg-yellow-400 p-2 rounded-lg hover:bg-yellow-500 transition"
                  >
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-4 border-b sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">سلة المشتريات</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4">
              {cart.length === 0 ? (
                <p className="text-center py-8 text-gray-500">السلة فارغة</p>
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
                          <p className="text-blue-600">{item.price} &#65020;</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>المجموع:</span>
                      <span>{totalPrice} &#65020;</span>
                    </div>
                    <button
                      className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                      onClick={() => navigate("/cart")}
                    >
                      تاكيد الطلب
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

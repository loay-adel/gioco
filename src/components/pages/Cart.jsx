import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Handle adding items via URL (e.g., /cart/add/1)
  useEffect(() => {
    const pathParts = location.pathname.split("/");
    if (pathParts.includes("add") && pathParts.length === 4) {
      const itemId = parseInt(pathParts[3]);
      addToCart(itemId);
      navigate("/cart"); // Redirect to cart after adding
    }
  }, [location]);

  const addToCart = (itemId) => {
    // In a real app, you would fetch the item details from your menuItems
    const newItem = {
      id: itemId,
      name: `Item ${itemId}`,
      price: 15,
      quantity: 1,
    };

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      let updatedCart;

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, newItem];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">سلة المشتريات</h1>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">السلة فارغة</p>
            <Button onClick={() => navigate("/home")}> العودة </Button>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex justify-between items-center"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-blue-600">{item.price} ر.ي</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
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
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>المجموع:</span>
                <span>{totalPrice} ر.ي</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                تأكيد الطلب
              </button>
            </div>
            <Button
              className="w-full bg-red-500 text-white py-3 mt-2 rounded-lg hover:bg-red-700 transition"
              onClick={() => navigate("/home")}
            >
              العودة
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

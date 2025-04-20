import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [tableNum, settableNum] = useState("");
  const [language, setLanguage] = useState("en");
  const [orders, setOrders] = useState([]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("appLanguage");
    if (savedLanguage) setLanguage(savedLanguage);

    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));

    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Save data to localStorage when changed
  useEffect(() => {
    localStorage.setItem("appLanguage", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Cart functions
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + (item.quantity || 1),
              }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Order functions
  const createOrder = async (orderData) => {
    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to create order");

      const newOrder = await response.json();
      setOrders((prev) => [...prev, newOrder]);
      return newOrder;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // 1. Validate input
      if (!orderId || !newStatus) {
        throw new Error("Missing orderId or newStatus");
      }

      // 2. Make API request
      const response = await fetch(
        `http://localhost:8080/api/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add if using auth
          },
          body: JSON.stringify({
            status: newStatus,
            updatedAt: new Date().toISOString(), // Optional: track update time
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Order #${orderId} not found`);
        }
        if (response.status === 400) {
          throw new Error(`Invalid status transition: ${data.message}`);
        }
        throw new Error(data.message || "Failed to update order status");
      }

      setOrders((prevOrders) => {
        const updated = prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        );

        return updated;
      });

      // 5. Return updated order
      console.groupEnd();
      return data;
    } catch (error) {
      // Enhanced error handling
      console.error("Update Error:", {
        orderId,
        newStatus,
        error: error.message,
        stack: error.stack,
      });

      // Show user-friendly error message
      toast.error(`Update failed: ${error.message}`);

      console.groupEnd();
      throw error;
    }
  };
  const deleteOrder = async (orderId) => {
    try {
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
      return true; // Success
    } catch (error) {
      console.error("Delete order error:", error);
      throw error;
    }
  };
  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        // Cart related
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        clearCart,

        // Table number
        tableNum,
        settableNum,

        // Language
        language,
        setLanguage,

        // Order related
        orders,
        setOrders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

import { Link } from "react-router-dom";
import { useState } from "react";
const Home = () => {
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "salads", name: "سلطات", icon: "🥗" },
    { id: "appetizers", name: "المقبلات", icon: "🍽️" },
    { id: "shawarma", name: "شاورما كريب", icon: "🌯" },
    { id: "sides", name: "مقبلات وإضافات", icon: "🍟" },
    { id: "all", name: "الكل", icon: "📋" },
  ];

  const menuItems = [
    { id: 1, name: "بطاطا وبرجر", price: "3000", image: "/placeholder.jpg" },
    { id: 2, name: "تومية", price: "800", image: "/placeholder.jpg" },
    {
      id: 3,
      name: "صوصات ايس بالاس",
      price: "1500",
      image: "/placeholder.jpg",
    },
    { id: 4, name: "جبن سليس", price: "400", image: "/placeholder.jpg" },
    { id: 5, name: "حبة بان", price: "200", image: "/placeholder.jpg" },
    { id: 6, name: "واحد روتي", price: "200", image: "/placeholder.jpg" },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Categories */}
        <div className="flex overflow-x-auto p-4 space-x-4 justify-center">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex flex-col items-center min-w-[100px] p-2 rounded-xl cursor-pointer
              ${
                activeTab === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <span className="text-2xl">{category.icon}</span>
              </div>
              <span className="text-sm text-center">{category.name}</span>
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-2 gap-4 p-4">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-md">
              <div className="w-full h-32 bg-yellow-400 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xl">karend</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">{item.name}</span>
                <div className="flex items-center">
                  <span className="text-blue-600 ml-1">ر.ي</span>
                  <span className="text-blue-600">{item.price}</span>
                  <button className="ml-2 bg-yellow-400 p-2 rounded-lg">
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

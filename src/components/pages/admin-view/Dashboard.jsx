import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
    mostOrdered: "",
  });

  useEffect(() => {
    // Simulated fetch - replace with your real API calls
    const fetchData = async () => {
      try {
        // Example: const res = await fetch("/api/admin/stats");
        // const data = await res.json();

        // Temporary mock data:
        const data = {
          totalProducts: 50,
          totalCategories: 4,
          totalOrders: 132,
          totalRevenue: 4870,
          mostOrdered: "بيتزا دجاج باربكيو",
        };

        setStats(data);
      } catch (error) {
        console.error("Error fetching admin stats", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="📦 Total Products" value={stats.totalProducts} />
        <Card title="📁 Total Categories" value={stats.totalCategories} />
        <Card title="🧾 Total Orders" value={stats.totalOrders} />
        <Card title="💰 Total Revenue (SAR)" value={stats.totalRevenue} />
        <Card title="🔥 Most Ordered Item" value={stats.mostOrdered} />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
    <h2 className="text-lg font-semibold text-gray-600 mb-2">{title}</h2>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default Dashboard;

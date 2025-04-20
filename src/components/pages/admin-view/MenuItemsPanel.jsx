import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiSave } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const MenuItemsPanel = () => {
  const { t } = useTranslation();
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    name_ar: "",
    price: "",
    description: "",
    description_ar: "",
    category: "",
    newCategory: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/products");

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setMenuItems(data);

        // Extract categories
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories.filter(Boolean));
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error(t("fetch_error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]);

  const apiRequest = async (url, method, body) => {
    try {
      const blob = new Blob([JSON.stringify(body)], {
        type: "application/json",
      });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: blob,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const finalCategory =
        formData.category === "__new__"
          ? formData.newCategory
          : formData.category;

      const price = parseFloat(formData.price);
      if (isNaN(price)) throw new Error(t("invalid_price"));

      const productData = {
        name: formData.name,
        price: price,
        description: formData.description,
        category: finalCategory,
        imageUrl: formData.imageUrl,
      };

      if (editingItem) {
        const updated = await apiRequest(
          `http://localhost:8080/api/products/${editingItem.id}`,
          "PUT",
          productData
        );
        setMenuItems((prev) =>
          prev.map((item) => (item.id === editingItem.id ? updated : item))
        );
        toast.success(t("product_updated"));
      } else {
        const newProduct = await apiRequest(
          "http://localhost:8080/api/products",
          "POST",
          productData
        );
        setMenuItems((prev) => [...prev, newProduct]);
        if (formData.category === "__new__") {
          setCategories((prev) => [...prev, finalCategory]);
        }
        toast.success(t("product_added"));
      }

      resetForm();
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error.message || t("save_error"));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      name_ar: "",
      price: "",
      description: "",
      description_ar: "",
      category: "",
      newCategory: "",
      imageUrl: "", // Changed from image to imageUrl
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    // Find both language versions of this item
    const englishItem = menuItems.find(
      (i) => i.category === item.category && i.lang === "en"
    );
    const arabicItem = menuItems.find(
      (i) => i.category === item.category && i.lang === "ar"
    );

    setEditingItem(item);
    setFormData({
      name: englishItem?.name || "",
      name_ar: arabicItem?.name || "",
      price: item.price, // Price should be the same for both
      description: englishItem?.description || "",
      description_ar: arabicItem?.description || "",
      category: item.category,
      image: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{t("menu_items")}</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
        >
          <FiPlus className="mr-2" />
          {t("add_item")}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {editingItem ? t("edit_item") : t("add_item")}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("name")} (English)
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("name")} (العربية)
                </label>
                <input
                  type="text"
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("price")}
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("category")}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">{t("select_category")}</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "food"
                        ? t("food")
                        : cat === "drinks"
                        ? t("drinks")
                        : cat === "ice cream"
                        ? t("ice_cream")
                        : cat}
                    </option>
                  ))}
                  <option value="__new__">
                    {t("add_new_category") || "Add new category"}
                  </option>
                </select>
              </div>
              {formData.category === "__new__" && (
                <input
                  type="text"
                  name="newCategory"
                  value={formData.newCategory}
                  onChange={handleChange}
                  placeholder={t("enter_new_category")}
                  className="w-full border rounded px-3 py-2 mt-2"
                  required
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("description")} (English)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("description")} (العربية)
                </label>
                <textarea
                  name="description_ar"
                  value={formData.description_ar}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  dir="rtl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("image_url")}
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="https://example.com/image.jpg"
              />
              {editingItem?.imageUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Current image:</p>
                  <img
                    src={editingItem.imageUrl}
                    alt="Preview"
                    className="h-20 object-cover mt-1"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
              >
                <FiSave className="mr-2" />
                {editingItem ? t("save") : t("add_item")}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h4 className="font-semibold text-lg">{item.name}</h4>
              <p className="text-sm">{item.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-semibold">{item.price}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItemsPanel;

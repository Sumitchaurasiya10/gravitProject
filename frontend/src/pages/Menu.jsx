import { useState } from "react";
import { 
  Grid3X3, 
  Cake, 
  Coffee, 
  Flame, 
  ArrowLeft, 
  Bell, 
  Edit, 
  Trash2, 
  Camera, 
  X,
  Drumstick,
  Fish,
  Sandwich
} from "lucide-react";

// Categories with icons
const categories = [
  { name: "All", items: 116, icon: Grid3X3 },
  { name: "Pizza", items: 20, icon: Flame },
  { name: "Burger", items: 15, icon: Sandwich },
  { name: "Chicken", items: 10, icon: Drumstick },
  { name: "Bakery", items: 18, icon: Cake },
  { name: "Beverage", items: 12, icon: Coffee },
  { name: "Seafood", items: 16, icon: Fish },
];

// Dummy menu items
const menuItems = [
  {
    id: "#22314644",
    name: "Chicken Parmesan",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
    category: "Chicken",
    stock: 119,
    price: 55,
    image:
      "https://images.unsplash.com/photo-1604908177521-0c96b84aa33b?auto=format&fit=crop&w=80&q=80",
    availability: "In Stock",
  },
  {
    id: "#22314645",
    name: "Chicken Parmesan",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
    category: "Chicken",
    stock: 119,
    price: 55,
    image:
      "https://images.unsplash.com/photo-1604908177521-0c96b84aa33b?auto=format&fit=crop&w=80&q=80",
    availability: "In Stock",
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Normal Menu");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
    image: null,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryForm({
        ...categoryForm,
        image: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = () => {
    // Here you would typically save the category
    console.log("Saving category:", categoryForm);
    setSidebarOpen(false);
    setCategoryForm({ name: "", description: "", image: null });
  };

  const handleCancel = () => {
    setSidebarOpen(false);
    setCategoryForm({ name: "", description: "", image: null });
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-4 md:p-6 text-gray-900">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-6 h-6 cursor-pointer text-gray-600 hover:text-pink-500 transition" />
            <h1 className="text-2xl font-bold">Menu</h1>
          </div>
          
        </div>

        {/* Categories */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h2 className="text-lg font-semibold">Categories</h2>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
          >
            Add New Category
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border w-24 sm:w-28 transition ${
                  activeCategory === cat.name
                    ? "bg-pink-100 border-pink-400"
                    : "bg-white border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => setActiveCategory(cat.name)}
              >
                <Icon className="w-8 h-8 text-pink-500 mb-2" />
                <span className="font-medium text-sm sm:text-base">
                  {cat.name}
                </span>
                <span className="text-xs text-gray-500">{cat.items} items</span>
              </button>
            );
          })}
        </div>

        {/* Special Menu Tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {[
              "Normal Menu",
              "Special Deals",
              "New Year Special",
              "Desserts and Drinks",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-2 rounded-md font-medium transition ${
                  activeTab === tab
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
            Add Menu Item
          </button>
        </div>

        {/* Menu Items Table (Responsive: table -> cards) */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="hidden md:table min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Product</th>
                <th className="px-4 py-2 text-left text-gray-600">Product Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Item ID</th>
                <th className="px-4 py-2 text-left text-gray-600">Stock</th>
                <th className="px-4 py-2 text-left text-gray-600">Category</th>
                <th className="px-4 py-2 text-left text-gray-600">Price</th>
                <th className="px-4 py-2 text-left text-gray-600">Availability</th>
                <th className="px-4 py-2 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {menuItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-gray-500 text-sm">{item.description}</div>
                  </td>
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.stock} items</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">${item.price}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        item.availability === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.availability}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700 transition">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card layout for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 md:hidden">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 flex flex-col gap-2 hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded"
                />
                <div className="font-medium">{item.name}</div>
                <div className="text-gray-500 text-sm">{item.description}</div>
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">Stock:</span> {item.stock}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">Category:</span> {item.category}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">Price:</span> ${item.price}
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm w-fit ${
                    item.availability === "In Stock"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.availability}
                </span>
                <div className="flex gap-2 mt-2">
                  <button className="text-blue-500 hover:text-blue-700 transition">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleCancel}>
          <div 
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleCancel}
                  className="text-gray-600 hover:text-gray-800 transition"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-semibold text-black ">Add New Category</h2>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="p-6 space-y-6">
              {/* Icon/Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Icon
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition">
                  {categoryForm.image ? (
                    <div className="relative">
                      <img 
                        src={categoryForm.image} 
                        alt="Preview" 
                        className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                      />
                      <button
                        onClick={() => setCategoryForm({...categoryForm, image: null})}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 mb-2">Upload category icon</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-pink-600 transition"
                      >
                        Choose Image
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                  placeholder="Enter category name"
                  className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Description
                </label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                  placeholder="Enter category description"
                  rows={4}
                  className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition font-medium"
                >
                  Save Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
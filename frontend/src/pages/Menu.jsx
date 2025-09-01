import { useState } from "react";
import {
  Squares2X2Icon,
  CakeIcon,
  BeakerIcon,
  FireIcon,
  ArrowLeftIcon,
  BellIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { DrumstickIcon, FishIcon, SandwichIcon } from "lucide-react";

// Categories with icons
const categories = [
  { name: "All", items: 116, icon: Squares2X2Icon },
  { name: "Pizza", items: 20, icon: FireIcon },
  { name: "Burger", items: 15, icon: SandwichIcon },
  { name: "Chicken", items: 10, icon: DrumstickIcon },
  { name: "Bakery", items: 18, icon: CakeIcon },
  { name: "Beverage", items: 12, icon: BeakerIcon },
  { name: "Seafood", items: 16, icon: FishIcon },
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

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen text-gray-900">
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <ArrowLeftIcon className="w-6 h-6 cursor-pointer text-gray-600 hover:text-pink-500 transition" />
          <h1 className="text-2xl font-bold">Menu</h1>
        </div>
        <div className="flex items-center gap-4">
          <BellIcon className="w-6 h-6 cursor-pointer text-gray-600 hover:text-pink-500 transition" />
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-10 h-10 rounded-full border hover:scale-105 transition"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h2 className="text-lg font-semibold">Categories</h2>
        <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition">
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
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition">
                    <TrashIcon className="w-5 h-5" />
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
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button className="text-red-500 hover:text-red-700 transition">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

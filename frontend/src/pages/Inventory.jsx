import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

export default function Inventory() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Chicken Parmesan",
      stock: 10,
      status: "Active",
      category: "Chicken",
      price: 55.0,
      image:
        "https://www.themealdb.com/images/media/meals/1548772327.jpg",
    },
    {
      id: 2,
      name: "Cheese Burger",
      stock: 8,
      status: "Active",
      category: "Burger",
      price: 40.0,
      image:
        "https://www.themealdb.com/images/media/meals/1548772327.jpg",
    },
    {
      id: 3,
      name: "Veg Pizza",
      stock: 15,
      status: "Inactive",
      category: "Pizza",
      price: 60.0,
      image:
        "https://www.themealdb.com/images/media/meals/1548772327.jpg",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 text-black p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <button className="bg-pink-500 px-4 py-2 rounded-lg text-white font-medium">
          Add New Inventory
        </button>
      </div>

      {/* Total Products */}
      <p className="mb-6 text-lg">
        <span className="font-bold">{products.length * 50}</span> total products
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="bg-white border p-4 rounded-xl space-y-4 col-span-1">
          <div>
            <h2 className="font-semibold mb-2">Product Status</h2>
            <div className="flex flex-wrap gap-2">
              <button className="bg-pink-500 px-3 py-1 rounded-md text-white">
                All 150
              </button>
              <button className="bg-gray-200 px-3 py-1 rounded-md">Active 120</button>
              <button className="bg-gray-200 px-3 py-1 rounded-md">Inactive 10</button>
              <button className="bg-gray-200 px-3 py-1 rounded-md">Draft 10</button>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Category</h2>
            <select className="w-full bg-gray-100 p-2 rounded-md border">
              <option>All</option>
              <option>Chicken</option>
              <option>Burger</option>
              <option>Pizza</option>
            </select>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Stock</h2>
            <select className="w-full bg-gray-100 p-2 rounded-md border">
              <option>InStock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Value</h2>
            <select className="w-full bg-gray-100 p-2 rounded-md border">
              <option>Litre</option>
              <option>Kg</option>
              <option>Piece</option>
            </select>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Piece / Item / Quantity</h2>
            <input
              type="number"
              placeholder="50"
              className="w-full bg-gray-100 p-2 rounded-md border"
            />
          </div>

          <div>
            <h2 className="font-semibold mb-2">Price</h2>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="50"
                className="w-1/2 bg-gray-100 p-2 rounded-md border"
              />
              <input
                type="number"
                placeholder="120"
                className="w-1/2 bg-gray-100 p-2 rounded-md border"
              />
            </div>
          </div>

          <button className="w-full bg-pink-500 py-2 rounded-md text-white">
            Reset Filters
          </button>
        </div>

        {/* Products List */}
        <div className="col-span-3 space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border p-4 rounded-xl flex items-center justify-between"
            >
              {/* Product Left */}
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm">
                    Stocked Product:{" "}
                    <span className="text-green-600">
                      {product.stock} in Stock
                    </span>
                  </p>
                  <p className="text-sm">
                    Status: <span className="font-medium">{product.status}</span>
                  </p>
                  <p className="text-sm">
                    Category:{" "}
                    <span className="font-medium">{product.category}</span>
                  </p>
                </div>
              </div>

              {/* Product Right */}
              <div className="flex items-center gap-4">
                <p className="text-sm">
                  Retail Price:{" "}
                  <span className="font-semibold">${product.price.toFixed(2)}</span>
                </p>
                <button className="text-gray-600 hover:text-black">
                  <Edit size={18} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

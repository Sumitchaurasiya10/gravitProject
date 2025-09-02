import { useState } from "react";
import { Edit, Trash2, ArrowLeft, Upload, X } from "lucide-react";

export default function Inventory() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Chicken Parmesan",
      stock: 10,
      status: "Active",
      category: "Chicken",
      price: 55.0,
      image: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      perishable: true,
    },
    {
      id: 2,
      name: "Cheese Burger",
      stock: 8,
      status: "Active",
      category: "Burger",
      price: 40.0,
      image: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      perishable: true,
    },
    {
      id: 3,
      name: "Veg Pizza",
      stock: 15,
      status: "Inactive",
      category: "Pizza",
      price: 60.0,
      image: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      perishable: false,
    },
  ]);

  const [showSidebar, setShowSidebar] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    stock: "",
    status: "Active",
    price: "",
    perishable: false,
    image: null,
  });

  const categories = ["Chicken", "Burger", "Pizza", "Drinks", "Desserts", "Salads"];
  const quantityUnits = ["Piece", "Kg", "Litre", "Grams", "Dozen"];
  const stockOptions = ["In Stock", "Low Stock", "Out of Stock"];
  const statusOptions = ["Active", "Inactive", "Draft"];

  const handleInputChange = (field, value) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProduct(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      alert("Please fill in all required fields");
      return;
    }

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      stock: parseInt(newProduct.stock) || 0,
      status: newProduct.status,
      category: newProduct.category,
      price: parseFloat(newProduct.price) || 0,
      image: newProduct.image || "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      perishable: newProduct.perishable,
    };

    setProducts(prev => [...prev, product]);
    
    // Reset form
    setNewProduct({
      name: "",
      category: "",
      quantity: "",
      stock: "",
      status: "Active",
      price: "",
      perishable: false,
      image: null,
    });
    
    setShowSidebar(false);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
    setNewProduct({
      name: "",
      category: "",
      quantity: "",
      stock: "",
      status: "Active",
      price: "",
      perishable: false,
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black p-6 flex flex-col relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <button 
          onClick={() => setShowSidebar(true)}
          className="bg-pink-500 px-4 py-2 rounded-lg text-white font-medium hover:bg-pink-600 transition-colors"
        >
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
                  <p className="text-sm">
                    Perishable: {" "}
                    <span className={`font-medium ${product.perishable ? 'text-orange-600' : 'text-blue-600'}`}>
                      {product.perishable ? 'Yes' : 'No'}
                    </span>
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

      {/* Right Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button 
                onClick={closeSidebar}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold">Add New Product</h2>
            </div>
            <button 
              onClick={closeSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Product Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {newProduct.image ? (
                  <div className="relative">
                    <img 
                      src={newProduct.image} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('image', null)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="py-8">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="text-black cursor-pointer inline-block mt-2 bg-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-300"
                >
                  Choose File
                </label>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                value={newProduct.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Quantity Unit */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity Unit</label>
              <select
                value={newProduct.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Select Unit</option>
                {quantityUnits.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium mb-2">Stock Quantity</label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
                className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter stock quantity"
                min="0"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={newProduct.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">Price *</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className=" text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter price"
                step="0.01"
                min="0"
                required
              />
            </div>

            {/* Perishable */}
            <div>
              <label className="block text-sm font-medium mb-2">Perishable</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="perishable"
                    checked={newProduct.perishable === true}
                    onChange={() => handleInputChange('perishable', true)}
                    className="mr-2 text-pink-500 focus:ring-pink-500"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="perishable"
                    checked={newProduct.perishable === false}
                    onChange={() => handleInputChange('perishable', false)}
                    className="mr-2 text-pink-500 focus:ring-pink-500"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-pink-500 text-white py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
}
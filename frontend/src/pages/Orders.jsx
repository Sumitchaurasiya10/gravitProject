import { useState } from "react";
import {
  Edit,
  Trash2,
  Drumstick,
  Pizza,
  Fish,
  Cake,
  Coffee,
  Minus,
  Plus,
} from "lucide-react";

// Dummy data for Orders Dashboard
const orders = [
  {
    id: "01",
    name: "Watson Joyce",
    order: "#890",
    status: "Ready",
    date: "Wednesday, 28, 2024",
    time: "4:48 PM",
    items: [
      { qty: 1, name: "Scrambled eggs with toast", price: 199 },
      { qty: 1, name: "Smoked Salmon Bagel", price: 120 },
      { qty: 2, name: "Belgian Waffles", price: 220 },
      { qty: 1, name: "Classic Lemonade", price: 110 },
    ],
    subtotal: 649,
  },
];

const statusColors = {
  Ready: "bg-green-100 text-green-600",
  "In Process": "bg-yellow-100 text-yellow-600",
  Completed: "bg-blue-100 text-blue-600",
};

// Categories & Menu for "Add New Order"
const categories = [
  { name: "Pizza", items: 20, icon: <Pizza className="w-6 h-6 text-orange-500" /> },
  { name: "Burger", items: 15, icon: <Drumstick className="w-6 h-6 text-yellow-500" /> },
  { name: "Chicken", items: 10, icon: <Drumstick className="w-6 h-6 text-pink-500" /> },
  { name: "Bakery", items: 18, icon: <Cake className="w-6 h-6 text-purple-500" /> },
  { name: "Beverage", items: 12, icon: <Coffee className="w-6 h-6 text-amber-700" /> },
  { name: "Seafood", items: 16, icon: <Fish className="w-6 h-6 text-blue-500" /> },
];

const menuItems = [
  { id: 1, name: "Roasted Chicken", price: 55 },
  { id: 2, name: "Chicken Parmesan", price: 55 },
  { id: 3, name: "Grilled Burger", price: 40 },
  { id: 4, name: "Veg Pizza", price: 30 },
  { id: 5, name: "Seafood Platter", price: 70 },
  { id: 6, name: "Chocolate Cake", price: 25 },
];

export default function Orders() {
  const [view, setView] = useState("dashboard"); // "dashboard" | "newOrder"
  const [cart, setCart] = useState([]);

  // Cart functions
  const increaseQty = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const decreaseQty = (item) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.id === item.id ? { ...c, qty: Math.max(c.qty - 1, 0) } : c
        )
        .filter((c) => c.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const getQty = (id) => {
    const found = cart.find((c) => c.id === id);
    return found ? found.qty : 0;
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      {view === "dashboard" ? (
        <>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold">Orders</h1>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium">
                All
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium">
                In Process
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium">
                Completed
              </button>
              <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium">
                Cancelled
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 text-sm font-medium"
                onClick={() => setView("newOrder")}
              >
                + Add New Order
              </button>
              <input
                type="text"
                placeholder="Search a name, order etc..."
                className="px-4 py-2 border rounded-lg w-full md:w-64"
              />
            </div>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl shadow-md border bg-white flex flex-col gap-3 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">#{order.id}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {order.name} - Order {order.order}
                </p>
                <p className="text-xs text-gray-500">
                  {order.date} | {order.time}
                </p>

                <div className="mt-2">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm text-gray-700"
                    >
                      <span>
                        {item.qty}x {item.name}
                      </span>
                      <span>${item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                  <span>Subtotal</span>
                  <span>${order.subtotal}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-3">
                  <button className="flex-1 flex justify-center items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm">
                    <Edit size={16} /> Edit
                  </button>
                  <button className="flex justify-center items-center px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600">
                    <Trash2 size={16} />
                  </button>
                  <button className="flex-1 px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 text-sm">
                    Pay Bill
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* New Order Screen */}
          <div className="flex flex-col md:flex-row p-4 gap-6 bg-gray-100 rounded-lg">
            {/* Left: Categories + Items */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Add New Order
                </h2>
                <button
                  onClick={() => setView("dashboard")}
                  className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                >
                  ← Back
                </button>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {categories.map((cat, i) => (
                  <div
                    key={i}
                    className="rounded-xl shadow-md p-3 bg-white text-center hover:shadow-lg cursor-pointer flex flex-col items-center transition"
                  >
                    {cat.icon}
                    <p className="font-medium text-gray-800 text-sm sm:text-base mt-1">
                      {cat.name}
                    </p>
                    <p className="text-xs text-gray-500">{cat.items} items</p>
                  </div>
                ))}
              </div>

              {/* Menu Items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {menuItems.map((item) => {
                  const qty = getQty(item.id);
                  return (
                    <div
                      key={item.id}
                      className="rounded-xl shadow-md bg-white p-4 flex flex-col items-center justify-between hover:shadow-lg transition"
                    >
                      <div className="text-center">
                        <p className="font-medium text-gray-800 text-sm sm:text-base">
                          {item.name}
                        </p>
                        <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
                          onClick={() => decreaseQty(item)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-medium text-gray-800 text-sm sm:text-base w-6 text-center">
                          {qty}
                        </span>
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700"
                          onClick={() => increaseQty(item)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Cart */}
            <div className="w-full md:w-96 bg-white rounded-xl shadow-md p-4 h-fit">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                Table 01
              </h3>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm sm:text-base">No items added</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((c) => (
                    <div
                      key={c.id}
                      className="flex justify-between items-start border-b pb-2"
                    >
                      <div className="w-full pr-2">
                        <p className="font-medium text-gray-800 text-sm sm:text-base">
                          {c.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          x{c.qty} = ${(c.qty * c.price).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
                            onClick={() => decreaseQty(c)}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-medium text-gray-800 text-sm w-5 text-center">
                            {c.qty}
                          </span>
                          <button
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700"
                            onClick={() => increaseQty(c)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button
                        className="p-1 hover:bg-gray-100 rounded-lg"
                        onClick={() => removeFromCart(c.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="mt-4 space-y-1 border-t pt-2 text-gray-800 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* QR */}
                  <div className="mt-4 text-center">
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">Scan QR Code</p>
                    <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-200 mx-auto flex items-center justify-center rounded">
                      <p className="text-gray-400">QR</p>
                    </div>
                  </div>

                  <button className="w-full mt-4 px-3 sm:px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 text-sm sm:text-base">
                    Send To Kitchen
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

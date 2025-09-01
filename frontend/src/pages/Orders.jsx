import { useState } from "react";
import { Trash2, Drumstick, Pizza, Fish, Cake, Coffee } from "lucide-react";

const categories = [
  { name: "Pizza", items: 20, icon: <Pizza className="w-6 h-6 text-orange-500" /> },
  { name: "Burger", items: 15, icon: <Drumstick className="w-6 h-6 text-yellow-500" /> },
  { name: "Chicken", items: 10, icon: <Drumstick className="w-6 h-6 text-pink-500" /> },
  { name: "Bakery", items: 18, icon: <Cake className="w-6 h-6 text-purple-500" /> },
  { name: "Beverage", items: 12, icon: <Coffee className="w-6 h-6 text-brown-500" /> },
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
  const [cart, setCart] = useState([]);

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

  const getQty = (id) => {
    const found = cart.find((c) => c.id === id);
    return found ? found.qty : 0;
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    

    
    <div className="flex flex-col md:flex-row p-4 gap-6 bg-gray-50 min-h-screen">
        

        
      {/* Left: Categories + Items */}
      <div className="flex-1">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
          Orders
        </h2>

        {/* Categories with icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="rounded-xl shadow-md p-3 bg-white text-center hover:shadow-lg cursor-pointer flex flex-col items-center"
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
                className="rounded-xl shadow-md bg-white p-4 flex flex-col items-center hover:shadow-lg"
              >
                {/* Info */}
                <p className="font-medium text-gray-800 text-center text-sm sm:text-base">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>

                {/* Counter */}
                <div className="flex items-center gap-2 sm:gap-3 mt-2">
                  <button
                    className="px-2 sm:px-3 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={() => decreaseQty(item)}
                  >
                    -
                  </button>
                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                    {qty}
                  </span>
                  <button
                    className="px-2 sm:px-3 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={() => increaseQty(item)}
                  >
                    +
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

                  {/* Counter inside cart */}
                  <div className="flex items-center gap-2 sm:gap-3 mt-1">
                    <button
                      className="px-2 sm:px-3 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                      onClick={() => decreaseQty(c)}
                    >
                      -
                    </button>
                    <span className="font-medium text-gray-800 text-sm sm:text-base">
                      {c.qty}
                    </span>
                    <button
                      className="px-2 sm:px-3 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                      onClick={() => increaseQty(c)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => removeFromCart(c.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Totals */}
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

            {/* Payment Method */}
            <div className="mt-4 text-center">
              <p className="text-gray-600 mb-2 text-sm sm:text-base">
                Scan QR Code
              </p>
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-200 mx-auto flex items-center justify-center rounded">
                <p className="text-gray-400">QR</p>
              </div>
            </div>

            <button className="w-full mt-4 px-3 sm:px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 text-sm sm:text-base">
              Send To Kitchen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

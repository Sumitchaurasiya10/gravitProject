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
  ArrowLeft,
  Search,
  X,
  Printer,
  Check,
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
  {
    id: "02",
    name: "Sarah Johnson",
    order: "#891",
    status: "In Process",
    date: "Wednesday, 28, 2024",
    time: "5:15 PM",
    items: [
      { qty: 2, name: "Margherita Pizza", price: 180 },
      { qty: 1, name: "Garlic Bread", price: 80 },
    ],
    subtotal: 260,
  },
  {
    id: "03",
    name: "Michael Brown",
    order: "#892",
    status: "Completed",
    date: "Wednesday, 28, 2024",
    time: "3:30 PM",
    items: [
      { qty: 1, name: "Grilled Salmon", price: 250 },
      { qty: 1, name: "Caesar Salad", price: 120 },
    ],
    subtotal: 370,
  },
];

const statusColors = {
  Ready: "bg-green-100 text-green-600",
  "In Process": "bg-yellow-100 text-yellow-600",
  Completed: "bg-blue-100 text-blue-600",
};

// Categories & Menu for "Add New Order"
const categories = [
  { name: "Pizza", items: 20, icon: <Pizza className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" /> },
  { name: "Burger", items: 15, icon: <Drumstick className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" /> },
  { name: "Chicken", items: 10, icon: <Drumstick className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" /> },
  { name: "Bakery", items: 18, icon: <Cake className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" /> },
  { name: "Beverage", items: 12, icon: <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" /> },
  { name: "Seafood", items: 16, icon: <Fish className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" /> },
];

const menuItems = [
  { id: 1, name: "Roasted Chicken", price: 55 },
  { id: 2, name: "Chicken Parmesan", price: 55 },
  { id: 3, name: "Grilled Burger", price: 40 },
  { id: 4, name: "Veg Pizza", price: 30 },
  { id: 5, name: "Seafood Platter", price: 70 },
  { id: 6, name: "Chocolate Cake", price: 25 },
  { id: 7, name: "Cappuccino", price: 15 },
  { id: 8, name: "Fish & Chips", price: 45 },
];

// Payment Sidebar Component
function PaymentSidebar({ isOpen, onClose, order }) {
  const [tipAmount, setTipAmount] = useState(2.00);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isPrinting, setIsPrinting] = useState(false);

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = 110.00;
  const tax = 5.5;
  const total = subtotal + tax + tipAmount;

  const handlePrintReceipt = () => {
    setIsPrinting(true);
    // Simulate printing process
    setTimeout(() => {
      setIsPrinting(false);
      alert("Receipt printed successfully!");
    }, 1500);
  };

  const handleApplyPayment = () => {
    alert(`Payment of $${total.toFixed(2)} processed successfully!`);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Payment</h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Order Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Table 01</h3>
              <p className="text-gray-600">Watson Joyce</p>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Order Items</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-800 font-medium">Chicken Formesan</p>
                    <p className="text-sm text-gray-600">x 2</p>
                  </div>
                  <p className="text-gray-800">$55.00</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-800 font-medium">Chicken Formesan</p>
                    <p className="text-sm text-gray-600">x 2</p>
                  </div>
                  <p className="text-gray-800">$55.00</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            {/* Tips Amount */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Tips Amount</h4>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 5, 10, 15, 20].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setTipAmount(amount)}
                    className={`py-2 px-3 rounded border text-sm ${
                      tipAmount === amount 
                        ? "bg-blue-100 border-blue-500 text-blue-700" 
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
                <button
                  onClick={() => setTipAmount(0)}
                  className="py-2 px-3 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
                >
                  No Tip
                </button>
              </div>
            </div>

            {/* Totals */}
            <div className="mb-6">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-800">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Tip</span>
                <span className="text-gray-800">${tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-gray-200 font-semibold">
                <span className="text-gray-800">Total</span>
                <span className="text-gray-800">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">Payment Method</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`w-full py-2 px-4 rounded border text-left ${
                    paymentMethod === "cash" 
                      ? "bg-blue-100 border-blue-500 text-blue-700" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Cash
                </button>
                <button
                  onClick={() => setPaymentMethod("debit")}
                  className={`w-full py-2 px-4 rounded border text-left ${
                    paymentMethod === "debit" 
                      ? "bg-blue-100 border-blue-500 text-blue-700" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Debit Card
                </button>
                <button
                  onClick={() => setPaymentMethod("ewallet")}
                  className={`w-full py-2 px-4 rounded border text-left ${
                    paymentMethod === "ewallet" 
                      ? "bg-blue-100 border-blue-500 text-blue-700" 
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  E-Wallet
                </button>
              </div>
            </div>

            {/* Print Receipt */}
            <div className="mb-6">
              <button
                onClick={handlePrintReceipt}
                disabled={isPrinting}
                className="w-full py-2 px-4 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                {isPrinting ? "Printing..." : "Print Receipt"}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <button
              onClick={handleApplyPayment}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Apply Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Orders() {
  const [view, setView] = useState("dashboard"); // "dashboard" | "newOrder"
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPaymentSidebar, setShowPaymentSidebar] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  // Filter menu items based on search query
  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-3 sm:p-4 md:p-6">
      {/* Payment Sidebar */}
      <PaymentSidebar 
        isOpen={showPaymentSidebar} 
        onClose={() => setShowPaymentSidebar(false)}
        order={selectedOrder}
      />
      
      {view === "dashboard" ? (
        <>
          {/* Header */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h1 className="text-xl sm:text-2xl font-bold">Orders</h1>
              <button
                className="px-3 sm:px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 text-sm font-medium w-full sm:w-auto flex items-center justify-center gap-1"
                onClick={() => setView("newOrder")}
              >
                <Plus size={16} /> Add New Order
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 sm:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-xs sm:text-sm font-medium">
                  All
                </button>
                <button className="px-3 py-1.5 sm:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-xs sm:text-sm font-medium">
                  In Process
                </button>
                <button className="px-3 py-1.5 sm:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-xs sm:text-sm font-medium">
                  Completed
                </button>
                <button className="px-3 py-1.5 sm:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-xs sm:text-sm font-medium">
                  Cancelled
                </button>
              </div>
              
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search a name, order etc..."
                  className="pl-9 pr-4 py-2 border rounded-lg w-full text-sm"
                />
              </div>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-3 sm:p-4 rounded-xl shadow-sm sm:shadow-md border bg-white flex flex-col gap-3 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-base sm:text-lg">#{order.id}</span>
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
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
                      className="flex justify-between text-xs sm:text-sm text-gray-700"
                    >
                      <span className="truncate max-w-[60%]">
                        {item.qty}x {item.name}
                      </span>
                      <span>${item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-semibold border-t pt-2 mt-2 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>${order.subtotal}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3 mt-3">
                  <button className="flex-1 flex justify-center items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs sm:text-sm">
                    <Edit size={14} /> Edit
                  </button>
                  <button className="flex justify-center items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600">
                    <Trash2 size={14} />
                  </button>
                  <button 
                    className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 text-xs sm:text-sm"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowPaymentSidebar(true);
                    }}
                  >
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
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 bg-gray-100 rounded-lg p-3 sm:p-4 md:p-6">
            {/* Left: Categories + Items */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                  Add New Order
                </h2>
                <button
                  onClick={() => setView("dashboard")}
                  className="px-3 py-1.5 sm:py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-xs sm:text-sm flex items-center gap-1"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              </div>

              {/* Search on mobile */}
              <div className="lg:hidden mb-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border rounded-lg w-full text-sm"
                />
              </div>

              {/* Categories */}
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 mb-4 sm:mb-6">
                {categories.map((cat, i) => (
                  <div
                    key={i}
                    className="rounded-lg sm:rounded-xl shadow-sm sm:shadow-md p-2 sm:p-3 bg-white text-center hover:shadow-lg cursor-pointer flex flex-col items-center transition"
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    {cat.icon}
                    <p className="font-medium text-gray-800 text-xs sm:text-sm mt-1">
                      {cat.name}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500">{cat.items} items</p>
                  </div>
                ))}
              </div>

              {/* Menu Items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                {filteredMenuItems.map((item) => {
                  const qty = getQty(item.id);
                  return (
                    <div
                      key={item.id}
                      className="rounded-lg sm:rounded-xl shadow-sm sm:shadow-md bg-white p-2 sm:p-3 flex flex-col items-center justify-between hover:shadow-lg transition"
                    >
                      <div className="text-center">
                        <p className="font-medium text-gray-800 text-xs sm:text-sm md:text-base mb-1 line-clamp-2 h-8">
                          {item.name}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 mt-2">
                        <button
                          className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
                          onClick={() => decreaseQty(item)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-medium text-gray-800 text-xs sm:text-sm w-4 sm:w-6 text-center">
                          {qty}
                        </span>
                        <button
                          className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700"
                          onClick={() => increaseQty(item)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Cart */}
            <div className="w-full lg:w-80 xl:w-96 bg-white rounded-xl shadow-md p-3 sm:p-4 h-fit sticky top-4">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
                Table 01
              </h3>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 text-xs sm:text-sm text-center py-4">No items added yet</p>
              ) : (
                <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
                  {cart.map((c) => (
                    <div
                      key={c.id}
                      className="flex justify-between items-start border-b pb-2"
                    >
                      <div className="w-full pr-2">
                        <p className="font-medium text-gray-800 text-xs sm:text-sm">
                          {c.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          x{c.qty} = ${(c.qty * c.price).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1 sm:gap-2 mt-1">
                          <button
                            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
                            onClick={() => decreaseQty(c)}
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-medium text-gray-800 text-xs sm:text-sm w-4 text-center">
                            {c.qty}
                          </span>
                          <button
                            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700"
                            onClick={() => increaseQty(c)}
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                      <button
                        className="p-1 hover:bg-gray-100 rounded-lg"
                        onClick={() => removeFromCart(c.id)}
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="mt-3 sm:mt-4 space-y-1 border-t pt-2 text-gray-800 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-sm sm:text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* QR */}
                  <div className="mt-3 sm:mt-4 text-center">
                    <p className="text-gray-600 mb-1 sm:mb-2 text-xs sm:text-sm">Scan QR Code</p>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gray-200 mx-auto flex items-center justify-center rounded">
                      <p className="text-gray-400 text-xs">QR Code</p>
                    </div>
                  </div>

                  <button className="w-full mt-3 sm:mt-4 px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 text-xs sm:text-sm">
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
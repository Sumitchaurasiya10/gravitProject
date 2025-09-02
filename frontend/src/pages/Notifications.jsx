import { Bell, Trash2, AlertTriangle, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Notifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  const notifications = [
    {
      id: 1,
      title: "Low Inventory Alert",
      message: "This is to notify you that the following items are running low in stock: Chicken Breast, Tomatoes, Basil",
      date: "07/04/24",
      read: false,
    },
    {
      id: 2,
      title: "New Order Received",
      message: "Order #12345 has been placed successfully. Total amount: $85.50",
      date: "06/04/24",
      read: true,
    },
    {
      id: 3,
      title: "Table Reservation",
      message: "Table reservation for 4 people at 7:30 PM confirmed for John Smith",
      date: "06/04/24",
      read: false,
    },
    {
      id: 4,
      title: "Payment Processed",
      message: "Payment of $120.75 for order #12346 has been successfully processed",
      date: "05/04/24",
      read: true,
    },
    {
      id: 5,
      title: "Special Request",
      message: "Customer at Table 5 has a special dietary requirement - gluten-free options needed",
      date: "05/04/24",
      read: false,
    },
  ];

  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(n => !n.read);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-pink-500 text-white rounded-lg shadow-md"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Notifications</h2>
            <p className="text-gray-500 text-sm">
              You've {notifications.filter(n => !n.read).length} unread notifications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="text-gray-600" size={20} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </div>
            <button className="bg-pink-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-pink-600 text-xs sm:text-sm whitespace-nowrap">
              Mark all as read
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm ${
              activeTab === "all"
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab("unread")}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm ${
              activeTab === "unread"
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Unread
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white shadow-sm rounded-lg p-6 text-center">
              <p className="text-gray-500">No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((n) => (
              <div
                key={n.id}
                className={`flex flex-col sm:flex-row sm:items-start justify-between bg-white shadow-sm rounded-lg p-3 sm:p-4 border ${
                  !n.read ? "border-l-4 border-l-pink-500" : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-0 flex-1">
                  <div className="bg-pink-100 p-2 rounded-lg flex-shrink-0 mt-0.5">
                    <AlertTriangle className="text-pink-600" size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{n.title}</h3>
                      {!n.read && (
                        <span className="bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
                      {n.message}
                    </p>
                    <span className="text-gray-400 text-xs mt-2 block sm:hidden">{n.date}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 sm:flex-col sm:items-end">
                  <span className="text-gray-500 text-xs whitespace-nowrap hidden sm:block">{n.date}</span>
                  <button className="flex items-center gap-1 text-white bg-red-500 px-2 py-1 rounded text-xs hover:bg-red-600 whitespace-nowrap">
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Mobile action button */}
        <div className="fixed bottom-6 right-6 md:hidden">
          <button className="bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600">
            <Bell size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}
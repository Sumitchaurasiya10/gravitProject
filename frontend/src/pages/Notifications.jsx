import { Bell, Trash2, AlertTriangle } from "lucide-react";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Low Inventory Alert",
      message: "This is to notify you that the following items are running low in stock:",
      date: "07/04/24",
    },
    {
      id: 2,
      title: "Low Inventory Alert",
      message: "This is to notify you that the following items are running low in stock:",
      date: "07/04/24",
    },
    {
      id: 3,
      title: "Low Inventory Alert",
      message: "This is to notify you that the following items are running low in stock:",
      date: "07/04/24",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
    

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold  text-black">Notification</h2>
            <p className="text-gray-500">You’ve 3 unread notifications</p>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="text-gray-600" />
            <button className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-600">
              Mark all as read
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button className="px-4 py-2 bg-pink-500 text-white rounded-lg">All</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Unread</button>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 border"
            >
              <div className="flex items-center gap-4">
                <div className="bg-pink-100 p-3 rounded-lg">
                  <AlertTriangle className="text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{n.title}</h3>
                  <p className="text-gray-600 text-sm">{n.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-gray-500 text-sm">{n.date}</span>
                <button className="flex items-center gap-1 text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

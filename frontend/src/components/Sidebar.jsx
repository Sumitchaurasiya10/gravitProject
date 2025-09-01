import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaUtensils, FaClipboardList, FaBoxes, FaChartBar, FaUser } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">COSYPOS</h2>
      <nav className="space-y-4">
        <Link to="/dashboard" className="flex items-center gap-2 hover:text-yellow-400"><FaHome /> Dashboard</Link>
        <Link to="/staff" className="flex items-center gap-2 hover:text-yellow-400"><FaUsers /> Staff</Link>
        <Link to="/menu" className="flex items-center gap-2 hover:text-yellow-400"><FaUtensils /> Menu</Link>
        <Link to="/reservation" className="flex items-center gap-2 hover:text-yellow-400"><FaClipboardList /> Reservation</Link>
        <Link to="/orders" className="flex items-center gap-2 hover:text-yellow-400"><FaClipboardList /> Orders</Link>
        <Link to="/inventory" className="flex items-center gap-2 hover:text-yellow-400"><FaBoxes /> Inventory</Link>
        <Link to="/reports" className="flex items-center gap-2 hover:text-yellow-400"><FaChartBar /> Reports</Link>
        <Link to="/profile" className="flex items-center gap-2 hover:text-yellow-400"><FaUser /> Profile</Link>
      </nav>
    </div>
  );
}

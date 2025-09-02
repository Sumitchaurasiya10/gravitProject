import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Menu as MenuIcon,
  Package,
  Users,
  ClipboardList,
  CalendarDays,
  Bell,
  BarChart3,
  UserCircle,
  LogOut,
  UtensilsCrossed,
} from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/menu", label: "Menu", icon: UtensilsCrossed },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/staff", label: "Staff/Attendance", icon: Users },
  // { to: "/attendance", label: "Attendance", icon: ClipboardList },
  { to: "/reservation", label: "Reservation", icon: CalendarDays },
  { to: "/orders", label: "Orders/Tables", icon: UtensilsCrossed },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: UserCircle },
];

export default function AppLayout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside (only when collapsed)
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        open === true &&
        window.innerWidth < 1024 // only auto-close on small screens
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`transition-all duration-300 bg-white border-r border-gray-200 
        ${open ? "w-64" : "w-20"} fixed lg:sticky top-0 h-screen shadow-sm z-20`}
      >
        {/* Logo + Toggle */}
        <div className="h-16 flex items-center gap-2 px-4 border-b border-gray-200">
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
          {open && <span className="font-bold tracking-wide">COSYPOS</span>}
        </div>

        {/* Nav */}
        <nav className="p-3 space-y-1">
          {nav.map((Item) => (
            <NavLink
              key={Item.to}
              to={Item.to}
              className={({ isActive }) =>
                `relative group flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors
                ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <Item.icon className="w-5 h-5 shrink-0" />
              {open && <span>{Item.label}</span>}

              {/* Tooltip when collapsed */}
              {!open && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {Item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200">
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-red-50 text-red-600"
          >
            <LogOut className="w-5 h-5" /> {open && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 lg:ml-0 ml-20">
        {/* Topbar */}
        <header className="sticky top-0 z-10 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
          <div className="font-semibold">Welcome back 👋</div>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `relative p-2 rounded-full hover:bg-gray-100 transition ${
                  isActive ? "bg-gray-200 text-blue-600" : "text-gray-600"
                }`
              }
            >
              <Bell className="w-6 h-6" />
            </NavLink>

            {/* Profile */}
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `relative p-2 rounded-full hover:bg-gray-100 transition ${
                  isActive ? "bg-gray-200 text-blue-600" : "text-gray-600"
                }`
              }
            >
              <UserCircle className="w-7 h-7" />
            </NavLink>
          </div>
        </header>

        {/* Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

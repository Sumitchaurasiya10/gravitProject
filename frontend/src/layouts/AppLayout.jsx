import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
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
  LogOut
} from "lucide-react";

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/menu', label: 'Menu', icon: MenuIcon },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/staff', label: 'Staff', icon: Users },
  { to: '/attendance', label: 'Attendance', icon: ClipboardList },
  { to: '/reservation', label: 'Reservation', icon: CalendarDays },
  { to: '/orders', label: 'Orders/Tables', icon: Bell },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/profile', label: 'Profile', icon: UserCircle },
]

export default function AppLayout() {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className={`transition-all duration-300 bg-slate-900/70 border-r border-slate-800/60 ${open ? 'w-64' : 'w-20'} sticky top-0 h-screen`}>
        <div className="h-16 flex items-center gap-2 px-4 border-b border-slate-800/60">
          <button onClick={() => setOpen(o => !o)} className="p-2 rounded-lg hover:bg-slate-800" aria-label="Toggle sidebar">
            <MenuIcon className="w-5 h-5" />
          </button>
          {open && <span className="font-semibold tracking-wide">COSYPOS</span>}
        </div>
        <nav className="p-3 space-y-1">
          {nav.map(Item => (
            <NavLink
              key={Item.to}
              to={Item.to}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-slate-800 transition ${isActive ? 'bg-slate-800 text-white' : 'text-slate-300'}`}
            >
              <Item.icon className="w-5 h-5 shrink-0" />
              {open && <span>{Item.label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-800/60">
          <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-slate-800 text-red-300">
            <LogOut className="w-5 h-5" /> {open && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Topbar */}
        {/* <header className="sticky top-0 z-10 h-16 bg-slate-950/70 backdrop-blur border-b border-slate-800/60 flex items-center justify-between px-4">
          <div className="font-medium">Welcome back 👋</div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 text-sm bg-slate-800 rounded-lg hover:bg-slate-700">Export</button>
            <button className="px-3 py-1.5 text-sm bg-brand-600 rounded-lg hover:bg-brand-700">Add New</button>
          </div>
        </header> */}

        {/* Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

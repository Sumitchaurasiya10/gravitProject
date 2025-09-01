import { Route, Routes, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import Menu from './pages/Menu'
import Inventory from './pages/Inventory'
import Staff from './pages/staff/StaffList'
import Attendance from './pages/staff/Attendance'
import Orders from './pages/Orders'
import Reservation from './pages/Reservation'
import Reports from './pages/Reports'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
// import ManageAccess from "./pages/ManageAccess";


export default function App() {
return (
<Routes>
{/* Public routes */}
<Route path="/login" element={<Login />} />
<Route path="/forgot-password" element={<ForgotPassword />} />


{/* Protected layout (mock protected for now) */}
<Route element={<AppLayout />}>
<Route path="/" element={<Navigate to="/dashboard" replace />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/menu" element={<Menu />} />
<Route path="/inventory" element={<Inventory />} />
<Route path="/staff" element={<Staff />} />
<Route path="/attendance" element={<Attendance />} />
<Route path="/orders" element={<Orders />} />
<Route path="/reservation" element={<Reservation />} />
<Route path="/reports" element={<Reports />} />
<Route path="/notifications" element={<Notifications />} />
<Route path="/profile" element={<Profile />} />
{/* <Route path="/manage" element={<ManageAccess />} /> */}

</Route>


{/* Catch all */}
<Route path="*" element={<Navigate to="/dashboard" replace />} />
</Routes>
)
}
import { useState } from "react";
import { Pencil, Trash } from "lucide-react";

export default function ManageAccess() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Abubakar Sherazi",
      email: "abubakarsherazi@gmail.com",
      role: "Admin",
      permissions: {
        dashboard: true,
        reports: true,
        inventory: true,
        orders: true,
        customers: true,
        settings: true,
      },
    },
    {
      id: 2,
      name: "Anees Ansari",
      email: "aneesansari@gmail.com",
      role: "Sub admin",
      permissions: {
        dashboard: false,
        reports: true,
        inventory: true,
        orders: true,
        customers: false,
        settings: false,
      },
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const togglePermission = (userId, key) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, permissions: { ...u.permissions, [key]: !u.permissions[key] } }
          : u
      )
    );
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) return;
    setUsers([
      ...users,
      {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        permissions: {
          dashboard: false,
          reports: false,
          inventory: false,
          orders: false,
          customers: false,
          settings: false,
        },
      },
    ]);
    setNewUser({ name: "", email: "", role: "", password: "" });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Manage Access</h3>
      <p className="text-gray-600">
        Here you can manage account permissions, assign roles, or revoke access.
      </p>

      {/* User List */}
      <div className="space-y-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-white border rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.role === "Admin"
                      ? "bg-pink-100 text-pink-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {user.role}
                </span>
                <button className="text-gray-500 hover:text-gray-700">
                  <Pencil size={16} />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash size={16} />
                </button>
              </div>
            </div>

            {/* Permissions */}
            <div className="flex flex-wrap gap-6">
              {Object.keys(user.permissions).map((perm) => (
                <div key={perm} className="flex flex-col items-center">
                  <span className="capitalize text-sm text-gray-700">
                    {perm}
                  </span>
                  <button
                    onClick={() => togglePermission(user.id, perm)}
                    className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
                      user.permissions[perm]
                        ? "bg-pink-400"
                        : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        user.permissions[perm] ? "translate-x-4" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add New User */}
      <div className="p-4 bg-white border rounded-lg shadow-sm">
        <h4 className="font-semibold text-gray-900 mb-3">Add New User</h4>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="text"
            placeholder="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-pink-300"
          />
          <button
            onClick={handleAddUser}
            className="w-full py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

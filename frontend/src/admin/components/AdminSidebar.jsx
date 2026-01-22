import { NavLink } from "react-router-dom";
import { LayoutDashboard, Car, Grid, Clock, TrendingUp } from "lucide-react";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/vehicle-types", label: "Vehicle Types", icon: Car },
  { to: "/admin/rides", label: "Rides Management", icon: Grid },
  { to: "/admin/pending-vehicles", label: "Pending Approvals", icon: Clock },
  { to: "/admin/revenue", label: "Revenue", icon: TrendingUp },
];

function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="p-5 text-xl font-bold border-b">go2gather</div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;

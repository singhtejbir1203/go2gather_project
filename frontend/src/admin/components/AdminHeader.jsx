import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { logout } from "@/features/auth/authSlice";

function AdminHeader() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <div className="font-semibold text-gray-800">
        Admin Panel {user?.name ? `– ${user.name}` : ""}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
      >
        <LogOut size={16} />
        Logout
      </button>
    </header>
  );
}

export default AdminHeader;

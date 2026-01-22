import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Search, PlusCircle, User } from "lucide-react";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handlePublishClick = () => {
    navigate("/publish-info");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="w-full border-b sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-4xl font-bold text-[#00AFF5]">
          go2gather
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/search"
            className="flex items-center gap-2 font-semibold text-[#00AFF5]"
          >
            <Search size={18} />
            <span className="hidden md:inline">Search</span>
          </Link>

          <Link
            to="/publish"
            className="flex items-center gap-2 text-[#00AFF5] font-medium"
          >
            <PlusCircle size={18} />
            <span>Publish a ride</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full text-[#00AFF5]">
                <User size={20} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              {!isAuthenticated ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login">Log in</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register">Sign up</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-rides">Your rides</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

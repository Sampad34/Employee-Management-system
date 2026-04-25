import { useEffect, useState } from "react";
import { LogOut, User, LayoutDashboard, Menu, X } from "lucide-react";

const Header = (props) => {
  const { changeUser, userData, role } = props;
  const [username, setUsername] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (role === "admin") {
      setUsername("Admin");
    } else if (role === "employee" && userData) {
      setUsername(userData.firstName || "Employee");
    } else {
      setUsername("");
    }
  }, [userData, role]);

  const logOutUser = () => {
    changeUser();
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TaskFlow</h1>
              <p className="text-xs text-gray-400">Task Management System</p>
            </div>
          </div>

          {/* Desktop Welcome & Logout */}
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-gray-400">Welcome back,</p>
              <p className="text-lg font-semibold text-white">{username}</p>
            </div>
            <div className="w-px h-10 bg-gray-700"></div>
            <button
              onClick={logOutUser}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white 
                       px-4 py-2 rounded-lg transition-all duration-300 border border-red-500/20 hover:border-red-500"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-700 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400">Welcome back,</p>
                <p className="text-lg font-semibold text-white">{username}</p>
              </div>
              <button
                onClick={logOutUser}
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white 
                         px-3 py-1.5 rounded-lg transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
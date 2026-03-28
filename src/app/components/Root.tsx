import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Mountain, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";

export function Root() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"));
    setUserRole(localStorage.getItem("demoUserRole"));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("demoUserRole");
    localStorage.removeItem("demoUserId");
    setAuthToken(null);
    setUserRole(null);
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/treks", label: "Treks" },
    { path: "/help", label: "Help" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-[#1B5E20]">Gantavya</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors ${
                    isActive(link.path)
                      ? "text-[#1B5E20]"
                      : "text-[#263238] hover:text-[#2E7D32]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {authToken ? (
                <>
                  {userRole === "guide" && (
                    <Link
                      to="/guide/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-[#263238] hover:text-[#1B5E20] transition-colors"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 px-4 py-2 text-[#263238] hover:text-[#1B5E20] transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/guide/register"
                    className="px-5 py-2 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors shadow-md hover:shadow-lg"
                  >
                    Become a Guide
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#263238] hover:text-[#1B5E20]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-[#A5D6A7] text-[#1B5E20]"
                      : "text-[#263238] hover:bg-[#F5F5F5]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {authToken ? (
                <>
                  {userRole === "guide" && (
                    <Link
                      to="/guide/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-[#263238] hover:bg-[#F5F5F5] rounded-lg"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-[#263238] hover:bg-[#F5F5F5] rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/guide/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 bg-[#1B5E20] text-white rounded-lg text-center"
                  >
                    Become a Guide
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#F5F5F5] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-xl flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold text-[#1B5E20]">Gantavya</span>
              </div>
              <p className="text-[#263238] text-sm max-w-md">
                Your trusted platform for discovering Nepal's trekking routes and connecting with local guides.
              </p>
            </div>
            <div>
              <h4 className="text-[#1B5E20] mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/treks" className="text-[#263238] hover:text-[#2E7D32]">Browse Treks</Link></li>
                <li><Link to="/guide/register" className="text-[#263238] hover:text-[#2E7D32]">Become a Guide</Link></li>
                <li><Link to="/help" className="text-[#263238] hover:text-[#2E7D32]">Help & Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#1B5E20] mb-3">About</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-[#263238]">Fair & Transparent</li>
                <li className="text-[#263238]">No Biased Rankings</li>
                <li className="text-[#263238]">Local Guides</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm text-[#263238]">
            © 2026 Gantavya. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

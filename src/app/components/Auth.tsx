import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import { Mountain, Mail, Lock, User } from "lucide-react";
import { Link } from "react-router";
import { apiPost } from "../api/http";

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<"tourist" | "guide">("tourist");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const payload = isLogin
        ? { email, password }
        : { name, email, password, role: userType };

      const response = await apiPost<{ token: string; role: string; id: string }>(endpoint, payload);
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("demoUserRole", response.role);
      localStorage.setItem("demoUserId", response.id);
      navigate("/");
    } catch (error: any) {
      setError(error?.message ?? "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] to-[#F5F5F5] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mountain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-[#1B5E20] mb-2">Welcome to Gantavya</h1>
          <p className="text-[#263238]">{isLogin ? "Sign in to your account" : "Create your account"}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex gap-2 mb-6 p-1 bg-[#F5F5F5] rounded-xl">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isLogin ? "bg-white text-[#1B5E20] shadow-sm" : "text-[#717182] hover:text-[#263238]"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                !isLogin ? "bg-white text-[#1B5E20] shadow-sm" : "text-[#717182] hover:text-[#263238]"
              }`}
            >
              Sign Up
            </button>
          </div>

          {!isLogin && (
            <div className="mb-6">
              <label className="block text-[#263238] mb-2">I am a...</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("tourist")}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 transition-colors ${
                    userType === "tourist"
                      ? "bg-[#E8F5E9] border-[#2E7D32] text-[#1B5E20]"
                      : "border-gray-200 text-[#263238] hover:bg-[#F5F5F5]"
                  }`}
                >
                  Tourist
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("guide")}
                  className={`flex-1 px-4 py-3 rounded-xl border-2 transition-colors ${
                    userType === "guide"
                      ? "bg-[#E8F5E9] border-[#2E7D32] text-[#1B5E20]"
                      : "border-gray-200 text-[#263238] hover:bg-[#F5F5F5]"
                  }`}
                >
                  Guide
                </button>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-[#263238] mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#717182]" />
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[#263238] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#717182]" />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#263238] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#717182]" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 bg-[#F5F5F5] rounded-xl border-none outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-[#2E7D32] hover:text-[#1B5E20]">
                  Forgot password?
                </a>
              </div>
            )}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-[#1B5E20] text-white rounded-xl hover:bg-[#2E7D32] transition-colors shadow-md hover:shadow-lg"
            >
              {isLogin ? (loading ? "Signing In..." : "Sign In") : loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {!isLogin && userType === "guide" && (
            <div className="mt-4 p-4 bg-[#E8F5E9] rounded-xl border border-[#A5D6A7]">
              <p className="text-sm text-[#1B5E20]">
                Want to become a guide?{" "}
                <Link to="/guide/register" className="underline hover:text-[#2E7D32]">
                  Complete our guide registration
                </Link>
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-[#263238]">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <button onClick={() => setIsLogin(false)} className="text-[#2E7D32] hover:text-[#1B5E20]">
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={() => setIsLogin(true)} className="text-[#2E7D32] hover:text-[#1B5E20]">
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

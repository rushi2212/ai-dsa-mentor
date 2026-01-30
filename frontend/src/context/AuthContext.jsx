import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Optional: fetch user info
      axios
        .get("http://localhost:8000/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          // Don't logout on failed user fetch - token might still be valid
          console.error("Failed to fetch user info");
        });
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await axios.post(
        "http://localhost:8000/auth/jwt/login",
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );

      const newToken = res.data.access_token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      console.log("Login successful");
      return true;
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      return false;
    }
  };

  const register = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8000/auth/register", {
        email,
        password,
      });
      console.log("Registration successful:", res.data);
      return true;
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

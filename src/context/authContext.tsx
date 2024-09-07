"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../connections/firebaseConfig";
import { loginUser, logOut, registerUser } from "../apis/auth/firebaseAuth";
import { errorToast } from "../utils/toastUtils";

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await loginUser(email, password);

      if (user?.emailVerified) {
        setCurrentUser(user);
        navigate("/");
      } else {
        errorToast("Please verify your email before logging in.");
        await logOut();
      }
    } catch (error) {
      errorToast("Login failed. Please check your credentials.");
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await registerUser(email, password);
      navigate("/verify-email"); // Redirect to the verification page
    } catch (error) {
      errorToast("Registration failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await logOut();
      setCurrentUser(null); // Clear currentUser
      navigate("/login"); // Redirect to login page
    } catch (error) {
      errorToast("Logout failed. Please try again.");
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};

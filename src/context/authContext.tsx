"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../connections/firebaseConfig";
import { loginUser, logOut, registerUser } from "../apis/auth/firebaseAuth";
import { errorToast } from "../utils/toastUtils";

type AuthContextType = {
  currentUser: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
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
        navigate("/verify-email");
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await registerUser(email, password);
      navigate("/verify-email"); 
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logOut();
      setCurrentUser(null);
      navigate("/login");
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

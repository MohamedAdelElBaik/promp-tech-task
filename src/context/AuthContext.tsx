import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Car {
  id: number;
  user_id: number;
  text_plate: string;
  number_plate: string;
  model: string | null;
  type: string | null;
  qr_code_path: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  otp_code: string | null;
  otp_expires_at: string | null;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  created_at: string;
  updated_at: string;
  car: Car;
}

interface AuthState {
  token: string | null;
  user: User | null;
  text_plate: string | null;
  number_plate: string | null;
  qr_code_path: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  auth: AuthState;
  login: (data: {
    token: string;
    user: User;
    text_plate: string;
    number_plate: string;
    qr_code_path: string;
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    token: null,
    user: null,
    text_plate: null,
    number_plate: null,
    qr_code_path: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    const text_plate = localStorage.getItem("text_plate");
    const number_plate = localStorage.getItem("number_plate");
    const qr_code_path = localStorage.getItem("qr_code_path");

    if (token) {
      setAuth({
        token,
        user: user ? JSON.parse(user) : null,
        text_plate,
        number_plate,
        qr_code_path,
        isAuthenticated: true,
      });
    }
  }, []);

  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("authToken", auth.token);
      localStorage.setItem("user", JSON.stringify(auth.user));
      localStorage.setItem("text_plate", auth.text_plate || "");
      localStorage.setItem("number_plate", auth.number_plate || "");
      localStorage.setItem("qr_code_path", auth.qr_code_path || "");
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("text_plate");
      localStorage.removeItem("number_plate");
      localStorage.removeItem("qr_code_path");
    }
  }, [auth]);

  const login = (data: {
    token: string;
    user: User;
    text_plate: string;
    number_plate: string;
    qr_code_path: string;
  }) => {
    setAuth({
      token: data.token,
      user: data.user,
      text_plate: data.text_plate,
      number_plate: data.number_plate,
      qr_code_path: data.qr_code_path,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setAuth({
      token: null,
      user: null,
      text_plate: null,
      number_plate: null,
      qr_code_path: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

import { API_URL, TOKEN_KEY } from '@env';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({ token, authenticated: true });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    };
    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/register`, { email, password });
    } catch (error) {
      console.log(error);
      return { error: true, message: (error as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      setAuthState({ token: response.data.token, authenticated: true });
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
      return response;
    } catch (error) {
      console.log(error);
      return { error: true, message: String(error) };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({ token: null, authenticated: false });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

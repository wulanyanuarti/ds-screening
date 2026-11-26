import { createContext, useContext, useState, useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ACCOUNTS } from './lib/accounts.js';

const KEY = 'ds-screening-user';
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

// Sesi disimpan di sessionStorage: tetap masuk saat halaman dimuat ulang, otomatis keluar saat tab ditutup.
const load = () => { try { return JSON.parse(sessionStorage.getItem(KEY)); } catch { return null; } };
const save = (u) => { try { u ? sessionStorage.setItem(KEY, JSON.stringify(u)) : sessionStorage.removeItem(KEY); } catch { /* abaikan */ } };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(load);

  const login = useCallback((username, password) => {
    const a = ACCOUNTS.find((x) => x.username === username.trim().toLowerCase() && x.password === password);
    if (!a) return false;
    const u = { username: a.username, name: a.name, role: a.role, initials: a.initials }; // kata sandi tidak ikut disimpan
    save(u); setUser(u);
    return true;
  }, []);
  const logout = useCallback(() => { save(null); setUser(null); }, []);

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}

// Bungkus halaman yang hanya boleh dibuka setelah login.
export function RequireAuth({ children }) {
  const { user } = useAuth();
  const loc = useLocation();
  return user ? children : <Navigate to="/login" replace state={{ from: loc.pathname }} />;
}

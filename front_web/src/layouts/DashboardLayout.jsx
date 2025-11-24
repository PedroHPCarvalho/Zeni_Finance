// DashboardLayout.jsx (remova aqui qualquer redirect/cheque de token)
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, Outlet, Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, LayoutDashboard, Table, Moon, Sun, X } from "lucide-react";
import styles from "../styles/DashboardLayout/DashboardLayout.module.css";
import Logo from "../assets/Logo.png";
import { useMe } from "../hooks/useMe";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading } = useMe();

  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== "undefined" ? window.innerWidth > 768 : true));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("darkMode") === "true" : false));

  const isActive = (path) => location.pathname.startsWith(path);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) setSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [darkMode]);

  const handleLogout = useCallback(() => {
    setDropdownOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("darkMode");
    navigate("/login", { replace: true });
  }, [navigate]);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("darkMode", next);
    setDropdownOpen(false);
  };

  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(" ").map((n) => n[0].toUpperCase()).slice(0, 2).join("");
    }
    return "U";
  };

  return (
    <div className={styles.container}>
      {sidebarOpen && typeof window !== "undefined" && window.innerWidth <= 768 && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        {/* ... seu sidebar unchanged ... */}
        <div className={styles.logo}>
          <div className={styles.logoContent}>
            <img src={Logo} alt="Zeni" className={styles.logoIcon} />
            <span className={`${styles.logoText} ${!sidebarOpen ? styles.hideText : ""}`}>Zeni Finance</span>
          </div>
          <button className={styles.closeMobileBtn} onClick={() => setSidebarOpen(false)}><X size={24} /></button>
        </div>

        <nav className={styles.menu}>
          <Link className={`${styles.link} ${isActive("/dashboard") ? styles.active : ""}`} to="/dashboard">
            <LayoutDashboard size={20} />
            <span className={!sidebarOpen ? styles.hideText : ""}>Dashboard</span>
          </Link>
          <Link className={`${styles.link} ${isActive("/registers") ? styles.active : ""}`} to="/registers">
            <Table size={20} />
            <span className={!sidebarOpen ? styles.hideText : ""}>Registros</span>
          </Link>
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}><Menu size={24} /></button>

          <div className={styles.userMenu}>
            <button className={styles.userBtn} onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className={styles.userAvatar}>{getUserInitials()}</div>
            </button>

            {dropdownOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>{!loading && user?.name ? user.name : "Usuário"}</div>

                <button className={styles.dropdownItem} onClick={toggleDarkMode}>
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  <span>{darkMode ? "Modo Claro" : "Modo Noturno"}</span>
                </button>

                <button className={styles.dropdownItem} onClick={handleLogout}>
                  <LogOut size={18} /> <span className={styles.logout}>Sair</span>
                </button>
              </div>
            )}
          </div>
        </header>

        <div className={styles.content}><Outlet /></div>
      </div>
    </div>
  );
}

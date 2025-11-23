import React, { useState, useEffect } from "react";
import { useLocation, Outlet, Link } from "react-router-dom";
import { LogOut, Menu, LayoutDashboard, Table, Moon, X } from "lucide-react";
import styles from "../styles/DashboardLayout/DashboardLayout.module.css";
import Logo from "../assets/Logo.png";
import { useMe } from "../hooks/useMe";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  const { user, loading } = useMe();

  // Fecha a sidebar ao trocar de página no mobile
  useEffect(() => {
    if (window.innerWidth <= 768) setSidebarOpen(false);
  }, [location]);

  // Aplica modo noturno
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [darkMode]);

  const handleLogout = () => console.log("Logout");

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem("darkMode", newValue);
  };

  

  // Calcula iniciais do usuário
  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map(n => n[0].toUpperCase())
        .slice(0, 2)
        .join("");
    }
    return "U";
  };

  return (
    <div className={styles.container}>
      {/* Overlay para mobile */}
      {sidebarOpen && window.innerWidth <= 768 && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.logo}>
          <div className={styles.logoContent}>
            <img src={Logo} alt="Zeni" className={styles.logoIcon} />
            <span className={`${styles.logoText} ${!sidebarOpen ? styles.hideText : ""}`}>
              Zeni Finance
            </span>
          </div>

          <button
            className={styles.closeMobileBtn}
            onClick={() => setSidebarOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
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

      {/* MAIN */}
      <div className={styles.main}>
        {/* HEADER */}
        <header className={styles.header}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </button>

          {/* MENU DO USUÁRIO */}
          <div className={styles.userMenu}>
            <button className={styles.userBtn} onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className={styles.userAvatar}>{getUserInitials()}</div>
            </button>

            {dropdownOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>{!loading && user?.name ? user.name : "Usuário"}</div>
                <button className={styles.dropdownItem} onClick={toggleDarkMode}>
                  <Moon size={18} /> <span>Modo Noturno</span>
                </button>
                <button className={styles.dropdownItem} onClick={handleLogout}>
                  <LogOut size={18} /> <span className={styles.logout}>Sair</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* CONTENT */}
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

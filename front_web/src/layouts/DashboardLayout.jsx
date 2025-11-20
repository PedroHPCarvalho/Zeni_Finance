import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LogOut, Menu, LayoutDashboard, Table, PiggyBank, User, Moon, Settings } from "lucide-react";
import styles from "../styles/DashboardLayout/DashboardLayout.module.css";
import Logo from "../assets/Logo.png";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
  fetch("/me")
    .then(async (res) => {
      if (!res.ok) return null; // evita crash
      return await res.json();
    })
    .then(data => setUser(data))
    .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    console.log("Logout");
  };

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem("darkMode", newValue);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  
  return (
    <div className={styles.container}>

      {/* SIDEBAR */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.logo}>
          <img src={Logo} alt="Zeni" className={styles.logoIcon} />
          {sidebarOpen && <span className={styles.logoText}>Zeni Finance</span>}
        </div>

        <nav className={styles.menu}>
        <a
          className={`${styles.link} ${isActive("/dashboard") ? styles.active : ""}`}
          href="/dashboard"
        >
          <LayoutDashboard size={20} />
          {sidebarOpen && <span>Dashboard</span>}
        </a>

        <a
          className={`${styles.link} ${isActive("/registers") ? styles.active : ""}`}
          href="/registers"
        >
          <Table size={20} />
          {sidebarOpen && <span>Registros</span>}
        </a>
      </nav>
      </aside>

      {/* MAIN */}
      <div className={styles.main}>

        {/* HEADER */}
        <header className={styles.header}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>

          {/* MENU DO USUÁRIO */}
          <div className={styles.userMenu}>
            <button
              className={styles.userBtn}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {/* Avatar com iniciais */}
              <div className={styles.userAvatar}>
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
            </button>

            {dropdownOpen && (
              <div className={styles.dropdown}>
                
                {/* Cabeçalho com nome */}
                <div className={styles.dropdownHeader}>
                  {user?.name || "Usuário"}
                </div>

                <button className={styles.dropdownItem}>
                  <User size={18} />
                  <span>Perfil</span>
                </button>

                <button className={styles.dropdownItem}>
                  <Settings size={18} />
                  <span>Configurações</span>
                </button>

                <button
                  className={styles.dropdownItem}
                  onClick={toggleDarkMode}
                >
                  <Moon size={18} />
                  <span>Modo Noturno</span>
                </button>

                <button
                  className={styles.dropdownItem}
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span className={styles.logout}>Sair</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* CONTENT */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

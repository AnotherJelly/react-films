import { useState } from "react";
import { NavLink, useLocation, useResolvedPath } from "react-router-dom";
import styles from './Header.module.css'
import { ButtonClear } from "../ButtonClear/ButtonClear";

const links = [
  { name: 'Главная', href: '/' },
  { name: 'Избранное', href: '/favorites' },
];

export function Header( ) {
  const location = useLocation();
  const favoritesPath = useResolvedPath('/favorites').pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <button
        className={`${styles.burger} ${isMenuOpen ? styles.active : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <i></i>
      </button>

      <div className={styles.navBackground} onClick={() => setIsMenuOpen(false)}></div>

      <nav className={styles.navigation}>
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {location.pathname === favoritesPath && (
        <ButtonClear />
      )}
    </header>
  );
}
import React, { useContext } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import Search from './Search';
import AuthContext from '../context/AuthContext';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <img
            style={{ cursor: 'pointer' }}
            src='../../images/eventify_logo_lg.png'
            alt='logo'
          />
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href='/events'>Events</Link>
          </li>
          {user ? (
            // if logged in
            <>
              <li>
                <Link href='/events/add'>Add Event</Link>
              </li>
              <li>
                <button onClick={() => logout()} className='btn-secondary'>
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            // if logged out
            <>
              <li>
                <Link href='/account/login' className='btn-secondary btn-icon'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

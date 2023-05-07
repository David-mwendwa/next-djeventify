import React from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import Search from './Search';

const Header = () => {
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
          <li>
            <Link href='/events/add'>Add Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

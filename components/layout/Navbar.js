/* eslint-disable linebreak-style */
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import classes from './Navbar.module.scss';
import Logo from '../../images/meal_khuj_logo.png';

function Navbar() {
  return (
    <nav className={classes.navbar}>
      <Link href="/" className={classes.logo}>
        <Image src={Logo} />

        {/* <a className={classes.logo}>
              </a> */}
      </Link>
      <ul className={classes.navLinks}>
        <li>
          <Link href="/meals">Meals</Link>
        </li>
        <li>
          <Link href="/savedMeals">Saved List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

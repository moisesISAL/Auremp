import Link from 'next/link'
import React from 'react'
import { Search, ShoppingCart } from 'react-feather'
import Image from "next/image";
import styles from '../styles/Navbar.module.scss'
import { useRouter } from "next/router";

const Navbar = () => {
    const router = useRouter();
    const isHome = router.pathname === "/";

    return (
        <div className={styles.nav}>
            <a className={styles.logo}>
            <Image
              src="/auremp-logo.png"
              alt="Picture of the author"
              width="48"
              height="40"
            />
                <p>AUREMP</p>
            </a>
            <div className={styles.items}>
                <ul>
                    <li><Link href={`/`}>INICIO</Link>{router.pathname === '/' && <div className={styles.line}></div>}</li>
                    <li><Link href={`/productos/aceite-sublingual`}>Aceites</Link></li>
                    <li><Link href={`/productos/gomitas-cbd`}>Gomitas</Link></li>
                    {/* <li><Link href='#'>Suplementos</Link></li> */}
                </ul>
                <div className={styles.icons}>
                    <Link href={`/cart`}><ShoppingCart/></Link>
                    {/* <Search/> */}
                </div>
            </div>
            
        </div>
    )
}

export default Navbar

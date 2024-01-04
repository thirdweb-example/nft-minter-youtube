import { ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbarLogo}>
                <h1>NFT Minter</h1>
            </div>
            <div className={styles.navbarLinks}>
                <Link href={"/"}>
                    <p>Minter</p>
                </Link>
                <Link href={"/collection"}>
                    <p>Collection</p>
                </Link>
            </div>
            <ConnectWallet
                btnTitle="Sign In"
            />
        </div>
    )
};
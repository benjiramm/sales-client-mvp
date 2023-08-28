import { UserContext } from "@/context/userContext";
import Link from "next/link";
import { useContext, useState } from "react";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const [extended, setExtended] = useState(false);

  const handleLogout = () => {
    router.push("/");
    setUser(null);
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.brand_title}>
          <div className={styles.logo}>LOGO</div>
        </div>

        <div
          className={styles.toggle_button}
          onClick={() => setExtended(!extended)}
        >
          <span className={styles.bar1}></span>
          <span className={styles.bar2}></span>
          <span className={styles.bar3}></span>
        </div>
        <div
          className={`${styles.navbar_links} ${
            extended ? styles.active : null
          }`}
        >
          <ul>
            <li>
              <Link href={"/"}>
                <FontAwesomeIcon icon="home" /> בית
              </Link>
            </li>
            {/* AUTH LINKS */}
            {user && (
              <>
                <li>
                  <Link href={"/protected/new_shift"}>
                    <FontAwesomeIcon icon="circle-plus" /> הכנס/י מכירות
                  </Link>
                </li>
                <li>
                  <Link href={"/protected/history"}>
                    <FontAwesomeIcon icon="calendar-alt" /> היסטוריה
                  </Link>
                </li>
              </>
            )}

            {/* PUBLIC LINKS */}
            <li>
              <Link href={"items"}>
                <FontAwesomeIcon icon="list" /> פריטים
              </Link>
            </li>
            <li>
              <Link href={"staff"}>
                <FontAwesomeIcon icon="users" /> צוות
              </Link>
            </li>
            {/* SUPERUSER LINKS*/}
            {user?.is_admin && (
              <li>
                <Link href={"/protected/users"}>
                  <FontAwesomeIcon icon="user-tie" /> מנהלים
                </Link>
              </li>
            )}
            {/* LOGIN/LOGOUT LINKS */}
            {user ? (
              <li>
                <Link href={"/"} onClick={() => handleLogout()}>
                  <FontAwesomeIcon icon="right-from-bracket" /> התנתק/י
                </Link>
              </li>
            ) : (
              <li>
                <Link href={"login"}>
                  <FontAwesomeIcon icon="right-to-bracket" /> התחברי/י
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

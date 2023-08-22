import { User, UserContext } from "@/context/userContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useContext } from "react";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
    setUser(null);
  };
  return (
    <div className={styles.main_bar}>
      {/** Logo display and secure links */}
      <div className={styles.navbar_section}>
        <Link href={"/"}>
          <div className={styles.logo_div}>
            <img className={styles.logo_image} src="/japanika_logo.svg" />
            <div className={styles.logo_title}>תחרות מכירות</div>
          </div>
        </Link>

        {user && (
          <>
            <Link href="/protected/new_shift">
              <div className={styles.button}>
                <FontAwesomeIcon icon="circle-plus" />
                הכנס מכירות
              </div>
            </Link>

            <Link href="/protected/history">
              <div className={styles.button}>
                <FontAwesomeIcon icon="calendar-alt" />
                היסטוריה
              </div>
            </Link>
          </>
        )}

        {
          <>
            <Link href="/items">
              <div className={styles.button}>
                <FontAwesomeIcon icon="list" />
                פריטים
              </div>
            </Link>

            <Link href="/staff">
              <div className={styles.button}>
                <FontAwesomeIcon icon="users" />
                עובדים
              </div>
            </Link>
          </>
        }
      </div>

      <div className={styles.navbar_section}>
        {/** Username display */}
        {user && (
          <div className={styles.username_display}>
            <FontAwesomeIcon icon="user" />
            <p>
              שלום,{" "}
              <strong className={styles.username_text}>{user.username}</strong>
            </p>
          </div>
        )}
        {/** Login/Logout Buttons */}
        {user ? (
          <div className={styles.navbar_section}>
            <div className={styles.button} onClick={() => handleLogout()}>
              <FontAwesomeIcon icon="right-from-bracket" /> התנתק
            </div>
          </div>
        ) : (
          <Link href="/login">
            <div className={styles.navbar_section}>
              <div className={styles.button}>
                <FontAwesomeIcon icon="right-to-bracket" /> התחבר
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

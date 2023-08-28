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
              <Link href={"#"}>Home</Link>
            </li>
            <li>
              <Link href={"#"}>About</Link>
            </li>
            <li>
              <Link href={"#"}>Contacts</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

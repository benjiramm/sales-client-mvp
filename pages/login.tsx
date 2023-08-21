import { UserContext } from "@/context/userContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styles from "../styles/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let errorMessage = "";

  const mutation = useMutation({
    mutationFn: (loginPayload: any) => {
      return axios.post("http://localhost:3000/auth/login", loginPayload, {
        withCredentials: true,
      });
    },
    onSuccess: async (data) => {
      console.log(data);
      const userData = await axios.get("http://localhost:3000/auth", {
        withCredentials: true,
      });
      setUser({
        username: userData.data.username,
        is_admin: userData.data.is_admin,
        _id: userData.data._id,
      });
      router.push("/");
    },
  });

  if (user) {
    router.push("/");
  }

  const handleSubmit = () => {
    console.log(username, password);
    mutation.mutate({ username, password });
  };

  if (mutation.isError) {
    const error: AxiosError = mutation.error as AxiosError;
    errorMessage = error.message;

    if (error?.response) {
      const data = error.response.data as any;
      errorMessage = data?.message;
    }
  }

  return (
    <>
      <div className="main-page">
        <h1 className="title">התחבר</h1>
        <div className={styles.main_card}>
          <div className={styles.input_section}>
            <label>שם משתמש</label>
            <input
              className={styles.text_box}
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.input_section}>
            <label>סיסמא</label>
            <input
              className={styles.text_box}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {!mutation.isLoading && (
          <button
            className={styles.button}
            onClick={() => handleSubmit()}
            disabled={mutation.isLoading}
          >
            <FontAwesomeIcon icon="right-to-bracket" /> התחבר
          </button>
        )}

        {mutation.isError && (
          <div className={styles.error_banner}>
            <FontAwesomeIcon icon="circle-exclamation" /> {errorMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default Login;

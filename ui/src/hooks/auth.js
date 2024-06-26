import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAnimationStore } from "@/store/store";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();
  const params = useParams();

  const componentExit = useAnimationStore((state) => state.componentExit);
  const updateComponentExit = useAnimationStore((state) => state.setExit);
  const resetComponentExit = useAnimationStore((state) => state.resetExit);

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/login", props)
      .then(() => mutate())
      .then(() => {
        updateComponentExit("login");
      })
      .then(() => {
        router.push("/");
      })
      .then(() => 
        setTimeout(() => {
          resetComponentExit();
        } 
        , 2000))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const logout = async () => {
    if (!error) {
      await axios
        .post("/logout")
        .then(() => mutate())
        .then(() => {
          updateComponentExit("clients");
        })
        .then(() => {
         
            router.push("/");}
        ).then(() => 
          setTimeout(() => {
            resetComponentExit();
          } 
          , 2000))
    } else{
      window.location.pathname = "/login";
    }
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    if (Object.values(componentExit).every((value) => false)) {
        router.push(redirectIfAuthenticated);
      } 
    }
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    login,
    logout,
  };
};

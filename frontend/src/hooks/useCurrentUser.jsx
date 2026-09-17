import { useEffect } from "react";
import { useUser } from "../context/UserContext";

const useCurrentUser = () => {
  const { fetchCurrentUser } = useUser();

  useEffect(() => {
    fetchCurrentUser();
  }, []);
};

export default useCurrentUser;

import { useCallback, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserRoleContext } from "../../../context/Context";
import { Fetchdata } from "../handleFetch/FetchData";

export const useHandleFetch = () => {
  const loadProgress = useRef(null);

  const navigate = useNavigate();

  const { logout } = useContext(UserRoleContext);

  const handleFetch = useCallback(
    async (method, url, body, form) => {
      loadProgress?.current?.continuousStart();

      try {
        const result = await Fetchdata(method, url, body, form);

        if (result.login === false) {
          logout();
          navigate("/login");
          return;
        }

       

        return result;
      } catch (e) {
        console.error("Error during fetch:", e.message);

      } finally {
        loadProgress?.current?.complete();
      }
    },
    [logout, navigate, loadProgress]
  );

  return { handleFetch };
};

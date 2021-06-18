import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLogoutMutation } from "../generated/graphql";
import {
  useTokenStore,
  ITokenStore,
  accessTokenKey,
} from "../modules/auth/useTokenStore";
import { withApollo } from "../utils/withApollo";

const Logout = () => {
  const { push } = useRouter();
  const [logout] = useLogoutMutation();
  const token = useTokenStore();

  const handleLogout = async () => {
    const loggedOut = await logout();
    if (loggedOut) {
      localStorage.setItem(accessTokenKey, "");
      token.set((s: ITokenStore) => {
        s.accessToken = "";
        s.isLoggedIn = "notLoggedIn";
      });
      push("/");
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <></>;
};

export default withApollo()(Logout);

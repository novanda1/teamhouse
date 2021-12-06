import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../../generated/graphql";
import { useAuthStore } from "./useAuthStore";

export const WaitForAuth: React.FC = ({ children }) => {
  const hasToken = useAuthStore((s) => s.accessToken);
  const { setMe } = useAuthStore();
  const { data, loading, error } = useMeQuery();

  const { push } = useRouter();

  useEffect(() => {
    if (!hasToken) push("/");
  }, [hasToken, push]);

  useEffect(() => {
    if (data?.me) setMe(data.me);
  }, [data?.me, setMe]);

  if (loading) return <>loading</>;
  else if (error) return <>somthing went wrong</>;
  else return <>{children}</>;
};

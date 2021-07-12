import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";

export const WaitForAuth: React.FC = ({ children }) => {
  const hasToken = useAuthStore((s) => s.accessToken);
  const { push } = useRouter();

  useEffect(() => {
    if (!hasToken) push("/");
  }, [hasToken, push]);

  return <>{children}</>;
};

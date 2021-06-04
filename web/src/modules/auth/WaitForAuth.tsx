import React, { useContext } from "react";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForWsAndAuthProps {}

export const WaitForAuth: React.FC<WaitForWsAndAuthProps> = ({ children }) => {
  useVerifyLoggedIn()
  // if (!useVerifyLoggedIn()) {
  //   return (
  //     <>
  //       <div>please login</div>
  //     </>
  //   );
  // }

  //   if (!conn) {
  //     // @todo make this better
  //     return <div className="flex">loading...</div>;
  //   }

  return <>{children}</>;
};

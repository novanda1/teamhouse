import { useEffect, useState } from "react";
import { useMeQuery } from "../generated/graphql";

const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean)

  useEffect(() => {
    if(!loading && data?.me) {
      setIsLoggedIn(true)
      } else if(!loading && !data?.me) {
      setIsLoggedIn(false)
    }
  },[data,loading])

  return isLoggedIn
}

export default useIsAuth

// import {useAuth} from "hooks";
import {useAppSelector} from "@/redux/hooks";
import {ReactNode} from "react";
import {Navigate} from "react-router-dom";

/**
 * - If the route is restricted and the user is logged in, render a <Navigate> to redirectTo
 * - Otherwise render the component
 */

export const RestrictedRoute = ({
  component: Component,
  redirectTo = "/",
}: {
  component: ReactNode;
  redirectTo: string;
}) => {
  //   const {isLoggedIn} = useAuth();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  console.log("RestrictedRoute", isAuthenticated);

  //   return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
  return isAuthenticated ? <Navigate to={redirectTo} /> : Component;
};

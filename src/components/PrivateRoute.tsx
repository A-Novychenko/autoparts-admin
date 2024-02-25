import {useAppSelector} from "@/redux/hooks";
import {ReactNode} from "react";
import {Navigate} from "react-router-dom";
// import {useAuth} from "hooks";

/**
 * - If the route is private and the user is logged in, render the component
 * - Otherwise render <Navigate> to redirectTo
 */

export const PrivateRoute = ({
  component: Component,
  redirectTo = "/",
}: {
  component: ReactNode;
  redirectTo: string;
}) => {
  //   const {isLoggedIn, isRefreshing} = useAuth();
  //   const shouldRedirect = !isLoggedIn && !isRefreshing;

  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  console.log("PrivateRoute", isAuthenticated);

  const shouldRedirect = !isAuthenticated;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};

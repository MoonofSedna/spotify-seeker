import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// atoms
import { isAuthenticated as isAuthenticatedAtom } from "../recoil/auth/atoms";

export default function PrivateRoute({ children: Component, logout }) {
  const [isAuthenticated] = useRecoilState(isAuthenticatedAtom);

  if (isAuthenticated) {
    return Component;
  } else {
    return <Navigate to="/" />;
  }
}

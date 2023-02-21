import React from "react";
import { useOktaAuth } from "@okta/okta-react";

function Header() {
  const { authState, oktaAuth } = useOktaAuth();
  const loginWithRedirect = () =>
    oktaAuth.signInWithRedirect({ originalUri: "/" });
  const logOut = () => oktaAuth.signOut();
  const btnLogic = authState.isAuthenticated ? logOut : loginWithRedirect;
  React.useState(() => {
    btnLogic();
  }, []);

  return <></>;
}

export default Header;

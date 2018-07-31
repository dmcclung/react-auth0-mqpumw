import Auth0 from "auth0-js";
import AUTH0_CONFIG from "./Auth.config";

const auth0 = new Auth0.WebAuth(AUTH0_CONFIG);

export function login() {
  auth0.authorize();
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("id_token");
  localStorage.removeItem("profile");
  localStorage.removeItem("expires_at");
  window.setState({ isLoggedIn: false, profile: undefined });
}

export function handleAuth() {
  auth0.parseHash(window.location.hash, (err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      window.location.hash = "";
      getProfile(authResult);
    } else if (err) {
      console.error(`Error: ${err.error}`);
    }
  });
}

function getProfile(authResult) {
  auth0.client.userInfo(authResult.accessToken, (err, profile) => {
    setSession(authResult, profile);
  });
}

function setSession(authResult, profile) {
  const expTime = authResult.expiresIn * 1000 + Date.now();
  // Save session data and update login status subject
  localStorage.setItem("token", authResult.accessToken);
  localStorage.setItem("id_token", authResult.idToken);
  localStorage.setItem("profile", JSON.stringify(profile));
  localStorage.setItem("expires_at", JSON.stringify(expTime));
  window.setState({ isLoggedIn: true, profile });
}

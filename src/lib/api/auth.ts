import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodeToken extends JwtPayload {
  resource_access?: {
    [key: string]: {
      roles: string[];
    };
  };
}

export const keycloakAuth = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:9090/realms/kaleidoscope-microservice-realm/protocol/openid-connect/token",
      new URLSearchParams({
        grant_type: "password",
        client_id: "react-frontend",
        username: email,
        password: password,
      })
    );

    const decodedToken = jwt.decode(
      response.data.access_token
    ) as DecodeToken | null;

    console.log(decodedToken);

    if (
      decodedToken?.resource_access?.["react-frontend"]?.roles[1] !==
      "kalei_ADMIN"
    ) {
      return false;
    }

    const userId = JSON.stringify(decodedToken?.sub ?? "");

    localStorage.setItem("user_id", userId);
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    localStorage.setItem(
      "expires_at",
      (Date.now() + response.data.expires_in * 1000).toString()
    );

    return true;
  } catch (error) {
    console.log("Error when login", error);
  }
};

export function logoutUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("expires_at");

  window.location.href = window.location.origin + "/auth/login";
}

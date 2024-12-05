import axios from "axios";

export async function refreshToken() {
  const refresh_token = localStorage.getItem("refresh_token");

  if (!refresh_token) {
    throw new Error("No refresh token available");
  }

  const response = await axios.post(
    "http://localhost:9090/realms/kaleidoscope-microservice-realm/protocol/openid-connect/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      client_id: "react-frontend",
      // client_secret: "<your-client-secret>",
      refresh_token: refresh_token,
    })
  );

  // Update tokens in storage
  localStorage.setItem("access_token", response.data.access_token);
  localStorage.setItem("refresh_token", response.data.refresh_token);
  localStorage.setItem(
    "expires_at",
    (Date.now() + response.data.expires_in * 1000).toString()
  );

  return response.data.access_token;
}

import jwt from "jsonwebtoken";

/**
 * Decodes the JWT token and extracts user information.
 * @param {string} token - The JWT token to decode.
 * @returns {Object} - Decoded user information from the token.
 */
export function getUserInfoFromToken() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = jwt.decode(token);

    if (!decoded) {
      throw new Error("Invalid token");
    }

    if (typeof decoded !== "object") {
      throw new Error("Invalid token format");
    }

    const resource_access = decoded?.resource_access;

    // console.log(decoded);

    const userInfo = {
      email: decoded?.email || "No email provided",
      roles: resource_access?.["react-frontend"]?.roles[0] || [],
      username: decoded?.name || "Unknown",
    };

    return userInfo;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Invalid token format: " + error);
  }
}

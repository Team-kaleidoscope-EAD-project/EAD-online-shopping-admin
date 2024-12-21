import axios from "axios";

export const updateUserData = async (updates: any) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");

    console.log(accessToken, userId, updates);

    if (!accessToken) {
      console.log("User is not authenticated");
      return;
    }

    const response = await axios.put(
      `http://localhost:9090/realms/kaleidoscope-microservice-realm/users/${userId}`,
      updates,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("User updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

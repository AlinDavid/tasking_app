export const signInUser = async (formData: any) => {
  try {
    const response = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        accessToken: data.data.accessToken,
      };
    } else {
      let error = "Unexpected error";

      switch (data.message) {
        case "User not found - credentials don't match":
          error = "Credentials don't match";
          break;
        case "User not found - user doesn't exist":
          error = "User is not registered";
          break;
        default:
          break;
      }
      return {
        success: false,
        error,
      };
    }
  } catch (error) {
    console.error("Error during logging:", error);
    return { success: false };
  }
};

export default signInUser;

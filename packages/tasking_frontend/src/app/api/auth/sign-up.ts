export const signUpUser = async (formData: any) => {
  try {
    const response = await fetch("http://localhost:8000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      if (response.status === 409 && data.message === "Email already exists") {
        return { success: false, error: "Email already exists" };
      } else {
        return { success: false };
      }
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false };
  }
};

export default signUpUser;

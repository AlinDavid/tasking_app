export const getTasks = async (accessToken: string) => {
  try {
    const response = await fetch("http://localhost:8000/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();

    if (result.message === "Invalid token") {
      return { success: false, error: "Invalid Token", data: null };
    }

    if (response.ok) {
      return { success: true, data: result.data };
    } else {
      return { success: false, data: null };
    }
  } catch (error) {
    console.error("Error while retrieving tasks:", error);
    return { success: false };
  }
};

export default getTasks;

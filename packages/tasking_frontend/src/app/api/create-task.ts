import { ITask } from "@/interfaces/task";

export const createTask = async (
  formData: Partial<ITask>,
  accessToken: string
) => {
  try {
    const response = await fetch("http://localhost:8000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error during task creation:", error);
    return { success: false };
  }
};

export default createTask;

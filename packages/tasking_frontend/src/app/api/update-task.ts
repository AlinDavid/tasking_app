import { ITask } from "@/interfaces/task";

export const updateTask = async (
  formData: Partial<ITask>,
  accessToken: string
) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/tasks/${formData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ...formData,
        }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result.data };
    } else {
      return { success: false, data: null };
    }
  } catch (error) {
    console.error("Error while updating task:", error);
    return { success: false };
  }
};

export default updateTask;

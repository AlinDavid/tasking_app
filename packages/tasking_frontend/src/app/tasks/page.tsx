"use client";
import { useRouter } from "next/navigation";
import Tasks from "./components/tasks";
import Navbar from "./components/navbar";

const TasksPage = () => {
  const router = useRouter();

  return (
    <>
      <Navbar router={router} />
      <Tasks router={router} />
    </>
  );
};

export default TasksPage;

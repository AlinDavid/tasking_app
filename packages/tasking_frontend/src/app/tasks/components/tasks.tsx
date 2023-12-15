"use client";
import React, { FC, useEffect, useState } from "react";
import Cookies from "js-cookie";
import CreateTaskModal from "./create-task-modal";
import DeleteConfirmationModal from "./delete-task-modal";
import ViewTaskModal from "./view-task-modal";
import EditTaskModal from "./edit-task-modal";
import getTasks from "@/app/api/get-tasks";
import deleteTask from "@/app/api/delete-task";
import { ITask, Status } from "@/interfaces/task";

interface TasksProps {
  router: any;
}

const Tasks: FC<TasksProps> = ({ router }) => {
  const [tasks, setTasks] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const getBackgroundColor = (task: ITask) => {
    let cardBackground = "";

    if (task) {
      switch (task.status) {
        case Status.Todo:
          cardBackground = "bg-gray-200";
          break;
        case Status.InProgress:
          cardBackground = "bg-blue-200";
          break;
        case Status.Done:
          cardBackground = "bg-green-200";
          break;
        default:
          break;
      }
    }

    return cardBackground;
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openDeleteModal = (task: ITask) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedTask(null);
    setIsDeleteModalOpen(false);
  };

  const openViewModal = (task: ITask) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedTask(null);
    setIsViewModalOpen(false);
  };

  const openEditModal = (task: ITask) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    // setSelectedTask(null);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    const getTasksData = async (accessToken: string) => {
      const { data, error } = await getTasks(accessToken);

      if (error === "Invalid Token") {
        Cookies.remove("accessToken");
        return router.push("/signin");
      }

      setTasks(data ? data.tasks : []);
    };
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      router.push("/signin");
    } else {
      try {
        getTasksData(accessToken);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const handleDelete = async (taskId: string) => {
    const authToken = Cookies.get("accessToken");

    try {
      try {
        await deleteTask(taskId, authToken as string);
      } catch (error) {
        console.error(error);
      }

      closeDeleteModal();

      if (authToken) {
        const { data } = await getTasks(authToken);
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Your Tasks
        </h2>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="mb-6">
          <button
            onClick={openCreateModal}
            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Create Task
          </button>
        </div>

        <ul className="space-y-4">
          {tasks.map((task: ITask) => (
            <li
              key="placeholder"
              className={`flex items-center justify-between ${getBackgroundColor(
                task
              )} rounded-md shadow-sm p-4`}
            >
              <span>{task.title}</span>
              <div className="flex">
                <button
                  className="text-white bg-yellow-500 hover:bg-yellow-600 rounded-md px-3 py-1 mr-2"
                  onClick={() => openEditModal(task)}
                >
                  Edit Task
                </button>
                <button
                  className="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-1 mr-2"
                  onClick={() => openViewModal(task)}
                >
                  View Task
                </button>
                <button
                  className="text-white bg-red-500 hover:bg-red-600 rounded-md px-3 py-1"
                  onClick={() => openDeleteModal(task)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          onDelete={() => handleDelete(selectedTask?.id!)}
        />
        <ViewTaskModal
          isOpen={isViewModalOpen}
          closeModal={closeViewModal}
          taskData={selectedTask!}
        />
        {selectedTask && (
          <EditTaskModal
            isOpen={isEditModalOpen}
            closeModal={closeEditModal}
            taskData={selectedTask!}
          />
        )}
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          closeModal={closeCreateModal}
        />
      </div>
    </div>
  );
};

export default Tasks;

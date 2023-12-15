import React, { FC } from "react";
import Modal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";
import { ITask, Status } from "@/interfaces/task";

interface ViewTaskModalProps {
  isOpen: boolean;
  closeModal: () => void;
  taskData: ITask;
}

const ViewTaskModal: FC<ViewTaskModalProps> = ({
  isOpen,
  closeModal,
  taskData,
}) => {
  let status = {
    background: "",
    message: "",
  };

  if (taskData) {
    switch (taskData.status) {
      case Status.Todo:
        status.background = "bg-gray-200";
        status.message = "To do";
        break;
      case Status.InProgress:
        status.background = "bg-blue-200";
        status.message = "In progress";
        break;
      case Status.Done:
        status.background = "bg-green-200";
        status.message = "Done";
        break;
      default:
        break;
    }
  }

  const formattedDueDate = taskData
    ? new Date(taskData.dueDate).toLocaleDateString()
    : "";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="absolute"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="w-full">
        <div className="bg-white p-4 rounded-lg">
          <div className="modal-header mb-4">
            <h2 className="text-lg font-bold text-center">View Task</h2>
            {taskData && (
              <div className="text-center">
                <span
                  className={`inline-block p-2 rounded ${status.background}`}
                >
                  {status.message}
                </span>
              </div>
            )}
          </div>
          <div className="modal-body">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="off"
                  value={taskData ? taskData.title : ""}
                  readOnly
                  className="block w-full rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  autoComplete="off"
                  value={taskData ? taskData.description : ""}
                  readOnly
                  className="block w-96 rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                  rows={10}
                />
              </div>

              <div className="flex flex-col items-center">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Due Date
                </label>
                <p className="text-center">{formattedDueDate}</p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewTaskModal;

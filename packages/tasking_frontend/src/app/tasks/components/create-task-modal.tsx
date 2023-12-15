import React, { FC, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import createTask from "@/app/api/create-task";
import Cookies from "js-cookie";

import "react-datepicker/dist/react-datepicker.css";

interface CreateTaskModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
  });

  const handleSave = async () => {
    try {
      const authToken = Cookies.get("accessToken");

      const response = await createTask(formData, authToken as string);

      if (response.success) {
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: new Date(),
    });
    closeModal();
  };

  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      dueDate: date,
    });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
            <h2 className="text-lg font-bold text-center">Create Task</h2>
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
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                  placeholder="Your task title"
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
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-96 rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500"
                  rows={10}
                  placeholder="Write your task description here"
                />
              </div>

              <div className="justify-center">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Due Date
                </label>
                <DatePicker
                  selected={formData.dueDate}
                  onChange={handleDateChange}
                  className="block w-full rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500 justify-center"
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateTaskModal;

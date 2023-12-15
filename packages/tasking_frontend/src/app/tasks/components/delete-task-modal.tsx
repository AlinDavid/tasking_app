import React, { FC } from "react";
import Modal from "react-modal";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  isOpen,
  closeModal,
  onDelete,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="absolute"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="bg-white p-4 rounded-md">
        <p className="mb-4">Are you sure you want to delete?</p>
        <div className="flex justify-center">
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md mr-2 text-sm"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-md text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;

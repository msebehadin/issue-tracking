"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssue = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to show the confirmation modal instead of a browser alert
  const handleDelete = () => {
    setShowConfirmation(true);
  };

  // Function to handle the confirmed deletion
  const handleConfirmDelete = async () => {
    setShowConfirmation(false);
    setLoading(true);
    try {
      const issueId = parseInt(params.id);
      if (isNaN(issueId)) {
        console.error("Invalid issue ID provided:",issueId);
        setError(true);
        return;
      }
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (err) {
      console.error("Delete failed:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the cancellation of the deletion
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex justify-center items-center"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Issue"}
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="p-8 border w-96 shadow-lg rounded-md bg-white text-center">
            <h3 className="text-lg font-bold">Are you sure?</h3>
            <p className="py-4">Do you really want to delete this issue? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-600 mt-2">Something went wrong. Please try again later.</p>
      )}
    </div>
  );
};

export default DeleteIssue;

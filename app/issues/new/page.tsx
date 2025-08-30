"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
type FormData = {
  title: string;
  description: string;
};

export default function NewIssuePage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/issue", data);
      router.push("/issues");
      console.log("Issue submitted:", response.data);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto mt-10 space-y-6 p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Create New Issue</h2>

      {/* Title Input */}
      <div>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Issue title"
          className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Markdown Editor */}
      <div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="issue description" />
          )}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
      >
        {isSubmitting ? "Submitting..." : "Create Issue"}
      </button>
    </form>
  );
}

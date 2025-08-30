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
      console.log("Issue submitted:", response.data);
      reset();
      router.push("/issues");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto mt-10 space-y-6 p-6 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-gray-800">Create New Issue</h2>

      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          {...register("title", { required: "Title is required" })}
          placeholder="Enter issue title"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              placeholder="Write a detailed description..."
            />
          )}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit Button with Tailwind Spinner */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
      >
        {isSubmitting && (
          <div className="h-5 w-5 border-2 border-t-2 border-white rounded-full animate-spin"></div>
        )}
        {isSubmitting ? "Submitting..." : "Create Issue"}
      </button>
    </form>
  );
}

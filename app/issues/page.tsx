import { prisma } from "@/prisma/client";
import Link from "next/link";
import React from "react";

const IssuePage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div className="p-6">
      {/* New Issue Button */}
      <div className="mb-4">
        <Link href="/issues/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
            New Issue
          </button>
        </Link>
      </div>

      {/* Issues Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Title</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Created At</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{issue.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(issue.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      issue.status === "open"
                        ? "bg-green-100 text-green-800"
                        : issue.status === "closed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {issue.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuePage;

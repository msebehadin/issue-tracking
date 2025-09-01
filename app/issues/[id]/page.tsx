import { prisma } from "@/prisma/client";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";

interface Props {
  params: { id: string };
}

const Page = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return <div>Issue not found.</div>;
  }

  return (
    <>
      <div>
        <p>
          <strong>Title:</strong> {issue.title}
        </p>
        <p>
          <strong>Description:</strong> {issue.description}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(issue.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div>
        <Link href={`/issues/${issue.id}/edit`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-small py-2 px-4 rounded-md transition duration-200 flex align-middle justify-center items-center space my-1">
            <BiEdit  />Edit Issue
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-small py-2 px-4 rounded-md transition duration-200 flex align-middle justify-center items-center">
            Delete Issue
          </button>
        </Link>
      </div>
    </>
  );
};

export default Page;

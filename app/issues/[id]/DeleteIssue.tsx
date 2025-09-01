'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  params: { id: string };
}
const DeleteIssue =  ({ params }: Props) => {
    const router = useRouter();
    const issueId =   parseInt(params.id);
    const [error, setError] =useState(false);
  return (
    <div>
        <button
        className="bg-red-500 hover:bg-red-700 text-white font-small py-2 px-4 rounded-md transition duration-200 flex align-middle justify-center items-center"
              onClick={async () => {
            try {
                                await axios.delete("/api/issue/" + "issueId");
                router.push('/issues')
                router.refresh()
            } catch (error) {
            setError(true)
            }
        }}
          >
         
        Delete Issue
      </button>
    </div>
  )
}

export default DeleteIssue

'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  params: { id: string }
}

const DeleteIssue = ({ params }: Props) => {
  const router = useRouter()
  const issueId = parseInt(params.id)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this issue?')
    if (!confirmed) return

    setLoading(true)
    try {
      await axios.delete(`/api/issue/${issueId}`)
      router.push('/issues')
      router.refresh()
    } catch (err) {
      console.error('Delete failed:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex justify-center items-center"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete Issue'}
      </button>
      {error && (
        <p className="text-red-600 mt-2">
          Something went wrong. Please try again later.
        </p>
      )}
    </div>
  )
}

export default DeleteIssue

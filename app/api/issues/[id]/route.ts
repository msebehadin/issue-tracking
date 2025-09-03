// app/api/issues/[id]/route.ts
import { issueSchema } from "@/app/validationSchema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } } // <-- Change type to 'string'
) {
  try {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.issues, { status: 400 });
    }

    // Convert the id to a number before using it in the query
    const id = parseInt(params.id);

    // Check if the issue exists before trying to update it
    const issue = await prisma.issue.findUnique({
      where: { id: id }, // <-- Use the parsed 'id' here
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    // Update the issue
    const updatedIssue = await prisma.issue.update({
      where: { id: issue.id },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (error) {
    console.error("Error in PATCH request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id=parseInt(params.id)
  try {
    // Find the issue first to ensure it exists
    const issue = await prisma.issue.findUnique({
      where: { id: id},
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    // Delete the issue
    await prisma.issue.delete({
      where: { id: issue.id },
    });

    // A 204 No Content status is standard for a successful DELETE
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Catch any unhandled exceptions and return a 500 status
    console.error("Error in DELETE request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
export async function POST(request: NextRequest) {
  const  body = await request.json();
  const issueSchema = z.object({
    title: z.string().min(3).max(15),
    description: z.string().min(3).max(200),
  });
    const validation = issueSchema.safeParse(body);
    if (!validation.success)
        NextResponse.json(validation.error.issues, { status: 400 })
    const newIssue  = await prisma.issue.create({
        data: {
            title: body.title,
            description:body.description
        },
    })
    return NextResponse.json(newIssue,{status:201})
}

import z from "zod";


export const issueSchema = z.object({
  title: z.string().min(5).max(30),
  description: z.string().min(1).max(200),
});

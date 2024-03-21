import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { projects } from "~/server/db/schema";
export const projectRouter = createTRPCRouter({
  read: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.projects.findMany({
      with: {
        usersProjects: true,
        users: {
          columns: {
            name: true,
            image: true,
          },
        },
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string().min(2), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(projects).values({
        name: input.name,
        description: input.description,
        author_id: ctx.session.user.id,
      });
    }),
});

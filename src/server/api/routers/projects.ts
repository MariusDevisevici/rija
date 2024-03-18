import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { projects } from "~/server/db/schema";
export const projectRouter = createTRPCRouter({
  read: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.projects.findMany({
      with: {
        users: true,
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string().min(2) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(projects).values({
        name: input.name,
        user_id: ctx.session.user.id,
      });
    }),
});

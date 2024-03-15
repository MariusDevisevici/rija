import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { projects } from "~/server/db/schema";
export const projectRouter = createTRPCRouter({
  read: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.projects.findMany();
  }),
  create: protectedProcedure
    .input(z.object({ name: z.string().min(2) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(projects).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),
});

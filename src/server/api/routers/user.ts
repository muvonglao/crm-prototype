import "server-only";

import { z } from "zod";

import { and, eq } from "drizzle-orm";
import { teams, usersToTeams } from "~/server/db/schema"; // Adjust the import path as needed
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getTeamNames: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const teamNames = await ctx.db
        .select({
          teamName: teams.teamName,
        })
        .from(usersToTeams)
        .innerJoin(teams, eq(usersToTeams.teamId, teams.teamId))
        .where(eq(usersToTeams.userId, userId));

      return teamNames;
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(teams).values({
        teamName: input.name,
      });
    }),
});

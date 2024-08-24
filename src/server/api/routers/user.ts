import "server-only";

import { z } from "zod";

import { eq } from "drizzle-orm";
import { teams, usersToTeams } from "~/server/db/schema"; // Adjust the import path as needed
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getTeam: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      if (!userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User ID is required",
        });
      }

      const team = await ctx.db
        .select({
          teamId: teams.teamId,
          teamName: teams.teamName,
        })
        .from(usersToTeams)
        .innerJoin(teams, eq(usersToTeams.teamId, teams.teamId))
        .where(eq(usersToTeams.userId, userId));

      if (team.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No team names found for this user",
        });
      }

      return team;
    }),
});

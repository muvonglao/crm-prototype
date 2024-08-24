// import "server-only";

// import { z } from "zod";

// import { and, eq } from "drizzle-orm";
// import {
//   contacts,
//   teams,
//   deals,
//   users,
//   dealStages,
//   contactTypes,
//   services,
// } from "~/server/db/schema";

// import { createTRPCRouter, protectedProcedure } from "../trpc";
// import { TRPCError } from "@trpc/server";

// export const dealsRouter = createTRPCRouter({
//   getDeals: protectedProcedure
//     .input(
//       z.object({
//         userId: z.string().uuid().optional(),
//       }),
//     )
//     .query(async ({ ctx, input }) => {
//       const { userId } = input;

//       if (!userId) {
//         throw new TRPCError({
//           code: "BAD_REQUEST",
//           message: "User ID is required",
//         });
//       }

//       const deals = await ctx.db
//         .select({
//           teamId: teams.teamId,
//           teamName: teams.teamName,
//         })
//         .from(usersToTeams)
//         .innerJoin(teams, eq(usersToTeams.teamId, teams.teamId))
//         .where(eq(usersToTeams.userId, userId));

//       if (teamNames.length === 0) {
//         throw new TRPCError({
//           code: "NOT_FOUND",
//           message: "No team names found for this user",
//         });
//       }

//       return teamNames;
//     }),
// });

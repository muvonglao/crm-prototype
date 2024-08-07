import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const clientsRouter = createTRPCRouter({
  lead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.id}`,
      };
    }),
});

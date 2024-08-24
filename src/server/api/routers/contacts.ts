import "server-only";

import { z } from "zod";

import { eq } from "drizzle-orm";
import { contacts, contactTypes } from "~/server/db/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const contactsRouter = createTRPCRouter({
  getContacts: protectedProcedure
    .input(
      z.object({
        teamId: z.number().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { teamId } = input;
      if (!teamId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Team Id is required",
        });
      }

      const contactList = await ctx.db
        .select({
          id: contacts.contactId,
          name: contacts.name,
          email: contacts.email,
          company: contacts.company,
          phone: contacts.phone,
          note: contacts.contactNote,
          type: contactTypes.typeName,
          slug: contacts.slug,
        })
        .from(contacts)
        .innerJoin(contactTypes, eq(contacts.typeId, contactTypes.typeId))
        .where(eq(contacts.teamId, teamId));

      if (contactList.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No contacts found for this user",
        });
      }

      return contactList;
    }),
});

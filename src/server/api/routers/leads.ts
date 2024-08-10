import "server-only";

import { z } from "zod";

import { and, eq } from "drizzle-orm";
import {
  leads,
  users,
  leadStages,
  leadTypes,
  leadServices,
  services,
} from "~/server/db/schema";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const leadsRouter = createTRPCRouter({
  getLeads: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select({
        leadId: leads.leadId,
        userId: leads.userId,
        userName: users.name,
        userImage: users.image,
        stageId: leads.stageId,
        stageName: leadStages.stageName,
        typeId: leads.typeId,
        typeName: leadTypes.typeName,
        serviceId: services.serviceId,
        serviceName: services.serviceName,
        name: leads.name,
        email: leads.email,
        phone: leads.phone,
        company: leads.company,
        createdAt: leads.createdAt,
        updatedAt: leads.updatedAt,
      })
      .from(leads)
      .leftJoin(users, eq(leads.userId, users.id))
      .leftJoin(leadStages, eq(leads.stageId, leadStages.stageId))
      .leftJoin(leadTypes, eq(leads.typeId, leadTypes.typeId))
      .leftJoin(leadServices, eq(leads.leadId, leadServices.leadId))
      .leftJoin(services, eq(leadServices.serviceId, services.serviceId))
      .execute();
  }),
});

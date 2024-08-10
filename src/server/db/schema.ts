// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  text,
  primaryKey,
  integer,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `crm_${name}`);

export const users = createTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = createTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = createTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const authenticators = createTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export const teams = createTable("teams", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  teamName: varchar("team_name", { length: 100 }),
});

export const usersTeams = createTable("users_teams", {
  id: serial("id").primaryKey(),
  teamId: text("teamId")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
});

export const leads = createTable("leads", {
  leadId: serial("leadId").primaryKey(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 100 }),
  stageId: serial("stageId")
    .notNull()
    .references(() => leadStages.stageId, { onDelete: "cascade" }),
  typeId: serial("typeId")
    .notNull()
    .references(() => leadTypes.typeId, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const leadTypes = createTable("lead_types", {
  typeId: serial("typeId").primaryKey(),
  typeName: varchar("type_name", { length: 50 }).notNull(),
});

export const leadStages = createTable("lead_stages", {
  stageId: serial("stageId").primaryKey(),
  stageName: varchar("stage_name", { length: 50 }).notNull(),
});

export const leadStagesHistory = createTable("lead_stages_history", {
  id: serial("id").primaryKey(),
  leadId: serial("leadId")
    .notNull()
    .references(() => leads.leadId, { onDelete: "cascade" }),
  stageId: serial("stageId")
    .notNull()
    .references(() => leadStages.stageId, { onDelete: "cascade" }),
  changeDate: timestamp("change_date", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const stagesNotes = createTable("stages_notes", {
  id: serial("id").primaryKey(),
  leadId: serial("leadId")
    .notNull()
    .references(() => leads.leadId, { onDelete: "cascade" }),
  stageId: serial("stageId")
    .notNull()
    .references(() => leadStages.stageId, { onDelete: "cascade" }),
  note: text("note"),
});

export const amounts = createTable("amounts", {
  id: serial("id").primaryKey(),
  leadId: serial("leadId")
    .notNull()
    .references(() => leads.leadId, { onDelete: "cascade" }),
  stageId: serial("stageId")
    .notNull()
    .references(() => leadStages.stageId, { onDelete: "cascade" }),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull().default("0"),
});

export const closingDates = createTable("closing_dates", {
  id: serial("id").primaryKey(),
  leadId: serial("leadId")
    .notNull()
    .references(() => leads.leadId, { onDelete: "cascade" }),
  stageId: serial("stageId")
    .notNull()
    .references(() => leadStages.stageId, { onDelete: "cascade" }),
  closingDate: timestamp("closing_date", { mode: "date" }).notNull(),
});

export const services = createTable("services", {
  serviceId: serial("serviceId").primaryKey(),
  serviceName: varchar("service_name", { length: 100 }).notNull(),
});

export const leadServices = createTable("lead_services", {
  id: serial("id").primaryKey(),
  leadId: serial("leadId")
    .notNull()
    .references(() => leads.leadId, { onDelete: "cascade" }),
  serviceId: serial("serviceId")
    .notNull()
    .references(() => services.serviceId, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

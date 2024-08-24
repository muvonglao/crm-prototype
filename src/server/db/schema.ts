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
  id: text("user_id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  currentTeamId: integer("current_team_id").references(() => teams.teamId, {
    onDelete: "cascade",
  }),
});

export const accounts = createTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
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
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = createTable(
  "verification_token",
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
    credentialID: text("credential_id").notNull().unique(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("provider_account_id").notNull(),
    credentialPublicKey: text("credential_public_key").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credential_device_type").notNull(),
    credentialBackedUp: boolean("credential_backed_up").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export const teams = createTable("teams", {
  teamId: serial("team_id").primaryKey(),
  teamName: varchar("team_name", { length: 100 }),
});

export const usersToTeams = createTable("users_to_teams", {
  userTeamId: serial("user_to_team_id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.teamId, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
});

export const contacts = createTable("contacts", {
  contactId: serial("contact_id").primaryKey(),
  teamId: serial("team_id")
    .notNull()
    .references(() => teams.teamId, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 100 }),
  typeId: integer("type_id")
    .notNull()
    .references(() => contactTypes.typeId, { onDelete: "cascade" }),
  contactNote: text("contact_note"),
  slug: text("slug")
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const contactTypes = createTable("contact_types", {
  typeId: serial("type_id").primaryKey(),
  typeName: varchar("type_name", { length: 50 }).notNull(),
});

export const deals = createTable("deals", {
  dealId: serial("deal_id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.teamId, { onDelete: "cascade" }),
  contactId: integer("contact_id")
    .notNull()
    .references(() => contacts.contactId, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  dealName: varchar("deal_name", { length: 100 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull().default("0"),
  serviceId: integer("service_id")
    .notNull()
    .references(() => services.serviceId, { onDelete: "cascade" }),
  stageId: integer("stage_id")
    .notNull()
    .references(() => dealStages.stageId, { onDelete: "cascade" }),
  dealNote: text("deal_note"),
  closingDate: timestamp("closing_date", { mode: "date" }),
  slug: text("slug")
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const dealStages = createTable("deal_stages", {
  stageId: serial("stage_id").primaryKey(),
  stageName: varchar("stage_name", { length: 50 }).notNull(),
});

export const dealHistory = createTable("deal_history", {
  dealStageHistoryId: serial("deal_history_id").primaryKey(),
  dealId: integer("deal_id")
    .notNull()
    .references(() => deals.dealId, { onDelete: "cascade" }),
  changeDate: timestamp("change_date", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const services = createTable("services", {
  serviceId: serial("service_id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.teamId, { onDelete: "cascade" }),
  serviceName: varchar("service_name", { length: 100 }).notNull(),
});

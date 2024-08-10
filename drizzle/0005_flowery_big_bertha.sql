ALTER TABLE "crm_amounts" RENAME COLUMN "leadId" TO "lead_id";--> statement-breakpoint
ALTER TABLE "crm_amounts" RENAME COLUMN "stageId" TO "stage_id";--> statement-breakpoint
ALTER TABLE "crm_closing_dates" RENAME COLUMN "leadId" TO "lead_id";--> statement-breakpoint
ALTER TABLE "crm_closing_dates" RENAME COLUMN "stageId" TO "stage_id";--> statement-breakpoint
ALTER TABLE "crm_lead_services" RENAME COLUMN "leadId" TO "lead_id";--> statement-breakpoint
ALTER TABLE "crm_lead_services" RENAME COLUMN "serviceId" TO "service_id";--> statement-breakpoint
ALTER TABLE "crm_lead_stages" RENAME COLUMN "stageId" TO "stage_id";--> statement-breakpoint
ALTER TABLE "crm_lead_stages_history" RENAME COLUMN "leadId" TO "lead_id";--> statement-breakpoint
ALTER TABLE "crm_lead_stages_history" RENAME COLUMN "stageId" TO "stage_id";--> statement-breakpoint
ALTER TABLE "crm_lead_types" RENAME COLUMN "typeId" TO "type_id";--> statement-breakpoint
ALTER TABLE "crm_services" RENAME COLUMN "serviceId" TO "service_id";--> statement-breakpoint
ALTER TABLE "crm_stages_notes" RENAME COLUMN "leadId" TO "lead_id";--> statement-breakpoint
ALTER TABLE "crm_stages_notes" RENAME COLUMN "stageId" TO "stage_id";--> statement-breakpoint
ALTER TABLE "crm_users_teams" RENAME COLUMN "teamId" TO "team_id";--> statement-breakpoint
ALTER TABLE "crm_users_teams" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "crm_amounts" DROP CONSTRAINT "crm_amounts_leadId_crm_leads_lead_id_fk";
--> statement-breakpoint
ALTER TABLE "crm_amounts" DROP CONSTRAINT "crm_amounts_stageId_crm_lead_stages_stageId_fk";
--> statement-breakpoint
ALTER TABLE "crm_closing_dates" DROP CONSTRAINT "crm_closing_dates_leadId_crm_leads_lead_id_fk";
--> statement-breakpoint
ALTER TABLE "crm_closing_dates" DROP CONSTRAINT "crm_closing_dates_stageId_crm_lead_stages_stageId_fk";
--> statement-breakpoint
ALTER TABLE "crm_lead_services" DROP CONSTRAINT "crm_lead_services_leadId_crm_leads_lead_id_fk";
--> statement-breakpoint
ALTER TABLE "crm_lead_services" DROP CONSTRAINT "crm_lead_services_serviceId_crm_services_serviceId_fk";
--> statement-breakpoint
ALTER TABLE "crm_lead_stages_history" DROP CONSTRAINT "crm_lead_stages_history_leadId_crm_leads_lead_id_fk";
--> statement-breakpoint
ALTER TABLE "crm_lead_stages_history" DROP CONSTRAINT "crm_lead_stages_history_stageId_crm_lead_stages_stageId_fk";
--> statement-breakpoint
ALTER TABLE "crm_leads" DROP CONSTRAINT "crm_leads_stage_id_crm_lead_stages_stageId_fk";
--> statement-breakpoint
ALTER TABLE "crm_leads" DROP CONSTRAINT "crm_leads_type_id_crm_lead_types_typeId_fk";
--> statement-breakpoint
ALTER TABLE "crm_stages_notes" DROP CONSTRAINT "crm_stages_notes_leadId_crm_leads_lead_id_fk";
--> statement-breakpoint
ALTER TABLE "crm_stages_notes" DROP CONSTRAINT "crm_stages_notes_stageId_crm_lead_stages_stageId_fk";
--> statement-breakpoint
ALTER TABLE "crm_users_teams" DROP CONSTRAINT "crm_users_teams_teamId_crm_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "crm_users_teams" DROP CONSTRAINT "crm_users_teams_userId_crm_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_amounts" ADD CONSTRAINT "crm_amounts_lead_id_crm_leads_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."crm_leads"("lead_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_amounts" ADD CONSTRAINT "crm_amounts_stage_id_crm_lead_stages_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."crm_lead_stages"("stage_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_closing_dates" ADD CONSTRAINT "crm_closing_dates_lead_id_crm_leads_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."crm_leads"("lead_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_closing_dates" ADD CONSTRAINT "crm_closing_dates_stage_id_crm_lead_stages_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."crm_lead_stages"("stage_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_lead_services" ADD CONSTRAINT "crm_lead_services_lead_id_crm_leads_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."crm_leads"("lead_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_lead_services" ADD CONSTRAINT "crm_lead_services_service_id_crm_services_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."crm_services"("service_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_lead_stages_history" ADD CONSTRAINT "crm_lead_stages_history_lead_id_crm_leads_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."crm_leads"("lead_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_lead_stages_history" ADD CONSTRAINT "crm_lead_stages_history_stage_id_crm_lead_stages_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."crm_lead_stages"("stage_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_leads" ADD CONSTRAINT "crm_leads_stage_id_crm_lead_stages_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."crm_lead_stages"("stage_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_leads" ADD CONSTRAINT "crm_leads_type_id_crm_lead_types_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."crm_lead_types"("type_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_stages_notes" ADD CONSTRAINT "crm_stages_notes_lead_id_crm_leads_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."crm_leads"("lead_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_stages_notes" ADD CONSTRAINT "crm_stages_notes_stage_id_crm_lead_stages_stage_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."crm_lead_stages"("stage_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_users_teams" ADD CONSTRAINT "crm_users_teams_team_id_crm_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."crm_teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_users_teams" ADD CONSTRAINT "crm_users_teams_user_id_crm_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."crm_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

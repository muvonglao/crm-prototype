ALTER TABLE "crm_leads" RENAME COLUMN "leadId" TO "lead_id";--> statement-breakpoint
ALTER TABLE "crm_leads" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "crm_leads" RENAME COLUMN "stageId" TO "stage_id";--> statement-breakpoint
ALTER TABLE "crm_leads" RENAME COLUMN "typeId" TO "type_id";--> statement-breakpoint
ALTER TABLE "crm_amounts" DROP CONSTRAINT "crm_amounts_leadId_crm_leads_leadId_fk";
--> statement-breakpoint
ALTER TABLE "crm_closing_dates" DROP CONSTRAINT "crm_closing_dates_leadId_crm_leads_leadId_fk";
--> statement-breakpoint
ALTER TABLE "crm_lead_services" DROP CONSTRAINT "crm_lead_services_leadId_crm_leads_leadId_fk";
--> statement-breakpoint
ALTER TABLE "crm_lead_stages_history" DROP CONSTRAINT "crm_lead_stages_history_leadId_crm_leads_leadId_fk";
--> statement-breakpoint
ALTER TABLE "crm_leads" DROP CONSTRAINT "crm_leads_userId_crm_user_id_fk";
--> statement-breakpoint
ALTER TABLE "crm_leads" DROP CONSTRAINT "crm_leads_stageId_crm_lead_stages_stageId_fk";
--> statement-breakpoint
ALTER TABLE "crm_leads" DROP CONSTRAINT "crm_leads_typeId_crm_lead_types_typeId_fk";
--> statement-breakpoint
ALTER TABLE "crm_stages_notes" DROP CONSTRAINT "crm_stages_notes_leadId_crm_leads_leadId_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_amounts" ADD CONSTRAINT "crm_amounts_leadId_crm_leads_lead_id_fk" FOREIGN KEY ("leadId") REFERENCES "public"."crm_leads"("lead_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_closing_dates" ADD CONSTRAINT "crm_closing_dates_leadId_crm_leads_lead_id_fk" FOREIGN KEY ("leadId") REFERENCES "public"."crm_leads"("lead_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_lead_services" ADD CONSTRAINT "crm_lead_services_leadId_crm_leads_lead_id_fk" FOREIGN KEY ("leadId") REFERENCES "public"."crm_leads"("lead_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_lead_stages_history" ADD CONSTRAINT "crm_lead_stages_history_leadId_crm_leads_lead_id_fk" FOREIGN KEY ("leadId") REFERENCES "public"."crm_leads"("lead_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_leads" ADD CONSTRAINT "crm_leads_user_id_crm_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."crm_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_leads" ADD CONSTRAINT "crm_leads_stage_id_crm_lead_stages_stageId_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."crm_lead_stages"("stageId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_leads" ADD CONSTRAINT "crm_leads_type_id_crm_lead_types_typeId_fk" FOREIGN KEY ("type_id") REFERENCES "public"."crm_lead_types"("typeId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_stages_notes" ADD CONSTRAINT "crm_stages_notes_leadId_crm_leads_lead_id_fk" FOREIGN KEY ("leadId") REFERENCES "public"."crm_leads"("lead_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

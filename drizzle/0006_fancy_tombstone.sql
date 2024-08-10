ALTER TABLE "crm_lead_services" RENAME TO "crm_leads_services";--> statement-breakpoint
ALTER TABLE "crm_leads_services" DROP CONSTRAINT "crm_lead_services_lead_id_crm_leads_lead_id_fk";
--> statement-breakpoint
ALTER TABLE "crm_leads_services" DROP CONSTRAINT "crm_lead_services_service_id_crm_services_service_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_leads_services" ADD CONSTRAINT "crm_leads_services_lead_id_crm_leads_lead_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."crm_leads"("lead_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_leads_services" ADD CONSTRAINT "crm_leads_services_service_id_crm_services_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."crm_services"("service_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

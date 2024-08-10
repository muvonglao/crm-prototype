CREATE TABLE IF NOT EXISTS "crm_lead_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"leadId" serial NOT NULL,
	"serviceId" serial NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crm_services" (
	"serviceId" serial PRIMARY KEY NOT NULL,
	"service_name" varchar(100) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_lead_services" ADD CONSTRAINT "crm_lead_services_leadId_crm_leads_leadId_fk" FOREIGN KEY ("leadId") REFERENCES "public"."crm_leads"("leadId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_lead_services" ADD CONSTRAINT "crm_lead_services_serviceId_crm_services_serviceId_fk" FOREIGN KEY ("serviceId") REFERENCES "public"."crm_services"("serviceId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

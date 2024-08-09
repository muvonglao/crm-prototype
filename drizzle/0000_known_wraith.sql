CREATE TABLE IF NOT EXISTS "crm_account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "crm_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crm_amounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"leadId" serial NOT NULL,
	"statusId" serial NOT NULL,
	"amount" numeric(10, 2) DEFAULT '0' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crm_authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "crm_authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "crm_authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crm_closing_dates" (
	"id" serial PRIMARY KEY NOT NULL,
	"leadId" serial NOT NULL,
	"statusId" serial NOT NULL,
	"closing_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crm_lead_status" (
	"statusId" serial PRIMARY KEY NOT NULL,
	"status_name" varchar(50) NOT NULL,
	"type" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crm_lead_status_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"leadId" serial NOT NULL,
	"statusId" serial NOT NULL,
	"change_date" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crm_leads" (
	"leadId" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" varchar(100),
	"email" varchar(100),
	"phone" varchar(20),
	"company" varchar(100),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"statusId" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crm_session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crm_status_notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"leadId" serial NOT NULL,
	"statusId" serial NOT NULL,
	"note" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crm_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crm_verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "crm_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_account" ADD CONSTRAINT "crm_account_userId_crm_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."crm_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_amounts" ADD CONSTRAINT "crm_amounts_leadId_crm_leads_leadId_fk" FOREIGN KEY ("leadId") REFERENCES "public"."crm_leads"("leadId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_amounts" ADD CONSTRAINT "crm_amounts_statusId_crm_lead_status_statusId_fk" FOREIGN KEY ("statusId") REFERENCES "public"."crm_lead_status"("statusId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_authenticator" ADD CONSTRAINT "crm_authenticator_userId_crm_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."crm_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_closing_dates" ADD CONSTRAINT "crm_closing_dates_leadId_crm_leads_leadId_fk" FOREIGN KEY ("leadId") REFERENCES "public"."crm_leads"("leadId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_closing_dates" ADD CONSTRAINT "crm_closing_dates_statusId_crm_lead_status_statusId_fk" FOREIGN KEY ("statusId") REFERENCES "public"."crm_lead_status"("statusId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_lead_status_history" ADD CONSTRAINT "crm_lead_status_history_leadId_crm_leads_leadId_fk" FOREIGN KEY ("leadId") REFERENCES "public"."crm_leads"("leadId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_lead_status_history" ADD CONSTRAINT "crm_lead_status_history_statusId_crm_lead_status_statusId_fk" FOREIGN KEY ("statusId") REFERENCES "public"."crm_lead_status"("statusId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_leads" ADD CONSTRAINT "crm_leads_userId_crm_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."crm_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_leads" ADD CONSTRAINT "crm_leads_statusId_crm_lead_status_statusId_fk" FOREIGN KEY ("statusId") REFERENCES "public"."crm_lead_status"("statusId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_session" ADD CONSTRAINT "crm_session_userId_crm_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."crm_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_status_notes" ADD CONSTRAINT "crm_status_notes_leadId_crm_leads_leadId_fk" FOREIGN KEY ("leadId") REFERENCES "public"."crm_leads"("leadId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_status_notes" ADD CONSTRAINT "crm_status_notes_statusId_crm_lead_status_statusId_fk" FOREIGN KEY ("statusId") REFERENCES "public"."crm_lead_status"("statusId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

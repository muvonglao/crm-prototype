CREATE TABLE IF NOT EXISTS "crm_teams" (
	"id" text PRIMARY KEY NOT NULL,
	"team_name" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crm_users_teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"teamId" text NOT NULL,
	"userId" text NOT NULL,
	"role" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_users_teams" ADD CONSTRAINT "crm_users_teams_teamId_crm_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."crm_teams"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crm_users_teams" ADD CONSTRAINT "crm_users_teams_userId_crm_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."crm_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

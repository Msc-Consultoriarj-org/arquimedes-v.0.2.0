ALTER TABLE "pages" ADD COLUMN "conceptSummary" text;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "diagrams" json;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;
CREATE TABLE `achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('module_completed','perfect_score','streak','first_lesson') NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`relatedId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `disciplines` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`order` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `disciplines_id` PRIMARY KEY(`id`),
	CONSTRAINT `disciplines_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `exerciseAttempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`exerciseId` int NOT NULL,
	`answer` text NOT NULL,
	`isCorrect` boolean NOT NULL,
	`attemptNumber` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exerciseAttempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exercises` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageId` int NOT NULL,
	`order` int NOT NULL DEFAULT 0,
	`type` enum('simple_input','practical_problem','multiple_choice') NOT NULL,
	`question` text NOT NULL,
	`description` text,
	`expectedAnswer` text NOT NULL,
	`alternativeAnswers` json,
	`hints` json,
	`options` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exercises_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `generatedExercises` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`pageId` int NOT NULL,
	`question` text NOT NULL,
	`expectedAnswer` text NOT NULL,
	`difficulty` enum('easy','medium','hard') NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`isCorrect` boolean,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `generatedExercises_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `modules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`disciplineId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`order` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `modules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pageProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`pageId` int NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`score` int NOT NULL DEFAULT 0,
	`lastAccessedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pageProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`moduleId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`order` int NOT NULL DEFAULT 0,
	`mainText` text,
	`conceptSummary` text,
	`diagrams` json,
	`videoUrl` varchar(500),
	`estimatedMinutes` int DEFAULT 30,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pages_id` PRIMARY KEY(`id`)
);

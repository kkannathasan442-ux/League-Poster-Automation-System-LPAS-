CREATE TABLE `players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`player_no` text NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`phone` text NOT NULL,
	`photo` text NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `players_player_no_unique` ON `players` (`player_no`);

interface CcomunityProfile {
	id: number;
	discriminator: string;
	nick: string;
	uuid: string;
	registred: bigint;
	last_online: bigint;
	last_server: bigint;
	is_online: number;
	played_time: number;
	mc_version: string;
	gender: number;

	// VIP
	groups: any;
	groups_last_check: number;

	// Economy
	craftcoins: number;
	crafttokens: number;
	votetokens: number;

	votetokens_2: number; // 1.15+ VoteTokens

	// Old levels (-1.12)
	level: number;
	experience: number;

	// Levels and ranks (1.14+)
	global_level: number;
	survival_level: number;
	survival_experience: number;
	skyblock_level: number;
	skyblock_experience: number;
	creative_level: number;
	creative_experience: number;
	prison_level: number;
	prison_experience: number;
	vanilla_level: number;
	vanilla_experience: number;
	anarchy_level: number;
	anarchy_experience: number;

	// Old servers
	skycloud_level: number;
	skycloud_experience: number;
	hardcore_vanilla_level: number;
	hardcore_vanilla_experience: number;

	// Extended economy
	karma: number;
	achievement_points: number;
	event_points: number;
	bug_points: number;

	// Votes
	total_votes: number;
	month_votes: number;
	week_votes: number;
	last_vote: bigint;
	vote_pass: number;

	// Discord
	discord_user_id: string;
	discord_voice_activity: number;
	discord_text_activity: number;

	// Socials
	status: string;

	// Bonuses
	lobby_daily_bonus: number;
	lobby_vip_bonus: number;
	lobby_extra_bonus: number;

	// Watch lobby things
	seen_latest_news: bigint;
	seen_changelog_time: bigint;

	// Tags
	tags: any;
}

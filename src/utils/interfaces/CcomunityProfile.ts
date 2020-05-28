
interface CcomunityProfile {
	id: number;
	discriminator: string;
	nick: string;
	uuid: string;
	web_group: number;
	registred: bigint;
	last_online: bigint;
	last_server: bigint;
	is_online: number;
	played_time: number;

	// VIP
	groups: any;
	groups_last_check: number;

	// Economy
	craftcoins: number;
	crafttokens: number;
	votetokens: number;

	votetokens_2: number; // 1.14 VoteTokens

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
	skycloud_level: number;
	skycloud_experience: number;

	karma: number;
	achievement_points: number;
	event_points: number;

	total_votes: number;
	month_votes: number;
	week_votes: number;
	last_vote: bigint;

	discord_user_id: string;

	status: string;
	soc_facebook: string;
	soc_twitter: string;
	soc_ytb: string;
	soc_steam: string;
	soc_twitch: string;
	soc_web: string;
	mc_version: string;
}


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
	craftcoins: number;
	crafttokens: number;
	votetokens: number;
	level: number;
	experience: number;
	karma: number;
	total_votes: number;
	month_votes: number;
	week_votes: number;
	last_vote: bigint;
	status: string;
	soc_facebook: string;
	soc_twitter: string;
	soc_ytb: string;
	soc_steam: string;
	soc_twitch: string;
	soc_web: string;
	mc_version: string;
}

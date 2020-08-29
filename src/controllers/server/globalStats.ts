import { Logger } from "../../utils/Logger";
import { SQLManager } from "../../managers/SQLManager";
import * as Res from "../../services/response";

const log = Logger('leaderboard:global_stats');

interface GlobalStats {
	totalCraftCoins: number;
	totalVoteTokens: number;
	totalCraftTokens: number;
	totalVotes: number;
	weekVotes: number;
	dayVotes: number;
	totalPlayers: number;
	newPlayersPerMonth: number;
	newPlayersPerWeek: number;
	totalPlayTime: number;
	totalCompletedAchievements: number;
	playersWithVIP: number;
	totalMcOriginals: number;
}

let globalStatsCache: GlobalStats | any = {};

namespace GlobalStats {

	export async function getGlobalStatistis(_req: any, res: any) {
		Res.success(res, globalStatsCache);
	}

}

const generateGlobalStats = async () => {
	log.info("Global stats generation started.");
	globalStatsCache = {
		totalCraftCoins: 0,
		totalVoteTokens: 0,
		totalCraftTokens: 0,
		totalVotes: 0,
		monthVotes: 0,
		weekVotes: 0,
		totalPlayers: 0,
		newPlayersPerMonth: 0,
		newPlayersPerWeek: 0,
		totalPlayTime: 0,
		totalCompletedAchievements: 0,
		playersWithVIP: 0,
		totalMcOriginals: 0
	};

	// Fetch Total CraftCoins
	const craftCoinsData = await SQLManager.knex.raw('SELECT SUM(craftcoins) as total FROM minigames.player_profile;')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!craftCoinsData.length) {
		return;
	}
	globalStatsCache.totalCraftCoins = parseInt(craftCoinsData[0][0].total);

	// Fetch Total CraftTokens
	const craftTokensData = await SQLManager.knex.raw('SELECT SUM(crafttokens) as total FROM minigames.player_profile;')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!craftTokensData.length) {
		return;
	}
	globalStatsCache.totalCraftTokens = parseInt(craftTokensData[0][0].total);

	// Fetch Total VoteTokens
	const voteTokensData = await SQLManager.knex.raw('SELECT SUM(votetokens) as total FROM minigames.player_profile;')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!voteTokensData.length) {
		return;
	}
	globalStatsCache.totalVoteTokens = parseInt(voteTokensData[0][0].total);

	// Fetch Total Votes
	const totalVotesData = await SQLManager.knex.raw('SELECT SUM(total_votes) as total FROM minigames.player_profile;')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!totalVotesData.length) {
		return;
	}
	globalStatsCache.totalVotes = parseInt(totalVotesData[0][0].total);

	// Fetch Total Weekly Votes
	const totalWeeklyVotesData = await SQLManager.knex.raw('SELECT SUM(week_votes) as total FROM minigames.player_profile;')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!totalWeeklyVotesData.length) {
		return;
	}
	globalStatsCache.weekVotes = parseInt(totalWeeklyVotesData[0][0].total);

	// Fetch Total Month Votes
	const totalMonthVotes = await SQLManager.knex.raw('SELECT SUM(month_votes) as total FROM minigames.player_profile;')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!totalMonthVotes.length) {
		return;
	}
	globalStatsCache.monthVotes = parseInt(totalMonthVotes[0][0].total);

	// Fetch Total play time on server
	const totalPlayedTimeData = await SQLManager.knex.raw('SELECT SUM(played_time) as total FROM minigames.player_profile;')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!totalPlayedTimeData.length) {
		return;
	}
	globalStatsCache.totalPlayTime = parseInt(totalPlayedTimeData[0][0].total);

	// Fetch Total unique players
	const totalUniquePlayers = await SQLManager.knex.raw('SELECT COUNT(id) AS total FROM minigames.player_profile;')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!totalUniquePlayers.length) {
		return;
	}
	/*
		Tato hodnota je schválně fake, z důvodu že za dobu pěti let, server prošel různými wipy, změnami v ukládání dat
		a jiných změn, co celkově ovlivnili výsledek. Tato fake hodnota, je tedy součet všech starých registrací z
		AuthMe + AutoLogin v období let 2013 - 2019 (listopad).
		*/
	let fakeAmount = 1117223;
	let finalNumber = fakeAmount + parseInt(totalUniquePlayers[0][0].total);
	globalStatsCache.totalPlayers = finalNumber;

	// Fetch total achievements
	const totalAchievementsData = await SQLManager.knex.raw('SELECT COUNT(id) as total FROM minigames.player_achievement_log;')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!totalAchievementsData.length) {
		return;
	}
	globalStatsCache.totalCompletedAchievements = parseInt(totalAchievementsData[0][0].total);

	// Fetch registered player - 7 days
	const totalregisteredPlayersData = await SQLManager.knex.raw('SELECT COUNT(*) as total FROM player_profile WHERE registred > UNIX_TIMESTAMP(NOW() - INTERVAL 7 DAY) * 1000;')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!totalregisteredPlayersData.length) {
		return;
	}
	globalStatsCache.newPlayersPerWeek = parseInt(totalregisteredPlayersData[0][0].total);

	// Fetch registered player - 30 days
	const totalregisteredPlayersMonthData = await SQLManager.knex.raw('SELECT COUNT(*) as total FROM minigames.player_profile WHERE registred > UNIX_TIMESTAMP(NOW() - INTERVAL 30 DAY) * 1000;')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!totalregisteredPlayersMonthData.length) {
		return;
	}
	globalStatsCache.newPlayersPerMonth = parseInt(totalregisteredPlayersMonthData[0][0].total);

	// Fetch registered player - 30 days
	const totalVIPsOnServerData = await SQLManager.knex.raw('SELECT COUNT(*) as total FROM `global-perms`.luckperms_user_permissions WHERE permission = "group.obsidian" OR permission = "group.emerald" OR permission = "group.diamond" OR permission = "group.gold";')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!totalVIPsOnServerData.length) {
		return;
	}
	globalStatsCache.playersWithVIP = parseInt(totalVIPsOnServerData[0][0].total);

	log.info("Global stats generation completed.");
};

export {
	GlobalStats,
	generateGlobalStats
};

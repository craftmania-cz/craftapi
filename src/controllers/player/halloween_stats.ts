import * as Res from "../../services/response";
import { Logger } from "../../utils/Logger";
import { SQLManager } from "../../managers/SQLManager";

const log = Logger('leaderboard:halloween');

interface RowPlayerStats {
	uuid: string;
	nickname: string;
	stats: any;
}

interface HalloweenPlayerStats {
	nick: string;
	uuid: string;
	role_preference: "KILLER" | "SURVIVOR";
	games_played: number;
	killer_kills: number;
	killer_downs: number;
	killer_wins: number;
	killer_hits: number;
	survivor_wins: number;
	survivor_generators_powered: number;
	survivor_fuels_filled: number;
	survivor_players_revived: number;
	playtime: number;
}

namespace HalloweenStats {

	export async function getStatsByName(req: any, res: any) {
		const player = req.params.name;
		const data = await SQLManager.knex.select("*").from("dbd_players").where("nickname", player)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
		});
		if (data.length <= 0) {
			return Res.not_found(res);
		}
		const dataObject = data[0];
		Res.success(res, JSON.parse(dataObject.stats));
		return;
	}

	export async function getLeaderboard(_req: any, res: any) {
		let finalArray: HalloweenPlayerStats[] = [];
		const data = await SQLManager.knex.select("*").from("dbd_players")
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
		});
		if (data.length <= 0) {
			return Res.not_found(res);
		}

		// TODO: Udělat skrz SQL JSON_EXTRACT()
		for (let i = 0; i < data.length; i++) {
			const sqlData = data[i] as RowPlayerStats;
			const convertedStats = JSON.parse(sqlData.stats) as HalloweenPlayerStats;

			if (convertedStats.games_played === undefined) {
				continue;
			}

			finalArray.push({
				nick: sqlData.nickname,
				uuid: sqlData.uuid,
				role_preference: convertedStats.role_preference,
				games_played: convertedStats.games_played,
				killer_kills: convertedStats.killer_kills,
				killer_downs: convertedStats.killer_downs,
				killer_wins: convertedStats.killer_wins,
				killer_hits: convertedStats.killer_hits,
				survivor_wins: convertedStats.survivor_wins,
				survivor_generators_powered: convertedStats.survivor_generators_powered,
				survivor_fuels_filled: convertedStats.survivor_fuels_filled,
				survivor_players_revived: convertedStats.survivor_players_revived,
				playtime: convertedStats.playtime
			});
		}

		// Final sorting
		let sortedLeaderboard = finalArray.sort((a: HalloweenPlayerStats, b: HalloweenPlayerStats) => {
			return b.survivor_wins - a.survivor_wins || b.killer_wins - a.killer_wins; // Řazení dle winů z obou rolí
		});

		Res.success(res, sortedLeaderboard);
		return;
	}
}
export default HalloweenStats;

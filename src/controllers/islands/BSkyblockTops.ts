import * as Res from "../../services/response";
import { getConnection } from "../../services/mysql-connection";
import { Logger } from "../../utils/Logger";

const con = getConnection();
const log = Logger('leaderboard:skyblock');

interface BSkyblockObject {
	uniqueId: string;
	topTen: object;
}

interface LeaderboardItem {
	index?: number;
	name: string;
	uuid: string;
	value: number;
}

// Globální cache
let skyblockCahe: LeaderboardItem[] = [];

namespace BSkyblockTopIslands {

	export async function getSkyblockIslandLeaderboard(_req: any, res: any) {
		let temporarySort = skyblockCahe.sort((a: any, b: any) => {
			return b.value - a.value;
		});
		Res.success(res, temporarySort);
	}
}

/**
 * Generování leaderboardu
 */
const generateSkyblockLeaderboard = async () => {
	log.info("Leaderboard generation started.");
	skyblockCahe = []; // Reset
	await con.query('SELECT json FROM skyblock.`world.bentobox.level.objects.TopTenData`', (error: any, results: any) => {
		if (error) {
			log.error(error);
			skyblockCahe = [];
			log.error("Leaderboard generation failed.");
			return;
		}
		if (!results.length) {
			skyblockCahe = [];
			log.error("Leaderboard generation failed.");
			return;
		}
		let leaderboard = JSON.parse(results[0].json) as BSkyblockObject;

		for (let uuid in leaderboard.topTen) {
			if (!leaderboard.topTen.hasOwnProperty(uuid)) { continue; }
			// @ts-ignore
			const value = leaderboard.topTen[uuid];

			con.query('SELECT nick FROM minigames.player_profile WHERE uuid = ?', [uuid], (_error: any, results: any) => {
				//console.log({name: results[0].nick, value: value});
				skyblockCahe.push({name: results[0].nick, uuid: uuid, value: value});
			});
		}
	});

	log.info("Leaderboard generation completed.");
};

export {
	BSkyblockTopIslands,
	generateSkyblockLeaderboard,
};

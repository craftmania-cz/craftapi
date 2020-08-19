import * as Res from "../../services/response";
import { Logger } from "../../utils/Logger";
import { SQLManager } from "../../managers/SQLManager";

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

	const data = await SQLManager.knex.raw('SELECT json FROM skyblock.`world.bentobox.level.objects.TopTenData`')
		.on('query-error', (error: any) => {
			log.error(error);
			skyblockCahe = [];
			log.error("Leaderboard generation failed.");
		});
	if (!data.length) {
		skyblockCahe = [];
		log.error("Leaderboard generation failed.");
		return;
	}

	let leaderboard = JSON.parse(data[0][0].json) as BSkyblockObject;

	for (let uuid in leaderboard.topTen) {
		if (!leaderboard.topTen.hasOwnProperty(uuid)) { continue; }
		// @ts-ignore
		const value = leaderboard.topTen[uuid];

		const dataProfiles = await SQLManager.knex.select("nick").from("minigames.player_profile").where("uuid", uuid)
			.on('query-error', (error: any) => {
				log.error(error);
			});

		if (dataProfiles[0] !== undefined) {
			skyblockCahe.push({name: dataProfiles[0].nick, uuid: uuid, value: value});
		}
	}

	log.info("Leaderboard generation completed.");
};

export {
	BSkyblockTopIslands,
	generateSkyblockLeaderboard,
};

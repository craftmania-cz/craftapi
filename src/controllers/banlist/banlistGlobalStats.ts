import { Logger } from "../../utils/Logger";
import * as Res from "../../services/response";
import { SQLManager } from "../../managers/SQLManager";
import { IBanlistLog } from "./IBanlistLog";

const log = Logger('banlist:statistics');

interface IStatsObject {
	total: number;
	lastPlayer: string | null;
	lastUUID: string | null;
	lastDate: number | null;
}

interface IBanlistGlobalStats {
	bans: IStatsObject;
	kicks: IStatsObject;
	mutes: IStatsObject;
	warns: IStatsObject;
	totalPunishments: number;
}

let banlistStatsCache: IBanlistGlobalStats | {} = {};

namespace BanlistGlobalStats {
	export async function getStatistics(_req: any, res: any) {
		Res.success(res, banlistStatsCache);
	}
}

const generateBanlistStats = async () => {
	log.info("Banlist stats generation started.");
	banlistStatsCache = {
		bans: {
			total: 0,
			lastPlayer: null,
			lastUUID: null,
			lastDate: null,
		},
		kicks: {
			total: 0,
			lastPlayer: null,
			lastUUID: null,
			lastDate: null,
		},
		mutes: {
			total: 0,
			lastPlayer: null,
			lastUUID: null,
			lastDate: null,
		},
		warns: {
			total: 0,
			lastPlayer: null,
			lastUUID: null,
			lastDate: null,
		},
		totalPunishments: 0
	};

	// Fetch total punishments
	const totalPunishmentsData = await SQLManager.knex.raw('SELECT (SELECT count(id) FROM bungeecord.litebans_bans) as bans, (SELECT count(id) FROM bungeecord.litebans_mutes) as mutes, (SELECT count(id) FROM bungeecord.litebans_kicks) as kicks, (SELECT count(id) FROM bungeecord.litebans_warnings) as warns;')
		.on('query-error', (error: any) => {
			log.error(error);
		});
	if (!totalPunishmentsData.length) {
		return;
	}

	const totalPunishments: {bans: number, mutes: number, kicks: number, warns: number} = totalPunishmentsData[0][0];

	const lastBannedPlayerData = await SQLManager.knex.from('bungeecord.litebans_bans as punishment')
		.innerJoin('bungeecord.litebans_history as history', 'punishment.uuid', '=', 'history.uuid')
		.select('*')
		.orderBy('punishment.id', 'desc')
		.limit(1)
		.on('query-error', (error: any) => {
			log.error(error);
			return;
		});
	const lastBannedPlayer = lastBannedPlayerData[0] as IBanlistLog;

	const lastMutedPlayerData = await SQLManager.knex.from('bungeecord.litebans_mutes as punishment')
		.innerJoin('bungeecord.litebans_history as history', 'punishment.uuid', '=', 'history.uuid')
		.select('*')
		.orderBy('punishment.id', 'desc')
		.limit(1)
		.on('query-error', (error: any) => {
			log.error(error);
			return;
		});
	const lastMutedPlayer = lastMutedPlayerData[0] as IBanlistLog;

	const lastKickedPlayerData = await SQLManager.knex.from('bungeecord.litebans_kicks as punishment')
		.innerJoin('bungeecord.litebans_history as history', 'punishment.uuid', '=', 'history.uuid')
		.select('*')
		.orderBy('punishment.id', 'desc')
		.limit(1)
		.on('query-error', (error: any) => {
			log.error(error);
			return;
		});
	const lastKickedPlayer = lastKickedPlayerData[0] as IBanlistLog;

	const lastWarnedPlayerData = await SQLManager.knex.from('bungeecord.litebans_warnings as punishment')
		.innerJoin('bungeecord.litebans_history as history', 'punishment.uuid', '=', 'history.uuid')
		.select('*')
		.orderBy('punishment.id', 'desc')
		.limit(1)
		.on('query-error', (error: any) => {
			log.error(error);
			return;
		});
	const lastWarnedPlayer = lastWarnedPlayerData[0] as IBanlistLog;

	banlistStatsCache = {
		bans: {
			total: totalPunishments.bans,
			lastPlayer: lastBannedPlayer.name,
			lastUUID: lastBannedPlayer.uuid,
			lastDate: lastBannedPlayer.time,
		},
		kicks: {
			total: totalPunishments.kicks,
			lastPlayer: lastKickedPlayer.name,
			lastUUID: lastKickedPlayer.uuid,
			lastDate: lastKickedPlayer.time,
		},
		mutes: {
			total: totalPunishments.mutes,
			lastPlayer: lastMutedPlayer.name,
			lastUUID: lastMutedPlayer.uuid,
			lastDate: lastMutedPlayer.time,
		},
		warns: {
			total: totalPunishments.warns,
			lastPlayer: lastWarnedPlayer.name,
			lastUUID: lastWarnedPlayer.uuid,
			lastDate: lastWarnedPlayer.time,
		},
		totalPunishments: totalPunishments.bans + totalPunishments.kicks + totalPunishments.mutes + totalPunishments.warns
	};

	log.info("Banlist stats generation completed.");
};

export {
	BanlistGlobalStats,
	generateBanlistStats
};

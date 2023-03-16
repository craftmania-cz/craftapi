import * as Res from "../../services/response";
import * as log from "signale";
import { SQLManager } from "../../managers/SQLManager";

namespace EconomyTopCoins {

	export async function getTopCraftcoins(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "craft_coins", "groups")
			.from("player_profile").orderBy("craft_coins", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"value": player.craft_coins,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopVoteTokens(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "vote_tokens_2", "groups")
			.from("player_profile").orderBy("vote_tokens_2", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"value": player.vote_tokens_2,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopCraftTokens(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "craft_tokens", "groups")
			.from("player_profile").orderBy("craft_tokens", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"value": player.craft_tokens,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopPlayedTime(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "played_time", "groups")
			.from("player_profile").orderBy("played_time", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"value": player.played_time,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopQuestPoints(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "quest_points", "groups")
			.from("player_profile").orderBy("quest_points", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"value": player.quest_points,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopEventPoints(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "event_points", "groups")
			.from("player_profile").orderBy("event_points", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"value": player.event_points,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopSeasonPoints(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "season_points", "groups")
			.from("player_profile").orderBy("season_points", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"value": player.season_points,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopParkourPoints(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "parkour_points", "groups")
			.from("player_profile").orderBy("parkour_points", "DESC").limit(50)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"value": player.parkour_points,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopKarmaPoints(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "karma_points", "groups")
			.from("player_profile").orderBy("karma_points", "DESC").limit(50)
			.where("karma_points", ">", 0)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data.forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"value": player.karma_points,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getVanillaDragonSlayerData(_req: any, res: any) {
		const data = await SQLManager.knex.raw("SELECT vanilla_dragonslayer_data.nick, vanilla_dragonslayer_data.uuid, vanilla_dragonslayer_data.dragon_kills, vanilla_dragonslayer_data.dragon_assists, vanilla_dragonslayer_data.last_kill, player_profile.nick, player_profile.uuid, player_profile.groups FROM minigames.vanilla_dragonslayer_data, minigames.player_profile WHERE player_profile.uuid = vanilla_dragonslayer_data.uuid ORDER BY dragon_kills DESC LIMIT 100")
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data[0].forEach((player: any, index: number) => {
			if (player.dragon_kills >= 1 || player.dragon_assists >= 1) {
				index++;
				finalResults.push({
					"index": index,
					"nick": player.nick,
					"uuid": player.uuid,
					"dragon_kills": player.dragon_kills,
					"dragon_assists": player.dragon_assists,
					"last_kill": player.last_kill
				});
			}
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getEconomyTopSkyblock(_req: any, res: any) {
		const serverId = 'skyblock_118';
		const data = await SQLManager.knex.raw(`SELECT player_economy_${serverId}.balance, player_economy_${serverId}.last_update, player_profile.nick, player_profile.uuid, player_profile.groups FROM minigames.player_economy_${serverId}, minigames.player_profile WHERE player_profile.uuid = player_economy_${serverId}.uuid ORDER BY player_economy_${serverId}.balance DESC LIMIT 100`)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data[0].forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"balance": player.balance,
				"groups": JSON.parse(player.groups),
				"last_update": player.last_update
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getEconomyTopSurvival117(_req: any, res: any) {
		const serverId = 'survival_117';
		const data = await SQLManager.knex.raw(`SELECT player_economy_${serverId}.balance, player_economy_${serverId}.last_update, player_profile.nick, player_profile.uuid, player_profile.groups FROM minigames.player_economy_${serverId}, minigames.player_profile WHERE player_profile.uuid = player_economy_${serverId}.uuid ORDER BY player_economy_${serverId}.balance DESC LIMIT 100`)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data[0].forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"balance": player.balance,
				"groups": JSON.parse(player.groups),
				"last_update": player.last_update
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getEconomyTopSurvival118(_req: any, res: any) {
		const serverId = 'survival_118';
		const data = await SQLManager.knex.raw(`SELECT player_economy_${serverId}.balance, player_economy_${serverId}.last_update, player_profile.nick, player_profile.uuid, player_profile.groups FROM minigames.player_economy_${serverId}, minigames.player_profile WHERE player_profile.uuid = player_economy_${serverId}.uuid ORDER BY player_economy_${serverId}.balance DESC LIMIT 100`)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		data[0].forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"balance": player.balance,
				"groups": JSON.parse(player.groups),
				"last_update": player.last_update
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}
}

export default EconomyTopCoins;

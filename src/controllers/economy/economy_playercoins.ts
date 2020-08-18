import * as Res from "../../services/response";
import * as log from "signale";
import { SQLManager } from "../../managers/SQLManager";

namespace EconomyTopCoins {

	export async function getTopCraftcoins(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "craftcoins", "groups")
			.from("player_profile").orderBy("craftcoins", "DESC").limit(50)
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
				"value": player.craftcoins,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopVoteTokens(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "votetokens_2", "groups")
			.from("player_profile").orderBy("votetokens_2", "DESC").limit(50)
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
				"value": player.votetokens_2,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTopCraftTokens(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "crafttokens", "groups")
			.from("player_profile").orderBy("crafttokens", "DESC").limit(50)
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
				"value": player.crafttokens,
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

	export async function getTopAchievementPoints(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "achievement_points", "groups")
			.from("player_profile").orderBy("achievement_points", "DESC").limit(50)
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
				"value": player.achievement_points,
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

}

export default EconomyTopCoins;

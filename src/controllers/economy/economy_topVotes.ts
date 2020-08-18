import * as Res from "../../services/response";
import * as log from "signale";
import { SQLManager } from "../../managers/SQLManager";

namespace EconomyTopVotes {

	export async function getTop50Total(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "total_votes", "groups")
			.from("player_profile").orderBy("total_votes", "DESC").limit(50)
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
				"value": player.total_votes,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Month(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "month_votes", "groups")
			.from("player_profile").orderBy("month_votes", "DESC").limit(50)
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
				"value": player.month_votes,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

	export async function getTop50Week(_req: any, res: any) {
		const data = await SQLManager.knex.select("nick", "uuid",  "week_votes", "groups")
			.from("player_profile").orderBy("week_votes", "DESC").limit(50)
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
				"value": player.week_votes,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

}

export default EconomyTopVotes;

import * as Res from "../../services/response";
import * as log from "signale";
import { getConnection } from "../../services/mysql-connection";

const con = getConnection();

namespace EconomyTopVotes {

	export async function getTop50Total(_req: any, res: any) {
		await con.query('SELECT nick, uuid, total_votes, groups FROM player_profile ORDER BY total_votes DESC LIMIT 50;',
			(error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			let finalResults: any = [];
			results.forEach((player: any, index: number) => {
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
		});
		return;
	}

	export async function getTop50Month(_req: any, res: any) {
		await con.query('SELECT nick, uuid, month_votes, groups FROM player_profile ORDER BY month_votes DESC LIMIT 50;',
			(error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			let finalResults: any = [];
			results.forEach((player: any, index: number) => {
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
		});
		return;
	}

	export async function getTop50Week(_req: any, res: any) {
		await con.query('SELECT nick, uuid, week_votes, groups FROM player_profile ORDER BY week_votes DESC LIMIT 50;',
			(error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			let finalResults: any = [];
			results.forEach((player: any, index: number) => {
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
		});
		return;
	}

}

export default EconomyTopVotes;

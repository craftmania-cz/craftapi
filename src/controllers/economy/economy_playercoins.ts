import * as Res from "../../services/response";
import * as log from "signale";
import { getConnection } from "../../services/mysql-connection";

const con = getConnection();

namespace EconomyTopCoins {

	export async function getTopCraftcoins(_req: any, res: any) {
		await con.query('SELECT nick, craftcoins FROM player_profile ORDER BY craftcoins DESC LIMIT 50;', (error: any, results: any) => {
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
					"value": player.craftcoins
				});
				return;
			});
			Res.success(res, finalResults);
		});
		return;
	}

	export async function getTopVoteTokens(_req: any, res: any) {
		await con.query('SELECT nick, votetokens_2 FROM player_profile ORDER BY votetokens_2 DESC LIMIT 50;', (error: any, results: any) => {
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
					"value": player.votetokens_2
				});
				return;
			});
			Res.success(res, finalResults);
		});
		return;
	}

	export async function getTopCraftTokens(_req: any, res: any) {
		await con.query('SELECT nick, crafttokens FROM player_profile ORDER BY crafttokens DESC LIMIT 50;', (error: any, results: any) => {
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
					"value": player.crafttokens
				});
				return;
			});
			Res.success(res, finalResults);
		});
		return;
	}

	export async function getTopPlayedTime(_req: any, res: any) {
		await con.query('SELECT nick, played_time FROM player_profile ORDER BY played_time DESC LIMIT 50;', (error: any, results: any) => {
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
					"value": player.played_time
				});
				return;
			});
			Res.success(res, finalResults);
		});
		return;
	}

	export async function getTopAchievementPoints(_req: any, res: any) {
		await con.query('SELECT nick, achievement_points FROM player_profile ORDER BY achievement_points DESC LIMIT 50;',
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
					"value": player.achievement_points
				});
				return;
			});
			Res.success(res, finalResults);
		});
		return;
	}

	export async function getTopEventPoints(_req: any, res: any) {
		await con.query('SELECT nick, event_points FROM player_profile ORDER BY event_points DESC LIMIT 50;',
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
						"value": player.event_points
					});
					return;
				});
				Res.success(res, finalResults);
			});
		return;
	}

}

export default EconomyTopCoins;

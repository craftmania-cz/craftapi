import * as Res from "../../services/response";
import * as log from "signale";
import { getConnection } from "../../services/mysql-connection";

const con = getConnection();

namespace HalloweenGame {

	export async function getTopPlayerHalloween(_req: any, res: any) {
		await con.query('SELECT nick, uuid, best_wave, played_games, total_golds, killed_mobs FROM halloween_players ORDER BY best_wave DESC, played_games DESC LIMIT 100;',
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
						"best_wave": player.best_wave,
						"played_games": player.played_games,
						"total_golds": player.total_golds,
						"killed_mobs": player.killed_mobs
					});
					return;
				});
				Res.success(res, finalResults);
			});
		return;
	}
}

export default HalloweenGame;

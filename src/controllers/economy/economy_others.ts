import { SQLManager } from "../../managers/SQLManager";
import * as log from "signale";
import * as Res from "../../services/response";

namespace EconomyOthers {

	export async function getPrisonRankLeaderboard(_req: any, res: any) {
		const data = await SQLManager.knex.raw('SELECT players_data.rank, players_data.prestige, player_profile.* FROM prison.players_data, minigames.player_profile WHERE player_profile.uuid = players_data.uuid ORDER BY players_data.prestige DESC, players_data.rank DESC')
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (!data.length) {
			return Res.not_found(res);
		}
		let finalResults: any = [];
		console.log(data[0]);
		data[0].forEach((player: any, index: number) => {
			index++;
			finalResults.push({
				"index": index,
				"nick": player.nick,
				"uuid": player.uuid,
				"rank": player.rank,
				"prestige": player.prestige,
				"groups": JSON.parse(player.groups)
			});
			return;
		});
		Res.success(res, finalResults);
		return;
	}

}

export default EconomyOthers;

import * as Res from "../../services/response";
import { Logger } from "../../utils/Logger";
import { SQLManager } from "../../managers/SQLManager";

const log = Logger('karma:history');

namespace KarmaHistory {

	export async function getHistoryByname(req: any, res: any) {
		const player = req.params.name;
		const data = await SQLManager.knex.select("*")
			.from("player_reputation_log")
			.where("name", player).whereNotNull("text")
			.orderBy("id", "desc")
			.limit(8)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
		});
		if (data.length <= 0) {
			return Res.success(res, []); // Nic je taky možnost
		}
		Res.success(res, data);
		return;
	}
}

export default KarmaHistory;

import * as Res from "../../services/response";
import * as log from 'signale';
import { SQLManager } from "../../managers/SQLManager";

namespace PlayerVipStatus {

	export async function getVIPByName(req: any, res: any) {
		const player = req.params.name;
		const data = await SQLManager.knex.select("groups", "groups_last_check").from("player_profile").where("nick", player)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
		});
		if (data.length <= 0) {
			return Res.not_found(res);
		}
		const dataObject = data[0];
		Res.success(res, {
			groups: JSON.parse(dataObject.groups),
			last_update: data[0].groups_last_check
		});
		return;
	}

	export async function getVIPByUUID(req: any, res: any) {
		const uuid = req.params.uuid;
		const data = await SQLManager.knex.select("groups", "groups_last_check").from("player_profile").where("uuid", uuid)
			.on('query-error', (error: any) => {
				log.error(error);
				return Res.error(res, error);
			});
		if (data.length <= 0) {
			return Res.not_found(res);
		}
		const dataObject = data[0];
		Res.success(res, {
			groups: JSON.parse(dataObject.groups),
			last_update: data[0].groups_last_check
		});
		return;
	}

}

export = PlayerVipStatus;

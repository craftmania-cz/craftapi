import { getConnection } from '../../services/mysql-connection';
import * as Res from "../../services/response";
import * as log from 'signale';

const con = getConnection();

namespace PlayerVipStatus {

	export async function getVIPByName(req: any, res: any) {

		const player = req.params.name;

		await con.query('SELECT groups FROM player_profile WHERE nick = ?;', [player], (error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			let dataObject = results[0];
			Res.success(res, JSON.parse(dataObject.groups));
		});
		return;
	}

	export async function getVIPByUUID(req: any, res: any) {

		const uuid = req.params.uuid;

		await con.query('SELECT groups FROM player_profile WHERE uuid = ?;', [uuid], (error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				return Res.not_found(res);
			}
			let dataObject = results[0];
			Res.success(res, JSON.parse(dataObject.groups));
		});
		return;
	}

}

export = PlayerVipStatus;

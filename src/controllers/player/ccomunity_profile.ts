import { getConnection } from '../../services/mysql-connection';
import * as Res from "../../services/response";
import * as log from 'signale';

const con = getConnection();

namespace Ccomunity {
	export async function getProfileByName(req: any, res: any) {

		const player = req.params.name;

		await con.query('SELECT * FROM player_profile WHERE nick = ?;', [player], (error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				log.warn('Requested player not found!');
				return Res.not_found(res);
			}
			log.success('Ccomunity profile found... serving!')
			Res.success(res, results);
		});
		return;
	}

	export async function getProfileByUUID(req: any, res: any) {

		const uuid = req.params.uuid;

		await con.query('SELECT * FROM player_profile WHERE uuid = ?;', [uuid], (error: any, results: any) => {
			if (error) {
				log.error(error);
				return Res.error(res, error);
			}
			if (!results.length) {
				log.warn('Requested player not found!');
				return Res.not_found(res);
			}
			log.success('Ccomunity profile found... serving!')
			Res.success(res, results);
		});
		return;
	}
}

export = Ccomunity;

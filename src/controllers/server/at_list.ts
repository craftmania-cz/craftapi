import * as Res from "../../services/response";
import * as log from "signale";
import { getConnection } from "../../services/mysql-connection";

const con = getConnection();

namespace AdminList {

	export async function getAdminList(_req: any, res: any) {
		await con.query('SELECT nick,uuid,rank FROM at_table;',
			(error: any, results: any) => {
				if (error) {
					log.error(error);
					return Res.error(res, error);
				}
				if (!results.length) {
					return Res.not_found(res);
				}
				let finalResults: any = [];
				results.forEach((data: any) => {
					finalResults.push({
						"nick": data.nick,
						"uuid": data.uuid,
						"rank": data.rank
					});
					return;
				});
				Res.success(res, finalResults);
			});
		return;
	}
}

export default AdminList;

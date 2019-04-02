import * as Res from "../../services/response";
import { serverObject } from "../../utils/ping";

namespace PlayerCount {

	export async function getServerStatus(_req: any, res: any) {
		if (serverObject === null) {
			Res.success(res, {
				"players": {
					"online": null,
					"max": null,
				},
				"isOnline": false
			});
			return;
		}
		Res.success(res, serverObject);
	}
}

export = PlayerCount;

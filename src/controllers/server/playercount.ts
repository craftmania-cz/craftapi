import * as Res from "../../services/response";
import { serverObject } from "../../utils/ping";

namespace PlayerCount {

	export async function getProfileByName(_req: any, res: any) {
		if (serverObject === null) {
			Res.success(res, {
				"players": {
					"online": 0,
					"max": null,
				},
				"version": null,
				"favicon": null
			})
		}
		Res.success(res, serverObject);
	}
}

export = PlayerCount;
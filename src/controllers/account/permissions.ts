import * as Res from "../../services/response";
import * as jwt from "jsonwebtoken";
import { IConfig } from "config";
import { AccessControl } from "accesscontrol";
import Grants from "../../utils/authentification/Grants";

const config: IConfig = require("config");
const ac = new AccessControl(new Grants().getGrants);

namespace Permissions {

	export async function getPermissions(_req: any, res: any) {
		Res.success(res, ac.getGrants());
		return;
	}

	export async function checkIfTokensIsValid(req: any, res: any) {

		const token = req.body.token;

		if (token) {
			// @ts-ignore
			jwt.verify(token, config.get('app.token'), (err: any, decoded: object | string) => {
				if (err) {
					return res.status(401).json({
						status: 401,
						success: false,
						message: 'Token je neplatný'
					});
				} else {
					return res.status(200).json({
						status: 200,
						success: true,
						messaage: 'Token je platný.'
					});
				}
			});
		} else {
			return Res.bad_request(res, "Nezadal jsi token do těla requestu!");
		}

	}
}

export default Permissions;

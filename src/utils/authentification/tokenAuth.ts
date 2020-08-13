import * as jwt from "jsonwebtoken";
import { IConfig } from "config";
import { NextFunction, Request, Response } from "express";

const config: IConfig = require("config");

interface JWTToken {
	username: string;
	permissions: string[];
	iat: number;
	exp: number;
}

class TokenAuth {

	public static async checkPerms (req: Request, requestedPermissions: string[] = []) {
		let token = req.headers['x-access-token'] || req.headers['authorization'];
		if (token === undefined) {
			return false;
		}
		if (typeof token !== "string" || token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}
		if (token) {
			if (typeof token === "string") {
				const jwtToken = jwt.decode(token, config.get('app.token')) as JWTToken;
				return jwtToken.permissions.some((v: string) => requestedPermissions.indexOf(v) !== -1);
			} else {
				return false;
			}
		} else {
			return false;
		}

	}

	public async checkToken (req: Request, res: Response, next: NextFunction) {
		let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
		if (token === undefined) {
			return res.status(400).json({
				message: 'Auth token is not supplied'
			});
		}
		if (typeof token !== "string" || token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}

		if (token) {
			if (typeof token === "string") {
				// @ts-ignore
				jwt.verify(token, config.get('app.token'), (err: any, decoded: object | string) => {
					if (err) {
						return res.json({
							success: false,
							message: 'Token is not valid'
						});
					} else {
						// @ts-ignore
						req.decoded = decoded;
						next();
					}
				});
			}
		} else {
			return res.json({
				success: false,
				message: 'Auth token is not supplied'
			});
		}
	}

}

export default TokenAuth;

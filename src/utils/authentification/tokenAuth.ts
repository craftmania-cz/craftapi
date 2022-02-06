import * as jwt from "jsonwebtoken";
import { IConfig } from "config";
import { NextFunction, Request, Response } from "express";

const config: IConfig = require("config");

interface JWTToken {
	username: string;
	role: string;
	iat: number;
	exp: number;
}

class TokenAuth {

	public static async getRoleFromToken (req: Request) {
		let token = req.headers['x-access-token'] || req.headers['authorization'];
		if (token === undefined) {
			return 'unknown';
		}
		if (typeof token !== "string" || token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}
		if (token) {
			if (typeof token === "string") {
				const jwtToken = jwt.decode(token, config.get('app.token')) as unknown as JWTToken;
				return jwtToken.role;
			} else {
				return 'unknown';
			}
		} else {
			return 'unknown';
		}
	}

	public async checkToken (req: Request, res: Response, next: NextFunction) {
		let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
		if (token === undefined) {
			return res.status(401).json({
				status: 401,
				success: false,
				message: 'Auth token nebyl pokytnut!'
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
						return res.status(401).json({
							status: 401,
							success: false,
							message: 'Token je neplatný!'
						});
					} else {
						// @ts-ignore
						req.decoded = decoded;
						next();
					}
				});
			}
		} else {
			return res.status(401).json({
				status: 401,
				success: false,
				message: 'Auth token nebyl pokytnut!'
			});
		}
	}

}

export default TokenAuth;

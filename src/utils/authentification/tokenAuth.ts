import * as jwt from "jsonwebtoken";
import { IConfig } from "config";
import { NextFunction, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

const config: IConfig = require("config");

let checkToken = (req: any, res: Response, next: NextFunction) => {
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
			jwt.verify(token, config.get('app.token'), (err: JsonWebTokenError, decoded: object | string) => {
				if (err) {
					return res.json({
						success: false,
						message: 'Token is not valid'
					});
				} else {
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
};

module.exports = {
	checkToken: checkToken
};

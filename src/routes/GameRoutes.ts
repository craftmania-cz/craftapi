import { Router, Request, Response, NextFunction } from 'express';
import * as Res from "../services/response";

const gamesFile = require('../../static/games.json');

export class GameRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public getGames(_req: Request, res: Response, _next: NextFunction) {
		res.status(200).json(Res.success(res, gamesFile));
	}

	public init() {
		this.router.get('/', this.getGames);
	}
}

const gameRoutes = new GameRoutes();
gameRoutes.init();

export default gameRoutes.router;

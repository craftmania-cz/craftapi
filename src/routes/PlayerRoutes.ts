import { Router, Request, Response, NextFunction } from 'express';
import * as Ccomunity from "../controllers/player/ccomunity_profile";
import * as Res from "../services/response";

export class PlayerRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.init();
	}

	public getBasic(_req: Request, res: Response, _next: NextFunction) {
		res.status(200).json(Res.property_required(res, 'Player name or UUID').json);
	}

	public init() {
		this.router.get('/', this.getBasic);
		this.router.get('/:name', Ccomunity.getProfile);
	}
}

const playerRoutes = new PlayerRoutes();
playerRoutes.init();

export default playerRoutes.router;
